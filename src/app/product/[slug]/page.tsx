import ItemEmpty from "@/components/global/empty";
import AddToCartButton from "@/components/products/single-product/add-to-cart-btn";
import ProductCard from "@/components/products/single-product/product-card";
import Reviews from "@/components/products/single-product/reviews";
import Stars from "@/components/products/single-product/stars";
import { getMyCart } from "@/lib/actions/cart";
import { getProductBySlug } from "@/lib/data/products";
import { IconBrandLinktree } from "@tabler/icons-react";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  const cart = await getMyCart();

  if (!product)
    return (
      <section className="-mt-32 grid h-screen place-items-center">
        <ItemEmpty
          title="Product/s not found"
          subtitle="We couldn't find any products. You may want to update your
          filters."
        />
      </section>
    );
  const { stock, price, description, numReviews, id, name, images } = product;

  return (
    <section className="mx-auto mt-16 grid min-h-screen grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
      <IconBrandLinktree className="distinct mx-auto size-12 animate-pulse md:col-span-2" />
      <ProductCard product={product} />

      <div className="mt-24 space-y-12 md:mt-12">
        <Stars numReviews={numReviews} />
        <div className="space-y-1">
          <h5 className="text-lg font-semibold lg:text-xl">Description</h5>
          <p>{description}.</p>
        </div>
        <AddToCartButton
          cart={cart}
          price={price}
          stock={stock}
          cartItem={{
            productId: id,
            name,
            slug,
            price,
            qty: 1,
            image: images?.[0] ?? null,
          }}
        />
      </div>

      <div className="md:col-span-2 md:mt-16">
        <Reviews />
      </div>
    </section>
  );
}
