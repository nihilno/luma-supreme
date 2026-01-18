import { Toaster } from "@/components/ui/sonner";
import { LenisProvider } from "@/lib/lenis";
import { ThemeProvider } from "./theme-provider";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <LenisProvider />
      <Toaster />
    </ThemeProvider>
  );
}

export default Providers;
