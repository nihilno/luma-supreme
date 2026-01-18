import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { IconHelpHexagon } from "@tabler/icons-react";

function CartHover() {
  return (
    <HoverCard openDelay={300}>
      <HoverCardTrigger>
        <IconHelpHexagon className="size-6 cursor-pointer sm:size-7" />
      </HoverCardTrigger>
      <HoverCardContent className="text-sm">
        <strong>Free delivery</strong> on orders up to <strong>$100</strong>,
        and only <strong>$10</strong> for anything beyond!
      </HoverCardContent>
    </HoverCard>
  );
}

export default CartHover;
