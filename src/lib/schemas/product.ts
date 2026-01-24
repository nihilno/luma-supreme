import z from "zod";

const upsertProductSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, "Name must be at least 3 characters."),
  slug: z.string().min(3, "Slug must be at least 3 characters."),
  category: z.string().min(3, "Category must be at least 3 characters."),
  brand: z.string().min(3, "Brand must be at least 3 characters."),
  description: z.string().min(3, "Description must be at least 3 characters."),
  stock: z.number().nonnegative("Stock cannot be below 0."),
  images: z.array(z.string()).min(1, "Product must have at least one image."),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: z.number().positive("Price must be greater than 0."),
});

type UpsertProductType = z.infer<typeof upsertProductSchema>;

export { upsertProductSchema, type UpsertProductType };
