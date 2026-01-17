"use client";

import { Button } from "@/components/ui/button";
import { SignOutUser } from "@/lib/actions/user";
import { IconLoader2, IconLogout2 } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

function Logout() {
  const [isLoading, setIsLoading] = useState(false);
  const { refresh } = useRouter();

  async function onLogout() {
    setIsLoading(true);

    try {
      const result = await SignOutUser();
      if (!result.success) {
        toast.warning(result.message);
        return;
      }
      refresh();
      toast.success(result.message);
    } catch (error) {
      console.error(error);
      toast.error("External error occurred. Try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      variant={"destructive"}
      size={"icon"}
      title="Logout"
      onClick={onLogout}
      disabled={isLoading}
    >
      {isLoading ? (
        <IconLoader2 className="size-5 animate-spin" />
      ) : (
        <IconLogout2 className="size-5" />
      )}
    </Button>
  );
}

export default Logout;
