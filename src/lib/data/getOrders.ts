import "server-only";
import { prisma } from "../prisma";
import { decimalToNumber } from "../utils";

export async function getOrders(userId: string) {
  const orders = await prisma.order.findMany({
    where: {
      userId,
    },
    orderBy: { createdAt: "desc" },
  });

  const normalized = orders.map((order): OrderTableItem => {
    return {
      id: order.id,
      createdAt: order.createdAt,
      totalPrice: decimalToNumber(order.totalPrice),
      isPaid: order.isPaid,
      isDelivered: order.isDelivered,
      paidAt: order.paidAt,
      deliveredAt: order.deliveredAt,
    };
  });

  return normalized;
}
