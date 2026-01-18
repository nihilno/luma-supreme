import { Session } from "next-auth";
import { cartItemType } from "./lib/schemas/cart";

export {};

declare global {
  type TitleProps = {
    title?: string;
    subtitle?: string;
  };

  type Product = {
    rating: number;
    price: number;
    name: string;
    id: string;
    slug: string;
    category: string;
    description: string;
    images: string[];
    brand: string;
    numReviews: number;
    stock: number;
    isFeatured: boolean;
    banner: string | null;
    createdAt: Date;
  } | null;

  type AddToCartProps = {
    price: number;
    stock: number;
    cart?: Cart;
    cartItem: cartItemType;
  };

  type Cart = {
    items: cartItemType[];
    itemsPrice: number;
    totalPrice: number;
    shippingPrice: number;
    taxPrice: number;
    sessionCartId: string;
    id: string;
    userId: string | null;
    createdAt: Date;
  };

  type UserProfileProps = {
    dropdown?: boolean;
    name?: string;
    email?: string | null;
  };

  type CartTotalProps = {
    prices: CartTotal;
    cartDontExist: boolean;
    session: Session | null;
  };

  type CartTotal = {
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
  };
}
