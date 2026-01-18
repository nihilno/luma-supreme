import { auth } from "@/auth";
import CartEmpty from "@/components/cart/cart-empty";
import CartTable from "@/components/cart/cart-table";
import CartTotal from "@/components/cart/cart-total";
import { getMyCart } from "@/lib/actions/cart";
import { IconShoppingCartSearch } from "@tabler/icons-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
};

export default async function CartPage() {
  const cart = await getMyCart();
  const cartDontExist = !cart || cart.items.length === 0;
  const session = await auth();

  if (cartDontExist)
    return (
      <div className="-mt-32 grid h-screen place-items-center">
        <CartEmpty />
      </div>
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
        <IconShoppingCartSearch className="text-distinct size-10" />
        <h2 className="text-3xl font-bold">Shopping Cart</h2>
      </div>
      <CartTable items={items} />
      <CartTotal
        prices={prices}
        cartDontExist={cartDontExist}
        session={session}
      />
    </section>
  );
}
