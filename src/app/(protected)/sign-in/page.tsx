import SignInForm from "@/components/auth/sign-in-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: { callbackUrl: string };
}) {
  const { callbackUrl } = await searchParams;

  return <SignInForm callbackUrl={callbackUrl} />;
}
