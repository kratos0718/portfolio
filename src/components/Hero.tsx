import { FiDownload, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { personalInfo, socials, stats, career, openSource } from '../data/portfolioData';

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero-grid">
        <div>
          <p className="eyebrow"><span className="dot" aria-hidden="true" /> Open to AI/ML roles · {personalInfo.location}</p>
          <h1 className="hero-name">{personalInfo.name}</h1>
          <p className="hero-role">{personalInfo.role}</p>
          <p className="hero-headline">{personalInfo.headline}</p>
          <p className="hero-intro">{personalInfo.intro}</p>
          <p className="hero-now"><span className="label">Now</span> {personalInfo.now}</p>

          <div className="hero-actions">
            <a className="btn btn-primary" href={personalInfo.resumeUrl} download="Abhinav_Tarigoppula_Resume.pdf">
              <FiDownload size={15} /> Download resume
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
        </div>

        <img className="hero-photo" src={personalInfo.photo} alt={personalInfo.name} width={380} height={460} />
      </div>

      <dl className="hero-stats">
        {stats.map(s => (
          <div key={s.label}>
            <dt>{s.num}</dt>
            <dd>{s.label}</dd>
          </div>
        ))}
      </dl>
      <p className="stats-note">Counts from GitHub, updated {personalInfo.updated}</p>

      <div className="logo-rows">
        <div>
          <p className="label">Worked at</p>
          <ul className="company-logos">
            {career.map(job => (
              <li key={job.company}>
                <img src={job.logo} alt={job.company} loading="lazy" />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label">Code merged into</p>
          <ul className="org-strip">
            {openSource.orgs.map(o => (
              <li key={o.org} title={o.name}>
                <img src={`/logos/orgs/${o.org}.png`} alt={o.name} width={36} height={36} loading="lazy" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
