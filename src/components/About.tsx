import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import './styles/About.css';
import { about, personalInfo, socials } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { label: 'Problem Solving (DSA)', val: '212 solved · 82-day streak', pct: 85 },
  { label: 'ML / AI Proficiency', val: 'Outstanding (O) — Sem 5', pct: 92 },
  { label: 'Full Stack Development', val: 'React · Node · FastAPI', pct: 80 },
  { label: 'Cloud & DevOps (AWS/Docker)', val: 'Deployed', pct: 68 },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const hlRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: 'top 72%' };

      gsap.to(tagRef.current, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 0.8, ease: 'power3.inOut',
        scrollTrigger: st,
      });
      gsap.to(titleRef.current, {
        clipPath: 'inset(0 0 0% 0)',
        duration: 0.9, ease: 'power3.out', delay: 0.1,
        scrollTrigger: st,
      });
      gsap.to(bioRef.current, {
        clipPath: 'inset(0 0 0% 0)',
        duration: 0.9, ease: 'power3.out', delay: 0.2,
        scrollTrigger: st,
      });
      gsap.to(hlRef.current, {
        clipPath: 'inset(0 0 0% 0)',
        duration: 0.9, ease: 'power3.out', delay: 0.3,
        scrollTrigger: st,
      });
      gsap.to(rightRef.current, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1, ease: 'power3.inOut', delay: 0.2,
        scrollTrigger: st,
        onComplete: () => {
          // Animate metric bars after reveal
          document.querySelectorAll('.model-metric-fill').forEach((el) => {
            const target = (el as HTMLElement).dataset.pct ?? '0';
            gsap.to(el, { width: `${target}%`, duration: 1.3, ease: 'power3.out', delay: 0.1 });
          });
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about" id="about">
      <div className="about-bg-text">ABHINAV</div>

      <div ref={tagRef} className="section-tag">About me</div>
      <h2 ref={titleRef} className="section-title">
        Who <span className="accent">I am</span>
      </h2>

      <div className="about-grid">
        <div>
          <div className="about-photo-wrap">
            <img src="/images/abhinav.jpg" alt="Abhinav Tarigoppula" className="about-photo" />
            <div className="about-photo-glow" />
          </div>

          <p ref={bioRef} className="about-bio">
            {about.bio}
          </p>
          <div ref={hlRef} className="about-highlights">
            {[
              { icon: '🎓', title: 'B.Tech CSE (AI/ML) · Gitam University · CGPA 8.12', sub: 'O in ML · A+ in AI & Deep Learning · SGPA 8.83 (best sem)' },
              { icon: '🧠', title: 'ML & AI Intern · OneStop AI', sub: 'Improved model accuracy +12%, reduced latency -18%' },
              { icon: '⚔️', title: 'Smart India Hackathon 2024', sub: 'Built SoulSync — AI mental health chatbot' },
              { icon: '📍', title: `Based in ${personalInfo.location}`, sub: 'Open to remote & on-site — Internship · PPO · Full-time' },
            ].map(h => (
              <div key={h.title} className="about-highlight">
                <span className="about-highlight-icon">{h.icon}</span>
                <div className="about-highlight-text">
                  <strong>{h.title}</strong>
                  {h.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div ref={rightRef} className="about-right">
          {/* Model Metrics card */}
          <div className="model-card">
            <div className="model-card-header">
              <span className="model-card-title">Model Metrics</span>
              <span className="model-card-badge">v2025.1</span>
            </div>
            {metrics.map(m => (
              <div key={m.label} className="model-metric">
                <div className="model-metric-row">
                  <span className="model-metric-label">{m.label}</span>
                  <span className="model-metric-val">{m.val}</span>
                </div>
                <div className="model-metric-bar">
                  <div
                    className="model-metric-fill"
                    data-pct={m.pct}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Quick stats grid */}
          <div className="model-stat-grid">
            {[
              { num: '212', label: 'LeetCode Solved' },
              { num: '8.12', label: 'CGPA · Final Year' },
              { num: '+12%', label: 'Accuracy Gain' },
              { num: '-18%', label: 'Latency Cut' },
            ].map(s => (
              <div key={s.label} className="model-stat-cell">
                <div className="model-stat-num">{s.num}</div>
                <div className="model-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Status card */}
          <div className="model-card">
            <div className="model-card-header">
              <span className="model-card-title">Current Status</span>
              <span className="model-card-badge" style={{ color: 'var(--cyan)', borderColor: 'rgba(0,0,0,0.15)' }}>● Active</span>
            </div>
            {[
              ['Year', 'Final Year · 2023–2027'],
              ['Mode', 'Internship · PPO · Job Ready'],
              ['Training on', 'LLMs & RAG Systems'],
              ['Loss', '↓ Decreasing'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                <span style={{ color: 'var(--text-dim)' }}>{k}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text)' }}>{v}</span>
              </div>
            ))}
          </div>

          {/* GitHub activity card */}
          <div className="gh-card">
            <div className="gh-card-header">
              <span className="gh-card-title"><FiGithub size={12} /> GitHub Activity</span>
              <a href={socials.github} target="_blank" rel="noopener noreferrer" className="gh-card-link">
                kratos0718 <FiExternalLink size={10} />
              </a>
            </div>
            <div className="gh-stat-row">
              {[
                { num: '236', label: 'Contributions\nlast year' },
                { num: '82', label: 'Longest\nstreak (days)' },
                { num: '202', label: 'Total\ncontributions' },
                { num: '212', label: 'LeetCode\nsolved' },
              ].map(s => (
                <div key={s.label} className="gh-stat-cell">
                  <span className="gh-stat-num">{s.num}</span>
                  <span className="gh-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
            <div className="gh-repos">
              {['pathforge', 'MarkMe', 'Abhinavs-DSA-progress'].map(repo => (
                <a key={repo}
                  href={`https://github.com/kratos0718/${repo}`}
                  target="_blank" rel="noopener noreferrer"
                  className="gh-repo-pill">
                  ⬡ {repo}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
