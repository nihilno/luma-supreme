import { auth } from "@/auth";
import UserData from "@/components/user/user-data";
import UserSettings from "@/components/user/user-settings";
import { getUserById } from "@/lib/data/getUserById";
import { IconUserCog } from "@tabler/icons-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Profile",
  description: "Manage your profile information",
};

export default async function ProfilePage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("You must be logged in to perform this action.");

  const { email, name } = await getUserById(userId);
  const user = { email, name };

  return (
    <section className="mt-16 h-screen space-y-16 pb-32">
      <div className="flex items-center gap-3">
        <IconUserCog className="text-distinct size-12" />
        <div>
          <h2 className="text-3xl font-bold">Your Profile</h2>
          <p className="text-muted-foreground text-sm">
            Edit your personal details.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-6">
        <UserSettings user={user} />
        <UserData />
      </div>
    </section>
  );
}
