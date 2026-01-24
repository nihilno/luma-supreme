"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

function ProductCarousel({ featured }: { featured: Product[] }) {
  return (
    <Carousel
      className="mx-auto hidden max-w-300 md:block"
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {featured.map(({ id, slug, banner, name }) => (
          <CarouselItem key={id}>
            <Link href={`/product/${slug}`}>
              <div className="relative mx-auto h-85">
                <Image
                  src={banner!}
                  alt={name}
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default ProductCarousel;
