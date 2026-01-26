"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { IconStarFilled } from "@tabler/icons-react";
import Link from "next/link";
import { ReviewFormDialog } from "./review-form";

function Reviews({ userId, slug, productId, reviews }: ReviewsProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="flex items-center justify-between gap-2">
          <h5 className="mb-2 text-lg font-semibold lg:text-xl">
            Customer Reviews
          </h5>
          {userId ? (
            <ReviewFormDialog productId={productId} />
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
      </div>
      {reviews.length === 0 ? (
        <div className="italic">No reviews yet.</div>
      ) : (
        reviews.map(({ id, title, description, user, createdAt, rating }) => (
          <Card key={id}>
            <CardHeader>
              {title}
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardFooter className="flex items-center gap-1.5">
              {Array.from({ length: rating }).map((_, index) => (
                <IconStarFilled key={index} className="size-5" />
              ))}{" "}
              &bull;
              <p className="text-sm">{user ? user.name : "Deleted User"}</p>
              &bull;
              <p className="text-sm">{createdAt.toLocaleString()}</p>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
}

export default Reviews;
