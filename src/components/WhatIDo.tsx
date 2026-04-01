import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/WhatIDo.css';
import { whatIDo } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function WhatIDo() {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: 'top 72%' };
      gsap.to(tagRef.current, { clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'power3.inOut', scrollTrigger: st });
      gsap.to(titleRef.current, { clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'power3.out', delay: 0.1, scrollTrigger: st });

      gsap.utils.toArray<HTMLElement>('.whatido-card').forEach((card, i) => {
        gsap.to(card, {
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.9, delay: i * 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 86%' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="whatido" id="whatido">
      <div ref={tagRef} className="section-tag">Focus Areas</div>
      <h2 ref={titleRef} className="section-title">
        What I <span className="accent">do</span>
      </h2>
      <div className="whatido-grid">
        {whatIDo.map((item, i) => (
          <div key={item.title} className="whatido-card" data-hover style={{ clipPath: 'inset(0 0 100% 0)' }}>
            <div className="whatido-card-glow" />
            <div className="whatido-card-num">0{i + 1}</div>
            <div className="whatido-icon">{item.icon}</div>
            <h3 className="whatido-card-title">{item.title}</h3>
            <p className="whatido-card-desc">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
