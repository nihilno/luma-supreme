"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function LenisProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: false, // ← disable autoRaf
      lerp: 0.065,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -12 * t)),
      wheelMultiplier: 0.85,
      touchMultiplier: 1.6,
      syncTouch: true,
      syncTouchLerp: 0.1,
    });

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    lenis.scrollTo(0, { immediate: true, force: true });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [pathname]);

  return null;
}
