"use client";

import Spinner from "@/components/global/spinner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { updatePaymentMethod } from "@/lib/actions/payment";
import { paymentMethods } from "@/lib/constants/payment";
import { paymentSchema, paymentType } from "@/lib/schemas/payment";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconArrowBarLeft, IconArrowBarRight } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function PaymentForm() {
  const { replace } = useRouter();
  const form = useForm<paymentType>({
    defaultValues: {
      type: "PayPal",
    },
    resolver: zodResolver(paymentSchema),
  });

  async function handleSubmit(formData: paymentType) {
    try {
      const result = await updatePaymentMethod(formData);
      if (!result.success) {
        toast.warning(result.message);
        return;
      }

      replace("/place-order");
    } catch (error) {
      console.error(error);
      toast.error("An internal error has occurred. Try again later.");
    }
  }

  const disabled = form.formState.isSubmitting;

  return (
    <div className="relative">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="mt-16 flex flex-col gap-6">
                    {paymentMethods.map((method) => (
                      <label
                        key={method}
                        className={cn(
                          "bg-card flex h-20 cursor-pointer items-center justify-center rounded-xl p-4 text-center text-xl font-semibold shadow-xl transition select-none",
                          field.value === method && "bg-distinct text-white",
                        )}
                      >
                        <input
                          type="radio"
                          value={method}
                          checked={field.value === method}
                          onChange={field.onChange}
                          className="sr-only"
                          disabled={disabled}
                        />
                        {method}
                      </label>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-16 flex items-center gap-2.5">
            <Button
              type="button"
              size={"lg"}
              className="h-12 text-base"
              disabled={disabled}
            >
              <Link
                href="/shipping-address"
                className="flex items-center gap-1.5"
              >
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
        <div className="absolute inset-0 z-10 cursor-default">
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default PaymentForm;
