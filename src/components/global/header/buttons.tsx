import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IconLogin2, IconShoppingBagSearch } from "@tabler/icons-react";
import Link from "next/link";
import UserProfile from "./user-profile";

async function Buttons({
  className,
  col = false,
  names = false,
}: ButtonsProps) {
  const session = await auth();

  if (session)
    return (
      <nav
        className={cn("flex items-center gap-2.5", col && "w-full flex-col")}
      >
        <Button asChild className={className}>
          <Link href={"/cart"}>
            <IconShoppingBagSearch />
            {names && <span>Cart</span>}
          </Link>
        </Button>
        <UserProfile dropdown={true} />
      </nav>
    );

  return (
    <nav className={cn("flex items-center gap-2.5", col && "w-full flex-col")}>
      <Button asChild className={className}>
        <Link href={"/cart"}>
          <IconShoppingBagSearch />
          {names && <span>Cart</span>}
        </Link>
      </Button>
      <Button asChild className={className}>
        <Link href={"/sign-in"}>
          <IconLogin2 />
          {names && <span>Sign In</span>}
        </Link>
      </Button>
    </nav>
  );
}

export default Buttons;
