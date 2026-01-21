import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const session = await auth();

  const role = session?.user?.role;
  if (role !== "ADMIN") redirect("/unauthorized");

  return session;
}
