import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/Career.css';
import { career } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function Career() {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: 'top 72%' };
      gsap.to(tagRef.current, { clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'power3.inOut', scrollTrigger: st });
      gsap.to(titleRef.current, { clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'power3.out', delay: 0.1, scrollTrigger: st });

      gsap.utils.toArray<HTMLElement>('.career-item').forEach((item, i) => {
        gsap.to(item, {
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.9, delay: i * 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 86%' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="career" id="career">
      <div ref={tagRef} className="section-tag">Experience</div>
      <h2 ref={titleRef} className="section-title">
        Career <span className="accent">journey</span>
      </h2>
      <div className="career-timeline">
        {career.map((job) => (
          <div key={job.company} className="career-item" style={{ clipPath: 'inset(0 0 100% 0)' }}>
            <div className="career-dot" />
            <div className="career-header">
              <div className="career-role">{job.role}</div>
              <div className="career-period">{job.period}</div>
            </div>
            <div className="career-company">
              {job.company}
              <span className="career-type-badge">{job.type}</span>
            </div>
            <ul className="career-points">
              {job.points.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </div>
        ))}

        {/* Future entry placeholder */}
        <div className="career-item career-future" style={{ clipPath: 'inset(0 0 100% 0)' }}>
          <div className="career-dot career-dot-future" />
          <div className="career-header">
            <div className="career-role" style={{ color: 'var(--text-muted)' }}>Next Role</div>
            <div className="career-period" style={{ color: 'var(--text-muted)', borderColor: 'var(--border)' }}>2025 →</div>
          </div>
          <div className="career-company" style={{ color: 'var(--text-muted)' }}>
            Your company?
            <span className="career-type-badge">Open</span>
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic' }}>
            Actively seeking internship opportunities in AI/ML and full-stack engineering.
          </p>
        </div>
      </div>
    </section>
  );
}
