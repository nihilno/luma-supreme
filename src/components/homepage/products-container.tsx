import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { getFeaturedProducts } from "@/lib/data/fetchFeatured";
import { cn, toGBP } from "@/lib/utils";
import {
  IconFileUnknown,
  IconNorthStar,
  IconStarFilled,
  IconTagStarred,
} from "@tabler/icons-react";
import Image from "next/image";
import ProductEmpty from "./product-empty";

async function ProductsContainer({ title }: { title?: string }) {
  const featured = await getFeaturedProducts();

  if (!featured || featured.length === 0) return <ProductEmpty />;

  return (
    <div className="mx-auto max-w-sm sm:max-w-none">
      <h2 className="mb-6 flex items-center gap-3 text-center text-4xl font-bold sm:text-left">
        <IconNorthStar className="size-12" />
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map(({ id, brand, images, name, rating, price, stock }) => (
          <Card
            key={id}
            className={cn(
              stock === 0 ? "cursor-not-allowed opacity-50" : "cursor-pointer",
              "group hover:bg-muted/60 transition",
            )}
          >
            <CardHeader>
              <div className="relative aspect-square overflow-hidden rounded-xl">
                {!images || images.length === 0 ? (
                  <div className="bg-muted/50 flex aspect-square flex-col items-center justify-center gap-4">
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
                    priority={true}
                    quality={50}
                  />
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-2 border-t border-dashed pt-4">
              <Badge className="font-semibold">
                <IconTagStarred /> {brand}
              </Badge>
              <h3 className="line-clamp-1">{name}</h3>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="flex items-center gap-1 rounded-full border px-2 py-1">
                <IconStarFilled className="size-4 transition group-hover:text-yellow-700" />
                <h4>{rating}</h4>
              </div>
              <h4
                className={cn(
                  "text-2xl font-semibold",
                  stock === 0 && "text-destructive text-xl",
                )}
              >
                {stock === 0 ? "Out of Stock" : toGBP(price)}
              </h4>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ProductsContainer;
