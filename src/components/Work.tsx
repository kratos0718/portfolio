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
  const [liveToast, setLiveToast] = useState(false);

  // Show PathForge live toast once on scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setLiveToast(true), 800);
          setTimeout(() => setLiveToast(false), 5000);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

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

      {/* PathForge live toast notification */}
      <div className={`work-live-toast${liveToast ? ' visible' : ''}`}>
        <span className="work-live-toast-dot" />
        <span className="work-live-toast-text">PathForge is live in production</span>
        <a
          href="https://www.pathforge.online/auth"
          target="_blank"
          rel="noopener noreferrer"
          className="work-live-toast-btn"
          onClick={() => setLiveToast(false)}
        >
          Try it <FiExternalLink size={10} />
        </a>
        <button className="work-live-toast-close" onClick={() => setLiveToast(false)}>×</button>
      </div>

      {/* Floating preview */}
      <div
        ref={previewRef}
        className={`work-preview${activeProject ? ' visible' : ''}`}
        style={{ left: -999, top: -999 }}
      >
        <div className="work-preview-inner">
          <div className="work-preview-title">{activeProject?.title}</div>
          <div className="work-preview-url">{activeProject?.live.replace('https://', '')}</div>
          {(activeProject as any)?.liveNow && (
            <div className="work-preview-live-badge">
              <span className="work-preview-live-dot" /> LIVE NOW
            </div>
          )}
        </div>
      </div>

      {/* Desktop: text list with hover image */}
      <div className="work-list">
        {projects.map((p, i) => (
          <div
            key={p.title}
            className={`work-item${(p as any).liveNow ? ' work-item-featured' : ''}`}
            data-hover
            onMouseEnter={() => setActiveProject(p)}
            onMouseLeave={() => setActiveProject(null)}
          >
            <span className="work-item-num">0{i + 1}</span>
            <div className="work-item-info">
              <div className="work-item-title">
                {p.title}
                {(p as any).liveNow && <span className="work-live-badge"><span className="work-live-badge-dot" />live</span>}
              </div>
              <div className="work-item-sub">{p.subtitle}</div>
            </div>
            <div className="work-item-tech">
              {p.tech.slice(0, 3).map(t => (
                <span key={t} className="work-tech-pill">{t}</span>
              ))}
            </div>
            <div className="work-item-links">
              {(p as any).liveNow ? (
                <a href={p.live} target="_blank" rel="noopener noreferrer" className="work-item-link work-item-link-live">
                  Test Live <FiExternalLink size={11} />
                </a>
              ) : (
                <a href={p.live} target="_blank" rel="noopener noreferrer" className="work-item-link">
                  Live <FiExternalLink size={11} />
                </a>
              )}
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
          <div key={p.title} className={`work-mobile-card${(p as any).liveNow ? ' work-mobile-card-featured' : ''}`}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.1em' }}>{p.year}</span>
              {(p as any).liveNow && (
                <span className="work-mobile-live-badge"><span className="work-live-badge-dot" />live</span>
              )}
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{p.title}</div>
            <div style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 16, lineHeight: 1.65 }}>{p.description}</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
              {p.tech.map(t => <span key={t} className="work-tech-pill">{t}</span>)}
            </div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              {(p as any).liveNow ? (
                <a href={p.live} target="_blank" rel="noopener noreferrer" className="work-item-link work-item-link-live">
                  Test Live <FiExternalLink size={11} />
                </a>
              ) : (
                <a href={p.live} target="_blank" rel="noopener noreferrer" className="work-item-link">Live <FiExternalLink size={11} /></a>
              )}
              <a href={p.github} target="_blank" rel="noopener noreferrer" className="work-item-link-ghost"><FiGithub size={11} /> Code</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
