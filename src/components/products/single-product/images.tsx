"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

function Images({
  images,
  image,
  setImage,
}: {
  images: string[];
  image: number;
  setImage: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className="grid w-50 grid-cols-2 gap-2">
      {images.map((img, index) => (
        <div
          key={index}
          onClick={() => setImage(index)}
          className={cn(
            "relative aspect-square cursor-pointer overflow-hidden rounded-xl",
            index === image && "outline-distinct outline-3",
          )}
        >
          <Image src={img} alt={`product-image-${index}`} fill />
        </div>
      ))}
    </div>
  );
}

export default Images;
