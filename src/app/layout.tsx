import Footer from "@/components/global/footer";
import Header from "@/components/global/header";
import Providers from "@/components/global/providers";
import { manrope } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Luma",
    default: "Home | Luma",
  },
  description:
    "Luma Supreme is a fullstack, e-commerce store created with Next.js, Prisma, PostgreSQL, Next Auth, TypeScript, shadcn/ui and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("flex min-h-dvh flex-col antialiased", manrope.className)}
      >
        <Providers>
          <Header />
          <main className="wrapper flex-1 py-16">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
