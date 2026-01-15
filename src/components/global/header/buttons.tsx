import { ModeToggle } from "@/components/buttons/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  IconLogin2,
  IconMenu2,
  IconShoppingBagSearch,
} from "@tabler/icons-react";
import Link from "next/link";

function Buttons() {
  return (
    <>
      <nav className="hidden items-center gap-2.5 lg:flex">
        <ModeToggle />
        <Button asChild>
          <Link href={"/cart"}>
            <IconShoppingBagSearch />
            <span>Cart</span>
          </Link>
        </Button>
        <Button asChild>
          <Link href={"/sign-in"}>
            <IconLogin2 />
            <span>Sign In</span>
          </Link>
        </Button>
      </nav>
      <nav className="flex items-center lg:hidden">
        <button aria-label="Menu">
          <IconMenu2 />
        </button>
      </nav>
    </>
  );
}

export default Buttons;
