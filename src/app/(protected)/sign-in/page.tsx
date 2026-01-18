import SignInForm from "@/components/auth/sign-in-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function SignInPage() {
  return <SignInForm />;
}
