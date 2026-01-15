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
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2.5">
          <IconAlertOctagon className="size-8" />
          <h1 className="text-2xl font-semibold">Product/s not found.</h1>
        </div>
      </CardHeader>
      <CardContent>
        <p>
          The item you&apos;re looking for doesn&apos;t exist or is no longer
          available. You may want to adjust your filters or refine your search
          to find what you need.
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
