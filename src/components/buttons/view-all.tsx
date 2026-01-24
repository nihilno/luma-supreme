import { Button } from "@/components/ui/button";
import Link from "next/link";

function ViewAll() {
  return (
    <Button
      asChild
      size={"lg"}
      className="bg-distinct hover:bg-distinct/75 text-base text-white"
    >
      <Link href={"/search"}>View all products</Link>
    </Button>
  );
}

export default ViewAll;
