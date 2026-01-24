import { ourFileRouter } from "@/app/api/uploadthing/core";
import { Toaster } from "@/components/ui/sonner";
import { LenisProvider } from "@/lib/lenis";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ThemeProvider } from "./theme-provider";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
      {children}
      <LenisProvider />
      <Toaster />
    </ThemeProvider>
  );
}

export default Providers;
