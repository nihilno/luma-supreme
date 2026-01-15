import z from "zod";

const newsletterSchema = z.object({
  email: z.email({ message: "Please provide an email." }),
});

type newsletterSchemaType = z.infer<typeof newsletterSchema>;

export { newsletterSchema, type newsletterSchemaType };
