import { auth } from "@/auth";
import CartTable from "@/components/cart/cart-table";
import CartTotal from "@/components/cart/cart-total";
import ItemEmpty from "@/components/global/empty";
import { getMyCart } from "@/lib/actions/cart";
import { IconShoppingCartSearch } from "@tabler/icons-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
};

export default async function CartPage() {
  const cart = await getMyCart();
  const cartNotExists = !cart || cart.items.length === 0;
  const session = await auth();

  if (cartNotExists)
    return (
      <section className="-mt-16 grid min-h-dvh place-items-center">
        <ItemEmpty
          title="Your cart is empty"
          subtitle="Looks like you haven't added anything to your cart yet."
        />
      </section>
    );

  const { items, itemsPrice, shippingPrice, taxPrice, totalPrice } = cart;
  const prices = {
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  };

  return (
    <section className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 pb-32 lg:grid-cols-[2.5fr_1fr]">
      <div className="flex items-center gap-3 lg:col-span-2">
        <IconShoppingCartSearch className="text-distinct size-12" />
        <div>
          <h2 className="text-3xl font-bold">Shopping Cart</h2>
          <p className="text-muted-foreground text-sm">
            Manage the items in your cart before checkout.
          </p>
        </div>
      </div>
      <CartTable items={items} />
      <CartTotal
        prices={prices}
        cartDontExist={cartNotExists}
        session={session}
      />
    </section>
  );
}
