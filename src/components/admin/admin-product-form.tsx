"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createProduct, updateProduct } from "@/lib/actions/products";
import { upsertProductSchema, UpsertProductType } from "@/lib/schemas/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconChecks, IconLoader2, IconSparkles2 } from "@tabler/icons-react";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const metadata: Metadata = {
  title: "Add new product",
};

function AdminProductForm({
  type = "Create",
  productId,
}: AdminProductFormProps) {
  const form = useForm({
    defaultValues: {
      id: productId,
      name: "",
      slug: "",
      category: "",
      brand: "",
      description: "",
      stock: 0,
      images: [],
      isFeatured: false,
      banner: null,
      price: 0,
    },
    resolver: zodResolver(upsertProductSchema),
    mode: "onBlur",
  });

  const { push } = useRouter();

  async function handleSubmit(formData: UpsertProductType) {
    if (type === "Create") {
      try {
        const result = await createProduct(formData);
        if (!result.success) {
          toast.warning(result.message);
          return;
        }

        toast.success(result.message);
        form.reset();
      } catch (error) {
        console.error(error);
        toast.error("Internal error has occurred. Try again later.");
      }
    } else if (type === "Update") {
      if (!productId) {
        push("/admin/products");
        return;
      }

      try {
        const result = await updateProduct(formData);
        if (!result.success) {
          toast.warning(result.message);
          return;
        }

        push("/admin/products");
        toast.success(result.message);
      } catch (error) {
        console.error(error);
        toast.error("Internal error has occurred. Try again later.");
      }
    }
  }

  const disabled = form.formState.isSubmitting;

  return (
    <Card>
      <CardHeader className="border-b border-dashed">
        <CardTitle className="text-lg">Create Product Listing</CardTitle>
        <CardDescription>
          Provide accurate product information for the catalog.
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter product name"
                      className="h-11 text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="slug"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Generate a product slug"
                      className="h-11 text-sm"
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                  <Button
                    className="h-12"
                    type="button"
                    disabled={!form.watch("name") || disabled}
                    onClick={() => {
                      const name = form.getValues("name");
                      const slug = name
                        .trim()
                        .toLowerCase()
                        .replace(/\s+/g, "-") // replace all spaces
                        .replace(/[^a-z0-9\-]/g, "") // remove invalid chars
                        .replace(/\-+/g, "-"); // remove double dashes

                      form.setValue("slug", slug);
                    }}
                  >
                    <IconSparkles2 className="size-6" />
                    Generate Slug
                  </Button>
                </FormItem>
              )}
            />
            <FormField
              name="category"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter category"
                      className="h-11 text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="brand"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter product brand"
                      className="h-11 text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="price"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-11 text-sm"
                      type="number"
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="stock"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-11 text-sm"
                      type="number"
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="images"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <Input {...field} className="h-11 text-sm" type="file" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="isFeatured"
              control={form.control}
              render={() => (
                <FormItem>
                  <FormLabel>Featured Product</FormLabel>
                  <FormControl>
                    <Input
                      type="checkbox"
                      placeholder="Enter product name"
                      className="h-11 text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="banner"
              control={form.control}
              render={() => (
                <FormItem>
                  <FormLabel>Banner</FormLabel>
                  <FormControl>
                    <Input type="file" className="h-11 text-sm" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter product description"
                      className="h-11 resize-none text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="mt-6 h-12 w-full"
              disabled={disabled}
            >
              {disabled ? (
                <IconLoader2 className="size-6 animate-spin" />
              ) : (
                <IconChecks className="size-6" />
              )}
              Create product!
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default AdminProductForm;
