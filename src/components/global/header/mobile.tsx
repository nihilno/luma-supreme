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
import { IconMenu4 } from "@tabler/icons-react";
import { Session } from "next-auth";
import Copyright from "../footer/copyright";
import Buttons from "./buttons";
import Navigation from "./navigation";
import UserProfile from "./user-profile";

export function Mobile({ session }: { session: Session | null }) {
  const name = session?.user?.name;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <IconMenu4 className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-background/65 p-4 backdrop-blur-md">
        <SheetHeader className="text-center">
          <SheetTitle className="text-xl">
            {name ? (
              <>
                Welcome, <span className="text-distinct">{name}</span>.
              </>
            ) : (
              "Welcome."
            )}
          </SheetTitle>
          <SheetDescription>
            Access your essentials—shopping tools, account options, and quick
            links—all in one place.
          </SheetDescription>
          <nav className="mt-16 flex flex-col items-center gap-2.5">
            <Buttons className="w-full" col={true} names={true} />
            {session && <UserProfile />}
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
