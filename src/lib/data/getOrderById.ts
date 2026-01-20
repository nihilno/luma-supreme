import "server-only";

import { prisma } from "@/lib/prisma";
import { decimalToNumber } from "../utils";

export async function getOrderById(id: string) {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      orderItems: true,
    },
  });

  if (!order) throw new Error("Cannot find this order.");

  return {
    ...order,
    itemsPrice: decimalToNumber(order.itemsPrice),
    shippingPrice: decimalToNumber(order.shippingPrice),
    taxPrice: decimalToNumber(order.taxPrice),
    totalPrice: decimalToNumber(order.totalPrice),
    orderItems: order.orderItems.map((item) => ({
      ...item,
      price: decimalToNumber(item.price),
    })),
  };
}
