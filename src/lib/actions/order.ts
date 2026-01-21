"use server";

import { auth } from "@/auth";
import { getUserById } from "@/lib/data/getUserById";
import { prisma } from "@/lib/prisma";
import { orderSchema } from "@/lib/schemas/order";
import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { getOrderById } from "../data/getOrderById";
import { getMyCart } from "./cart";

export async function createOrder() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!session || !userId)
    throw new Error("You must be logged in to perform this action.");

  const cart = await getMyCart();
  const user = await getUserById(userId);
  if (!user) throw new Error("User not found.");

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

export async function payForOrder(orderId: string) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId)
      return {
        success: false,
        message: "Only authenticated users can perform this action.",
      };

    const order = await getOrderById(orderId);
    if (!order) {
      return { success: false, message: "Order not found." };
    }
    if (order.isPaid) throw new Error("This order was already paid.");
    await prisma.$transaction(async (tx) => {
      for (const item of order.orderItems) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { increment: -item.qty } },
        });
      }

      await tx.order.update({
        where: { userId, id: order.id },
        data: {
          isPaid: true,
          paidAt: new Date(),
          paymentResult: { status: "COMPLETED", pricePaid: order.totalPrice },
        },
      });
    });

    revalidatePath(`/order/${orderId}`);

    return {
      success: true,
      message: "Demo payment was completed. Your order has been paid.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "An error occurred while paying. Try again later.",
    };
  }
}

export async function removeOrder(orderId: string) {
  try {
    const session = await auth();
    if (session?.user.role !== "ADMIN")
      return {
        success: false,
        message: "Only Administrators can perform this action.",
      };

    await prisma.order.delete({
      where: {
        id: orderId,
      },
    });

    revalidatePath("/admin/orders");

    return {
      success: true,
      message: `Order ${orderId} was removed.`,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Cannot remove this order right now. Try again later.",
    };
  }
}

export async function markAsPaid(id: string) {
  try {
    const session = await auth();
    if (session?.user.role !== "ADMIN")
      return {
        success: false,
        message: "Only Administrators can perform this action.",
      };

    await prisma.order.update({ where: { id }, data: { isPaid: true } });
    revalidatePath(`/order/${id}`);

    return {
      susccess: true,
      message: `Order was marked as Paid.`,
    };
  } catch (error) {
    console.error(error);
    return {
      susccess: false,
      message: "Cannot perform this action right now. Try again later.",
    };
  }
}

export async function markAsDelivered(id: string) {
  try {
    const session = await auth();
    if (session?.user.role !== "ADMIN")
      return {
        success: false,
        message: "Only Administrators can perform this action.",
      };

    await prisma.order.update({ where: { id }, data: { isDelivered: true } });
    revalidatePath(`/order/${id}`);

    return {
      susccess: true,
      message: `Order was marked as Delivered.`,
    };
  } catch (error) {
    console.error(error);
    return {
      susccess: false,
      message: "Cannot perform this action right now. Try again later.",
    };
  }
}
