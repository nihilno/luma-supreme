import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn, toGBP } from "@/lib/utils";
import { IconTagStarred } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import EmptyImage from "../global/empty-image";
import Stars from "./single-product/reviews/stars";

function ProductCard({ product }: { product: Product }) {
  const { id, slug, stock, images, brand, name, rating, price } = product;

  return (
    <Link key={id} href={`/product/${slug}`} className="max-w-sm">
      <Card
        className={cn(
          stock === 0 && "opacity-50",
          "group hover:bg-muted/60 transition",
        )}
      >
        <CardHeader>
          <div className="relative aspect-square overflow-hidden rounded-xl">
            {!images || images.length === 0 ? (
              <EmptyImage />
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
          <Stars rating={rating} />
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
  );
}

export default ProductCard;
