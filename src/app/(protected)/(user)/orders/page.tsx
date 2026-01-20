import Pagination from "@/components/global/pagination";
import OrdersTable from "@/components/orders/orders-table";
import { getOrders } from "@/lib/data/getOrders";
import { IconGridScan } from "@tabler/icons-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders",
  description: "Manage your orders",
};

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;
  const { orders, totalPages } = await getOrders({ page: Number(page) || 1 });

  return (
    <section className="mt-16 flex min-h-170 flex-col space-y-16 pb-8">
      <div className="flex items-center gap-3">
        <IconGridScan className="text-distinct size-12" />
        <div>
          <h2 className="text-3xl font-bold">Your orders</h2>
          <p className="text-muted-foreground text-sm">
            You can inspect details of your orders.
          </p>
        </div>
      </div>
      <OrdersTable orders={orders} />
      {totalPages > 1 && (
        <div className="mt-auto w-full border-t pt-4 text-center">
          <Pagination totalPages={totalPages} page={Number(page) || 1} />
        </div>
      )}
    </section>
  );
}
