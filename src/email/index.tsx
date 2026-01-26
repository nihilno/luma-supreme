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
  await resend.emails.send({
    from: `${APP_NAME} <${process.env.SENDER_EMAIL}>`,
    to: order.user.email,
    subject: `Your receipt from ${APP_NAME}`,
    react: <PurchaseReceipt order={order} />,
  });
}
