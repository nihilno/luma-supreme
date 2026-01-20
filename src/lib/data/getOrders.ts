import { auth } from "@/auth";
import { PAGE_SIZE } from "@/lib/constants/consts";
import { prisma } from "@/lib/prisma";
import { decimalToNumber } from "@/lib/utils";
import "server-only";

export async function getOrders({
  limit = PAGE_SIZE,
  page,
}: {
  limit?: number;
  page: number;
}) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error("Only logged in users can perform this action.");

  const initialOrders = await prisma.order.findMany({
    where: {
      userId,
    },
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: (page - 1) * limit,
  });

  const dataCount = await prisma.order.count({
    where: {
      userId,
    },
  });

  const orders = initialOrders.map((order): OrderTableItem => {
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

  return {
    orders,
    totalPages: Math.ceil(dataCount / limit),
  };
}
