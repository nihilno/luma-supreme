import { Badge } from "@/components/ui/badge";
import { IconCircleCheck } from "@tabler/icons-react";

function Badges() {
  return (
    <div className="flex flex-col gap-2">
      <Badge className="h-6 border-0">
        <IconCircleCheck className="size-5" /> SSL encryption
      </Badge>
      <Badge className="h-6 border-0">
        <IconCircleCheck className="size-5" /> PCI‑DSS compliance
      </Badge>
      <Badge className="h-6 border-0">
        <IconCircleCheck className="size-5" /> Secure payment processing
      </Badge>
    </div>
  );
}

export default Badges;
