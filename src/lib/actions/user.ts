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

  const { email, password } = validated.data;

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return {
        success: false,
        message: "Invalid credentials. Please try again.",
      };
    }

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
  try {
    const result = await signOut({ redirect: false });

    if (result?.error) {
      return {
        success: false,
        message: "Cannot logout at the moment.",
      };
    }

    return {
      success: true,
      message: "You are now logged out.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Cannot logout at the moment.",
    };
  }
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

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return {
        success: false,
        message: "Invalid credentials. Please try again.",
      };
    }

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
      message: "Invalid credentials. Please try again.",
    };
  }
}
