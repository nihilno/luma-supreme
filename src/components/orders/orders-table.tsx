import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { tableHeadStyle } from "@/lib/constants/styles";
import { cn, formatId, toGBP } from "@/lib/utils";
import {
  IconCheckbox,
  IconExternalLink,
  IconLoader,
} from "@tabler/icons-react";
import Link from "next/link";
import DeleteOrder from "../buttons/delete-order";

function OrdersTable({
  orders,
  isAdmin = false,
}: {
  orders: OrderTableItem[];
  isAdmin?: boolean;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className={tableHeadStyle}>ID</TableHead>
          <TableHead className={tableHeadStyle}>Date</TableHead>
          <TableHead className={tableHeadStyle}>Total</TableHead>
          <TableHead className={tableHeadStyle}>Paid</TableHead>
          <TableHead className={tableHeadStyle}>Delivered</TableHead>
          <TableHead className={cn(tableHeadStyle, "md:text-lg")}>
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
              <TableCell>
                <Badge variant={isDelivered ? "outline" : "destructive"}>
                  {isDelivered ? <IconCheckbox /> : <IconLoader />}
                  {isDelivered
                    ? `Delivered at ${deliveredAt?.toLocaleString() ?? "unknown date"}`
                    : "Not Delivered"}
                </Badge>
              </TableCell>
              <TableCell className="flex items-center text-center">
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  title="See order details."
                >
                  <Link href={`/order/${id}`} target="_blank">
                    <IconExternalLink className="size-5 lg:size-6" />
                  </Link>
                </Button>
                {isAdmin && <DeleteOrder id={id} />}
              </TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
    </Table>
  );
}

export default OrdersTable;
