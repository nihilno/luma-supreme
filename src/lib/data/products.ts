import "server-only";

import { Prisma } from "@/generated/prisma/client";
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
  query,
  category,
  price,
  rating,
  sort,
}: PaginationProps) {
  const queryFilter: Prisma.ProductWhereInput =
    query && query !== "all"
      ? {
          name: { contains: query, mode: "insensitive" },
        }
      : {};

  const categoryFilter: Prisma.ProductWhereInput =
    category && category !== "all"
      ? {
          category: {
            contains: category,
            mode: "insensitive",
          },
        }
      : {};

  const priceFilter: Prisma.ProductWhereInput =
    price && price !== "all"
      ? {
          price: {
            gte: Number(price.split("-")[0]),
            lte: Number(price.split("-")[1]),
          },
        }
      : {};

  const ratingFilter: Prisma.ProductWhereInput =
    rating && rating !== "all"
      ? {
          rating: {
            gte: Number(rating),
          },
        }
      : {};

  if (page < 1) throw new Error("Page must be at least 1.");

  const initialProducts = await prisma.product.findMany({
    where: {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    },
    orderBy:
      sort === "lowest"
        ? { price: "asc" }
        : sort === "highest"
          ? { price: "desc" }
          : sort === "rating"
            ? { rating: "desc" }
            : { createdAt: "desc" },
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
