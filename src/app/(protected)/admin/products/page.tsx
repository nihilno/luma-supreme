import DeleteProduct from "@/components/buttons/delete-product";
import Pagination from "@/components/global/pagination";
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
import { getAllProducts } from "@/lib/data/products";
import { cn, formatId, toGBP } from "@/lib/utils";
import { IconEdit } from "@tabler/icons-react";
import Link from "next/link";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string; query: string; category: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const searchText = params.query || "";
  const category = params.category || "";

  const { products, totalPages } = await getAllProducts({
    page,
    query: searchText,
    category,
  });

  return (
    <section className="flex min-h-170 flex-col space-y-16 pb-8">
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
              <TableCell className="flex w-15 items-center text-center">
                <Button size="icon-sm" variant={"ghost"} asChild>
                  <Link href={"/"}>
                    <IconEdit className="size-5.5" />
                  </Link>
                </Button>
                <DeleteProduct id={id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {totalPages > 1 && (
        <div className="mt-auto w-full border-t pt-4 text-center">
          <Pagination totalPages={totalPages} page={Number(page) || 1} />
        </div>
      )}
    </section>
  );
}
