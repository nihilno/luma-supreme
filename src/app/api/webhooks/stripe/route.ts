import { markOrderPaidInternal } from "@/lib/actions/order";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("Stripe-Signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe-Signature header" },
      { status: 400 },
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "charge.succeeded") {
    const charge = event.data.object as Stripe.Charge;
    const orderId = (charge.metadata as any)?.order_id as string | undefined;
    if (!orderId) {
      console.warn(
        "charge.succeeded webhook missing order_id metadata",
        charge.id,
      );
      return NextResponse.json(
        { message: "no order_id metadata" },
        { status: 200 },
      );
    }

    const paymentInfo = {
      chargeId: charge.id,
      amount: charge.amount,
      currency: charge.currency,
    };
    const result = await markOrderPaidInternal(orderId, paymentInfo);

    if (result?.success) {
      return NextResponse.json({ message: "Order marked as paid via webhook" });
    }

    return NextResponse.json(
      { error: "Failed to mark order paid" },
      { status: 500 },
    );
  }

  return NextResponse.json({ message: "event is not charge.succeeded" });
}
