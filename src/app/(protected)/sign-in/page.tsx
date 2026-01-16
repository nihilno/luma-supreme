import { auth } from "@/auth";
import SignInForm from "@/components/auth/sign-in-form";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign In",
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl: string }>;
}) {
  const { callbackUrl } = await searchParams;

  const session = await auth();
  if (session) {
    redirect(callbackUrl || "/");
  }

  return <SignInForm />;
}
