import { prisma } from "@/lib/prisma";
import "server-only";

export async function getUserById(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new Error("Cannot find this user.");
    return user;
  } catch (error) {
    console.error(error);
  }
}
