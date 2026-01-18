import Spinner from "@/components/global/spinner";
import ProductsContainer from "@/components/products/products-container";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <section className="min-h-dvh">
      <Suspense fallback={<Spinner />}>
        <ProductsContainer title="Featured Products" />
      </Suspense>
    </section>
  );
}
