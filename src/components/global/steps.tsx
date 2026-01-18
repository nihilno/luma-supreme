import { checkoutSteps } from "@/lib/constants/navigations";
import { cn } from "@/lib/utils";
import { IconChevronsRight } from "@tabler/icons-react";
import React from "react";

function Steps({ current = 0 }: { current: number }) {
  return (
    <div className="mb-10 hidden w-full items-center justify-between gap-2 md:flex md:flex-row">
      {checkoutSteps.map((step, index) => (
        <React.Fragment key={step}>
          <div
            className={cn(
              "border-muted-foreground/50 rounded-full border border-dashed px-8 py-2 text-center text-sm",
              index === current &&
                "bg-distinct animate-pulse border-0 text-white",
            )}
          >
            <span className="font-semibold">{step}</span>
          </div>
          {step !== "Place Order" && (
            <div>
              <IconChevronsRight className="text-muted-foreground animate-pulse" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default Steps;
