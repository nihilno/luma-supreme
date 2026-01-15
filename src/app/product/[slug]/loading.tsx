import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  IconBrandLinktree,
  IconStarFilled,
  IconStarHalfFilled,
  IconTagStarred,
} from "@tabler/icons-react";

function Loading() {
  return (
    <section className="min-h-dvh space-y-8">
      <IconBrandLinktree className="mx-auto size-12" />
      <Card className="mx-auto max-w-lg sm:mx-0">
        <CardHeader>
          <div className="relative aspect-square overflow-hidden rounded-xl">
            x
          </div>
        </CardHeader>
        <CardContent className="space-y-6 border-t border-dashed pt-6">
          <Badge className="font-semibold">
            <IconTagStarred /> brand
          </Badge>
          <h3 className="line-clamp-1">name</h3>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="flex items-center gap-1 rounded-full border px-2 py-1">
            <IconStarFilled className="size-4 transition" />
            <h4>rating</h4>
          </div>
          <h4 className="text-2xl font-semibold">price</h4>
        </CardFooter>
      </Card>

      <div className="mt-16 space-y-8">
        <div className="space-y-1">
          <div className="flex items-center gap-1">
            {Array.from({ length: 4 }).map((_, index) => (
              <IconStarFilled key={index} />
            ))}
            <IconStarHalfFilled />
          </div>
          <h5 className="font-semibold">
            There are 6 reviews for this product,{" "}
            <span className="text-distinct/75 hover:text-distinct cursor-pointer transition">
              check them out.
            </span>
          </h5>
        </div>

        <div className="space-y-1">
          <h5 className="font-semibold">Description</h5>
          <p>desc.</p>
        </div>
      </div>
    </section>
  );
}

export default Loading;
