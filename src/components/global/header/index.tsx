import { ModeToggle } from "@/components/buttons/mode-toggle";
import Logo from "@/components/global/logo";
import Buttons from "./buttons";
import { Mobile } from "./mobile";
import Navigation from "./navigation";

function Header() {
  // later add GSAP, on scroll --> border, shadow-lg, w-2/3, hide Luma
  return (
    <header className="wrapper sticky top-0 z-50 grid h-25 place-items-center">
      <div className="bg-background/30 flex w-full items-center justify-between rounded-full border p-4 backdrop-blur-sm lg:px-24">
        <Logo withTitle={true} />
        <div className="hidden sm:block">
          <Navigation />
        </div>
        <div className="hidden lg:flex lg:items-center lg:gap-2.5">
          <ModeToggle />
          <Buttons />
        </div>
        <nav className="flex items-center lg:hidden">
          <Mobile />
        </nav>
      </div>
    </header>
  );
}

export default Header;
