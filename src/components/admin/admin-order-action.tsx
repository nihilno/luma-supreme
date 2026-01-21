"use client";

import { Button } from "@/components/ui/button";
import { IconCashMoveBack, IconChecklist } from "@tabler/icons-react";
import { useTransition } from "react";

function AdminOrderActions({
  isAdmin,
  isPaid,
  isDelivered,
  id,
}: AdminActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {isAdmin && !isPaid && <MarkAsPaidBtn />}
      {isAdmin && isPaid && !isDelivered && <MarkAsDeliveredBtn />}
    </div>
  );
}

function MarkAsPaidBtn() {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      className="flex items-center gap-1"
      type="button"
      disabled={isPending}
      onClick={() => startTransition(async () => {})}
    >
      <IconCashMoveBack className="size-5" /> <span>Mark as Paid</span>
    </Button>
  );
}

function MarkAsDeliveredBtn() {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      className="flex items-center gap-1"
      type="button"
      disabled={isPending}
      onClick={() => startTransition(async () => {})}
    >
      <IconChecklist className="size-5" /> <span>Mark as Delivered</span>
    </Button>
  );
}

export default AdminOrderActions;
