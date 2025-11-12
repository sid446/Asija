// app/providers/ScrollProvider.tsx
'use client';

import Lenis from '@studio-freight/lenis';
import { useEffect } from 'react';

// Define Lenis options type (from official docs)
interface LenisOptions {
  duration?: number;
  easing?: (t: number) => number;
  smoothWheel?: boolean;
  smoothTouch?: boolean;
  mouseMultiplier?: number;
  touchMultiplier?: number;
  infinite?: boolean;
  orientation?: 'vertical' | 'horizontal';
  gestureOrientation?: 'vertical' | 'horizontal';
  lerp?: number;
  normalizeWheel?: boolean;
}

export default function ScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Type-safe Lenis instance
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smoothWheel: true,
      smoothTouch: false,
      mouseMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
    } as LenisOptions);

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const handle = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(handle);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}