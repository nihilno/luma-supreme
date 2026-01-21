import { auth } from "@/auth";
import CartSummary from "@/components/cart/cart-summary";
import Steps from "@/components/global/steps";
import AddressEdit from "@/components/orders/place-order/address-edit";
import CompleteOrder from "@/components/orders/place-order/complete-order";
import OrderItems from "@/components/orders/place-order/order-items";
import PaymentEdit from "@/components/orders/place-order/payment-edit";
import { Card, CardContent } from "@/components/ui/card";
import { getMyCart } from "@/lib/actions/cart";
import { getUserById } from "@/lib/data/user";
import { shippingType } from "@/lib/schemas/shipping-address";
import { IconCashEdit, IconTruckDelivery } from "@tabler/icons-react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Check your Order Details",
};

export default async function PlaceOrderPage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("No user ID.");

  const cart = await getMyCart();
  const user = await getUserById(userId);

  if (!cart || cart.items.length === 0) redirect("/cart");
  if (!user.address) redirect("/shipping-address");
  if (!user.paymentMethod) redirect("/payment-method");

  const address = user.address as shippingType;

  const prices = {
    itemsPrice: cart.itemsPrice,
    shippingPrice: cart.shippingPrice,
    taxPrice: cart.taxPrice,
    totalPrice: cart.totalPrice,
  };

  return (
    <section className="mt-8 pb-32">
      <Steps current={3} />
      <div className="space-y-16">
        <div className="flex items-center gap-3">
          <IconTruckDelivery className="text-distinct size-12" />
          <div>
            <h2 className="text-3xl font-bold">Place Order</h2>
            <p className="text-muted-foreground text-sm">
              Last chance to make sure everything is in order!
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <AddressEdit address={address} />
          </div>
          <div className="h-full lg:col-span-2">
            <PaymentEdit paymentMethod={user.paymentMethod} />
          </div>
          <div className="lg:col-span-3">
            <OrderItems items={cart.items} />
          </div>
          <div className="flex flex-col gap-4 lg:col-span-1">
            <Card className="relative h-full overflow-hidden">
              <CardContent>
                <CartSummary prices={prices} compact={true} />
              </CardContent>
              <IconCashEdit className="absolute right-0 bottom-0 size-72 overflow-hidden opacity-4 lg:size-32" />
            </Card>
            <div className="flex flex-1 flex-col justify-center">
              <CompleteOrder />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
