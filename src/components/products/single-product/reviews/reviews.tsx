"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Review } from "@/lib/schemas/review";
import { IconStarFilled, IconStarHalfFilled } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { ReviewFormDialog } from "./review-form";

function Reviews({
  userId,
  slug,
  productId,
}: {
  userId?: string;
  slug: string;
  productId: string;
}) {
  const [reviews, setReviews] = useState<Review[]>([]);

  const randoDate = new Date("2024-11-15").toLocaleDateString();
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h5 className="text-lg font-semibold lg:text-xl">Customer Reviews</h5>
          <ReviewFormDialog productId={productId} />
        </div>
        {userId ? (
          <></>
        ) : (
          <p>
            Please
            <Link
              href={`/sign-in?callbackUrl=/product/${slug}`}
              className="distinct cursor-pointer"
            >
              {" "}
              sign in{" "}
            </Link>
            to write a review.
          </p>
        )}
      </div>
      {reviews.length === 0 ? (
        <div className="italic">No reviews yet.</div>
      ) : (
        <Card>
          <CardHeader>
            Review Title
            <CardDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
              ullam animi laboriosam non aliquam. Velit.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex items-center gap-1.5">
            <div className="flex items-center gap-1">
              {Array.from({ length: 4 }).map((_, index) => (
                <IconStarFilled key={index} className="size-5" />
              ))}
              <IconStarHalfFilled className="size-5" />
            </div>
            &bull;
            <div className="text-sm">John Doe</div>
            &bull;
            <div className="text-sm">{randoDate}</div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}

export default Reviews;
