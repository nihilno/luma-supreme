import ItemEmpty from "@/components/global/empty";
import ProductCard from "@/components/products/product-card";
import { prices, ratings, sorting } from "@/lib/constants/filters";
import { getAllCategories, getAllProducts } from "@/lib/data/products";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Find your product",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchPageParams>;
}) {
  const {
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
    sort = "newest",
    page = "1",
  } = await searchParams;

  function getFilterUrl({
    c,
    s,
    p,
    r,
    pg,
  }: {
    c?: string;
    s?: string;
    p?: string;
    r?: string;
    pg?: string;
  }) {
    const params = { q, category, price, rating, sort, page };

    if (c) params.category = c;
    if (p) params.price = p;
    if (s) params.sort = s;
    if (r) params.rating = r;
    if (pg) params.page = pg;

    return `/search?${new URLSearchParams(params).toString()}`;
  }

  const { products } = await getAllProducts({
    query: q,
    category,
    price,
    rating,
    sort,
    page: Number(page),
  });

  const categories = await getAllCategories();

  return (
    <section className="mt-16 grid grid-cols-1 gap-2 sm:grid-cols-5 sm:gap-5">
      <div className="border-muted-foreground/75 mb-16 hidden h-screen space-y-12 border-r border-dashed sm:mb-0 sm:block">
        <div>
          <h2 className="text-lg">Category</h2>
          <div>
            <ul>
              <li>
                <Link
                  className={cn(
                    (category === "all" || category === "") && "text-distinct",
                    "hover:underline",
                  )}
                  href={getFilterUrl({ c: "all" })}
                >
                  Any
                </Link>
              </li>
              {categories.map((c) => (
                <li
                  key={c.category}
                  className={cn(
                    category === c.category && "text-distinct",
                    "hover:underline",
                  )}
                >
                  <Link href={getFilterUrl({ c: c.category })}>
                    {c.category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h2 className="text-lg">Price</h2>
          <div>
            <ul>
              <li>
                <Link
                  className={cn(
                    price === "all" && "text-distinct",
                    "hover:underline",
                  )}
                  href={getFilterUrl({ p: "all" })}
                >
                  Any
                </Link>
              </li>
              {prices.map(({ name, value }) => (
                <li
                  key={name}
                  className={cn(
                    price === value && "text-distinct",
                    "hover:underline",
                  )}
                >
                  <Link href={getFilterUrl({ p: value })}>{name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-lg">Ratings</h2>
          <div>
            <ul>
              <li>
                <Link
                  className={cn(
                    rating === "all" && "text-distinct",
                    "hover:underline",
                  )}
                  href={getFilterUrl({ r: "all" })}
                >
                  Any
                </Link>
              </li>
              {ratings.map((r) => (
                <li
                  key={r}
                  className={cn(
                    rating === r.toString() && "text-distinct",
                    "hover:underline",
                  )}
                >
                  <Link
                    href={getFilterUrl({ r: r.toString() })}
                  >{`${r} stars & up`}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto flex flex-col space-y-4 sm:col-span-4 sm:mx-0">
        <div className="mx-auto flex items-center gap-2 lg:mx-0 lg:ml-auto">
          Sort by{" "}
          <div className="border-muted-foreground/50 space-x-3 border-l pl-2">
            {sorting.map((s) => (
              <Link
                key={s}
                href={getFilterUrl({ s })}
                className={cn(sort === s && "text-distinct", "hover:underline")}
              >
                {s}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {!products || products.length === 0 ? (
            <section className="col-span-full mt-32 flex justify-center">
              <ItemEmpty
                title="Product/s not found"
                subtitle="We couldn't find any products. You may want to update your filters."
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
