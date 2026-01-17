import { Button } from "@/components/ui/button";
import { publicButtons } from "@/lib/constants/navigations";
import { cn } from "@/lib/utils";
import Link from "next/link";

function Buttons({ className, col = false, names = false }: ButtonsProps) {
  return (
    <nav className={cn("flex items-center gap-2.5", col && "w-full flex-col")}>
      {publicButtons.map(({ label, href, icon: Icon }) => (
        <Button key={label} asChild className={className} title={label}>
          <Link href={href}>
            <Icon className="size-5" />
            {names && <span>{label}</span>}
          </Link>
        </Button>
      ))}
    </nav>
  );
}

export default Buttons;
