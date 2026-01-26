import { Button } from "@/components/ui/button";
import Link from "next/link";

function ViewAll() {
  return (
    <Button
      asChild
      className="hover:bg-distinct h-12 w-50 rounded-none text-base transition hover:text-white"
    >
      <Link href={"/search"}>View all products</Link>
    </Button>
  );
}

export default ViewAll;
