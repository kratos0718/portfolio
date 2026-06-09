import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/Certifications.css';

gsap.registerPlugin(ScrollTrigger);

interface Cert {
  title: string;
  subtitle?: string;
  issuer: string;
  date: string;
  category: string;
  categoryColor: string;
  icon: string;
}

const certs: Cert[] = [
  {
    title: 'Mastering AI Agents Bootcamp',
    subtitle: 'Build Smart Chatbots & Tools',
    issuer: 'Udemy',
    date: 'Jun 2025',
    category: 'AI/ML',
    categoryColor: 'cyan',
    icon: '🤖',
  },
  {
    title: 'What Is Generative AI?',
    subtitle: 'LinkedIn Learning',
    issuer: 'LinkedIn Learning',
    date: 'Jun 2025',
    category: 'AI/ML',
    categoryColor: 'cyan',
    icon: '🧠',
  },
  {
    title: 'AWS Solutions Architecture',
    subtitle: 'Job Simulation',
    issuer: 'Forage · Amazon Web Services',
    date: 'Jul 2025',
    category: 'Cloud',
    categoryColor: 'blue',
    icon: '☁️',
  },
  {
    title: 'AI Program & Internship',
    subtitle: 'Alcheringa · IIT Guwahati',
    issuer: '1stop · IIT Guwahati',
    date: 'Jun 2025',
    category: 'AI/ML',
    categoryColor: 'cyan',
    icon: '🎓',
  },
  {
    title: 'Alpha: DSA with Java',
    subtitle: 'Data Structures & Algorithms',
    issuer: 'ApnaCollege',
    date: '2025',
    category: 'DSA',
    categoryColor: 'amber',
    icon: '☕',
  },
  {
    title: 'Python for Beginners',
    subtitle: 'Mastering the Essentials',
    issuer: 'Scaler Topics',
    date: 'Jul 2025',
    category: 'Python',
    categoryColor: 'green',
    icon: '🐍',
  },
  {
    title: 'MATLAB Fundamentals',
    subtitle: '',
    issuer: 'MathWorks',
    date: 'Jan 2025',
    category: 'Engineering',
    categoryColor: 'blue',
    icon: '📊',
  },
  {
    title: 'AI/ML Workshop & Hackathon',
    subtitle: 'BITS Pilani · Hyderabad',
    issuer: 'Techgyan Technologies',
    date: 'Jan 2026',
    category: 'Workshop',
    categoryColor: 'purple',
    icon: '🏆',
  },
  {
    title: 'Digital Application Fundamentals',
    subtitle: 'STEM Track',
    issuer: 'FutureSkills Prime · Nasscom',
    date: 'May 2026',
    category: 'Tech',
    categoryColor: 'muted',
    icon: '💻',
  },
  {
    title: 'IBM Design',
    subtitle: '',
    issuer: 'IBM',
    date: 'Jun 2026',
    category: 'Design',
    categoryColor: 'blue',
    icon: '🔷',
  },
];

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: 'top 72%' };
      gsap.to(tagRef.current, {
        clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'power3.inOut', scrollTrigger: st,
      });
      gsap.to(titleRef.current, {
        clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'power3.out', delay: 0.1, scrollTrigger: st,
      });
      gsap.utils.toArray<HTMLElement>('.cert-card').forEach((card, i) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: (i % 4) * 0.08,
          ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="certifications" id="certifications">
      <div ref={tagRef} className="section-tag" style={{ clipPath: 'inset(0 100% 0 0)' }}>
        Certifications
      </div>
      <h2 ref={titleRef} className="section-title" style={{ clipPath: 'inset(0 0 100% 0)' }}>
        Learning & <span className="accent">credentials</span>
      </h2>

      <div className="cert-grid">
        {certs.map((cert) => (
          <div key={cert.title + cert.issuer} className={`cert-card cert-card--${cert.categoryColor}`}>
            <div className="cert-top">
              <span className="cert-icon">{cert.icon}</span>
              <span className={`cert-category cert-category--${cert.categoryColor}`}>{cert.category}</span>
            </div>
            <div className="cert-title">{cert.title}</div>
            {cert.subtitle && <div className="cert-subtitle">{cert.subtitle}</div>}
            <div className="cert-footer">
              <span className="cert-issuer">{cert.issuer}</span>
              <span className="cert-date">{cert.date}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
