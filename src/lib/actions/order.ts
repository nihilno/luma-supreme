"use server";

import { auth } from "@/auth";
import { sendPurchaseReceiptEmail } from "@/email";
import { getOrderById } from "@/lib/data/orders";
import { getUserById } from "@/lib/data/user";
import { prisma } from "@/lib/prisma";
import { orderSchema, orderType } from "@/lib/schemas/order";
import { revalidatePath } from "next/cache";
import { shippingType } from "../schemas/shipping-address";
import { decimalToNumber } from "../utils";
import { getMyCart } from "./cart";

function isRedirectErrorSafe(err: unknown) {
  const e = err as any;
  if (!e) return false;
  if (typeof e.status === "number" && e.status >= 300 && e.status < 400)
    return true;
  const name = e?.name || e?.constructor?.name;
  if (name === "Redirect" || name === "RedirectError") return true;
  if (typeof e.url === "string" && typeof e.status === "number") return true;
  return false;
}

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

    if (isRedirectErrorSafe(error)) {
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
    const result = await markOrderPaidInternal(id);
    return result;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Cannot perform this action right now. Try again later.",
    };
  }
}

export async function markOrderPaidInternal(
  id: string,
  paymentInfo?: { [key: string]: any } | null,
) {
  try {
    const order = await prisma.order.findUnique({
      where: { id },
    });
    if (!order) {
      return { success: false, message: "Order not found." };
    }

    if (order.isPaid) {
      return {
        success: true,
        message: "Order already paid.",
        alreadyPaid: true,
      };
    }

    const orderItems = await prisma.orderItem.findMany({
      where: { orderId: id },
    });
    const orderUser = await prisma.user.findUnique({
      where: { id: order.userId },
      select: { name: true, email: true },
    });

    const paymentResult = paymentInfo
      ? { ...(order.paymentResult as any), ...paymentInfo }
      : order.paymentResult || {};

    await prisma.order.update({
      where: { id },
      data: { isPaid: true, paidAt: new Date(), paymentResult },
    });

    const updatedOrder = {
      ...order,
      itemsPrice: decimalToNumber(order.itemsPrice),
      totalPrice: decimalToNumber(order.totalPrice),
      shippingPrice: decimalToNumber(order.shippingPrice),
      taxPrice: decimalToNumber(order.taxPrice),
      shippingAddress: order.shippingAddress as shippingType,
      orderItems: orderItems.map((it) => ({
        productId: it.productId,
        slug: it.slug,
        image: it.image ?? undefined,
        name: it.name,
        price: decimalToNumber(it.price),
        qty: it.qty,
      })),
      user: { name: orderUser?.name ?? "", email: orderUser?.email ?? "" },
    };

    if (!orderUser?.email) {
      console.warn(`Cannot send receipt for order ${id}: user email not found`);
    } else {
      await sendPurchaseReceiptEmail({ order: updatedOrder });
    }

    revalidatePath(`/order/${id}`);

    return { success: true, message: `Order ${id} marked as paid.` };
  } catch (error) {
    console.error("markOrderPaidInternal error:", error);
    return { success: false, message: "Internal error." };
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

    const order = await prisma.order.findUnique({ where: { id } });

    if (!order) throw new Error("Order not found.");
    if (!order.isPaid)
      throw new Error("Order cannot be marked as delivered if it's not paid.");

    await prisma.order.update({
      where: { id },
      data: { isDelivered: true, deliveredAt: new Date() },
    });
    revalidatePath(`/order/${id}`);

    return {
      success: true,
      message: `Order was marked as Delivered.`,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Cannot perform this action right now. Try again later.",
    };
  }
}

export async function testResendEmail() {
  const mockOrder: orderType = {
    id: "test_order_123",
    userId: "user_123",

    createdAt: new Date(),

    isPaid: true,
    paidAt: new Date(),

    isDelivered: false,
    deliveredAt: null,

    paymentMethod: "card",

    itemsPrice: 100,
    taxPrice: 20,
    shippingPrice: 0,
    totalPrice: 120,

    shippingAddress: {
      fullName: "Test User",
      streetAddress: "123 Test Street",
      city: "London",
      postalCode: "SW1A 1AA",
      country: "UK",
    },

    orderItems: [
      {
        productId: "prod_123",
        slug: "test-product",
        name: "Test Product",
        price: 100,
        qty: 1,
        image: undefined,
      },
    ],

    user: {
      name: "Test User",
      email: "your@email.com",
    },
  };

  await sendPurchaseReceiptEmail({ order: mockOrder });

  return { success: true };
}
