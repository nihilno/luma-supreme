"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { upsertProductSchema } from "../schemas/product";

export async function removeProduct(productId: string) {
  try {
    const session = await auth();
    if (session?.user.role !== "ADMIN")
      return {
        success: false,
        message: "Only Administrators can perform this action.",
      };

    await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    revalidatePath("/admin/products");

    return {
      success: true,
      message: `Product ${productId} was removed.`,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Cannot remove this product right now. Try again later.",
    };
  }
}

export async function createProduct(formData: unknown) {
  const validated = upsertProductSchema.safeParse(formData);
  if (!validated.success)
    return {
      success: false,
      message: "Incorrect data.",
    };

  try {
    const session = await auth();
    if (session?.user.role !== "ADMIN")
      return {
        success: false,
        message: "Only Administrators can perform this action.",
      };

    await prisma.product.create({ data: validated.data });
    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Product updated successfully.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Internal error.",
    };
  }
}

export async function updateProduct(formData: unknown) {
  const validated = upsertProductSchema.safeParse(formData);
  if (!validated.success)
    return {
      success: false,
      message: "Incorrect data.",
    };

  try {
    const session = await auth();
    if (session?.user.role !== "ADMIN")
      return {
        success: false,
        message: "Only Administrators can perform this action.",
      };

    const productExists = await prisma.product.findUnique({
      where: { id: validated.data.id },
    });

    if (!productExists) {
      return {
        success: false,
        message: "Product not found",
      };
    }

    await prisma.product.update({
      where: { id: validated.data.id },
      data: validated.data,
    });
    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Product updated successfully.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Internal error.",
    };
  }
}
