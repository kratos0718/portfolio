import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/Story.css';
import { whyIDoThis } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const entriesRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: 'top 72%' };

      gsap.to(tagRef.current, { clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'power3.inOut', scrollTrigger: st });
      gsap.to(titleRef.current, { clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'power3.out', delay: 0.1, scrollTrigger: st });
      gsap.to(introRef.current, { clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'power3.out', delay: 0.2, scrollTrigger: st });
      gsap.to(entriesRef.current, { clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'power3.out', delay: 0.3, scrollTrigger: st });
      gsap.to(rightRef.current, { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power3.inOut', delay: 0.25, scrollTrigger: st });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="story" id="story">
      <div ref={tagRef} className="section-tag">Personal</div>
      <h2 ref={titleRef} className="section-title">
        Why I'm building{' '}
        <span className="accent">in AI</span>
      </h2>

      <div className="story-why">
        <div className="story-left">
          <div ref={introRef} className="story-intro" style={{ clipPath: 'inset(0 0 100% 0)' }}>
            I didn't start coding to get a job.
            I started because I had a <span className="accent">problem I couldn't ignore</span> —
            and software was the only tool I had.
          </div>

          <div ref={entriesRef} className="story-entries" style={{ clipPath: 'inset(0 0 100% 0)' }}>
            {whyIDoThis.story.map(entry => (
              <div key={entry.label} className="story-entry">
                <div className="story-entry-label">{entry.label}</div>
                <p className="story-entry-text">{entry.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div ref={rightRef} className="story-right" style={{ clipPath: 'inset(0 100% 0 0)' }}>
          <div className="story-quote-card">
            <p className="story-quote-text">
              "Most AI demos are slick. Most AI in production is messy. The gap between the two
              is where I want to work — close enough to the real problem to build something
              that doesn't fall apart outside a notebook."
            </p>
            <div className="story-quote-attr">— Abhinav, on what he actually believes</div>
          </div>
        </div>
      </div>
    </section>
  );
}
