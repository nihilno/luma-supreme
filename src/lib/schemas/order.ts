import { paymentMethods } from "@/lib/constants/payment";
import z from "zod";
import { shippingSchema } from "./shipping-address";

const orderSchema = z.object({
  userId: z.string().min(1, "User is required."),
  itemsPrice: z.number().nonnegative("Items price must be non-negative."),
  totalPrice: z.number().positive("Total price must be positive number."),
  shippingPrice: z.number().nonnegative("Shipping price must be non-negative."),
  taxPrice: z.number().nonnegative("Tax price must be non-negative."),
  paymentMethod: z.enum(paymentMethods, { message: "Invalid payment method." }),
  shippingAddress: shippingSchema,
});

type orderType = z.infer<typeof orderSchema> & {
  id: string;
  createdAt: Date;
  isPaid: boolean;
  paidAt: Date | null;
  isDelivered: boolean;
  deliveredAt: Date | null;
  orderItems: orderItemType[];
  user: { name: string; email: string };
};

const orderItemSchema = z.object({
  productId: z.string().min(1, "Product is required."),
  slug: z.string(),
  image: z.string(),
  name: z.string(),
  price: z.number().positive("Price must be positive number."),
  qty: z.number().positive("Quantity must be positive number."),
});

type orderItemType = z.infer<typeof orderItemSchema>;

export { orderItemSchema, orderSchema, type orderItemType, type orderType };
