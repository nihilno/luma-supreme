"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AddToCart } from "@/lib/actions/cart";
import { cn, toGBP } from "@/lib/utils";
import {
  IconCirclePlusFilled,
  IconShoppingCartShare,
} from "@tabler/icons-react";
import Link from "next/link";
import { toast } from "sonner";

function AddToCartButton({ price, stock, cartItem }: AddToCartProps) {
  async function handleAddToCart() {
    const result = await AddToCart(cartItem);

    if (!result.success) {
      toast.warning(result.message);
      return;
    }

    toast.success(`${cartItem.name} added to Cart.`, {
      description: (
        <Link href={"/cart"} className="distinct flex items-center gap-1">
          Go to Cart.
          <IconShoppingCartShare className="size-4" />
        </Link>
      ),
    });
  }

  return (
    <Card
      className={cn(
        stock === 0 ? "cursor-not-allowed opacity-50" : "cursor-default",
        "mx-auto max-w-lg transition sm:mx-0",
      )}
    >
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <h4>Price</h4>
          {toGBP(price)}
        </div>
        <div className="flex items-center justify-between">
          <h4>Status</h4>
          <Badge
            className="animate-pulse"
            variant={stock === 0 ? "destructive" : "default"}
          >
            {stock === 0 ? "Out of Stock" : "In Stock"}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="mt-4 border-t border-dashed">
        <Button
          className="hover:bg-distinct h-12 w-full"
          disabled={stock === 0}
          onClick={handleAddToCart}
        >
          <IconCirclePlusFilled className="size-7 translate-y-px" />
          <span className="text-lg"> Add to Cart</span>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddToCartButton;
