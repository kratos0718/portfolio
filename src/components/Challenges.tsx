import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/Challenges.css';
import { challenges } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function Challenges() {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: 'top 75%' };
      gsap.to(tagRef.current, { clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'power3.inOut', scrollTrigger: st });
      gsap.to(titleRef.current, { clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'power3.out', delay: 0.1, scrollTrigger: st });

      gsap.utils.toArray<HTMLElement>('.challenge-card').forEach((card, i) => {
        gsap.to(card, {
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.9, delay: i * 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="challenges" id="challenges">
      <div ref={tagRef} className="section-tag">Performance improvements</div>
      <h2 ref={titleRef} className="section-title">
        Walls I hit —{' '}
        <span className="accent">and got through</span>
      </h2>

      <div className="challenges-list">
        {challenges.map((c) => (
          <div
            key={c.problem}
            className="challenge-card"
            style={{ clipPath: 'inset(0 0 100% 0)' }}
            data-hover
          >
            <div className="challenge-col">
              <div className="challenge-col-label">Problem</div>
              <div className="challenge-problem">{c.problem}</div>
              <p className="challenge-context">{c.context}</p>
            </div>
            <div className="challenge-col">
              <div className="challenge-col-label">What I did</div>
              <p className="challenge-fix">{c.fix}</p>
            </div>
            <div className="challenge-col">
              <div className="challenge-col-label">Result</div>
              <p className="challenge-result">{c.result}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
