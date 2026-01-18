"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  shippingSchema,
  type shippingType,
} from "@/lib/schemas/shipping-address";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IconArrowBarLeft,
  IconArrowBarRight,
  IconBuildingSkyscraper,
  IconFlag,
  IconHash,
  IconHome,
  IconSignature,
} from "@tabler/icons-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Spinner from "../products/product-suspense";

function ShippingForm() {
  const form = useForm<shippingType>({
    defaultValues: {
      fullName: "",
      streetAddress: "",
      city: "",
      postalCode: "",
      country: "",
    },
    resolver: zodResolver(shippingSchema),
  });

  function handleSubmit(formData: shippingType) {
    console.log(formData);
  }

  const disabled = form.formState.isSubmitting;

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            name="fullName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">
                  <IconSignature className="size-5" />
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" className="h-12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="streetAddress"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">
                  <IconHome className="size-5" />
                  Street Address
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="123 Main St."
                    className="h-12"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="city"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">
                  <IconBuildingSkyscraper className="size-5" />
                  City
                </FormLabel>
                <FormControl>
                  <Input placeholder="Anytown" className="h-12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="postalCode"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">
                  <IconHash className="size-5" />
                  Postal Code
                </FormLabel>
                <FormControl>
                  <Input placeholder="12345" className="h-12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="country"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">
                  <IconFlag className="size-5" />
                  Country
                </FormLabel>
                <FormControl>
                  <Input placeholder="USA" className="h-12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-8 flex items-center gap-2.5">
            <Button
              type="button"
              size={"lg"}
              className="h-12 text-base"
              disabled={disabled}
            >
              <Link href="/cart" className="flex items-center gap-1.5">
                <IconArrowBarLeft className="size-6" />
                Back
              </Link>
            </Button>
            <Button
              type="submit"
              size={"lg"}
              className="h-12 text-base"
              disabled={disabled}
            >
              Continue
              <IconArrowBarRight className="size-6" />
            </Button>
          </div>
        </form>
      </Form>

      {disabled && (
        <div className="absolute inset-0 cursor-default">
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default ShippingForm;
