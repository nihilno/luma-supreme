import { cn, toGBP } from "@/lib/utils";
import CartHover from "./cart-hover";

function CartSummary({ prices, compact = false }: CartSummaryProps) {
  const { taxPrice, shippingPrice, totalPrice, itemsPrice } = prices;

  return (
    <div className="mb-6 border-b border-dashed">
      <div className="flex items-center justify-between py-3">
        <h3
          className={cn(
            "text-distinct font-bold",
            compact ? "sm:text-base" : "sm:text-lg",
          )}
        >
          Subtotal
        </h3>
        <span
          className={cn(
            "font-semibold",
            compact ? "sm:text-base" : "sm:text-lg",
          )}
        >
          {toGBP(itemsPrice)}
        </span>
      </div>
      <div className="flex justify-between py-3">
        <div className="flex items-center gap-1">
          <h3
            className={cn(
              "text-distinct font-bold",
              compact ? "sm:text-base" : "sm:text-lg",
            )}
          >
            Shipping
          </h3>
          {!compact && <CartHover />}
        </div>
        <span
          className={cn(
            "font-semibold",
            compact ? "sm:text-base" : "sm:text-lg",
          )}
        >
          {shippingPrice === 0 ? "Free!" : toGBP(shippingPrice)}
        </span>
      </div>
      <div className="flex items-center justify-between py-3">
        <h3
          className={cn(
            "text-distinct font-bold",
            compact ? "sm:text-base" : "sm:text-lg",
          )}
        >
          Tax
        </h3>
        <span
          className={cn(
            "font-semibold",
            compact ? "sm:text-base" : "sm:text-lg",
          )}
        >
          {toGBP(taxPrice)}
        </span>
      </div>
      <div className="flex items-center justify-between py-3">
        <h3
          className={cn(
            "text-distinct font-bold",
            compact ? "sm:text-base" : "sm:text-lg",
          )}
        >
          Total
        </h3>
        <span
          className={cn(
            "font-semibold",
            compact ? "sm:text-base" : "sm:text-lg",
          )}
        >
          {toGBP(totalPrice)}
        </span>
      </div>
    </div>
  );
}

export default CartSummary;
