"use client";

import { Button } from "@/components/ui/button";
import { IconHome } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const { push } = useRouter();

  return (
    <section className="-mt-16 grid min-h-dvh place-items-center">
      <div className="space-y-4 text-center">
        <h1 className="text-2xl font-bold">Unauthorized</h1>
        <p>You do not have permission to view this page.</p>
        <Button onClick={() => push("/")}>
          <IconHome /> Go Home
        </Button>
      </div>
    </section>
  );
}
