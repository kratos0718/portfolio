import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

export default function SmoothScroll() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });
    lenisInstance = lenis;

    lenis.on('scroll', ScrollTrigger.update);
    lenis.on('scroll', ({ progress }: { progress: number }) => {
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
    });

    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Intercept all anchor clicks — route them through Lenis instead of browser jump
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const hash = anchor.getAttribute('href');
      if (!hash || hash === '#') return;

      const el = document.querySelector(hash);
      if (!el) return;

      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, {
        offset: -80, // account for fixed navbar height
        duration: 1.6,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
      lenisInstance = null;
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div
      ref={progressRef}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, var(--cyan-muted), var(--cyan))',
        transformOrigin: 'left',
        transform: 'scaleX(0)',
        zIndex: 99999,
        pointerEvents: 'none',
        boxShadow: '0 0 8px var(--cyan)',
      }}
    />
  );
}
