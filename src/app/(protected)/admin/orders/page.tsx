import Pagination from "@/components/global/pagination";
import OrdersTable from "@/components/orders/orders-table";
import { getAllOrders } from "@/lib/data/getAllOrders";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Orders",
};

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const { orders, totalPages } = await getAllOrders({
    page: Number(page) || 1,
  });

  if (!orders || orders.length === 0)
    return (
      <section className="grid min-h-150 place-items-center">
        <h2 className="text-xl italic">No orders yet.</h2>
      </section>
    );

  return (
    <section className="flex min-h-170 flex-col space-y-16 pb-8">
      <OrdersTable orders={orders} isAdmin={true} />
      {totalPages > 1 && (
        <div className="mt-auto w-full border-t pt-4 text-center">
          <Pagination totalPages={totalPages} page={Number(page) || 1} />
        </div>
      )}
    </section>
  );
}
