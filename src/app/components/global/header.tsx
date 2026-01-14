import { ModeToggle } from "@/app/components/buttons/mode-toggle";

function Header() {
  return (
    <header className="h-25">
      <nav className="wrapper">
        <ModeToggle />
      </nav>
    </header>
  );
}

export default Header;
