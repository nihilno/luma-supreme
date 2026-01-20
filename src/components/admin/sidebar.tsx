"use client";

import { adminButtons } from "@/lib/constants/navigations";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="w-fit rounded-xl border px-2 sm:px-4">
      <ul className="space-y-6 py-4">
        {adminButtons.map(({ label, href, icon: Icon }) => (
          <li key={label}>
            <Link
              href={href}
              className={cn(
                "hover:bg-distinct/10 group grid aspect-square place-items-center rounded-xl transition",
                pathname === href && "text-distinct",
              )}
            >
              <Icon className="size-8 sm:size-7" />
              <span className="group-hover:text-distinct hidden transition sm:block">
                {label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;
