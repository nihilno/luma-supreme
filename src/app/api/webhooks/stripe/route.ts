import { markOrderPaidInternal } from "@/lib/actions/order";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const signature = request.headers.get("Stripe-Signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Missing signature or webhook secret" },
      { status: 400 },
    );
  }

  let event: Stripe.Event;
  try {
    event = Stripe.webhooks.constructEvent(
      await request.text(),
      signature,
      webhookSecret,
    );
  } catch (error) {
    console.error("Error constructing Stripe event:", error);
    return NextResponse.json(
      { error: "Invalid Stripe webhook signature" },
      { status: 400 },
    );
  }

  if (event.type === "charge.succeeded") {
    const { object } = event.data;

    if (!object.metadata?.order_id) {
      return NextResponse.json(
        { error: "Missing order_id in metadata" },
        { status: 400 },
      );
    }

    try {
      await markOrderPaidInternal(object.metadata.order_id);
      return NextResponse.json({
        message: "markOrderPaidInternal was successful",
      });
    } catch (error) {
      console.error("Error marking order as paid:", error);
      return NextResponse.json(
        { error: "Failed to mark order as paid" },
        { status: 500 },
      );
    }
  }
  return NextResponse.json({ message: "event is not charge.succeeded" });
}
