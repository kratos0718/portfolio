import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiExternalLink, FiGithub, FiArrowRight } from 'react-icons/fi';
import './styles/Work.css';
import { projects } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<typeof projects[0] | null>(null);

  // Move preview with mouse
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!previewRef.current) return;
      gsap.to(previewRef.current, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.45,
        ease: 'power2.out',
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: 'top 72%' };

      gsap.to(tagRef.current, {
        clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'power3.inOut',
        scrollTrigger: st,
      });
      gsap.to(titleRef.current, {
        clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'power3.out', delay: 0.1,
        scrollTrigger: st,
      });
      gsap.utils.toArray<HTMLElement>('.work-item').forEach((item, i) => {
        gsap.to(item, {
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.8,
          delay: i * 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 88%' },
        });
      });
      gsap.utils.toArray<HTMLElement>('.work-mobile-card').forEach((card, i) => {
        gsap.to(card, {
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.8, delay: i * 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="work" id="work">
      <div className="work-bg-text">WORK</div>

      <div ref={tagRef} className="section-tag">Projects</div>
      <h2 ref={titleRef} className="section-title">
        Things I've <span className="accent">built</span>
      </h2>

      {/* Floating preview */}
      <div
        ref={previewRef}
        className={`work-preview${activeProject ? ' visible' : ''}`}
        style={{ left: -999, top: -999 }}
      >
        <div className="work-preview-inner">
          <div className="work-preview-title">{activeProject?.title}</div>
          <div className="work-preview-url">{activeProject?.live.replace('https://', '')}</div>
        </div>
      </div>

      {/* Desktop: text list with hover image */}
      <div className="work-list">
        {projects.map((p, i) => (
          <div
            key={p.title}
            className="work-item"
            data-hover
            onMouseEnter={() => setActiveProject(p)}
            onMouseLeave={() => setActiveProject(null)}
          >
            <span className="work-item-num">0{i + 1}</span>
            <div className="work-item-info">
              <div className="work-item-title">{p.title}</div>
              <div className="work-item-sub">{p.subtitle}</div>
            </div>
            <div className="work-item-tech">
              {p.tech.slice(0, 3).map(t => (
                <span key={t} className="work-tech-pill">{t}</span>
              ))}
            </div>
            <div className="work-item-links">
              <a href={p.live} target="_blank" rel="noopener noreferrer" className="work-item-link">
                Live <FiExternalLink size={11} />
              </a>
              <a href={p.github} target="_blank" rel="noopener noreferrer" className="work-item-link-ghost">
                <FiGithub size={11} /> <FiArrowRight size={10} />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: card grid */}
      <div className="work-grid-mobile">
        {projects.map(p => (
          <div key={p.title} className="work-mobile-card">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.1em', marginBottom: 8 }}>{p.year}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{p.title}</div>
            <div style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 16, lineHeight: 1.65 }}>{p.description}</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
              {p.tech.map(t => <span key={t} className="work-tech-pill">{t}</span>)}
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <a href={p.live} target="_blank" rel="noopener noreferrer" className="work-item-link">Live <FiExternalLink size={11} /></a>
              <a href={p.github} target="_blank" rel="noopener noreferrer" className="work-item-link-ghost"><FiGithub size={11} /> Code</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
