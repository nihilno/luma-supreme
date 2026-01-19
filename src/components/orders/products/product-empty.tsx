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
  IconChevronsLeft,
  IconRotate2,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function ProductEmpty() {
  const { refresh } = useRouter();

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon" className="size-14">
          <IconBasketCancel className="size-12 opacity-75" />
        </EmptyMedia>
        <EmptyTitle className="mb-2 text-2xl">Product/s not found</EmptyTitle>
        <EmptyDescription className="text-base">
          We couldn&apos;t find any products. You may want to update your
          filters.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex items-center gap-3">
          <Button asChild>
            <Link href="/" className="flex items-center">
              <IconChevronsLeft className="size-6 translate-y-px" /> Back to
              Luma
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

export default ProductEmpty;
