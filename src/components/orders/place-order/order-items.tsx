import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cartItemType } from "@/lib/schemas/cart";
import { IconShoppingCartSearch } from "@tabler/icons-react";
import CartTable from "../../cart/cart-table";

function OrderItems({ items }: { items: cartItemType[] }) {
  return (
    <Card className="relative h-full overflow-hidden">
      <CardHeader className="text-xl font-bold">Order Items</CardHeader>
      <CardContent>
        <CartTable items={items} control={false} />
      </CardContent>
      <IconShoppingCartSearch className="absolute right-0 bottom-0 size-72 overflow-hidden opacity-4 lg:size-120" />
    </Card>
  );
}

export default OrderItems;
