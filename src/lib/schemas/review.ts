import z from "zod";

const insertReviews = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long").max(100),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters long")
    .max(1000),
  productId: z.string().min(1, "Product ID is required"),
  rating: z
    .number()
    .int()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot be more than 5"),
});

type insertReviewsType = z.infer<typeof insertReviews>;
type Review = insertReviewsType & {
  id: string;
  createdAt: Date;
  user?: { name: string };
};

export { insertReviews, type insertReviewsType, type Review };
