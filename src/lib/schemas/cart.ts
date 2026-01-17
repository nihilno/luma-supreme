import z from "zod";

const cartItemSchema = z.object({
  productId: z.string().min(1, "Product is required."),
  name: z.string().min(1, "Name is required."),
  slug: z.string().min(1, "Slug is required."),
  qty: z.number().int().positive("Quantity must be positive number."),
  image: z.string().min(1, "Image is required."),
  price: z.number().int().positive("Price must be positive number."),
});

const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: z.number().int().positive("Items price must be positive number."),
  totalPrice: z.number().int().positive("Total price be positive number."),
  shippingPrice: z
    .number()
    .int()
    .positive("Shipping price must be positive number."),
  taxPrice: z.number().int().positive("Tax price must be positive number."),
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
