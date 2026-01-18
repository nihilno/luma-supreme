import { Button } from "@/components/ui/button";
import Link from "next/link";

function EditButton({ href }: { href: string }) {
  return (
    <Button asChild className="relative z-10">
      <Link href={href}>Edit Details</Link>
    </Button>
  );
}

export default EditButton;
