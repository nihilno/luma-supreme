import "server-only";

import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { decimalToNumber } from "../utils";

export async function getOrderSummary() {
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
  }
}
