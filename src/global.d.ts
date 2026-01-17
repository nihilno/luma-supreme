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
    cartItem: cartItemType;
  };

  type ButtonsProps = {
    className?: string;
    col?: boolean;
    names?: boolean;
  };

  type UserProfileProps = {
    dropdown?: boolean;
    name?: string;
    email?: string | null;
  };
}
