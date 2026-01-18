import CartTable from "@/components/cart/cart-table";
import { getMyCart } from "@/lib/actions/cart";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
};

export default async function CartPage() {
  const cart = await getMyCart();

  return (
    <section className="mt-16">
      <CartTable cart={cart} />
    </section>
  );
}
