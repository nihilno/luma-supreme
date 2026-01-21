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
import { formatId, toGBP } from "@/lib/utils";
import {
  IconCheckbox,
  IconExternalLink,
  IconLoader,
} from "@tabler/icons-react";
import Link from "next/link";
import DeleteOrder from "../global/delete-order";

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
          <TableHead className="text-distinct w-16 font-semibold sm:text-base md:text-lg">
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
                    ? `Delivered at ${deliveredAt ?? "unknown date"}`
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
