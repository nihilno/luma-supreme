import z from "zod";

const shippingSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters."),
  streetAddress: z.string().min(3, "Address must be at least 3 characters."),
  city: z.string().min(3, "City must be at least 3 characters."),
  postalCode: z.string().min(3, "Postal Code must be at least 3 characters."),
  country: z.string().min(3, "Country must be at least 3 characters."),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

type shippingType = z.infer<typeof shippingSchema>;

export { shippingSchema, type shippingType };
