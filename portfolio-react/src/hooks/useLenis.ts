import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

export function scrollToHash(hash: string, offset = -80) {
  const element = document.querySelector(hash) as HTMLElement | null;
  if (!element) return;
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(element, { offset });
  } else {
    window.scrollTo({ top: element.offsetTop - Math.abs(offset), behavior: 'smooth' });
  }
}
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisInstance = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
}