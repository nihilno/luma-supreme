import { Button } from "@/components/ui/button";
import { publicButtons } from "@/lib/constants/navigations";
import { cn } from "@/lib/utils";
import Link from "next/link";

function Buttons() {
  return (
    <nav className={cn("flex items-center gap-2.5")}>
      {publicButtons.map(({ label, href, icon: Icon }) => (
        <Button
          key={label}
          asChild
          title={label}
          aria-label={label}
          size="icon"
        >
          <Link href={href}>
            <Icon className="size-5" />
          </Link>
        </Button>
      ))}
    </nav>
  );
}

export default Buttons;
