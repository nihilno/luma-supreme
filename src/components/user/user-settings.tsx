"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateName } from "@/lib/actions/user";
import { userProfileSchema, UserProfileType } from "@/lib/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconChecks, IconLoader2, IconSignature } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function UserSettings({ user }: { user: { email: string; name: string } }) {
  const form = useForm<UserProfileType>({
    defaultValues: {
      name: user.name,
    },
    resolver: zodResolver(userProfileSchema),
  });

  async function handleSubmit(formData: UserProfileType) {
    try {
      const result = await updateName(formData);
      if (!result.success) {
        toast.warning(result.message);
        return;
      }

      toast.success(result.message);
    } catch (error) {
      console.error(error);
      toast.error(
        "Internal error occurred while updating your name. Try again later.",
      );
    }
  }

  const disabled = form.formState.isSubmitting;

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="border-b border-dashed">
        <div className="flex items-center gap-1">
          <IconSignature className="text-distinct" />
          Change your Name
        </div>
        <CardDescription>
          Got bored with previous nickname? Don&apos;t worry.
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-distinct text-md">Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-12 text-base!"
                      placeholder="Your Name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={disabled}
              className="hover:bg-distinct mt-2 h-12 w-full text-base font-medium transition hover:text-white"
            >
              {disabled ? (
                <>
                  <IconLoader2 className="size-6 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <IconChecks className="size-6" />
                  Update
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default UserSettings;
