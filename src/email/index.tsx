import { APP_NAME } from "@/lib/constants/consts";
import { orderType } from "@/lib/schemas/order";
import { Resend } from "resend";
import PurchaseReceipt from "./purchase-receipt";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendPurchaseReceiptEmail({
  order,
}: {
  order: orderType;
}) {
  const result = await resend.emails.send({
    from: "Luma <onboarding@resend.dev>",
    to: "maciej.polowy1@gmail.com",
    subject: `Your receipt from ${APP_NAME}`,
    react: <PurchaseReceipt order={order} />,
  });

  if (result.error) {
    console.error("Resend:", result.error.message);
    throw new Error(`Resend: ${result.error.message}`);
  }

  console.log("Resend email send.");
}
