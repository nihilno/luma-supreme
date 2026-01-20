import EditButton from "@/components/buttons/edit";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  IconCheckbox,
  IconCreditCardPay,
  IconLoader,
} from "@tabler/icons-react";

function PaymentEdit({
  paymentMethod,
  paidAt,
  isPaid,
  readOnly = false,
}: PaymentEditProps) {
  return (
    <Card className="relative h-full overflow-hidden">
      <CardHeader className="text-xl font-bold">Payment Method</CardHeader>
      <CardContent>
        <p>{paymentMethod}</p>
      </CardContent>
      <CardFooter className="mt-auto">
        {readOnly ? (
          <Badge
            variant={isPaid ? "outline" : "destructive"}
            className="text-base"
          >
            {isPaid ? (
              <IconCheckbox className="size-5!" />
            ) : (
              <IconLoader className="size-5!" />
            )}
            {isPaid
              ? `Paid at ${paidAt?.toLocaleString() ?? "unknown date"}`
              : "Not Paid"}
          </Badge>
        ) : (
          <EditButton href="/payment-method" />
        )}
      </CardFooter>
      <IconCreditCardPay className="absolute right-0 bottom-0 size-72 rotate-45 overflow-hidden opacity-4" />
    </Card>
  );
}

export default PaymentEdit;
