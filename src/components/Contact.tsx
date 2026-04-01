import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiGithub, FiLinkedin, FiArrowUpRight, FiCode } from 'react-icons/fi';
import './styles/Contact.css';
import { personalInfo, socials, education } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
      tl.to(tagRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
        .to(titleRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.3')
        .to(leftRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.3')
        .to(rightRef.current, { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5')
        .to(footerRef.current, { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.2');
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="contact" id="contact">
      <div ref={tagRef} className="section-tag">Contact</div>
      <h2 ref={titleRef} className="section-title">
        Let's <span className="accent">connect</span>
      </h2>

      <div className="contact-grid">
        <div ref={leftRef} className="contact-left">
          <h3 className="contact-headline">
            Open to internships,<br />
            <span className="accent">collabs & projects.</span>
          </h3>
          <p className="contact-subtext">
            I'm actively looking for AI/ML and full-stack internship opportunities.
            If you're building something interesting or just want to talk tech — reach out.
          </p>

          <a href={`mailto:${personalInfo.email}`} className="contact-email-link">
            {personalInfo.email} <FiArrowUpRight size={16} />
          </a>

          <div className="contact-socials">
            <a href={socials.github} target="_blank" rel="noopener noreferrer" className="contact-social-btn" data-hover>
              <FiGithub size={14} /> <span>GitHub</span>
            </a>
            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="contact-social-btn" data-hover>
              <FiLinkedin size={14} /> <span>LinkedIn</span>
            </a>
            <a href={socials.leetcode} target="_blank" rel="noopener noreferrer" className="contact-social-btn" data-hover>
              <FiCode size={14} /> <span>LeetCode</span>
            </a>
          </div>
        </div>

        <div ref={rightRef} className="contact-right">
          <div className="contact-info-card">
            <div className="contact-info-card-glow" />
            <div className="contact-info-title">Education</div>
            <div className="contact-info-list">
              {education.map(edu => (
                <div key={edu.institution} className="contact-info-row" style={{ alignItems: 'flex-start', flexDirection: 'column', gap: 2, paddingTop: 12, paddingBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <span className="contact-info-key" style={{ fontWeight: 600, color: 'var(--text)' }}>{edu.institution}</span>
                    <span className="contact-info-val">{edu.period}</span>
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>{edu.degree}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="contact-info-card">
            <div className="contact-info-card-glow" />
            <div className="contact-info-title">Details</div>
            <div className="contact-info-list">
              {[
                ['Location', personalInfo.location],
                ['Phone', personalInfo.phone],
                ['Status', 'Open to Opportunities'],
                ['Availability', 'Immediate'],
              ].map(([k, v]) => (
                <div key={k} className="contact-info-row">
                  <span className="contact-info-key">{k}</span>
                  <span className="contact-info-val">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div ref={footerRef} className="contact-footer">
        <div className="contact-footer-copy">
          © {new Date().getFullYear()} — All rights reserved
        </div>
        <div className="contact-footer-name">
          Designed & built by <span>Abhinav Tarigoppula</span>
        </div>
      </div>
    </section>
  );
}
