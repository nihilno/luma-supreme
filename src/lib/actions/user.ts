"use server";

import { auth, signIn, signOut } from "@/auth";
import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { signInSchema, signUpSchema } from "@/lib/schemas/auth";
import { shippingSchema } from "@/lib/schemas/shipping-address";
import { userProfileSchema } from "@/lib/schemas/user";
import { hashSync } from "bcrypt-ts-edge";
import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { getMyCart } from "./cart";

export async function SignInUser(formData: unknown) {
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
    const currentCart = await getMyCart();
    if (currentCart?.id) {
      await prisma.cart.delete({ where: { id: currentCart.id } });
    }
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

export async function SignUpUser(formData: unknown) {
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

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          success: false,
          message: "This email is already registered.",
        };
      }
    }

    return {
      success: false,
      message: "Invalid credentials. Please try again.",
    };
  }
}

export async function updateAddress(formData: unknown) {
  const validated = shippingSchema.safeParse(formData);
  if (!validated.success) {
    return {
      success: false,
      message:
        "An error occurred while sending the address details. Try again.",
    };
  }

  try {
    const session = await auth();
    const userId = session?.user?.id;
    const address = validated.data;

    if (!userId)
      throw new Error("You must be logged in to perform this action.");

    await prisma.user.update({ data: { address }, where: { id: userId } });

    return {
      success: true,
      message: "User updated successfully.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message:
        "An error occurred while sending the address details. Try again.",
    };
  }
}

export async function updateName(formData: unknown) {
  const validated = userProfileSchema.safeParse(formData);
  if (!validated.success) {
    return {
      success: false,
      message: "An error occurred while sending the name details. Try again.",
    };
  }

  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId)
      throw new Error("You must be logged in to perform this action.");

    await prisma.user.update({
      data: { name: validated.data.name },
      where: { id: userId },
    });

    revalidatePath("/profile");

    return {
      success: true,
      message: "User updated successfully.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message:
        "An error occurred while sending the address details. Try again.",
    };
  }
}
