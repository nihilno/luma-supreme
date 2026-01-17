import { IconStarFilled, IconStarHalfFilled } from "@tabler/icons-react";

function Stars({ numReviews }: { numReviews: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1">
        {Array.from({ length: 4 }).map((_, index) => (
          <IconStarFilled key={index} className="size-5 lg:size-6" />
        ))}
        <IconStarHalfFilled className="size-5 lg:size-6" />
      </div>
      <h5 className="font-semibold">
        There are {numReviews} reviews for this product,{" "}
        <span className="distinct cursor-pointer">check them out.</span>
      </h5>
    </div>
  );
}

export default Stars;
