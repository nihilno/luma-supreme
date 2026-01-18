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
        <button
          type="button"
          aria-label="Delivery pricing information"
          className="inline-flex items-center justify-center"
        >
          <IconHelpHexagon className="size-6 sm:size-7" />
        </button>
      </HoverCardTrigger>{" "}
      <HoverCardContent className="text-sm">
        <strong>Free delivery</strong> on orders up to <strong>$100</strong>,
        and only <strong>$10</strong> for anything beyond!
      </HoverCardContent>
    </HoverCard>
  );
}

export default CartHover;
