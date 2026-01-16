"use client";

import { Button } from "@/components/ui/button";
import { SignOutUser } from "@/lib/actions/user";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function UserProfile({ dropdown = false }: { dropdown?: boolean }) {
  const { replace } = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = await SignOutUser();
    if (!result.success) {
      toast.warning(result.message);
      return;
    }
    toast.success(result.message);
  }
  return (
    <form onSubmit={handleSubmit}>
      <Button type="submit">Logout</Button>
    </form>
  );
}

export default UserProfile;
