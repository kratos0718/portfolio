import { useState } from 'react';
import { FiArrowUp, FiArrowUpRight, FiCheck, FiCode, FiCopy, FiGithub, FiLinkedin } from 'react-icons/fi';
import { personalInfo, socials } from '../data/portfolioData';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${personalInfo.email}`;
    }
  };

  return (
    <footer className="contact" id="contact">
      <div className="contact-inner">
        <h2 className="contact-title">Let's talk</h2>
        <p className="muted">Open to AI/ML engineering roles and research collaborations.</p>
        <div className="contact-row">
          <a className="contact-email" href={`mailto:${personalInfo.email}`}>
            {personalInfo.email} <FiArrowUpRight size={16} />
          </a>
          <button type="button" className="btn btn-sm" onClick={copyEmail} aria-live="polite">
            {copied ? <><FiCheck size={14} /> Copied</> : <><FiCopy size={14} /> Copy</>}
          </button>
        </div>
        <div className="hero-actions">
          <a className="btn" href={socials.github} target="_blank" rel="noopener noreferrer"><FiGithub size={15} /> GitHub</a>
          <a className="btn" href={socials.linkedin} target="_blank" rel="noopener noreferrer"><FiLinkedin size={15} /> LinkedIn</a>
          <a className="btn" href={socials.leetcode} target="_blank" rel="noopener noreferrer"><FiCode size={15} /> LeetCode</a>
        </div>
        <div className="footer-bar">
          <p>© {new Date().getFullYear()} {personalInfo.name} · Last updated {personalInfo.updated}</p>
          <a href="#top" className="text-link">Back to top <FiArrowUp size={13} /></a>
        </div>
      </div>
    </footer>
  );
}
