import { FiArrowUpRight, FiCode, FiGithub, FiLinkedin } from 'react-icons/fi';
import { personalInfo, socials } from '../data/portfolioData';

export default function Contact() {
  return (
    <footer className="contact" id="contact">
      <div className="contact-inner">
        <h2 className="contact-title">Let's talk</h2>
        <p className="muted">Open to AI/ML engineering roles and research collaborations.</p>
        <a className="contact-email" href={`mailto:${personalInfo.email}`}>
          {personalInfo.email} <FiArrowUpRight size={16} />
        </a>
        <div className="hero-actions">
          <a className="btn" href={socials.github} target="_blank" rel="noopener noreferrer"><FiGithub size={15} /> GitHub</a>
          <a className="btn" href={socials.linkedin} target="_blank" rel="noopener noreferrer"><FiLinkedin size={15} /> LinkedIn</a>
          <a className="btn" href={socials.leetcode} target="_blank" rel="noopener noreferrer"><FiCode size={15} /> LeetCode</a>
        </div>
        <p className="copyright">© {new Date().getFullYear()} {personalInfo.name}</p>
      </div>
    </footer>
  );
}
