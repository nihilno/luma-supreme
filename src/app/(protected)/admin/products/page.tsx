import AdminProductTable from "@/components/admin/products/product-table";
import Pagination from "@/components/global/pagination";
import { getAllProducts } from "@/lib/data/products";
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
      <AdminProductTable products={products} />
      {totalPages > 1 && (
        <div className="mt-auto w-full border-t pt-4 text-center">
          <Pagination totalPages={totalPages} page={Number(page) || 1} />
        </div>
      )}
    </section>
  );
}
