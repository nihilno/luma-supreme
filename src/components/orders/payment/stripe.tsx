"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useTheme } from "next-themes";
import StripeForm from "./stripe-form";

function StripePayment({
  priceInCents,
  orderId,
  clientSecret,
}: StripePaymentProps) {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  );
  const { theme, systemTheme } = useTheme();

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme:
            theme === "dark"
              ? "night"
              : theme === "light"
                ? "stripe"
                : systemTheme === "dark"
                  ? "night"
                  : "stripe",
        },
      }}
    >
      <StripeForm priceInCents={priceInCents} orderId={orderId} />
    </Elements>
  );
}

export default StripePayment;
