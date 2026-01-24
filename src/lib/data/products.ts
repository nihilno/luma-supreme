import "server-only";

import { auth } from "@/auth";
import { FEATURED_LIMIT, PAGE_SIZE } from "@/lib/constants/consts";
import { prisma } from "@/lib/prisma";
import { decimalToNumber } from "@/lib/utils";

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

export async function getProductBySlug(slug: string) {
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

export async function getProductById(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
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

export async function getAllProducts({
  limit = PAGE_SIZE,
  page,
}: PaginationProps) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error("Only logged in users can perform this action.");
  if (session?.user?.role !== "ADMIN")
    throw new Error("Unauthorized: Admin access required.");
  if (page < 1) throw new Error("Page must be at least 1.");

  const initialProducts = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: (page - 1) * limit,
  });

  const dataCount = await prisma.product.count();
  const products = initialProducts.map((product): Product => {
    return {
      ...product,
      price: decimalToNumber(product.price),
      rating: decimalToNumber(product.rating),
    };
  });

  return {
    products,
    totalPages: Math.ceil(dataCount / limit),
  };
}

export async function getAllCategories() {
  const categories = await prisma.product.groupBy({
    by: ["category"],
    _count: true,
  });

  return categories;
}
