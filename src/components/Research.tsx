import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiExternalLink, FiBookOpen } from 'react-icons/fi';
import './styles/Research.css';
import { publications } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function Research() {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: 'top 74%' };
      gsap.to(tagRef.current, {
        clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'power3.inOut', scrollTrigger: st,
      });
      gsap.to(titleRef.current, {
        clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'power3.out', delay: 0.1, scrollTrigger: st,
      });
      gsap.utils.toArray<HTMLElement>('.rp-card').forEach((card, i) => {
        gsap.from(card, {
          opacity: 0, y: 40, duration: 0.8, delay: i * 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="research" id="research">
      <div className="research-bg-text">RES</div>

      <div ref={tagRef} className="section-tag">Research</div>
      <h2 ref={titleRef} className="section-title">
        Published <span className="accent">papers</span>
      </h2>

      <div className="rp-meta-bar">
        <span className="rp-meta-item"><FiBookOpen size={11} /> 2 Conference Papers</span>
        <span className="rp-meta-sep">·</span>
        <span className="rp-meta-item">57 Total Reads</span>
        <span className="rp-meta-sep">·</span>
        <a href="https://www.researchgate.net/profile/Abhinav-Tarigoppula"
          target="_blank" rel="noopener noreferrer" className="rp-meta-link">
          ResearchGate Profile <FiExternalLink size={9} />
        </a>
      </div>

      <div className="rp-grid">
        {publications.map((p, i) => (
          <a
            key={p.title}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`rp-card${p.featured ? ' rp-card-featured' : ''}`}
          >
            <div className="rp-card-inner">
              <div className="rp-card-top">
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                  <span className="rp-type">{p.type}</span>
                  {(p as any).status && (
                    <span className="rp-type rp-type-review">{(p as any).status}</span>
                  )}
                </div>
                <div className="rp-stats">
                  {p.reads > 0 && <span className="rp-reads">{p.reads} reads</span>}
                  <span className="rp-date">{p.date}</span>
                </div>
              </div>

              <h3 className="rp-title">{p.title}</h3>
              <p className="rp-abstract">{p.abstract}</p>

              <div className="rp-tags">
                {p.tags.map(t => <span key={t} className="rp-tag">{t}</span>)}
              </div>

              <div className="rp-footer">
                <div className="rp-authors">
                  {p.coAuthors.map((a, j) => (
                    <span key={a} className={`rp-author${(a === 'Abhinav Tarigoppula' || a === 'Tarigoppula Sree Sai Abhinav') ? ' rp-author-me' : ''}`}>
                      {a}{j < p.coAuthors.length - 1 ? ' · ' : ''}
                    </span>
                  ))}
                </div>
                <span className="rp-view">View paper <FiExternalLink size={10} /></span>
              </div>

              {/* Index number */}
              <span className="rp-index">0{i + 1}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
