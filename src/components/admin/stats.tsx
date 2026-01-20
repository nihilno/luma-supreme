import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getOrderSummary } from "@/lib/data/getOrderSummary";
import { toGBP } from "@/lib/utils";
import {
  IconCurrencyDollar,
  IconPackage,
  IconShoppingBag,
  IconUsers,
} from "@tabler/icons-react";

async function Stats() {
  const headerStyle =
    "grid place-items-center border-b border-dashed text-distinct text-center font-semibold ";
  const contentStyle = "text-center text-2xl sm:text-3xl";
  const iconStyle = "absolute inset-0 top-0 left-0 size-72 rotate-40 opacity-3";

  const summary = await getOrderSummary();

  return (
    <div className="col-span-2 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
      <Card className="relative overflow-hidden">
        <CardHeader className={headerStyle}>Revenue</CardHeader>
        <CardContent className={contentStyle}>
          {summary?.totalSales ? (
            toGBP(summary.totalSales)
          ) : (
            <span className="text-sm italic">No revenue yet.</span>
          )}
        </CardContent>
        <IconCurrencyDollar className={iconStyle} />
      </Card>
      <Card className="relative overflow-hidden">
        <CardHeader className={headerStyle}>Sales</CardHeader>
        <CardContent className={contentStyle}>
          {summary?.salesCount ? (
            summary.salesCount
          ) : (
            <span className="text-sm italic">No sales yet.</span>
          )}
        </CardContent>
        <IconShoppingBag className={iconStyle} />
      </Card>
      <Card className="relative overflow-hidden">
        <CardHeader className={headerStyle}>Customers</CardHeader>
        <CardContent className={contentStyle}>
          {summary?.customersCount ? (
            summary.customersCount
          ) : (
            <span className="text-sm italic">No customers yet.</span>
          )}
        </CardContent>
        <IconUsers className={iconStyle} />
      </Card>
      <Card className="relative overflow-hidden">
        <CardHeader className={headerStyle}>Products</CardHeader>
        <CardContent className={contentStyle}>
          {summary?.productsCount ? (
            summary.productsCount
          ) : (
            <span className="text-sm italic">No products yet.</span>
          )}
        </CardContent>
        <IconPackage className={iconStyle} />
      </Card>
    </div>
  );
}

export default Stats;
