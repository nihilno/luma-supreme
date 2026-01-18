import { auth } from "@/auth";
import Steps from "@/components/global/steps";
import PaymentForm from "@/components/payment/payment-form";
import { getMyCart } from "@/lib/actions/cart";
import { IconCreditCardPay } from "@tabler/icons-react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Select Payment Method",
};

export default async function PaymentPage() {
  const session = await auth();
  const userId = session?.user?.id;

  const cart = await getMyCart();
  if (!cart || cart.items.length === 0) redirect("/cart");
  if (!userId) throw new Error("No user ID.");

  return (
    <section className="mt-8 pb-32">
      <Steps current={2} />
      <div className="mx-auto mt-8 max-w-4xl space-y-16">
        <div className="flex items-center gap-3">
          <IconCreditCardPay className="text-distinct size-12" />
          <div>
            <h2 className="text-3xl font-bold">Payment Method</h2>
            <p className="text-muted-foreground text-sm">
              Please select your preferred payment method.
            </p>
          </div>
        </div>
        <PaymentForm />
      </div>
    </section>
  );
}
