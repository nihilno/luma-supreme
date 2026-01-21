import { auth } from "@/auth";
import AdminOrderActions from "@/components/admin/admin-order-action";
import CartSummary from "@/components/cart/cart-summary";
import Paypal from "@/components/orders/payment/paypal";
import AddressEdit from "@/components/orders/place-order/address-edit";
import OrderItems from "@/components/orders/place-order/order-items";
import PaymentEdit from "@/components/orders/place-order/payment-edit";
import { Card, CardContent } from "@/components/ui/card";
import { getOrderById } from "@/lib/data/getOrderById";
import { shippingType } from "@/lib/schemas/shipping-address";
import { decimalToNumber, formatId } from "@/lib/utils";
import { IconCashEdit, IconGridScan } from "@tabler/icons-react";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

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

  const address = order.shippingAddress as shippingType;
  const prices = {
    itemsPrice: decimalToNumber(order.itemsPrice),
    shippingPrice: decimalToNumber(order.shippingPrice),
    taxPrice: decimalToNumber(order.taxPrice),
    totalPrice: decimalToNumber(order.totalPrice),
  };

  return (
    <section className="mt-16 pb-32">
      <div className="space-y-16">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <IconGridScan className="text-distinct size-12" />
            <div>
              <h2 className="text-3xl font-bold">
                Order <span className="text-distinct">{formatId(id)}</span>
              </h2>
              <p className="text-muted-foreground text-sm">
                You can inspect details of your order.
              </p>
            </div>
          </div>
          {session.user.role === "ADMIN" && <AdminOrderActions />}
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <AddressEdit
              address={address}
              isDelivered={order.isDelivered}
              deliveredAt={order.deliveredAt}
              readOnly={true}
            />
          </div>
          <div className="h-full lg:col-span-2">
            <PaymentEdit
              paymentMethod={order.paymentMethod}
              isPaid={order.isPaid}
              paidAt={order.paidAt}
              readOnly={true}
            />
          </div>
          <div className="lg:col-span-3">
            <OrderItems items={order.orderItems} />
          </div>
          <div className="flex flex-col gap-4 lg:col-span-1">
            <Card className="relative h-full overflow-hidden">
              <CardContent>
                <CartSummary prices={prices} compact={true} />
              </CardContent>
              <IconCashEdit className="absolute right-0 bottom-0 size-72 overflow-hidden opacity-4 lg:size-32" />
            </Card>
            {!order.isPaid && order.paymentMethod === "PayPal" && (
              <div className="flex-1">
                <Paypal totalPrice={order.totalPrice} orderId={order.id} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
