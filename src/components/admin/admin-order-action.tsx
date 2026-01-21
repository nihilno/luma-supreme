"use client";

import { Button } from "@/components/ui/button";
import { markAsDelivered, markAsPaid } from "@/lib/actions/order";
import { IconCashMoveBack, IconChecklist } from "@tabler/icons-react";
import { useTransition } from "react";
import { toast } from "sonner";

function AdminOrderActions({
  isAdmin,
  isPaid,
  isDelivered,
  id,
}: AdminActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {isAdmin && !isPaid && <MarkAsPaidBtn id={id} />}
      {isAdmin && isPaid && !isDelivered && <MarkAsDeliveredBtn id={id} />}
    </div>
  );
}

function MarkAsPaidBtn({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      className="flex items-center gap-1"
      type="button"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          const result = await markAsPaid(id);
          if (!result.success) {
            toast.warning(result.message);
            return;
          }

          toast.success(result.message);
        })
      }
    >
      <IconCashMoveBack className="size-5" /> <span>Mark as Paid</span>
    </Button>
  );
}

function MarkAsDeliveredBtn({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      className="flex items-center gap-1"
      type="button"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          const result = await markAsDelivered(id);
          if (!result.success) {
            toast.warning(result.message);
            return;
          }

          toast.success(result.message);
        })
      }
    >
      <IconChecklist className="size-5" /> <span>Mark as Delivered</span>
    </Button>
  );
}

export default AdminOrderActions;
