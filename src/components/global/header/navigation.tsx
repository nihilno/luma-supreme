import { headerNav } from "@/lib/constants/navigations";
import { cn } from "@/lib/utils";
import Link from "next/link";

function Navigation({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-8", className)}>
      {headerNav.map(({ label, href }) => (
        <li
          key={label}
          className="hover:text-primary/80 text-sm font-medium capitalize transition-colors"
        >
          <Link href={href}>{label}</Link>
        </li>
      ))}
    </ul>
  );
}

export default Navigation;
