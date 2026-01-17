"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
  cartItemSchema,
  cartItemType,
  insertCartSchema,
} from "@/lib/schemas/cart";
import { calcCartPrices, decimalToNumber } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function AddToCart(data: cartItemType) {
  try {
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Cart session not found.");

    const session = await auth();
    const userId = session?.user?.id
      ? (session?.user?.id as string)
      : undefined;

    const cart = await getMyCart();
    const item = cartItemSchema.parse(data);

    const product = await prisma.product.findFirst({
      where: { id: item.productId },
    });

    if (!product) throw new Error("Product not found.");

    if (!cart) {
      const newCart = insertCartSchema.parse({
        userId,
        items: [item],
        sessionCartId,
        ...calcCartPrices([item]),
      });

      await prisma.cart.create({
        data: newCart,
      });

      revalidatePath(`/product/${product.slug}`);

      return {
        success: true,
        message: "Item added to Cart.",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Cannot add to Cart. Try again later.",
    };
  }
}

export async function getMyCart() {
  const sessionCartId = (await cookies()).get("sessionCartId")?.value;
  if (!sessionCartId) throw new Error("Cart session not found.");

  const session = await auth();
  const userId = session?.user?.id ? (session?.user?.id as string) : undefined;

  const cart = await prisma.cart.findFirst({
    where: userId ? { userId } : { sessionCartId },
  });

  if (!cart) return undefined;

  return {
    ...cart,
    items: cart.items as cartItemType[],
    itemsPrice: decimalToNumber(cart.itemsPrice),
    totalPrice: decimalToNumber(cart.totalPrice),
    shippingPrice: decimalToNumber(cart.shippingPrice),
    taxPrice: decimalToNumber(cart.taxPrice),
  };
}
