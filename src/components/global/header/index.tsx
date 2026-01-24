import { auth } from "@/auth";
import Logout from "@/components/buttons/logout";
import { ModeToggle } from "@/components/buttons/mode-toggle";
import SignIn from "@/components/buttons/signin";
import Logo from "@/components/global/logo";
import Buttons from "./buttons";
import CategoriesDrawer from "./categories-drawer";
import { Mobile } from "./mobile";
import Navigation from "./navigation";
import UserProfile from "./user-profile";

async function Header() {
  const session = await auth();
  const name = session?.user?.name || "My Account";
  const email = session?.user?.email || null;

  return (
    <header className="wrapper sticky top-0 z-50 grid h-25 max-w-6xl place-items-center">
      <div className="bg-background/30 flex w-full items-center justify-between rounded-full border p-4 backdrop-blur-sm lg:px-24">
        <div className="flex items-center gap-2">
          <Logo />
          <CategoriesDrawer />
        </div>
        <div className="hidden sm:block">
          <Navigation />
        </div>
        <div className="flex items-center gap-2.5">
          <div className="hidden lg:flex lg:items-center lg:gap-2.5">
            <ModeToggle />
            <Buttons />
            {session && (
              <UserProfile dropdown={true} name={name} email={email} />
            )}
          </div>
          <nav className="flex items-center gap-2.5 lg:hidden">
            <Buttons />
            <Mobile session={session} />
          </nav>
          {session ? <Logout /> : <SignIn />}
        </div>
      </div>
    </header>
  );
}

export default Header;
