import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/SocialProof.css';

gsap.registerPlugin(ScrollTrigger);

const orgs = [
  { name: 'OneStop AI',             detail: 'ML & AI Intern · 2025',          tag: 'Internship' },
  { name: 'PwC',                    detail: 'AI & Data Advisory · 2026',       tag: 'Internship' },
  { name: '2 Research Preprints',   detail: 'ResearchGate · 57 Total Reads',   tag: 'Preprint'   },
  { name: 'Smart India Hackathon',  detail: 'Participant · 1M+ Competitors',   tag: 'Hackathon'  },
  { name: 'GITAM University',       detail: 'B.Tech CSE AI/ML · CGPA 8.12',   tag: 'Education'  },
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
