"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function LenisProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 2,
      syncTouch: true,
      syncTouchLerp: 0.1,
      anchors: true,
    });

    lenis?.scrollTo(0, { immediate: true, force: true });

    return () => {
      lenis.destroy();
    };
  }, [pathname]);

  return null;
}
