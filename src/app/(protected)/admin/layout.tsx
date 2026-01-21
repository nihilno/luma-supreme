import Sidebar from "@/components/admin/sidebar";
import { requireAdmin } from "@/lib/auth-guard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
};

async function Layout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <section className="mt-24 grid min-h-dvh grid-cols-[1fr_8fr] gap-4 pb-8 sm:gap-8">
      <div>
        <Sidebar />
      </div>
      <div>{children}</div>
    </section>
  );
}

export default Layout;
