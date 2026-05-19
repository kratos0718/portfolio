import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import './styles/Work.css';
import { projects } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

type Project = typeof projects[0] & { liveNow?: boolean };

const banners: Record<string, { gradient: string; icon: string }> = {
  PathForge:    { gradient: 'linear-gradient(135deg, #0f0c29 0%, #1a1a4e 50%, #24243e 100%)', icon: '🧭' },
  MarkMe:       { gradient: 'linear-gradient(135deg, #0d1b2a 0%, #1b3a4b 50%, #1b5e40 100%)', icon: '📍' },
  SoulSync:     { gradient: 'linear-gradient(135deg, #1a0533 0%, #2d1b69 60%, #3d2080 100%)', icon: '🧠' },
  'Click N Cut':{ gradient: 'linear-gradient(135deg, #1a0a00 0%, #6b2d00 60%, #b84500 100%)', icon: '📷' },
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const banner = banners[project.title] ?? { gradient: 'linear-gradient(135deg, #111 0%, #333 100%)', icon: '⚡' };

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(el, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        delay: index * 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
      });
    });
    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={cardRef} className="proj-card">
      {/* Banner */}
      <div className="proj-banner" style={{ background: banner.gradient }}>
        <span className="proj-banner-icon">{banner.icon}</span>
        {project.liveNow && (
          <span className="proj-live-badge">
            <span className="proj-live-dot" />
            LIVE
          </span>
        )}
      </div>

      {/* Body */}
      <div className="proj-body">
        <div className="proj-meta">
          <span className="proj-year">{project.year}</span>
        </div>
        <h3 className="proj-title">{project.title}</h3>
        <p className="proj-subtitle">{project.subtitle}</p>
        <p className="proj-desc">{project.description}</p>

        <div className="proj-tags">
          {project.tech.map(t => (
            <span key={t} className="proj-tag">{t}</span>
          ))}
        </div>

        <div className="proj-links">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="proj-link proj-link-ghost"
          >
            <FiGithub size={13} /> Code
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className={`proj-link${project.liveNow ? ' proj-link-live' : ''}`}
          >
            <FiExternalLink size={13} />
            {project.liveNow ? 'Try Live' : 'Demo'}
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [liveToast, setLiveToast] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setLiveToast(true), 800);
          setTimeout(() => setLiveToast(false), 5000);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: 'top 75%' };
      gsap.from(tagRef.current, { opacity: 0, y: 20, duration: 0.7, ease: 'power3.out', scrollTrigger: st });
      gsap.from(titleRef.current, { opacity: 0, y: 30, duration: 0.8, delay: 0.1, ease: 'power3.out', scrollTrigger: st });
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

      {/* PathForge live toast */}
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

      <div className="proj-grid">
        {(projects as Project[]).map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
