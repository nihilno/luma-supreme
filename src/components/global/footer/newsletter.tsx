"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  newsletterSchema,
  newsletterSchemaType,
} from "@/lib/schemas/newsletter";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconArrowRightCircle } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Title from "./title";

function Newsletter() {
  const form = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(newsletterSchema),
  });

  function handleSubmit(formData: newsletterSchemaType) {
    form.reset();
    toast.success(
      `Thanks for subscribing — You're now on our newsletter list.`,
    );
  }

  return (
    <div className="space-y-6">
      <Title
        title="Stay informed"
        subtitle=" Join our newsletter to learn more."
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem className="group relative">
                <FormControl>
                  <Input
                    placeholder="Email address"
                    className="group-hover:border-foreground/25 h-12 rounded-xl transition-colors"
                    {...field}
                  />
                </FormControl>
                <Button
                  className="absolute top-1/2 right-3 -translate-y-1/2"
                  type="submit"
                  size="icon"
                >
                  <IconArrowRightCircle />
                </Button>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}

export default Newsletter;
