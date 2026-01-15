import { ModeToggle } from "@/components/buttons/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  IconLogin2,
  IconMenu4,
  IconShoppingBagSearch,
  IconX,
} from "@tabler/icons-react";
import Link from "next/link";
import Copyright from "../footer/copyright";
import Navigation from "./navigation";

export function Mobile() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <IconMenu4 />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-background/65 p-4 backdrop-blur-md">
        <SheetHeader>
          <SheetTitle>Explore Our Sections </SheetTitle>
          <SheetDescription>
            Navigate through categories, support options, and brand details
            effortlessly.
          </SheetDescription>
        </SheetHeader>

        <div className="flex h-full flex-col justify-center gap-16">
          <nav className="flex flex-col items-center gap-2.5">
            <Button asChild className="w-full">
              <Link href={"/cart"}>
                <IconShoppingBagSearch />
                <span>Cart</span>
              </Link>
            </Button>
            <Button asChild className="w-full">
              <Link href={"/sign-in"}>
                <IconLogin2 />
                <span>Sign In</span>
              </Link>
            </Button>
          </nav>

          <nav className="border-foreground/50 border-t border-b py-6">
            <Navigation className="flex-col" />
          </nav>
        </div>

        <SheetFooter className="flex flex-col items-center">
          <Button className="w-full" asChild>
            <SheetClose>
              <IconX className="translate-y-px" />
              <span>Close</span>
            </SheetClose>
          </Button>
          <ModeToggle className="w-full" />
          <Copyright />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
