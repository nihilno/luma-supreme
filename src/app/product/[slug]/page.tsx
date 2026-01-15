import Cta from "@/components/products/single-product/cta";
import ProductCard from "@/components/products/single-product/product-card";
import Reviews from "@/components/products/single-product/reviews";
import Stars from "@/components/products/single-product/stars";
import { fetchProductBySlug } from "@/lib/data/fetchBySlug";
import { IconBrandLinktree } from "@tabler/icons-react";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product) return <h1>no whole card product lol</h1>;
  const { stock, price, description, numReviews } = product;

  return (
    <section className="grid min-h-dvh grid-cols-1 space-y-16 md:grid-cols-2">
      <IconBrandLinktree className="text-distinct mx-auto size-12 animate-pulse md:col-span-2" />
      <ProductCard product={product} />

      <div className="mt-24 space-y-12 md:mt-0">
        <Stars numReviews={numReviews} />

        <div className="space-y-1">
          <h5 className="text-lg font-semibold">Description</h5>
          <p>{description}.</p>
        </div>

        <Cta price={price} stock={stock} />
      </div>

      <div className="md:col-span-2 md:mt-16">
        <Reviews />
      </div>
    </section>
  );
}
