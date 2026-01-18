import { paymentMethods } from "@/lib/constants/payment";
import z from "zod";

const paymentSchema = z.object({
  type: z.enum(paymentMethods, { message: "Invalid payment method." }),
});

type paymentType = z.infer<typeof paymentSchema>;

export { paymentSchema, type paymentType };
