import { headerNav } from "@/lib/constants/navigations";
import Link from "next/link";

function Navigation() {
  return (
    <ul className="hidden items-center gap-8 sm:flex">
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
