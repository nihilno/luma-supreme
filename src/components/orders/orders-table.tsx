import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatId, toGBP } from "@/lib/utils";
import {
  IconCheckbox,
  IconExternalLink,
  IconLoader,
} from "@tabler/icons-react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

function OrdersTable({ orders }: { orders: OrderTableItem[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-distinct font-semibold sm:text-base md:text-lg">
            ID
          </TableHead>
          <TableHead className="text-distinct font-semibold sm:text-base md:text-lg">
            Date
          </TableHead>
          <TableHead className="text-distinct font-semibold sm:text-base md:text-lg">
            Total
          </TableHead>
          <TableHead className="text-distinct font-semibold sm:text-base md:text-lg">
            Paid
          </TableHead>
          <TableHead className="text-distinct font-semibold sm:text-base md:text-lg">
            Delivered
          </TableHead>
          <TableHead className="text-distinct w-20 font-semibold sm:text-base md:text-lg">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map(
          ({
            id,
            createdAt,
            totalPrice,
            isPaid,
            isDelivered,
            paidAt,
            deliveredAt,
          }) => (
            <TableRow key={id}>
              <TableCell>{formatId(id)}</TableCell>
              <TableCell>{createdAt?.toLocaleString()}</TableCell>
              <TableCell>{toGBP(totalPrice)}</TableCell>
              <TableCell>
                <Badge variant={isPaid ? "outline" : "destructive"}>
                  {isPaid ? <IconCheckbox /> : <IconLoader />}
                  {isPaid
                    ? `Paid at ${paidAt?.toLocaleString() ?? "unknown date"}`
                    : "Not Paid"}
                </Badge>
              </TableCell>
              <TableCell>TBD</TableCell>
              <TableCell className="text-center">
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  title="See your order details."
                >
                  <Link href={`/order/${id}`}>
                    <IconExternalLink className="size-6" />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
    </Table>
  );
}

export default OrdersTable;
