import z from "zod";

const signInSchema = z.object({
  email: z.email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

const signUpSchema = z
  .object({
    name: z.string().min(3, { message: "Provide your name." }),
    email: z.email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm password must be at least 8 characters." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

type signInType = z.infer<typeof signInSchema>;
type signUpType = z.infer<typeof signUpSchema>;

export { signInSchema, signUpSchema, type signInType, type signUpType };
