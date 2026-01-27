import {
  IconHeadphones,
  IconMoneybagPlus,
  IconPremiumRights,
  IconShoppingBag,
} from "@tabler/icons-react";

const cardStyle =
  "border-muted-foreground/30 flex min-h-40 flex-col items-baseline gap-2 rounded-xl border p-4 text-left hover:bg-foreground/10 cursor-default transition hover:-translate-y-2 shadow-md";

function IconBoxes() {
  return (
    <div className="mt-auto grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
      <div className={cardStyle}>
        <IconShoppingBag className="text-distinct size-6" />
        <h2 className="text-xl font-semibold">Free shipping</h2>
        <p className="text-muted-foreground">
          Free shipping on orders above £100
        </p>
      </div>
      <div className={cardStyle}>
        <IconPremiumRights className="text-distinct size-6" />
        <h2 className="text-xl font-semibold">Money back guarantee</h2>
        <p className="text-muted-foreground">
          Within 30 days of receiving your order
        </p>
      </div>
      <div className={cardStyle}>
        <IconMoneybagPlus className="text-distinct size-6" />
        <h2 className="text-xl font-semibold">Flexible Payment</h2>
        <p className="text-muted-foreground">
          Pay with credit card, PayPal or COD.
        </p>
      </div>
      <div className={cardStyle}>
        <IconHeadphones className="text-distinct size-6" />
        <h2 className="text-xl font-semibold">24/7 Support</h2>
        <p className="text-muted-foreground">We are here to help you anytime</p>
      </div>
    </div>
  );
}

export default IconBoxes;
