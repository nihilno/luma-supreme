import Logo from "@/app/components/global/logo";
import Buttons from "./buttons";
import Navigation from "./navigation";

function Header() {
  return (
    <header className="wrapper sticky top-0 grid h-25 place-items-center">
      <div className="flex w-full items-center justify-between rounded-full border py-4 backdrop-blur-xl lg:px-24">
        <Logo />
        <Navigation />
        <Buttons />
      </div>
    </header>

    // later add GSAP, on scroll --> border, shadow-lg, w-2/3, hide Luma
  );
}

export default Header;
