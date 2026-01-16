"use server";

import { signIn, signOut } from "@/auth";
import { signInSchema } from "@/lib/schemas/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function SignIn(formData: unknown) {
  const validated = signInSchema.safeParse(formData);
  if (!validated.success) {
    return {
      success: false,
      message: "Invalid credentials. Please try again.",
    };
  }

  const user = validated.data;

  try {
    await signIn("credentials", user);
    return {
      success: true,
      message: "Signed in successfully.",
    };
  } catch (error) {
    console.error(error);

    if (isRedirectError(error)) {
      throw error;
    }

    return {
      success: false,
      message: "Invalid credentials. Please try again.",
    };
  }
}

export async function SignOutUser() {
  await signOut();
}
