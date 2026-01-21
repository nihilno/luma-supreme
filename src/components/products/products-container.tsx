import ItemEmpty from "@/components/global/empty";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { getFeaturedProducts } from "@/lib/data/products";
import { cn, toGBP } from "@/lib/utils";
import {
  IconFileUnknown,
  IconNorthStar,
  IconStarFilled,
  IconTagStarred,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

async function ProductsContainer({ title }: { title?: string }) {
  const featured = await getFeaturedProducts();

  if (!featured || featured.length === 0)
    return (
      <section className="-mt-32 grid h-screen place-items-center">
        <ItemEmpty
          title="Product/s not found"
          subtitle="We couldn't find any products. You may want to update your
          filters."
        />
      </section>
    );

  return (
    <div className="mx-auto mt-16 max-w-sm sm:max-w-none">
      <div className="flex items-center justify-center sm:justify-start">
        <h2 className="flex items-center gap-3 text-3xl font-bold sm:text-left sm:text-4xl">
          <IconNorthStar className="text-distinct size-12" />
          {title}
        </h2>
      </div>
      <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map(
          ({ id, brand, images, name, rating, price, stock, slug }) => (
            <Link key={id} href={`/product/${slug}`}>
              <Card
                className={cn(
                  stock === 0 && "opacity-50",
                  "group hover:bg-muted/60 transition",
                )}
              >
                <CardHeader>
                  <div className="relative aspect-square overflow-hidden rounded-xl">
                    {!images || images.length === 0 ? (
                      <div className="bg-muted/90 flex aspect-square flex-col items-center justify-center gap-4">
                        <IconFileUnknown className="size-12 opacity-50" />
                        <h4 className="text-center opacity-50">
                          There is no image present <br /> for this product.
                        </h4>
                      </div>
                    ) : (
                      <Image
                        src={images[0]}
                        alt={name}
                        fill
                        className="overflow-hidden object-contain transition group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 border-t border-dashed pt-4">
                  <Badge className="font-semibold">
                    <IconTagStarred className="size-5" /> {brand}
                  </Badge>
                  <h3 className="line-clamp-1">{name}</h3>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <div className="flex items-center gap-1 rounded-full border px-2 py-1">
                    <IconStarFilled className="group-hover:text-distinct size-5 transition" />
                    <h4>{rating}</h4>
                  </div>
                  <h4
                    className={cn(
                      "text-2xl font-semibold",
                      stock === 0
                        ? "text-destructive text-xl"
                        : "group-hover:text-distinct transition",
                    )}
                  >
                    {stock === 0 ? "Out of Stock" : toGBP(price)}
                  </h4>
                </CardFooter>
              </Card>
            </Link>
          ),
        )}
      </div>
    </div>
  );
}

export default ProductsContainer;
