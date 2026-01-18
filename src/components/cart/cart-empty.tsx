"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  IconAlertOctagon,
  IconListSearch,
  IconRotate2,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function CartEmpty() {
  const { refresh } = useRouter();

  return (
    <Card className="mx-auto max-w-3xl">
      <CardHeader className="mb-4">
        <div className="flex items-center gap-2.5">
          <IconAlertOctagon className="size-10 md:size-12" />
          <h1 className="text-3xl font-semibold md:text-4xl">
            Your cart is empty.
          </h1>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Looks like you haven&apos;t added anything to your cart yet. This may
          happen when:
        </p>

        <ul className="text-muted-foreground list-disc space-y-1 pl-6">
          <li>You haven&apos;t selected any products</li>
          <li>Your previous cart session expired</li>
          <li>Items were removed or became unavailable</li>
        </ul>

        <p className="text-muted-foreground">
          Browse our catalog and add items to your cart to continue.
        </p>
      </CardContent>

      <CardFooter className="mt-8 space-x-3">
        <Button asChild size="lg">
          <Link href="/" className="flex items-center">
            <IconListSearch className="size-6 translate-y-px" />
            Start browsing
          </Link>
        </Button>

        <Button onClick={() => refresh()} size="lg" variant={"outline"}>
          <IconRotate2 className="size-6" />
          Refresh
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CartEmpty;
