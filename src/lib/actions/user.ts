"use server";

import { signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { signInSchema, signUpSchema } from "@/lib/schemas/auth";
import { hashSync } from "bcrypt-ts-edge";
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

export async function signUpUser(formData: unknown) {
  const validated = signUpSchema.safeParse(formData);
  if (!validated.success) {
    return {
      success: false,
      message: "User was not registered.",
    };
  }

  const { name, email, password } = validated.data;

  try {
    const hashedPassword = hashSync(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    await signIn("credentials", { email, password });

    return {
      success: true,
      message: "User registered successfully.",
    };
  } catch (error) {
    console.error(error);

    if (isRedirectError(error)) {
      throw error;
    }

    return {
      success: false,
      message: "User was not registered.",
    };
  }
}
