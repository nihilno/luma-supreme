import { auth } from "@/auth";
import OrdersTable from "@/components/orders/orders-table";
import { getOrders } from "@/lib/data/getOrders";
import { IconGridScan } from "@tabler/icons-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders",
  description: "Manage your orders",
};

export default async function OrdersPage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("You must be logged in to perform this action.");
  const orders = await getOrders(userId);

  return (
    <section className="mt-16 h-screen space-y-16 pb-32">
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
    </section>
  );
}
