import ItemEmpty from "@/components/global/empty";
import ProductCard from "@/components/products/product-card";
import { getAllProducts } from "@/lib/data/products";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    price?: string;
    rating?: string;
    sort?: string;
    page?: string;
  }>;
}) {
  const {
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
    sort = "newest",
    page = "1",
  } = await searchParams;

  const { products } = await getAllProducts({
    query: q,
    category,
    price,
    rating,
    sort,
    page: Number(page),
  });

  return (
    <section className="mt-16 grid grid-cols-1 gap-2 border md:grid-cols-5 md:gap-5">
      <div className="mb-16 md:mb-0">Filters</div>
      <div className="mx-auto space-y-4 md:col-span-4 md:mx-0">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {!products || products.length === 0 ? (
            <section className="mt-16 flex min-h-150">
              <ItemEmpty
                title="Product/s not found"
                subtitle="We couldn't find any products. You may want to update your
          filters."
              />
            </section>
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
