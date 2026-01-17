"use client";

import { Button } from "@/components/ui/button";
import { SignOutUser } from "@/lib/actions/user";
import { IconLogout2 } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function Logout() {
  const { refresh } = useRouter();

  async function onLogout() {
    const result = await SignOutUser();
    if (!result.success) {
      toast.warning(result.message);
      return;
    }
    refresh();
    toast.success(result.message);
  }

  return (
    <Button
      variant={"destructive"}
      size={"icon"}
      title="Logout"
      onClick={onLogout}
    >
      <IconLogout2 />
    </Button>
  );
}

export default Logout;
