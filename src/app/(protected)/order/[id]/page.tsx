import { auth } from "@/auth";
import AdminOrderActions from "@/components/admin/admin-order-action";
import CartSummary from "@/components/cart/cart-summary";
import Paypal from "@/components/orders/payment/paypal";
import StripePayment from "@/components/orders/payment/stripe";
import AddressEdit from "@/components/orders/place-order/address-edit";
import OrderItems from "@/components/orders/place-order/order-items";
import PaymentEdit from "@/components/orders/place-order/payment-edit";
import { Card, CardContent } from "@/components/ui/card";
import { getOrderById } from "@/lib/data/orders";
import { shippingType } from "@/lib/schemas/shipping-address";
import { decimalToNumber, formatId } from "@/lib/utils";
import { IconCashEdit, IconGridScan } from "@tabler/icons-react";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Stripe from "stripe";

export const metadata: Metadata = {
  title: "Order Details",
};

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId || !session)
    throw new Error("You must be logged in to browse orders.");

  const order = await getOrderById(id);
  if (!order) notFound();
  if (order.userId !== userId && session.user.role !== "ADMIN") redirect("/");

  const {
    shippingAddress,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    isPaid,
    isDelivered,
    deliveredAt,
    paymentMethod,
    paidAt,
    orderItems,
    id: orderId,
  } = order;

  console.log(paymentMethod);

  const address = shippingAddress as shippingType;
  const prices = {
    itemsPrice: decimalToNumber(itemsPrice),
    shippingPrice: decimalToNumber(shippingPrice),
    taxPrice: decimalToNumber(taxPrice),
    totalPrice: decimalToNumber(totalPrice),
  };

  const isAdmin = session?.user?.role === "ADMIN";
  const priceInCents = Math.round(Number(totalPrice) * 100);

  // Stripe

  let clientSecret: string | null = null;
  if (order.paymentMethod === "Stripe" && !order.isPaid) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: priceInCents,
      currency: "gbp",
      metadata: { order_id: orderId },
    });
    clientSecret = paymentIntent.client_secret;
  }

  return (
    <section className="mt-16 pb-32">
      <div className="space-y-16">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <IconGridScan className="text-distinct size-12" />
            <div>
              <h2 className="text-3xl font-bold">
                Order <span className="text-distinct">{formatId(orderId)}</span>
              </h2>
              <p className="text-muted-foreground text-sm">
                You can inspect details of your order.
              </p>
            </div>
          </div>
          {isAdmin && (
            <AdminOrderActions
              isAdmin={isAdmin}
              isPaid={isPaid}
              isDelivered={isDelivered}
              id={orderId}
            />
          )}
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <AddressEdit
              address={address}
              isDelivered={isDelivered}
              deliveredAt={deliveredAt}
              readOnly={true}
            />
          </div>
          <div className="h-full lg:col-span-2">
            <PaymentEdit
              paymentMethod={paymentMethod}
              isPaid={isPaid}
              paidAt={paidAt}
              readOnly={true}
            />
          </div>
          <div className="lg:col-span-3">
            <OrderItems items={orderItems} />
          </div>
          <div className="flex flex-col gap-4 lg:col-span-1">
            <Card className="relative h-full overflow-hidden">
              <CardContent>
                <CartSummary prices={prices} compact={true} />
                {!order.isPaid && order.paymentMethod === "Stripe" && (
                  <StripePayment
                    priceInCents={priceInCents}
                    orderId={orderId}
                    clientSecret={clientSecret!}
                  />
                )}
              </CardContent>
              <IconCashEdit className="absolute right-0 bottom-0 size-72 overflow-hidden opacity-4 lg:size-32" />
            </Card>

            {!order.isPaid && order.paymentMethod === "PayPal" && (
              <div className="flex-1">
                <Paypal totalPrice={totalPrice} orderId={orderId} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
