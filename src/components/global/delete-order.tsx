"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { removeOrder } from "@/lib/actions/order";
import { IconLoader2, IconSquareMinus } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "sonner";

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
      toast.error("Internal error occurred. Try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" title="Delete this order.">
          <IconSquareMinus className="text-destructive size-5.5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            order and remove it&apos;s data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button
            variant={"destructive"}
            onClick={onDelete}
            disabled={isLoading}
            className="w-20"
          >
            {isLoading ? (
              <IconLoader2 className="size-4 animate-spin" />
            ) : (
              <span>Delete</span>
            )}
          </Button>
          <DialogClose asChild>
            <Button className="w-20">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteOrder;
