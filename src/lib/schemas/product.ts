import z from "zod";

const insertProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  category: z.string().min(3, "Category must be at least 3 characters"),
  brand: z.string().min(3, "Brand must be at least 3 characters"),
  description: z.string().min(3, "Description must be at least 3 characters"),
  stock: z.number().nonnegative(),
  images: z.array(z.string()).min(1, "Product mus have at least one image"),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: z.number().nonnegative("Price must be non-negative."),
});

type InsertProductType = z.infer<typeof insertProductSchema>;

const updateProductSchema = insertProductSchema.extend({
  id: z.string().min(1, "ID is required"),
});

type UpdateProductSchema = z.infer<typeof updateProductSchema>;

export {
  insertProductSchema,
  updateProductSchema,
  type InsertProductType,
  type UpdateProductSchema,
};
