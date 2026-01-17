"use client";

import Logo from "@/components/global/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SignUpUser } from "@/lib/actions/user";
import { signUpSchema, signUpType } from "@/lib/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IconEyeClosed,
  IconEyeExclamation,
  IconLoader2,
  IconUserPlus,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { replace } = useRouter();

  const form = useForm<signUpType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(signUpSchema),
  });

  const disabled = form.formState.isSubmitting;

  async function handleSubmit(formData: signUpType) {
    try {
      const result = await SignUpUser(formData);
      if (!result.success) {
        toast.warning(result.message);
        return;
      }
      toast.success(result.message);
      replace("/");
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        className="flex items-center justify-center py-16"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <Card className="w-full max-w-md rounded-4xl px-6 py-10 pt-14">
          <CardContent className="">
            <div className="flex flex-col items-center space-y-8">
              <Logo />

              <div className="space-y-2 text-center">
                <h1 className="text-foreground text-3xl font-semibold">
                  Welcome to Luma!
                </h1>
                <p className="text-muted-foreground text-sm">
                  Already a client?{" "}
                  <Link
                    href="/sign-in"
                    className="text-foreground hover:underline"
                  >
                    Sign in.
                  </Link>
                </p>
              </div>

              <div className="w-full space-y-4">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Your Name"
                          className="hover:border-foreground/35 h-12 rounded-xl text-sm transition-colors"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Your email"
                          className="hover:border-foreground/35 h-12 rounded-xl text-sm transition-colors"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Strong password"
                          className="hover:border-foreground/35 h-12 rounded-xl text-sm transition-colors"
                          autoComplete="new-password"
                          {...field}
                        />
                      </FormControl>
                      <div className="absolute top-6 right-3 -translate-y-1/2">
                        <Button
                          type="button"
                          variant={"ghost"}
                          size="icon"
                          onClick={() => setShowPassword((prev) => !prev)}
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <IconEyeClosed className="size-6 cursor-pointer" />
                          ) : (
                            <IconEyeExclamation className="size-6 cursor-pointer" />
                          )}
                        </Button>{" "}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="confirmPassword"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Confirm password"
                          className="hover:border-foreground/35 h-12 rounded-xl text-sm transition-colors"
                          autoComplete="new-password"
                          {...field}
                        />
                      </FormControl>
                      <div className="absolute top-6 right-3 -translate-y-1/2">
                        <Button
                          type="button"
                          variant={"ghost"}
                          size="icon"
                          onClick={() => setShowPassword((prev) => !prev)}
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <IconEyeClosed className="size-6 cursor-pointer" />
                          ) : (
                            <IconEyeExclamation className="size-6 cursor-pointer" />
                          )}
                        </Button>{" "}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col gap-2">
                  <Button
                    type="submit"
                    className="w-full rounded-xl"
                    size="lg"
                    disabled={disabled}
                  >
                    {disabled ? (
                      <IconLoader2 className="size-5 animate-spin" />
                    ) : (
                      <IconUserPlus className="size-5" />
                    )}
                    Sign up!
                  </Button>
                  <Button
                    type="button"
                    variant="link"
                    className="text-muted-foreground w-full text-sm"
                    disabled={disabled}
                  >
                    Sign up using magic link
                  </Button>
                </div>

                <div className="flex items-center gap-4 py-2">
                  <Separator className="flex-1" />
                  <span className="text-muted-foreground text-sm">OR</span>
                  <Separator className="flex-1" />
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full rounded-xl"
                  size="lg"
                  disabled={disabled}
                >
                  Use Google (OAuth)
                </Button>
              </div>

              <p className="text-muted-foreground w-11/12 text-center text-xs">
                You acknowledge that you read, and agree, to our{" "}
                <a href="#" className="hover:text-foreground underline">
                  Terms of Service
                </a>{" "}
                and our{" "}
                <a href="#" className="hover:text-foreground underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}

export default SignUpForm;
