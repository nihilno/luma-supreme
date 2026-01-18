"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { IconChecks, IconLoader2 } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import CartSummary from "./cart-summary";

function CartTotal({ prices, cartDontExist, session }: CartTotalProps) {
  const [isPending, startTransition] = useTransition();
  const { push } = useRouter();

  return (
    <Card>
      <CardHeader>
        <span className="text-lg font-bold sm:text-xl md:text-2xl">
          Order Summary
        </span>
        <CardDescription className="md:text-base">
          Review your subtotal, shipping, and tax before completing your
          purchase.
        </CardDescription>
      </CardHeader>
      <CardContent className="border-t border-b border-dashed py-6">
        <CartSummary prices={prices} />
      </CardContent>
      <CardFooter>
        <Button
          size="lg"
          disabled={isPending || cartDontExist}
          className="hover:bg-distinct h-12 w-full text-lg transition"
          onClick={() =>
            startTransition(() => {
              if (cartDontExist) {
                push("/");
                return;
              } else if (!session) {
                push("/sign-up");
                return;
              }
              push("/shipping-address");
            })
          }
        >
          {isPending ? (
            <IconLoader2 className="size-6 animate-spin" />
          ) : (
            <IconChecks className="size-7" />
          )}
          Proceed to Checkout
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CartTotal;
