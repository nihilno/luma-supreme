"use server";

import { auth } from "@/auth";
import { getUserById } from "@/lib/data/getUserById";
import { prisma } from "@/lib/prisma";
import { orderSchema } from "@/lib/schemas/order";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { getMyCart } from "./cart";

export async function createOrder() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!session || !userId)
    throw new Error("You must be logged in to perform this action.");

  const cart = await getMyCart();
  const user = await getUserById(userId);

  if (!cart || cart.items.length === 0)
    return {
      success: false,
      message: "Your cart is empty.",
      redirectTo: "/cart",
    };

  if (!user.address)
    return {
      success: false,
      message: "No shipping address was provided.",
      redirectTo: "/shipping-address",
    };

  if (!user.paymentMethod)
    return {
      success: false,
      message: "No payment method was provided.",
      redirectTo: "/payment-method",
    };

  const order = {
    userId: user.id,
    itemsPrice: cart.itemsPrice,
    paymentMethod: user.paymentMethod,
    shippingAddress: user.address,
    shippingPrice: cart.shippingPrice,
    taxPrice: cart.taxPrice,
    totalPrice: cart.totalPrice,
  };
  const validated = orderSchema.safeParse(order);
  if (!validated.success)
    return {
      success: false,
      message: "Wrong order details were received. Please, try again.",
    };

  try {
    const insertedOrderId = await prisma.$transaction(async (tx) => {
      const insertedOrder = await tx.order.create({ data: validated.data });
      for (const item of cart.items) {
        await tx.orderItem.create({
          data: {
            ...item,
            orderId: insertedOrder.id,
          },
        });
      }

      await tx.cart.update({
        where: { id: cart.id },
        data: {
          items: [],
          totalPrice: 0,
          taxPrice: 0,
          shippingPrice: 0,
          itemsPrice: 0,
        },
      });

      return insertedOrder.id;
    });

    if (!insertedOrderId) throw new Error("Order was not created.");

    return {
      success: true,
      message: "Order was placed successfully.",
      redirectTo: `/order/${insertedOrderId}`,
    };
  } catch (error) {
    console.error(error);

    if (isRedirectError(error)) {
      throw error;
    }

    return {
      success: false,
      message:
        "An error occurred while accepting order details. Try again later.",
    };
  }
}
