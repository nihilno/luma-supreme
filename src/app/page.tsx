import DealCountdown from "@/components/deal-countdown";
import Spinner from "@/components/global/spinner";
import IconBoxes from "@/components/icon-boxes";
import ProductCarousel from "@/components/products/product-carousel";
import ProductsContainer from "@/components/products/products-container";
import { getFeaturedProducts } from "@/lib/data/products";
import { Suspense } from "react";

export default async function HomePage() {
  const featured = await getFeaturedProducts();

  return (
    <section className="mt-16 flex flex-col items-center space-y-32 pb-8 text-center">
      {featured.length > 0 && (
        <Suspense fallback={<Spinner />}>
          <ProductCarousel featured={featured} />
        </Suspense>
      )}
      <Suspense fallback={<Spinner />}>
        <ProductsContainer title="Featured Products" featured={featured} />
      </Suspense>
      <DealCountdown />
      <IconBoxes />
    </section>
  );
}
