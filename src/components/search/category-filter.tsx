import { cn } from "@/lib/utils";
import Link from "next/link";

function CategoryFilter() {
  return (
    <div className="mb-16 md:mb-0">
      <h2 className="mb-2 text-lg">Category</h2>
      <div>
        <ul>
          <li>
            <Link
              className={cn(
                (category === "all" || category === "") && "text-distinct",
              )}
              href={getFilterUrl({ c: "all" })}
            >
              Any
            </Link>
          </li>
          {categories.map((c) => (
            <li
              key={c.category}
              className={cn(category === c.category && "text-distinct")}
            >
              <Link href={getFilterUrl({ c: c.category })}>{c.category}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CategoryFilter;
