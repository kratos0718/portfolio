import { FiDownload, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { personalInfo, socials, stats, about, skills, education } from '../data/portfolioData';

export default function Hero() {
  return (
    <>
      <header className="hero" id="top">
        <p className="eyebrow">{personalInfo.location} · open to AI/ML roles</p>
        <h1 className="hero-name">{personalInfo.name}</h1>
        <p className="hero-role">{personalInfo.role}</p>
        <p className="hero-intro">{personalInfo.intro}</p>

        <div className="hero-actions">
          <a className="btn btn-primary" href={personalInfo.resumeUrl} download="ABHINAV_RESUME.pdf">
            <FiDownload size={15} /> Resume
          </a>
          <a className="btn" href={socials.github} target="_blank" rel="noopener noreferrer">
            <FiGithub size={15} /> GitHub
          </a>
          <a className="btn" href={socials.linkedin} target="_blank" rel="noopener noreferrer">
            <FiLinkedin size={15} /> LinkedIn
          </a>
          <a className="btn" href={`mailto:${personalInfo.email}`}>
            <FiMail size={15} /> Email
          </a>
        </div>

        <dl className="hero-stats">
          {stats.map(s => (
            <div key={s.label}>
              <dt>{s.num}</dt>
              <dd>{s.label}</dd>
            </div>
          ))}
        </dl>
      </header>

      <section className="section reveal" id="about">
        <h2 className="section-title">About</h2>
        <div className="about-grid">
          <div className="prose">
            {about.map(p => <p key={p.slice(0, 20)}>{p}</p>)}
          </div>
          <aside className="about-side">
            <div>
              <h3 className="label">Education</h3>
              <p className="about-edu">{education.degree}</p>
              <p className="muted">{education.institution} · {education.period} · CGPA {education.cgpa}</p>
            </div>
            <div>
              <h3 className="label">Works with</h3>
              <ul className="chips">
                {skills.map(s => <li key={s}>{s}</li>)}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
