"use client";

import { adminButtons } from "@/lib/constants/navigations";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="bg-card rounded-xl">
      <ul className="flex h-12 items-center justify-center gap-4 rounded-xl border py-2 sm:gap-6">
        {adminButtons.map(({ label, href }) => (
          <li
            key={label}
            className={cn(
              pathname === href
                ? "text-distinct"
                : "hover:text-distinct/75 transition",
              "text-sm sm:text-base",
            )}
          >
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;
