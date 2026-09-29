import { useEffect } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Experience from './Experience';
import Projects from './Projects';
import OpenSource from './OpenSource';
import Research from './Research';
import Contact from './Contact';
import './styles/site.css';

// Sections fade up once as they enter the viewport. Everything is visible
// by default; the hidden state only applies after JS marks the page ready.
function useReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const els = document.querySelectorAll<HTMLElement>('.reveal');
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      }),
      { rootMargin: '0px 0px -10% 0px' },
    );
    els.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('is-in');
      else io.observe(el);
    });
    document.documentElement.classList.add('reveal-ready');
    return () => io.disconnect();
  }, []);
}

export default function MainContainer() {
  useReveal();
  return (
    <>
      <Navbar />
      <main className="site">
        <Hero />
        <Experience />
        <Projects />
        <OpenSource />
        <Research />
      </main>
      <Contact />
    </>
  );
}
