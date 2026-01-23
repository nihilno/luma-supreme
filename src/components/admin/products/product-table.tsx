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
import { IconEdit } from "@tabler/icons-react";

function AdminProductTable({ products }: { products: Product[] }) {
  if (!products || products.length === 0) {
    return (
      <h1 className="grid place-items-center italic">No products found.</h1>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className={tableHeadStyle}>ID</TableHead>
          <TableHead className={tableHeadStyle}>Name</TableHead>
          <TableHead className={tableHeadStyle}>Price</TableHead>
          <TableHead className={tableHeadStyle}>Category</TableHead>
          <TableHead className={tableHeadStyle}>Stock</TableHead>
          <TableHead className={tableHeadStyle}>Rating</TableHead>
          <TableHead className={cn(tableHeadStyle, "md:text-lg")}>
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map(({ id, name, price, category, stock, rating }) => (
          <TableRow key={id}>
            <TableCell>{formatId(id)}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{toGBP(price)}</TableCell>
            <TableCell>{category}</TableCell>
            <TableCell>x{stock}</TableCell>
            <TableCell>{rating}/5</TableCell>
            <TableCell className="w-15 text-center">
              <Button size="icon-sm">
                <IconEdit />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default AdminProductTable;
