import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiDownload } from 'react-icons/fi';
import './styles/ResumeDownload.css';
import { personalInfo } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function ResumeDownload() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(innerRef.current, {
        clipPath: 'inset(0 0 0% 0)',
        duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="resume-section" id="resume">
      <div ref={innerRef} className="resume-inner" style={{ clipPath: 'inset(0 0 100% 0)' }}>
        <div className="resume-dots" />

        <div className="resume-left">
          <div className="resume-eyebrow">Full résumé</div>
          <h2 className="resume-headline">
            Everything in<br />
            <span className="accent">one document.</span>
          </h2>
          <p className="resume-desc">
            Projects, internship work, education, and technical skills — no fluff,
            no padding. If you want the quick version of who I am and what I've done,
            this is it.
          </p>
        </div>

        <div className="resume-right">
          <div className="resume-btn-wrap">
            <div className="resume-pulse-ring" />
            <div className="resume-pulse-ring" />
            <a
              href={personalInfo.resumeUrl}
              download="Abhinav_Tarigoppula_Resume.pdf"
              className="resume-btn"
              data-hover
            >
              <FiDownload className="resume-btn-icon" size={18} />
              <span className="resume-btn-label">Download CV</span>
            </a>
          </div>
          <span className="resume-note">PDF · Instant download</span>
        </div>
      </div>
    </section>
  );
}
