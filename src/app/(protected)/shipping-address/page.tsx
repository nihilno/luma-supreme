import { auth } from "@/auth";
import Steps from "@/components/global/steps";
import ShippingForm from "@/components/shipping/shipping-form";
import { getMyCart } from "@/lib/actions/cart";
import { getUserById } from "@/lib/data/getUserById";
import { IconMapPins } from "@tabler/icons-react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Shipping Address",
};
export default async function ShippingAddressPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!session) redirect("/sign-in");

  const cart = await getMyCart();
  if (!cart || cart.items.length === 0) redirect("/");

  if (!userId) throw new Error("No user ID.");
  const user = await getUserById(userId);

  return (
    <section className="mt-8 space-y-16 pb-32">
      <Steps current={1} />
      <div className="mt-12 flex items-center gap-3">
        <IconMapPins className="text-distinct size-12" />
        <div>
          <h2 className="text-3xl font-bold">Shipping Address</h2>
          <p className="text-muted-foreground text-sm">
            Please enter an address to ship to.
          </p>
        </div>
      </div>
      <ShippingForm address={user.address} />
    </section>
  );
}
