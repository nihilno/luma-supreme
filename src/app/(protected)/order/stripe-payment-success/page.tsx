import { Button } from "@/components/ui/button";
import { getOrderById } from "@/lib/data/orders";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import Stripe from "stripe";

export default async function StripeSuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ payment_intent: string }>;
}) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const { id } = await params;
  const { payment_intent } = await searchParams;
  if (!payment_intent) notFound();

  const order = await getOrderById(id);
  if (!order) notFound();

  let paymentIntent: Stripe.PaymentIntent;
  try {
    paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);
  } catch {
    notFound();
  }

  if (paymentIntent.metadata.order_id !== order.id) notFound();
  const isSuccess = paymentIntent.status === "succeeded";
  if (!isSuccess) redirect(`/order/${order.id}`);

  return (
    <section className="grid min-h-dvh place-items-center text-center">
      <div className="-mt-32 max-w-sm space-y-4">
        <h1 className="text-lg font-bold">Thanks for your order!</h1>
        <p>
          Your payment was successful. <br /> Your order ID is {order.id}.
        </p>
        <p>
          We are processing your order and will notify you once it is ready for
          shipment.
        </p>
        <Button asChild>
          <Link href={`/order/${order.id}`}>View Order</Link>
        </Button>
      </div>
    </section>
  );
}
