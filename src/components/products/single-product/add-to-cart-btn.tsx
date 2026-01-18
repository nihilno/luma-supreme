"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AddToCart, removeItemFromCart } from "@/lib/actions/cart";
import { cn, toGBP } from "@/lib/utils";
import {
  IconChevronRightPipe,
  IconCircleMinus,
  IconCirclePlus,
  IconCirclePlusFilled,
  IconLoader2,
  IconShoppingCartShare,
} from "@tabler/icons-react";
import Link from "next/link";
import { useTransition } from "react";
import { toast } from "sonner";

function AddToCartButton({ cart, price, stock, cartItem }: AddToCartProps) {
  const [isPending, startTransition] = useTransition();

  function handleAddToCart() {
    startTransition(async () => {
      const result = await AddToCart(cartItem);

      if (!result?.success) {
        toast.warning("Cannot add to Cart. Try again later.");
        return;
      }

      toast.success(result.message, {
        description: (
          <Link href={"/cart"} className="distinct flex items-center gap-1">
            Go to Cart.
            <IconShoppingCartShare className="size-4" />
          </Link>
        ),
      });
    });
  }

  function handleRemoveFromCart() {
    startTransition(async () => {
      const result = await removeItemFromCart(cartItem.productId);

      if (!result?.success) {
        toast.warning("Cannot remove from Cart. Try again later.");
        return;
      }
    });
  }

  const existsItem =
    cart && cart.items.find((i) => i.productId === cartItem.productId);

  return (
    <Card
      className={cn(
        stock === 0 ? "cursor-not-allowed opacity-50" : "cursor-default",
        ":mx-0 mx-auto max-w-lg transition",
      )}
    >
      <CardContent className="space-y-4 lg:space-y-6">
        <div className="flex items-center justify-between lg:text-xl">
          <h4 className="text-distinct text-lg font-semibold">Price</h4>
          <span className="text-lg font-semibold">{toGBP(price)}</span>
        </div>
        <div className="flex items-center justify-between lg:text-xl">
          <h4 className="text-distinct text-lg font-semibold">Status</h4>
          <Badge
            className="animate-pulse text-base"
            variant={stock === 0 ? "destructive" : "default"}
          >
            {stock === 0 ? "Out of Stock" : "In Stock"}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="mt-4 border-t border-dashed">
        {existsItem ? (
          <div className="w-full space-y-4">
            <div className="flex w-full items-center justify-between gap-4">
              <Button
                className="hover:bg-distinct h-12 w-30"
                disabled={isPending}
                onClick={handleRemoveFromCart}
              >
                <IconCircleMinus className="size-7 translate-y-px" />
              </Button>
              <div className="border-muted-foreground grid h-12 w-full place-items-center rounded-xl border border-dashed">
                {isPending ? (
                  <IconLoader2 className="distinct size-6 animate-spin" />
                ) : (
                  <h3 className="distinct text-2xl font-bold transition">
                    {existsItem.qty}
                  </h3>
                )}
              </div>
              <Button
                className="hover:bg-distinct h-12 w-30"
                disabled={stock === 0 || isPending}
                onClick={handleAddToCart}
              >
                <IconCirclePlus className="size-7 translate-y-px" />
              </Button>
            </div>
            <Button
              className="hover:bg-distinct h-12 w-full"
              disabled={isPending}
              asChild
            >
              <Link
                href={"/cart"}
                className="flex items-center justify-center gap-2"
                aria-disabled={isPending}
                onClick={(e) => isPending && e.preventDefault()}
              >
                <h5 className="text-lg font-bold">Go to Cart</h5>
                <IconChevronRightPipe className="size-7 translate-y-px" />
              </Link>
            </Button>
          </div>
        ) : (
          <Button
            className="hover:bg-distinct h-12 w-full"
            disabled={stock === 0 || isPending}
            onClick={handleAddToCart}
          >
            {isPending ? (
              <IconLoader2 className="size-6 animate-spin" />
            ) : (
              <IconCirclePlusFilled className="size-7 translate-y-px" />
            )}
            <span className="text-lg"> Add to Cart</span>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default AddToCartButton;
