import { IconStarFilled } from "@tabler/icons-react";

function Stars({
  numReviews,
  rating,
}: {
  numReviews?: number;
  rating: number;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1">
        <IconStarFilled className="group-hover:text-distinct size-5 transition" />{" "}
        {rating} / 5
      </div>
      {numReviews != null && numReviews > 0 && (
        <h5 className="font-semibold">
          There {numReviews === 1 ? "is" : "are"} {numReviews}
          {numReviews === 1 ? "review" : "reviews"} for this product,
          <span className="distinct cursor-pointer"> check them out.</span>
        </h5>
      )}{" "}
    </div>
  );
}

export default Stars;
