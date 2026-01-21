"use client";

import { Button } from "@/components/ui/button";
import { IconCashMoveBack, IconChecklist } from "@tabler/icons-react";

function AdminOrderActions() {
  return (
    <div className="flex items-center gap-2">
      <Button className="flex items-center gap-1">
        <IconCashMoveBack className="size-5" /> <span>Mark as Paid</span>
      </Button>
      <Button className="flex items-center gap-1">
        <IconChecklist className="size-5" /> <span>Mark as Delivered</span>
      </Button>
    </div>
  );
}

export default AdminOrderActions;
