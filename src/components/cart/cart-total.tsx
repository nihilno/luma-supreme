"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { toGBP } from "@/lib/utils";
import { IconChecks, IconHelpHexagon, IconLoader2 } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

function CartTotal({ prices, cartDontExist, session }: CartTotalProps) {
  const [isPending, startTransition] = useTransition();
  const { push } = useRouter();

  const { taxPrice, shippingPrice, totalPrice, itemsPrice } = prices;
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
        <div className="flex items-center justify-between py-3">
          <h3 className="text-distinct font-bold sm:text-lg">Subtotal</h3>
          <span className="font-semibold sm:text-lg">{toGBP(itemsPrice)}</span>
        </div>
        <div className="flex justify-between py-3">
          <div className="flex items-center gap-1">
            <h3 className="text-distinct font-bold sm:text-lg">Shipping</h3>
            <IconHelpHexagon className="size-6 cursor-pointer sm:size-7" />
          </div>
          <span className="font-semibold sm:text-lg">
            {toGBP(shippingPrice)}
          </span>
        </div>
        <div className="flex items-center justify-between py-3">
          <h3 className="text-distinct font-bold sm:text-lg">Tax</h3>
          <span className="font-semibold sm:text-lg">{toGBP(taxPrice)}</span>
        </div>
        <div className="flex items-center justify-between py-3">
          <h3 className="text-distinct font-bold sm:text-lg">Total</h3>
          <span className="font-semibold sm:text-lg">{toGBP(totalPrice)}</span>
        </div>
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
