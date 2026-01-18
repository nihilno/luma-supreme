"use client";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  IconArrowUpRight,
  IconBasketCancel,
  IconListSearch,
  IconRotate2,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function CartEmpty() {
  const { refresh } = useRouter();

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon" className="size-14">
          <IconBasketCancel className="size-12 opacity-75" />
        </EmptyMedia>
        <EmptyTitle className="mb-2 text-2xl">Your cart is empty</EmptyTitle>
        <EmptyDescription className="text-base">
          Looks like you haven&apos;t added anything to your cart yet.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex items-center gap-3">
          <Button asChild>
            <Link href="/" className="flex items-center">
              <IconListSearch className="size-6 translate-y-px" />
              Start browsing
            </Link>
          </Button>
          <Button onClick={() => refresh()} variant={"outline"}>
            <IconRotate2 className="size-6" />
            Refresh
          </Button>
        </div>
      </EmptyContent>
      <Button
        variant="link"
        asChild
        className="text-muted-foreground"
        size="sm"
      >
        <span className="cursor-pointer">
          Learn More <IconArrowUpRight />
        </span>
      </Button>
    </Empty>
  );
}

export default CartEmpty;
