"use client";

import CartEmpty from "@/components/cart/cart-empty";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddToCart, removeItemFromCart } from "@/lib/actions/cart";
import { toGBP } from "@/lib/utils";
import {
  IconFileUnknown,
  IconLoader2,
  IconMinus,
  IconPlus,
  IconShoppingCartSearch,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

function CartTable({ cart }: { cart?: Cart }) {
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  if (!cart || cart.items.length === 0)
    return (
      <div className="-mt-32 grid h-screen place-items-center">
        <CartEmpty />
      </div>
    );

  const { items } = cart;

  return (
    <div className="space-y-12 pb-32">
      <div className="flex items-center gap-3">
        <IconShoppingCartSearch className="text-distinct size-10" />
        <h2 className="text-3xl font-bold">Shopping Cart</h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-distinct font-semibold sm:text-base md:text-lg">
              Item
            </TableHead>
            <TableHead className="text-distinct font-semibold sm:text-base md:text-lg">
              Quantity
            </TableHead>
            <TableHead className="text-distinct font-semibold sm:text-base md:text-lg">
              Price
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => {
            const { productId, name, qty, price, image, slug } = item;

            return (
              <TableRow key={productId}>
                <TableCell>
                  <Link
                    href={`/product/${slug}`}
                    target="_blank"
                    className="hover:bg-foreground/5 flex cursor-pointer items-center gap-3 rounded-xl p-1 transition"
                  >
                    {!image ? (
                      <div className="bg-muted grid size-15 shrink-0 place-items-center rounded-xl sm:size-20">
                        <IconFileUnknown className="size-10 opacity-25" />
                      </div>
                    ) : (
                      <Image
                        src={image}
                        alt={name}
                        width={80}
                        height={80}
                        quality={25}
                        className="shrink-0 overflow-hidden rounded-xl sm:size-20"
                      />
                    )}
                    <h3 className="line-clamp-1 text-wrap sm:text-base md:text-lg">
                      {name}
                    </h3>
                  </Link>
                </TableCell>
                <TableCell className="mt-4 flex w-fit gap-1.5 sm:mt-6">
                  <Button
                    size="sm"
                    disabled={isPending}
                    type="button"
                    variant={qty === 1 ? "destructive" : "outline"}
                    onClick={() => {
                      setPendingId(productId);
                      startTransition(async () => {
                        const result = await removeItemFromCart(productId);

                        if (!result?.success) {
                          toast.warning(
                            "Cannot remove from Cart. Try again later.",
                          );
                          return;
                        }
                        setPendingId(null);
                      });
                    }}
                  >
                    <IconMinus className="size-2 sm:size-4" />
                  </Button>
                  <div className="border-muted-foreground grid h-8 w-8 place-items-center rounded-xl border border-dashed sm:w-10">
                    <h5 className="font-semibold">
                      {pendingId === productId ? (
                        <IconLoader2 className="size-4 animate-spin" />
                      ) : (
                        qty
                      )}
                    </h5>
                  </div>
                  <Button
                    size="sm"
                    disabled={isPending}
                    type="button"
                    variant={"outline"}
                    onClick={() => {
                      setPendingId(productId);
                      startTransition(async () => {
                        const result = await AddToCart(item);

                        if (!result?.success) {
                          toast.warning(
                            "Cannot change quantity. Try again later.",
                          );
                          return;
                        }

                        setPendingId(null);
                      });
                    }}
                  >
                    <IconPlus className="size-2 sm:size-4" />
                  </Button>
                </TableCell>
                <TableCell className="font-semibold sm:text-base md:text-lg">
                  {toGBP(price)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default CartTable;
