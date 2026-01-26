"use client";

import { Button } from "@/components/ui/button";
import { toGBP } from "@/lib/utils";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { IconLoader2 } from "@tabler/icons-react";
import { useState } from "react";

function StripeForm({ priceInCents, orderId }: StripeFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements || !email) return;

    setIsLoading(true);
    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_URL}/order/${orderId}/stripe-payment-success`,
        },
      })
      .then(({ error }) => {
        if (
          error?.type === "card_error" ||
          error?.type === "validation_error"
        ) {
          setErrorMessage(error.message || "An unexpected error occurred.");
        } else if (error) {
          setErrorMessage("An unexpected error occurred.");
        }
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {errorMessage && <div className="text-destructive">{errorMessage}</div>}
      <PaymentElement />
      <LinkAuthenticationElement onChange={(e) => setEmail(e.value.email)} />
      <Button
        className="bg-distinct hover:bg-distinct/75 h-12 w-full text-lg text-white transition"
        disabled={isLoading || !stripe || !elements}
        type="submit"
      >
        {isLoading ? (
          <IconLoader2 className="size-5 animate-spin" />
        ) : (
          <span>Purchase {toGBP(priceInCents / 100)}</span>
        )}
      </Button>
    </form>
  );
}

export default StripeForm;
