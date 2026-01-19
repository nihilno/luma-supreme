"use client";

import ProductEmpty from "@/components/products/product-empty";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn, toGBP } from "@/lib/utils";
import {
  IconFileUnknown,
  IconStarFilled,
  IconTagStarred,
} from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";
import Images from "./images";

function ProductCard({ product }: { product: Product }) {
  const [image, setImage] = useState(0);

  if (!product) return <ProductEmpty />;
  const { name, stock, images, brand, rating, price } = product;
  const currentImage = images?.[image] ?? images?.[0];

  return (
    <div className="flex w-full flex-col items-center space-y-12">
      <Card
        className={cn(
          stock === 0 ? "cursor-not-allowed! opacity-50" : "cursor-default",
          "group mx-auto w-full max-w-lg transition sm:mx-0 md:max-w-xl",
        )}
      >
        <CardHeader>
          <div className="relative aspect-square overflow-hidden rounded-xl">
            {!images || images.length === 0 ? (
              <div className="bg-muted/50 flex aspect-square flex-col items-center justify-center gap-4">
                <IconFileUnknown className="size-12 opacity-50 sm:size-16" />
                <h4 className="text-center opacity-50 sm:text-xl">
                  There is no image present <br /> for this product.
                </h4>
              </div>
            ) : (
              <Image
                src={currentImage}
                alt={name}
                fill
                sizes="(max-width: 768px) 100vw, 576px"
                className="overflow-hidden object-contain"
                priority
              />
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6 border-t border-dashed pt-6">
          <Badge className="font-semibold lg:h-8 lg:text-lg">
            <IconTagStarred className="size-5 lg:size-6!" /> {brand}
          </Badge>
          <h3 className="line-clamp-1 lg:text-2xl">{name}</h3>
        </CardContent>
        <CardFooter className="flex items-center justify-between lg:mt-6">
          <div className="flex items-center gap-1 rounded-full border px-2 py-1 lg:px-3">
            <IconStarFilled className="size-5 transition lg:size-6" />
            <h4 className="lg:text-xl">{rating}</h4>
          </div>
          <h4
            className={cn(
              "group-hover:text-distinct text-2xl font-semibold transition lg:text-3xl",
              stock === 0 && "text-destructive text-xl",
            )}
          >
            {stock === 0 ? "Out of Stock" : toGBP(price)}
          </h4>
        </CardFooter>
      </Card>

      <Images images={images} image={image} setImage={setImage} />
    </div>
  );
}

export default ProductCard;
