import Logo from "@/components/global/logo";
import { socials } from "@/lib/constants/navigations";

function Header() {
  return (
    <div className="border-muted-foreground/25 flex items-center justify-between rounded-full border p-4">
      <Logo />
      <div className="flex items-center gap-3">
        {socials.map(({ label, icon: Icon }) => (
          <Icon
            key={label}
            className="cursor-pointer opacity-80 transition-all duration-200 ease-in-out hover:opacity-100"
          />
        ))}
      </div>
    </div>
  );
}

export default Header;
