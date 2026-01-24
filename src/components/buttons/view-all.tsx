import { Button } from "@/components/ui/button";
import Link from "next/link";

function ViewAll() {
  return (
    <Button asChild size={"lg"} className="text-base">
      <Link href={"/search"}>View all products</Link>
    </Button>
  );
}

export default ViewAll;
