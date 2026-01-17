import { Decimal } from "@prisma/client/runtime/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { cartItemType } from "./schemas/cart";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toGBP(value: number | string) {
  const amount = typeof value === "string" ? Number(value) : value;

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
  }).format(amount);
}

export function decimalToNumber(value: Decimal | number | string) {
  if (value instanceof Decimal) return Number(value.toString());
  return Number(value);
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function numberToDecimal(value: number | string) {
  if (typeof value === "number") {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  } else if (typeof value === "string") {
    return Math.round(Number(value + Number.EPSILON) * 100) / 100;
  } else {
    throw new Error("Value is not a number or string.");
  }
}

export function calcCartPrices(items: cartItemType[]) {
  const itemsPrice = items.reduce(
    (prev, item) => prev + numberToDecimal(item.price * item.qty),
    0,
  );
  const shippingPrice = numberToDecimal(itemsPrice < 100 ? 0 : 10);
  const taxPrice = numberToDecimal(0.15 * itemsPrice);
  const totalPrice = numberToDecimal(itemsPrice + shippingPrice + taxPrice);

  return {
    itemsPrice: Number(itemsPrice.toFixed(2)),
    shippingPrice: Number(shippingPrice.toFixed(2)),
    taxPrice: Number(taxPrice.toFixed(2)),
    totalPrice: Number(totalPrice.toFixed(2)),
  };
}
