"use client";

import EmptyImage from "@/components/global/empty-image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "../ui/card";

function ProductCarousel({ featured }: { featured: Product[] }) {
  if (featured && featured.length > 0) {
    return (
      <Carousel
        className="mx-auto hidden w-full max-w-300 md:block"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {featured.map(({ id, slug, banner, name }) => (
            <CarouselItem key={id}>
              <Link href={`/product/${slug}`}>
                <Card className="relative mx-auto h-85 overflow-hidden bg-gray-900/30">
                  <div
                    className="absolute inset-0 scale-105 bg-cover bg-center blur-xl"
                    style={{ backgroundImage: `url(${banner})` }}
                  />
                  <div className="absolute inset-0 bg-black/10" />

                  <CardContent className="relative h-full">
                    {banner ? (
                      <Image
                        src={banner!}
                        alt={name}
                        fill
                        className="overflow-hidden! rounded-xl! object-contain"
                      />
                    ) : (
                      <EmptyImage />
                    )}
                  </CardContent>
                  <CardFooter className="bg-background absolute bottom-4 left-1/2 -translate-x-1/2 rounded-sm!">
                    {name}
                  </CardFooter>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );
  }
}

export default ProductCarousel;
