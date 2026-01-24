"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { UploadButton } from "@/lib/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconChecks, IconLoader2, IconSparkles2 } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function AdminProductForm({
  type = "Create",
  productId,
  product,
}: AdminProductFormProps) {
  const form = useForm({
    defaultValues:
      type === "Create"
        ? {
            id: productId,
            name: "",
            slug: "",
            category: "",
            brand: "",
            description: "",
            images: [],
            isFeatured: false,
            banner: null,
            price: 0,
          }
        : (product ?? {
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
          }),
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
        toast.warning("Product ID is missing. Unable to update.");
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
  const images = form.watch("images");
  const isFeatured = form.watch("isFeatured");
  const banner = form.watch("banner");

  return (
    <Card className="mx-auto max-w-5xl">
      <CardHeader className="border-b border-dashed">
        <CardTitle className="text-lg">
          {type === "Create" ? "Create Product Listing" : "Update Product"}
        </CardTitle>
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
              render={() => (
                <FormItem>
                  <div className="flex min-h-48 flex-col rounded-xl border">
                    <FormControl>
                      <UploadButton
                        className="bg-distinct/50 rounded-t-xl pb-2 text-white"
                        endpoint="imageUploader"
                        onClientUploadComplete={(res: { url: string }[]) => {
                          if (res.length > 0) {
                            form.setValue("images", [...images, res[0].url]);
                          }
                        }}
                        onUploadError={(error: Error) => {
                          toast.error(error.message);
                        }}
                      />
                    </FormControl>
                    <div className="flex h-full flex-wrap items-center justify-center gap-2">
                      {images.map((img, index) => (
                        <Image
                          key={index}
                          src={img}
                          alt="Product image"
                          className="h-20 w-20 rounded-sm border object-cover object-center"
                          width={100}
                          height={100}
                        />
                      ))}
                    </div>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="isFeatured"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col items-center">
                  <FormLabel className="text-base">Featured Product</FormLabel>
                  <FormControl>
                    <Checkbox
                      className="size-8"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isFeatured && (
              <FormField
                name="banner"
                control={form.control}
                render={() => (
                  <FormItem>
                    <div className="flex min-h-48 flex-col rounded-xl border">
                      <FormControl>
                        <UploadButton
                          className="bg-distinct/50 rounded-t-xl pb-2 text-white"
                          endpoint="imageUploader"
                          onClientUploadComplete={(res: { url: string }[]) => {
                            if (res.length > 0) {
                              form.setValue("banner", res[0].url);
                            }
                          }}
                          onUploadError={(error: Error) => {
                            toast.error(error.message);
                          }}
                        />
                      </FormControl>
                      <div className="flex h-full flex-wrap items-center justify-center gap-2">
                        {isFeatured && banner && (
                          <Image
                            src={banner}
                            alt="Product image"
                            className="w-full rounded-sm border object-cover object-center"
                            width={1920}
                            height={680}
                          />
                        )}
                      </div>
                    </div>
                  </FormItem>
                )}
              />
            )}
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
              {type === "Create" ? "Create Product" : "Update Product"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default AdminProductForm;
