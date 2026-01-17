import { Button } from "@/components/ui/button";
import { IconKey } from "@tabler/icons-react";
import Link from "next/link";

function Signin() {
  return (
    <Button variant={"outline"} size={"icon"} title="Sign In" asChild>
      <Link href={"/sign-in"}>
        <IconKey className="size-5" />
      </Link>
    </Button>
  );
}

export default Signin;
