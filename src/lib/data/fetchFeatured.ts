import { prisma } from "@/lib/prisma";
import "server-only";
import { FEATURED_LIMIT } from "../constants/consts";
import { decimalToNumber } from "../utils";

export async function getFeaturedProducts() {
  try {
    const featured = await prisma.product.findMany({
      where: { isFeatured: true },
      orderBy: { createdAt: "desc" },
      take: FEATURED_LIMIT,
    });

    const normalized = featured.map((p) => ({
      ...p,
      price: decimalToNumber(p.price),
      rating: decimalToNumber(p.rating),
    }));

    return normalized;
  } catch (error) {
    console.error(error);
    return [];
  }
}
