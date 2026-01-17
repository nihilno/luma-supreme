import ProductEmpty from "@/components/products/product-empty";
import AddToCartButton from "@/components/products/single-product/add-to-cart-btn";
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

  if (!product)
    return (
      <section className="-mt-32 grid min-h-dvh place-items-center">
        <ProductEmpty />
      </section>
    );
  const { stock, price, description, numReviews, id, name, images } = product;

  return (
    <section className="mx-auto mt-16 grid grid-cols-1 space-y-16 gap-x-8 md:grid-cols-2">
      <IconBrandLinktree className="distinct mx-auto size-12 animate-pulse md:col-span-2" />
      <ProductCard product={product} />

      <div className="mt-24 space-y-12 md:mt-12">
        <Stars numReviews={numReviews} />

        <div className="space-y-1">
          <h5 className="text-lg font-semibold">Description</h5>
          <p>{description}.</p>
        </div>

        <AddToCartButton
          price={price}
          stock={stock}
          cartItem={{
            productId: id,
            name,
            slug,
            price,
            qty: 1,
            image: images[0],
          }}
        />
      </div>

      <div className="md:col-span-2 md:mt-16">
        <Reviews />
      </div>
    </section>
  );
}
