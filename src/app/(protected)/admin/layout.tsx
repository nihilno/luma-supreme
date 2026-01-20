import Sidebar from "@/components/admin/sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
};

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="mt-16 grid min-h-150 grid-cols-[1fr_8fr] gap-4 pb-8 sm:gap-8">
      <div>
        <Sidebar />
      </div>
      <div>{children}</div>
    </section>
  );
}

export default Layout;
