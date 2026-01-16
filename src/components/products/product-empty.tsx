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
  IconChevronsLeft,
  IconRotate2,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function ProductEmpty() {
  const { refresh } = useRouter();

  return (
    <Card className="mx-auto max-w-3xl">
      <CardHeader className="mb-4">
        <div className="flex items-center gap-2.5">
          <IconAlertOctagon className="size-8 md:size-10" />
          <h1 className="text-2xl font-semibold md:text-3xl">
            Product not found.
          </h1>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          We couldn&apos;t find a product matching your request. This may happen
          when:
        </p>

        <ul className="text-muted-foreground list-disc space-y-1 pl-6">
          <li>Incorrect spelling or typos</li>
          <li>Filters excluding available items</li>
          <li>The product was removed or discontinued</li>
        </ul>

        <p className="text-muted-foreground">
          Try adjusting your search or explore similar items below.
        </p>
      </CardContent>

      <CardFooter className="mt-8 space-x-2">
        <Button asChild>
          <Link href="/" className="flex items-center">
            <IconChevronsLeft className="translate-y-px" /> Back to Luma
          </Link>
        </Button>
        <Button onClick={() => refresh()}>
          <IconRotate2 />
          Refresh
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductEmpty;
