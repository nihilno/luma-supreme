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
import { removeProduct } from "@/lib/actions/products";
import { IconLoader2, IconSquareMinus } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "sonner";

function DeleteProduct({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(false);

  async function onDelete() {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const result = await removeProduct(id);
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
        <Button variant="ghost" size="icon" title="Delete this item.">
          <IconSquareMinus className="text-destructive size-5.5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this item
            and remove its data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
          <Button
            variant={"destructive"}
            onClick={onDelete}
            disabled={isLoading}
          >
            {isLoading ? (
              <IconLoader2 className="size-4 animate-spin" />
            ) : (
              <span>Delete</span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteProduct;
