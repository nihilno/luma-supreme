import { markAsPaid } from "@/lib/actions/order";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const event = await Stripe.webhooks.constructEvent(
    await request.text(),
    request.headers.get("Stripe-Signature") as string,
    process.env.STRIPE_WEBHOOK_SECRET as string,
  );

  if (event.type === "charge.succeeded") {
    const { object } = event.data;
    await markAsPaid(object.metadata.order_id);
    return NextResponse.json({ message: "markAsPaid was successfull" });
  }
  return NextResponse.json({ message: "event is not charge.succeeded" });
}
