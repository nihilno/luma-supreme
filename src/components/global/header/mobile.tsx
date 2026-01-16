"use client";

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
import { mobileNav } from "@/lib/constants/navigations";
import { IconMenu4 } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Copyright from "../footer/copyright";
import Navigation from "./navigation";

export function Mobile() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    //eslint-disable-next-line
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
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
            {mobileNav.map(({ label, href, icon: Icon }) => (
              <Button key={label} className="w-full" asChild>
                <Link href={href}>
                  <Icon />
                  <span>{label}</span>
                </Link>
              </Button>
            ))}
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
