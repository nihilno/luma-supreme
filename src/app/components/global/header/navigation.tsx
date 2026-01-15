import { headerNav } from "@/lib/constants/navigations";
import Link from "next/link";

function Navigation() {
  return (
    <ul className="hidden items-center gap-8 sm:flex">
      {headerNav.map(({ label, href }) => (
        <Link key={label} href={href}>
          <li className="hover:text-primary/80 cursor-pointer text-sm font-medium capitalize transition-colors">
            {label}
          </li>
        </Link>
      ))}
    </ul>
  );
}

export default Navigation;
