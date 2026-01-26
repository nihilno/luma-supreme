"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { insertReviews } from "@/lib/schemas/review";
import { revalidatePath } from "next/cache";

export async function UpsertReview(formData: unknown) {
  const validated = insertReviews.safeParse(formData);
  if (!validated.success) {
    return {
      success: false,
      message: "Invalid review data. Please check your input and try again.",
    };
  }

  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!session || !userId) {
      throw new Error("You must be logged in to perform this action.");
    }
    const productId = validated.data.productId;

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      return {
        success: false,
        message: "Product not found.",
      };
    }

    const reviewExists = await prisma.review.findUnique({
      where: { userId_productId: { userId, productId } },
    });

    await prisma.$transaction(async (tx) => {
      if (reviewExists) {
        await tx.review.update({
          where: { id: reviewExists.id },
          data: { ...validated.data },
        });
      } else {
        await tx.review.create({
          data: { ...validated.data, userId, productId },
        });
      }

      const avg = await tx.review.aggregate({
        where: { productId },
        _avg: { rating: true },
      });

      const numReviews = await tx.review.count({
        where: { productId },
      });

      await tx.product.update({
        where: { id: productId },
        data: {
          rating: avg._avg.rating || 0,
          numReviews,
        },
      });
    });

    revalidatePath(`/product/${product.slug}`);

    return {
      success: true,
      message: "Review submitted successfully.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message:
        "An error occurred while submitting your review. Please try again.",
    };
  }
}
