"use client";

import { Button } from "@/components/ui/button";
import { createOrder } from "@/lib/actions/order";
import { IconChevronRightPipe, IconLoader2 } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function CompleteOrder() {
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await createOrder();

      if (result.redirectTo) {
        push(result.redirectTo);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Button
        disabled={isLoading}
        type="submit"
        size="lg"
        className="hover:bg-distinct h-16 w-full text-xl transition hover:translate-x-5 hover:text-white"
      >
        <span>Place Order!</span>
        {isLoading ? (
          <IconLoader2 className="size-8 animate-spin" />
        ) : (
          <IconChevronRightPipe className="size-8" />
        )}
      </Button>
    </form>
  );
}

export default CompleteOrder;
