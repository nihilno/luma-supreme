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
  IconListSearch,
  IconRotate2,
  IconZoomOutArea,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function ItemEmpty({ title, subtitle }: { title: string; subtitle: string }) {
  const { refresh } = useRouter();

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon" className="size-14">
          <IconZoomOutArea className="size-12 opacity-75" />
        </EmptyMedia>
        <EmptyTitle className="mb-2 text-2xl">{title}</EmptyTitle>
        <EmptyDescription className="text-base">{subtitle}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex items-center gap-3">
          <Button asChild>
            <Link href="/search" className="flex items-center">
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

export default ItemEmpty;
