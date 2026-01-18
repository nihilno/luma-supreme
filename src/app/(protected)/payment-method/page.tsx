import Steps from "@/components/global/steps";
import PaymentForm from "@/components/payment/payment-form";
import { IconCreditCardPay } from "@tabler/icons-react";

export default function PaymentPage() {
  return (
    <section className="mt-8 pb-32">
      <Steps current={2} />
      <div className="mx-auto mt-8 max-w-4xl space-y-16">
        <div className="flex items-center gap-3">
          <IconCreditCardPay className="text-distinct size-12" />
          <div>
            <h2 className="text-3xl font-bold">Payment Method</h2>
            <p className="text-muted-foreground text-sm">
              Please select your prefered payment method.
            </p>
          </div>
        </div>
        <PaymentForm />
      </div>
    </section>
  );
}
