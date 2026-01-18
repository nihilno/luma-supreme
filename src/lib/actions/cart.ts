"use server";

import { auth } from "@/auth";
import { Prisma } from "@/generated/prisma/client";
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
    const item = cartItemSchema.parse({
      ...data,
      price: data.price,
    });

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
        message: `${product.name} added to Cart.`,
      };
    } else {
      const existItem = (cart.items as cartItemType[]).find(
        (i) => i.productId === item.productId,
      );

      if (existItem) {
        if (product.stock < existItem.qty + 1) {
          throw new Error("Not enough stock");
        }
        (cart.items as cartItemType[]).find(
          (i) => i.productId === item.productId,
        )!.qty = existItem.qty + 1;
      } else {
        if (product.stock < 1) {
          throw new Error("Not enough stock");
        }
        cart.items.push(item);
      }

      await prisma.cart.update({
        data: {
          items: cart.items as Prisma.CartUpdateitemsInput[],
          ...calcCartPrices(cart.items as cartItemType[]),
        },
        where: { id: cart.id },
      });

      revalidatePath(`/products/${product.slug}`);

      return {
        success: true,
        message: `${product.name} (x${existItem?.qty ? existItem?.qty : 1}) ${existItem ? "updated in" : "added to"} Cart.`,
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

export async function removeItemFromCart(productId: string) {
  try {
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Cart session not found.");

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    if (!product) throw new Error("Product not found.");

    const cart = await getMyCart();
    if (!cart) throw new Error("Cart not found.");

    const exists = (cart.items as cartItemType[]).find(
      (i) => i.productId === productId,
    );
    if (!exists) throw new Error("Item not found.");

    if (exists.qty === 1) {
      cart.items = (cart.items as cartItemType[]).filter(
        (p) => p.productId !== exists.productId,
      );
    } else {
      (cart.items as cartItemType[]).find(
        (i) => i.productId === productId,
      )!.qty = exists.qty - 1;
    }

    await prisma.cart.update({
      data: {
        items: cart.items as Prisma.CartUpdateitemsInput[],
        ...calcCartPrices(cart.items as cartItemType[]),
      },
      where: { id: cart.id },
    });

    revalidatePath(`/products/${product.slug}`);

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Cannot remove product from Cart. Try again later.",
    };
  }
}
