"use client";

import ItemEmpty from "@/components/global/empty";
import EmptyImage from "@/components/global/empty-image";
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
import { useState } from "react";
import Images from "./images";
import Stars from "./reviews/stars";

function ProductCard({ product }: { product: Product | null }) {
  const [image, setImage] = useState(0);

  if (!product)
    return (
      <section className="-mt-32 grid h-screen place-items-center">
        <ItemEmpty
          title="Product/s not found"
          subtitle="  We couldn't find any products. You may want to update your
          filters."
        />
      </section>
    );
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
              <EmptyImage />
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
          <Stars rating={rating} />
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
