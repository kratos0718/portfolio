import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/SocialProof.css';

gsap.registerPlugin(ScrollTrigger);

const orgs = [
  { name: 'HuggingFace',            detail: 'Merged PR #4289 · v1.17.0',       tag: 'Open Source' },
  { name: 'agno (25k★)',            detail: '4 Merged PRs · @kausmeows',        tag: 'Open Source' },
  { name: 'pydantic (22k★)',        detail: 'Merged PR #13239',                 tag: 'Open Source' },
  { name: 'marimo (YC)',            detail: 'Merged PR #9667 · New feature',    tag: 'Open Source' },
  { name: 'OneStop AI',             detail: 'ML & AI Intern · 2025',            tag: 'Internship'  },
  { name: 'PwC',                    detail: 'AI & Data Advisory · 2026',        tag: 'Internship'  },
  { name: 'GITAM University',       detail: 'B.Tech CSE AI/ML · CGPA 8.12',    tag: 'Education'   },
];

export default function SocialProof() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.sp-item', {
        opacity: 0,
        y: 16,
        duration: 0.55,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 90%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="social-proof">
      <span className="sp-eyebrow">Experience &amp; credentials</span>
      <div className="sp-items">
        {orgs.map((o, i) => (
          <div key={o.name} className="sp-item">
            {i > 0 && <span className="sp-sep" />}
            <span className="sp-tag">{o.tag}</span>
            <span className="sp-name">{o.name}</span>
            <span className="sp-detail">{o.detail}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
