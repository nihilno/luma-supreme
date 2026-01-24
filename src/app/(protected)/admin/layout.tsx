import Sidebar from "@/components/admin/sidebar";
import { requireAdmin } from "@/lib/auth-guard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
};

async function Layout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <section className="flex flex-col py-8">
      <div className="mx-auto w-full max-w-5xl">
        <Sidebar />
      </div>
      <div className="mt-16 min-h-150">{children}</div>
    </section>
  );
}

export default Layout;
