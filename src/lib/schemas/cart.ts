import z from "zod";

const cartItemSchema = z.object({
  productId: z.string().min(1, "Product is required."),
  name: z.string().min(1, "Name is required."),
  slug: z.string().min(1, "Slug is required."),
  qty: z.number().int().positive("Quantity must be positive number."),
  image: z.union([z.null(), z.string()]),
  price: z.number().positive("Price must be positive number."),
});

const insertCartSchema = z.object({
  userId: z.string().optional(),
  items: z.array(cartItemSchema).min(1, "Cart must have at least one item."),
  itemsPrice: z.number().nonnegative("Items price must be non-negative."),
  totalPrice: z.number().positive("Total price must be positive number."),
  shippingPrice: z.number().nonnegative("Shipping price must be non-negative."),
  taxPrice: z.number().nonnegative("Tax price must be non-negative."),
  sessionCartId: z.string().min(1, "Session Cart ID is required."),
});

type cartItemType = z.infer<typeof cartItemSchema>;
type insertCartType = z.infer<typeof insertCartSchema>;

export {
  cartItemSchema,
  insertCartSchema,
  type cartItemType,
  type insertCartType,
};
