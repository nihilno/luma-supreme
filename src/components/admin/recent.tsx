import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getOrderSummary } from "@/lib/data/getOrderSummary";
import { toGBP } from "@/lib/utils";
import { IconExternalLink } from "@tabler/icons-react";
import Link from "next/link";

async function Recent() {
  const summary = await getOrderSummary();

  if (!summary)
    return (
      <Card>
        <CardHeader className="border-b border-dashed text-xl font-bold">
          Recent Sales
        </CardHeader>
        <CardContent className="grid h-full min-h-40 place-items-center italic">
          No recent sales yet.
        </CardContent>
      </Card>
    );

  return (
    <Card>
      <CardHeader className="border-b border-dashed text-xl font-bold">
        Recent Sales
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-distinct font-semibold sm:text-base md:text-lg">
                Buyer
              </TableHead>
              <TableHead className="text-distinct font-semibold sm:text-base md:text-lg">
                Date
              </TableHead>
              <TableHead className="text-distinct font-semibold sm:text-base md:text-lg">
                Total
              </TableHead>
              <TableHead className="text-distinct w-20 font-semibold sm:text-base md:text-lg">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {summary.latestSales.map(({ user, totalPrice, createdAt, id }) => (
              <TableRow key={id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{createdAt?.toLocaleString()}</TableCell>
                <TableCell>{toGBP(Number(totalPrice))}</TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    title="See order details."
                  >
                    <Link href={`/order/${id}`}>
                      <IconExternalLink className="size-5" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default Recent;
