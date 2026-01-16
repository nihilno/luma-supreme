import { auth } from "@/auth";
import SignUpForm from "@/components/auth/sign-up-form";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default async function SignUp() {
  const session = await auth();
  if (session) {
    redirect("/");
  }

  return <SignUpForm />;
}
