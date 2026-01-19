"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddToCart, removeItemFromCart } from "@/lib/actions/cart";
import { cartItemType } from "@/lib/schemas/cart";
import { toGBP } from "@/lib/utils";
import {
  IconFileUnknown,
  IconLoader2,
  IconMinus,
  IconPlus,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "sonner";

function CartTable({
  items,
  control = true,
}: {
  items: cartItemType[];
  control?: boolean;
}) {
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
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
                  className="flex cursor-pointer items-center gap-3 rounded-xl p-1"
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
                      className="size-15 shrink-0 overflow-hidden rounded-xl sm:size-20"
                    />
                  )}
                  <h3 className="line-clamp-1 text-wrap sm:text-base md:text-lg">
                    {name}
                  </h3>
                </Link>
              </TableCell>
              <TableCell>
                {control ? (
                  <div className="flex items-center gap-1 sm:gap-2.5">
                    <Button
                      size="sm"
                      disabled={isPending}
                      type="button"
                      variant={"outline"}
                      onClick={() => {
                        setPendingId(productId);
                        startTransition(async () => {
                          const result = await removeItemFromCart(productId);

                          if (!result?.success) {
                            toast.warning(
                              "Cannot remove from Cart. Try again later.",
                            );
                            setPendingId(null);
                            return;
                          }
                          setPendingId(null);
                        });
                      }}
                    >
                      <IconMinus className="size-3 sm:size-4" />
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
                            setPendingId(null);
                            return;
                          }

                          setPendingId(null);
                        });
                      }}
                    >
                      <IconPlus className="size-3 sm:size-4" />
                    </Button>
                  </div>
                ) : (
                  <span className="font-semibold sm:text-base md:text-lg">
                    x{qty}
                  </span>
                )}
              </TableCell>
              <TableCell className="font-semibold sm:text-base md:text-lg">
                {toGBP(price)}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default CartTable;
