"use client";

import { Button } from "@/components/ui/button";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Pagination({
  totalPages,
  page,
}: {
  totalPages: number;
  page: number | string;
}) {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const pathname = usePathname();

  function handlePageChange(action: "prev" | "next") {
    const pageValue = action === "next" ? Number(page) + 1 : Number(page) - 1;
    if (
      (action === "prev" && Number(page) <= 1) ||
      (action === "next" && Number(page) >= totalPages)
    )
      return;

    const newPage = new URLSearchParams(searchParams);
    newPage.set("page", pageValue.toString());

    push(`${pathname}?${newPage}`);
  }

  return (
    <div className="space-x-6">
      <Button
        disabled={Number(page) <= 1}
        size="icon"
        variant="outline"
        onClick={() => handlePageChange("prev")}
      >
        <IconChevronLeft />
      </Button>
      <span className="text-distinct text-xl font-bold">{page}</span>
      <Button
        disabled={Number(page) >= totalPages}
        size="icon"
        variant="outline"
        onClick={() => handlePageChange("next")}
      >
        <IconChevronRight />
      </Button>
    </div>
  );
}

export default Pagination;
