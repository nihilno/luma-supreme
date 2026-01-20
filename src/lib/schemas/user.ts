import z from "zod";

const userProfileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
});

type UserProfileType = z.infer<typeof userProfileSchema>;

export { userProfileSchema, type UserProfileType };
