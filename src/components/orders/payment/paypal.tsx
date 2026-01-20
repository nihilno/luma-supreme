"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { payForOrder } from "@/lib/actions/order";
import { toGBP } from "@/lib/utils";
import {
  IconBuildingBank,
  IconCircleDashedCheck,
  IconLoader2,
} from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "sonner";

function Paypal({ totalPrice, orderId }: PayPalProps) {
  return (
    <div className="space-y-3 text-center">
      <PaymentDialog totalPrice={totalPrice} orderId={orderId} />
      <Button type="button" size="lg" className="h-16 w-full border-0 text-lg">
        <IconBuildingBank className="size-6.5" />
        Debit / Credit Card
      </Button>
      <p className="mt-4 text-sm">Demo Payment Version</p>
    </div>
  );
}

export default Paypal;

function PaymentDialog({ totalPrice, orderId }: PayPalProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    try {
      const result = await payForOrder(orderId);
      if (!result.success) {
        toast.error(result.message);
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
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          size="lg"
          className="h-16 w-full border-0 bg-amber-300 text-xl font-bold text-sky-600 transition hover:bg-amber-400"
        >
          PayPal
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">
              PayPal Payment
            </DialogTitle>
            <DialogDescription className="text-center text-base">
              Complete your PayPal payment here.
            </DialogDescription>
          </DialogHeader>
          <div className="my-6 flex flex-col items-center space-y-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-card text-distinct group hover:bg-distinct grid size-40 place-items-center rounded-xl transition hover:text-white"
              title="Mark as Complete!"
            >
              {isLoading ? (
                <IconLoader2 className="size-32 animate-spin" />
              ) : (
                <IconCircleDashedCheck className="size-28 transition-all duration-200 ease-in-out group-hover:size-36" />
              )}
            </Button>

            <h2 className="text-lg font-bold">
              Total Price:{" "}
              <span className="text-distinct">{toGBP(totalPrice)}</span>
            </h2>
          </div>
          <DialogFooter className="w-full border-t border-dashed py-4">
            <span className="mx-auto text-sm">Demo Payment Version</span>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
