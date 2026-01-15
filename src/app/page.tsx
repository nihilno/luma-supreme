import ProductSuspense from "@/components/products/product-suspense";
import ProductsContainer from "@/components/products/products-container";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <section className="min-h-dvh">
      <Suspense fallback={<ProductSuspense />}>
        <ProductsContainer title="Featured Products" />
      </Suspense>
    </section>
  );
}
