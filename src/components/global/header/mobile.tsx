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
          <nav className="mt-16 flex flex-col items-center gap-2.5">
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
        </SheetHeader>

        <div className="flex h-full flex-col justify-center">
          <nav className="border-foreground/50 border-t border-b py-6">
            <Navigation className="flex-col" />
          </nav>
        </div>

        <SheetFooter className="flex flex-col items-center">
          <ModeToggle className="w-full" />
          <Button className="w-full" asChild>
            <SheetClose>
              <span>Close</span>
            </SheetClose>
          </Button>
          <Copyright />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
