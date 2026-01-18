"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { paymentSchema } from "@/lib/schemas/payment";

export async function updatePaymentMethod(formData: unknown) {
  const validated = paymentSchema.safeParse(formData);
  if (!validated.success) {
    return {
      success: false,
      message: "Wrong payment type was received. Please, try again.",
    };
  }

  try {
    const session = await auth();
    const user = await prisma.user.findUnique({
      where: {
        id: session?.user?.id,
      },
    });

    if (!user)
      return {
        success: false,
        message: "You must be logged in to perform this action.",
      };

    const paymentMethod = validated.data;
    await prisma.user.update({
      data: { paymentMethod: paymentMethod.type },
      where: { id: user.id },
    });

    return {
      success: true,
      message: "Payment method added successfully.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message:
        "An error occurred while updating payment method. Try again later.",
    };
  }
}
