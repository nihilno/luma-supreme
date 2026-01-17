import Logo from "@/components/global/logo";
import { socials } from "@/lib/constants/navigations";

function Header() {
  return (
    <div className="border-muted-foreground/25 flex w-full items-center justify-between rounded-full border p-4 shadow-sm">
      <Logo />
      <div className="bg-foreground h-0.5 w-20 rounded-full sm:w-30" />
      <div className="flex items-center gap-3">
        {socials.map(({ label, icon: Icon }) => (
          <Icon
            key={label}
            className="size-5 cursor-pointer opacity-80 transition hover:opacity-100"
          />
        ))}
      </div>
    </div>
  );
}

export default Header;
