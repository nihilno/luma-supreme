import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { IconStarFilled, IconStarHalfFilled } from "@tabler/icons-react";

function Reviews() {
  const randoDate = new Date(643543).toLocaleDateString();

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h5 className="text-lg font-semibold">Customer Reviews</h5>
        <p>
          Please <span className="distinct cursor-pointer">sign in</span> to
          write a review.
        </p>
      </div>
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
    </div>
  );
}

export default Reviews;
