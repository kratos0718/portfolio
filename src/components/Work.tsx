import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiExternalLink, FiGithub, FiArrowRight } from 'react-icons/fi';
import './styles/Work.css';
import { projects } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

type Project = typeof projects[0];

const banners: Record<string, { gradient: string; icon: string }> = {
  PathForge:     { gradient: 'linear-gradient(135deg, #0f0c29 0%, #1a1a4e 50%, #24243e 100%)', icon: '🧭' },
  MarkMe:        { gradient: 'linear-gradient(135deg, #0d1b2a 0%, #1b3a4b 50%, #1b5e40 100%)', icon: '📍' },
  SoulSync:      { gradient: 'linear-gradient(135deg, #1a0533 0%, #2d1b69 60%, #3d2080 100%)', icon: '🧠' },
  'Click N Cut': { gradient: 'linear-gradient(135deg, #1a0a00 0%, #6b2d00 60%, #b84500 100%)', icon: '📷' },
};

/* ── Featured card (PathForge) — full-width case study ── */
function FeaturedCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const banner = banners[project.title]!;
  const cs = project.caseStudy!;
  const hasImages = project.images && project.images.length > 0;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0, y: 48, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="proj-featured">
      {/* Left — banner panel */}
      <div className="proj-featured-banner" style={{ background: banner.gradient, overflow: 'hidden', position: 'relative' }}>
        {hasImages ? (
          <>
            {/* Screenshot collage */}
            <div className="pfeat-screenshots">
              {project.images!.slice(0, 2).map((src, i) => (
                <img key={i} src={src} alt="" className={`pfeat-screenshot pfeat-screenshot-${i}`}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              ))}
            </div>
            {/* Dark overlay so stats remain readable */}
            <div className="pfeat-screenshot-overlay" />
            <div className="pfeat-stat pfeat-stat-overlay">
              <span className="pfeat-stat-num">{project.stat!.num}</span>
              <span className="pfeat-stat-label">{project.stat!.label}</span>
            </div>
          </>
        ) : (
          <>
            <span className="pfeat-icon">{banner.icon}</span>
            <div className="pfeat-stat">
              <span className="pfeat-stat-num">{project.stat!.num}</span>
              <span className="pfeat-stat-label">{project.stat!.label}</span>
            </div>
          </>
        )}
        <span className="proj-live-badge">
          <span className="proj-live-dot" /> LIVE
        </span>
      </div>

      {/* Right — content panel */}
      <div className="proj-featured-body">
        <div className="pfeat-top">
          <span className="pfeat-tag">Featured Project</span>
          <span className="proj-year">{project.year}</span>
        </div>

        <h3 className="pfeat-title">{project.title}</h3>
        <p className="pfeat-subtitle">{project.subtitle}</p>

        {/* Case study — Problem → Fix → Result */}
        <div className="pfeat-case">
          <div className="pfeat-case-col">
            <span className="pfeat-case-label">Problem</span>
            <p className="pfeat-case-text">{cs.problem}</p>
          </div>
          <FiArrowRight className="pfeat-case-arrow" size={14} />
          <div className="pfeat-case-col">
            <span className="pfeat-case-label">Fix</span>
            <p className="pfeat-case-text">{cs.fix}</p>
          </div>
          <FiArrowRight className="pfeat-case-arrow" size={14} />
          <div className="pfeat-case-col">
            <span className="pfeat-case-label">Result</span>
            <p className="pfeat-case-text pfeat-case-result">{cs.result}</p>
          </div>
        </div>

        <div className="proj-tags">
          {project.tech.map(t => <span key={t} className="proj-tag">{t}</span>)}
        </div>

        <div className="proj-links">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="proj-link proj-link-ghost">
            <FiGithub size={13} /> Code
          </a>
          <a href={project.live} target="_blank" rel="noopener noreferrer" className="proj-link proj-link-live">
            <FiExternalLink size={13} /> Try Live
          </a>
        </div>
      </div>
    </div>
  );
}

/* ── Regular project card ── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const banner = banners[project.title] ?? { gradient: 'linear-gradient(135deg,#111,#333)', icon: '⚡' };
  const hasImage = project.images && project.images.length > 0;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0, y: 36, duration: 0.7, delay: index * 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 88%' },
      });
    });
    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={ref} className="proj-card">
      <div className="proj-banner" style={{ background: banner.gradient }}>
        {hasImage ? (
          <>
            <img
              src={project.images![0]}
              alt={project.title}
              className="proj-banner-img"
              onError={(e) => {
                const el = e.target as HTMLImageElement;
                el.style.display = 'none';
                (el.closest('.proj-banner') as HTMLElement).style.background = banner.gradient;
              }}
            />
            <div className="proj-banner-img-overlay" />
          </>
        ) : (
          <span className="proj-banner-icon">{banner.icon}</span>
        )}
        {project.liveNow && (
          <span className="proj-live-badge" style={{ top: 14, left: 14, right: 'auto' }}>
            <span className="proj-live-dot" /> LIVE
          </span>
        )}
        {project.stat && (
          <div className="proj-banner-stat">
            <span className="proj-banner-stat-num">{project.stat.num}</span>
            <span className="proj-banner-stat-label">{project.stat.label}</span>
          </div>
        )}
      </div>

      <div className="proj-body">
        <div className="proj-meta"><span className="proj-year">{project.year}</span></div>
        <h3 className="proj-title">{project.title}</h3>
        <p className="proj-subtitle">{project.subtitle}</p>
        <p className="proj-desc">{project.description}</p>
        <div className="proj-tags">
          {project.tech.map(t => <span key={t} className="proj-tag">{t}</span>)}
        </div>
        <div className="proj-links">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="proj-link proj-link-ghost">
            <FiGithub size={13} /> Code
          </a>
          <a href={project.live} target="_blank" rel="noopener noreferrer" className="proj-link">
            <FiExternalLink size={13} /> Demo
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef     = useRef<HTMLDivElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const [liveToast, setLiveToast] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setLiveToast(true), 800);
        setTimeout(() => setLiveToast(false), 5000);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: 'top 75%' };
      gsap.from(tagRef.current,   { opacity: 0, y: 20, duration: 0.7, ease: 'power3.out', scrollTrigger: st });
      gsap.from(titleRef.current, { opacity: 0, y: 30, duration: 0.8, delay: 0.1, ease: 'power3.out', scrollTrigger: st });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const featured = projects.find(p => p.liveNow && p.caseStudy)!;
  const rest     = projects.filter(p => p.title !== featured.title);

  return (
    <section ref={sectionRef} className="work" id="work">
      <div className="work-bg-text">WORK</div>

      <div ref={tagRef} className="section-tag">Projects</div>
      <h2 ref={titleRef} className="section-title">
        Things I've <span className="accent">built</span>
      </h2>

      {/* Live toast */}
      <div className={`work-live-toast${liveToast ? ' visible' : ''}`}>
        <span className="work-live-toast-dot" />
        <span className="work-live-toast-text">PathForge is live in production</span>
        <a href="https://www.pathforge.online/auth" target="_blank" rel="noopener noreferrer"
          className="work-live-toast-btn" onClick={() => setLiveToast(false)}>
          Try it <FiExternalLink size={10} />
        </a>
        <button className="work-live-toast-close" onClick={() => setLiveToast(false)}>×</button>
      </div>

      {/* Featured case study */}
      <FeaturedCard project={featured} />

      {/* Rest of projects */}
      <div className="proj-grid">
        {rest.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
      </div>
    </section>
  );
}
