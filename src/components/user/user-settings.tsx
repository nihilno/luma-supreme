import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function UserSettings({ user }: { user: { email: string; name: string } }) {
  return (
    <Card className="max-w-3xl">
      <CardContent className="space-y-3 text-lg">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-distinct font-semibold">Your Name</h2>
          <span>{user.name}</span>
        </div>
        <Separator />
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-distinct font-semibold">Email Address</h2>
          <span>{user.email}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default UserSettings;
