import "server-only";

import { prisma } from "@/lib/prisma";
import { decimalToNumber } from "../utils";

export async function fetchProductBySlug(slug: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
    });

    if (!product) return null;

    return {
      ...product,
      rating: decimalToNumber(product.rating),
      price: decimalToNumber(product.price),
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
