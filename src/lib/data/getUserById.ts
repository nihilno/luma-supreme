import "server-only";

import { prisma } from "@/lib/prisma";

export async function getUserById(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) throw new Error("Cannot find this user.");
  return user;
}
