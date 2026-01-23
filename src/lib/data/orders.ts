import "server-only";

import { auth } from "@/auth";
import { Prisma } from "@/generated/prisma/client";
import { PAGE_SIZE } from "@/lib/constants/consts";
import { prisma } from "@/lib/prisma";
import { decimalToNumber } from "@/lib/utils";

export async function getAllOrders({
  limit = PAGE_SIZE,
  page,
}: PaginationProps) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error("Only logged in users can perform this action.");
  if (session?.user?.role !== "ADMIN")
    throw new Error("Unauthorized: Admin access required.");
  if (page < 1) throw new Error("Page must be at least 1.");

  const initialOrders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: (page - 1) * limit,
  });
  const dataCount = await prisma.order.count();

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

export async function getOrderById(id: string) {
  const session = await auth();
  const userId = session?.user?.id;
  const isAdmin = session?.user?.role === "ADMIN";

  if (!userId) throw new Error("Authentication required.");

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      orderItems: true,
    },
  });

  if (!order) throw new Error("Cannot find this order.");
  if (order.userId !== userId && !isAdmin) {
    throw new Error("You are not authorized to view this order.");
  }

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

export async function getOrderSummary() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Authentication required.");
  if (session?.user?.role !== "ADMIN")
    throw new Error("Admin access required.");

  try {
    const [
      salesCount,
      customersCount,
      productsCount,
      totalSales,
      salesDataRaw,
      latestSales,
    ] = await Promise.all([
      prisma.order.count({ where: { isPaid: true } }),
      prisma.user.count(),
      prisma.product.count(),
      prisma.order.aggregate({
        where: { isPaid: true },
        _sum: { itemsPrice: true },
      }),
      prisma.$queryRaw<Array<{ month: string; totalSales: Prisma.Decimal }>>`
      SELECT
        to_char(date_trunc('month', "createdAt"), 'MM/YY') AS "month",
        SUM("totalPrice") AS "totalSales"
      FROM "orders"
      WHERE "isPaid" = true
      GROUP BY date_trunc('month', "createdAt")
      ORDER BY date_trunc('month', "createdAt")
    `,
      prisma.order.findMany({
        where: { isPaid: true },
        orderBy: { createdAt: "desc" },
        include: { user: { select: { name: true } } },
        take: 6,
      }),
    ]);

    const totalSalesNumber = totalSales._sum.itemsPrice
      ? decimalToNumber(totalSales._sum.itemsPrice)
      : 0;

    const salesData: SalesDataType[] = salesDataRaw.map((entry) => ({
      month: entry.month,
      totalSales: decimalToNumber(entry.totalSales),
    }));

    return {
      salesCount,
      customersCount,
      productsCount,
      totalSales: totalSalesNumber,
      salesData,
      latestSales,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
