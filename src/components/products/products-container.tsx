import ItemEmpty from "@/components/global/empty";
import { IconNorthStar } from "@tabler/icons-react";
import ViewAll from "../buttons/view-all";
import ProductCard from "./product-card";

async function ProductsContainer({ title, featured }: ProductsContainerProps) {
  if (!featured || featured.length === 0)
    return (
      <section className="grid place-items-center">
        <ItemEmpty
          title="Product/s not found"
          subtitle="We couldn't find any products. You may want to update your
          filters."
        />
      </section>
    );

  return (
    <div className="mx-auto max-w-sm sm:max-w-none">
      <div className="flex items-center justify-center sm:justify-start">
        <h2 className="flex flex-col items-center gap-3 text-2xl font-bold sm:flex-row sm:text-left sm:text-4xl">
          <IconNorthStar className="text-distinct size-12" />
          {title}
        </h2>
      </div>
      <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-16">
        <ViewAll />
      </div>
    </div>
  );
}

export default ProductsContainer;
