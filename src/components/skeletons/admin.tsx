import { IconLoaderQuarter } from "@tabler/icons-react";
import { Skeleton } from "../ui/skeleton";

export function StatsSkeletons() {
  const style = "py-14.5 grid place-items-center rounded-xl";

  return (
    <div className="col-span-2 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton className={style} key={index}>
          <IconLoaderQuarter className="text-distinct size-12 animate-spin" />
        </Skeleton>
      ))}
    </div>
  );
}
