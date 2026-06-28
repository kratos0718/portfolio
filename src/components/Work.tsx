import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiExternalLink, FiGithub, FiArrowRight } from 'react-icons/fi';
import './styles/Work.css';
import { projects } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

type Project = typeof projects[0];

/* ── Project SVG logos ── */
const PathForgeLogo = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Outer hexagon */}
    <path d="M32 6L56 19V45L32 58L8 45V19L32 6Z" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2"/>
    {/* Fork node left */}
    <circle cx="16" cy="32" r="4" fill="white" opacity="0.9"/>
    {/* Stem */}
    <path d="M20 32H34" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
    {/* Upper branch */}
    <path d="M34 32L44 22" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
    <circle cx="47" cy="19" r="4" fill="white" opacity="0.75"/>
    {/* Lower branch */}
    <path d="M34 32L44 42" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
    <circle cx="47" cy="45" r="4" fill="white" opacity="0.75"/>
    {/* AI spark/star at fork */}
    <path d="M32 23L33.4 27.6L38 29L33.4 30.4L32 35L30.6 30.4L26 29L30.6 27.6L32 23Z" fill="white" opacity="0.95"/>
  </svg>
);

const MarkMeLogo = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    {/* Face circle */}
    <circle cx="32" cy="27" r="14" stroke="white" strokeWidth="1.6"/>
    {/* Eyes */}
    <circle cx="27" cy="25" r="2.2" fill="white" opacity="0.9"/>
    <circle cx="37" cy="25" r="2.2" fill="white" opacity="0.9"/>
    {/* Subtle smile */}
    <path d="M26 31Q32 36.5 38 31" stroke="white" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
    {/* Scan corner brackets */}
    <path d="M8 18V10H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
    <path d="M56 18V10H48" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
    <path d="M8 46V54H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
    <path d="M56 46V54H48" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
    {/* Checkmark badge */}
    <circle cx="32" cy="50" r="8" fill="rgba(74,222,128,0.9)"/>
    <path d="M28 50L31 53L37 47" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SoulSyncLogo = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    {/* Left circle */}
    <circle cx="24" cy="28" r="16" stroke="white" strokeWidth="1.5" opacity="0.8"/>
    {/* Right circle */}
    <circle cx="40" cy="28" r="16" stroke="white" strokeWidth="1.5" opacity="0.8"/>
    {/* Heartbeat / EEG wave through the center */}
    <path d="M8 38L16 38L19 32L22 42L25 36L28 42L31 36L34 42L37 36L40 38L48 38L56 38"
      stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Dot center glow */}
    <circle cx="32" cy="28" r="3" fill="white" opacity="0.85"/>
  </svg>
);

const ClickNCutLogo = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    {/* Camera body */}
    <rect x="6" y="18" width="52" height="36" rx="5" stroke="white" strokeWidth="1.6"/>
    {/* Viewfinder bump */}
    <path d="M22 18V13H42V18" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Outer lens ring */}
    <circle cx="32" cy="36" r="13" stroke="white" strokeWidth="1.6"/>
    {/* Mid lens ring */}
    <circle cx="32" cy="36" r="8" stroke="white" strokeWidth="1.2" opacity="0.6"/>
    {/* Aperture blades — 6 blades */}
    <path d="M32 28L34 33L39 33L35 37L37 42L32 38L27 42L29 37L25 33L30 33Z" fill="white" opacity="0.25"/>
    {/* Center pupil */}
    <circle cx="32" cy="36" r="3" fill="white" opacity="0.8"/>
    {/* Flash */}
    <circle cx="51" cy="24" r="3.5" fill="white" opacity="0.55"/>
    <circle cx="51" cy="24" r="1.5" fill="white"/>
  </svg>
);

const PaperMindLogo = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    {/* Document body */}
    <path d="M14 8H40L52 20V58H14V8Z" stroke="white" strokeWidth="1.6" strokeLinejoin="round" fill="none"/>
    {/* Folded corner */}
    <path d="M40 8V20H52" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.55"/>
    {/* Knowledge graph nodes */}
    <circle cx="28" cy="36" r="5" stroke="white" strokeWidth="1.6"/>
    <circle cx="42" cy="28" r="3.5" fill="white" opacity="0.75"/>
    <circle cx="42" cy="46" r="3.5" fill="white" opacity="0.75"/>
    <circle cx="20" cy="42" r="2.5" fill="white" opacity="0.5"/>
    {/* Connections */}
    <line x1="33" y1="34" x2="38.5" y2="29.5" stroke="white" strokeWidth="1.2" opacity="0.7"/>
    <line x1="33" y1="39" x2="38.5" y2="44.5" stroke="white" strokeWidth="1.2" opacity="0.7"/>
    <line x1="23" y1="38" x2="22" y2="40" stroke="white" strokeWidth="1.2" opacity="0.5"/>
    {/* Sparkle on center node */}
    <circle cx="28" cy="36" r="2" fill="white" opacity="0.9"/>
  </svg>
);

const CodeHoundLogo = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    {/* Magnifier ring */}
    <circle cx="28" cy="28" r="15" stroke="white" strokeWidth="1.8"/>
    {/* Magnifier handle */}
    <path d="M39 39L52 52" stroke="white" strokeWidth="2.4" strokeLinecap="round"/>
    {/* Code brackets inside lens */}
    <path d="M24 22L18 28L24 34" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M32 22L38 28L32 34" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Bug dot */}
    <circle cx="28" cy="28" r="2.4" fill="white" opacity="0.85"/>
  </svg>
);

function ProjectLogo({ title }: { title: string }) {
  if (title === 'PathForge')    return <PathForgeLogo />;
  if (title === 'MarkMe')       return <MarkMeLogo />;
  if (title === 'SoulSync')     return <SoulSyncLogo />;
  if (title === 'Click N Cut')  return <ClickNCutLogo />;
  if (title === 'PaperMind')    return <PaperMindLogo />;
  if (title === 'CodeHound')    return <CodeHoundLogo />;
  return null;
}

const banners: Record<string, { gradient: string }> = {
  PathForge:          { gradient: 'linear-gradient(135deg, #0f0c29 0%, #1a1a4e 50%, #24243e 100%)' },
  MarkMe:             { gradient: 'linear-gradient(135deg, #0d1b2a 0%, #1b3a4b 50%, #1b5e40 100%)' },
  SoulSync:           { gradient: 'linear-gradient(135deg, #1a0533 0%, #2d1b69 60%, #3d2080 100%)' },
  'Click N Cut':      { gradient: 'linear-gradient(135deg, #1a0a00 0%, #6b2d00 60%, #b84500 100%)' },
  PaperMind:          { gradient: 'linear-gradient(135deg, #001a2c 0%, #002d4a 50%, #00405e 100%)' },
  CodeHound:          { gradient: 'linear-gradient(135deg, #0a0a0a 0%, #1f2933 55%, #2d3a2d 100%)' },
};

/* ── Featured card (PathForge) — full-width case study ── */
function FeaturedCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const banner = banners[project.title] ?? { gradient: 'linear-gradient(135deg,#111,#333)' };
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
            <span className="pfeat-icon"><ProjectLogo title={project.title} /></span>
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
  const banner = banners[project.title] ?? { gradient: 'linear-gradient(135deg,#111,#333)' };
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
          <span className="proj-banner-icon"><ProjectLogo title={project.title} /></span>
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
            <FiExternalLink size={13} /> {(project as any).linkLabel ?? 'Demo'}
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
