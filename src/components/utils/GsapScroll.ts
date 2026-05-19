import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollAnimations() {
  // Animate all section-tag elements that weren't caught by component-level triggers
  gsap.utils.toArray<HTMLElement>('.section-tag').forEach((el) => {
    if (el.style.opacity !== '1') {
      gsap.from(el, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
      });
    }
  });
}

export function killScrollAnimations() {
  ScrollTrigger.getAll().forEach(t => t.kill());
}
