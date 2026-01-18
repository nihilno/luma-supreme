import EditButton from "@/components/buttons/edit";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { IconCreditCardPay } from "@tabler/icons-react";

function PaymentEdit({ paymentMethod }: { paymentMethod: string }) {
  return (
    <Card className="relative h-full overflow-hidden">
      <CardHeader className="text-xl font-bold">Payment Method</CardHeader>
      <CardContent>
        <p>{paymentMethod}</p>
      </CardContent>
      <CardFooter className="mt-auto">
        <EditButton href="/payment-method" />
      </CardFooter>
      <IconCreditCardPay className="absolute right-0 bottom-0 size-72 rotate-45 overflow-hidden opacity-4" />
    </Card>
  );
}

export default PaymentEdit;
