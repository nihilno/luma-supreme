"use client";

import { removeOrder } from "@/lib/actions/order";
import { IconSquareMinus } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

function DeleteOrder({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(false);

  async function onDelete() {
    setIsLoading(true);
    if (isLoading) return;

    try {
      const result = await removeOrder(id);
      if (!result.success) {
        toast.warning(result.message);
        setIsLoading(false);
        return;
      }

      toast.success(result.message);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      onClick={onDelete}
      variant="ghost"
      size="icon"
      title="Delete this order."
    >
      <IconSquareMinus className="text-destructive size-5.5" />
    </Button>
  );
}

export default DeleteOrder;
