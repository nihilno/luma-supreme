import { Session } from "next-auth";
import { cartItemType } from "./lib/schemas/cart";
import { Review } from "./lib/schemas/review";
import { shippingType } from "./lib/schemas/shipping-address";

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
  };

  type AddToCartProps = {
    price: number;
    stock: number;
    cart?: Cart;
    cartItem: cartItemType;
  };

  type Cart = CartTotal & {
    items: cartItemType[];
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

  type CartSummaryProps = {
    prices: CartTotal;
    compact?: boolean;
  };

  type PaymentEditProps = {
    paymentMethod: string;
    paidAt?: Date | null;
    isPaid?: boolean;
    readOnly?: boolean;
  };

  type AddressEditProps = {
    address: shippingType;
    readOnly?: boolean;
    isDelivered?: boolean;
    deliveredAt?: Date | null;
  };

  type PayPalProps = {
    totalPrice: number;
    orderId: string;
  };

  type OrderTableItem = {
    id: string;
    createdAt: Date | null;
    totalPrice: number;
    isPaid: boolean;
    isDelivered: boolean;
    paidAt: Date | null;
    deliveredAt: Date | null;
  };

  type SalesDataType = {
    month: string;
    totalSales: number;
  };

  type AdminActionsProps = {
    isAdmin: boolean;
    isPaid: boolean;
    isDelivered: boolean;
    id: string;
  };

  type PaginationProps = {
    limit?: number;
    page: number;
    query?: string;
    category?: string;
    price?: string;
    rating?: string;
    sort?: string;
  };

  type AdminProductFormProps = {
    type: "Create" | "Update";
    productId?: string;
    product?: Product;
  };

  type ProductsContainerProps = {
    title?: string;
    featured: Product[];
  };

  type SearchPageParams = {
    q?: string;
    category?: string;
    price?: string;
    rating?: string;
    sort?: string;
    page?: string;
  };

  type ReviewsProps = {
    userId?: string;
    slug: string;
    productId: string;
    reviews: Review[];
  };

  type StripePaymentProps = {
    priceInCents: number;
    orderId: string;
    clientSecret: string;
  };

  type StripeFormProps = {
    priceInCents: number;
    orderId: string;
  };
}
