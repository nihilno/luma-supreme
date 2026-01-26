import { markOrderPaidInternal } from "@/lib/actions/order";
import { getOrderById } from "@/lib/data/orders";
import { serverStripe } from "@/lib/stripe";
import { decimalToNumber } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = serverStripe;

export async function POST(request: NextRequest) {
  const signature = request.headers.get("Stripe-Signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe-Signature header" },
      { status: 400 },
    );
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("Missing STRIPE_WEBHOOK_SECRET");
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 },
    );
  }

  let event: Stripe.Event;
  try {
    const buf = await request.arrayBuffer();
    const rawBody = Buffer.from(buf);
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    if (event.type === "charge.succeeded") {
      const charge = event.data.object as Stripe.Charge;
      const orderId = (charge.metadata as any)?.order_id as string | undefined;

      if (!orderId) {
        console.warn("webhook missing order_id metadata", event.id);
        return NextResponse.json(
          { message: "no order_id metadata" },
          { status: 200 },
        );
      }

      const order = await getOrderById(orderId);
      if (!order) {
        console.warn("No matching order for webhook order_id", orderId);
        return NextResponse.json(
          { message: "order not found" },
          { status: 200 },
        );
      }

      if (order.isPaid) {
        return NextResponse.json(
          { message: "order already paid" },
          { status: 200 },
        );
      }

      const amount = charge.amount;
      const currency = charge.currency;
      const expectedAmount = Math.round(
        decimalToNumber(order.totalPrice) * 100,
      );

      if (typeof amount === "number" && amount !== expectedAmount) {
        console.warn("Payment amount mismatch", {
          orderId,
          expectedAmount,
          amount,
        });
        return NextResponse.json(
          { message: "amount mismatch" },
          { status: 200 },
        );
      }

      const paymentInfo = {
        chargeId: charge.id,
        amount: amount ?? expectedAmount,
        currency: currency ?? undefined,
      } as const;

      const result = await markOrderPaidInternal(orderId, paymentInfo as any);
      if (result?.success) {
        return NextResponse.json(
          { message: "Order marked as paid via webhook" },
          { status: 200 },
        );
      }

      console.error("Failed to mark order paid", { orderId });
      return NextResponse.json(
        { error: "Failed to mark order paid" },
        { status: 500 },
      );
    }
  } catch (err) {
    console.error("Error processing webhook event:", err);
    return NextResponse.json(
      { error: "Internal error processing payment" },
      { status: 500 },
    );
  }

  return NextResponse.json({ message: "event ignored" }, { status: 200 });
}
