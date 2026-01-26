import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import "server-only";

export async function getReviews(productId: string) {
  const data = await prisma.review.findMany({
    where: { productId },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export async function getUserReview(productId: string) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!session || !userId) {
    throw new Error("You must be logged in to perform this action.");
  }

  const data = await prisma.review.findUnique({
    where: { userId_productId: { userId, productId } },
  });

  return data;
}
