import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './styles/Cursor.css';

export default function Cursor() {
  const blobRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const ring = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      gsap.to(blobRef.current, {
        x: e.clientX, y: e.clientY,
        duration: 0.06, ease: 'none',
      });
    };

    const animateRing = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.1;
      ring.current.y += (pos.current.y - ring.current.y) * 0.1;
      gsap.set(ringRef.current, { x: ring.current.x, y: ring.current.y });
      rafRef.current = requestAnimationFrame(animateRing);
    };
    animateRing();

    const setHover = (on: boolean) => {
      blobRef.current?.classList.toggle('hovering', on);
      ringRef.current?.classList.toggle('hovering', on);
    };
    const setClick = (on: boolean) => {
      blobRef.current?.classList.toggle('clicking', on);
    };

    const attachHover = () => {
      document.querySelectorAll('a, button, [data-hover]').forEach(el => {
        el.addEventListener('mouseenter', () => setHover(true));
        el.addEventListener('mouseleave', () => setHover(false));
      });
    };
    attachHover();

    // Re-attach when DOM changes (lazy-loaded sections)
    const obs = new MutationObserver(attachHover);
    obs.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', () => setClick(true));
    window.addEventListener('mouseup', () => setClick(false));

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      obs.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={blobRef} className="cursor-blob" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
