import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/Achievements.css';
import { achievements } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: 'top 72%' };
      gsap.to(tagRef.current, {
        clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'power3.inOut', scrollTrigger: st,
      });
      gsap.to(titleRef.current, {
        clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'power3.out', delay: 0.1, scrollTrigger: st,
      });
      gsap.utils.toArray<HTMLElement>('.achievement-card').forEach((card, i) => {
        gsap.to(card, {
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.9,
          delay: (i % 2) * 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 86%' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="achievements" id="achievements">
      <div className="achievements-bg-text">WIN</div>

      <div ref={tagRef} className="section-tag">Recognition</div>
      <h2 ref={titleRef} className="section-title">
        Achievements &amp; <span className="accent">programmes</span>
      </h2>

      <div className="achievements-grid">
        {achievements.map((a) => (
          <div
            key={a.title}
            className="achievement-card"
            style={{ clipPath: 'inset(0 0 100% 0)' }}
            data-hover
          >
            <div className="achievement-card-shine" />
            <div className="achievement-card-top">
              <span className="achievement-icon">{a.icon}</span>
              <div className="achievement-meta">
                <span className="achievement-type">{a.type}</span>
                <span className="achievement-year">{a.year}</span>
              </div>
            </div>
            <div className="achievement-title">{a.title}</div>
            <div className="achievement-org">{a.org}</div>
            <p className="achievement-desc">{a.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
