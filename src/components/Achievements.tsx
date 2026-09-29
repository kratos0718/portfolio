import { FiAward, FiCode, FiFileText, FiFlag, FiGitMerge, FiStar, FiArrowUpRight } from 'react-icons/fi';
import type { IconType } from 'react-icons';
import { achievements, certifications } from '../data/portfolioData';

const icons: Record<string, IconType> = {
  trophy: FiAward,
  paper: FiFileText,
  git: FiGitMerge,
  flag: FiFlag,
  code: FiCode,
  star: FiStar,
};

export default function Achievements() {
  return (
    <section className="section reveal" id="achievements">
      <h2 className="section-title">Achievements &amp; Certifications</h2>
      <div className="ach-grid">
        {achievements.map(a => {
          const Icon = icons[a.icon] ?? FiAward;
          return (
            <article key={a.title} className="card ach">
              <div className="ach-head">
                <Icon size={18} className="what-icon" aria-hidden="true" />
                <span className="ach-year">{a.year}</span>
              </div>
              <h3 className="item-title">{a.title}</h3>
              <p className="ach-org">{a.org}</p>
              <p className="muted">{a.description}</p>
            </article>
          );
        })}
      </div>

      <h3 className="label sub-label">Certifications</h3>
      <ul className="cert-grid">
        {certifications.map(c => (
          <li key={c.title}>
            <a href={c.file} target="_blank" rel="noopener noreferrer" className="cert">
              <img src={c.thumb} alt={`${c.title} certificate`} loading="lazy" />
              <span className="cert-body">
                <span className="cert-title">{c.title} <FiArrowUpRight size={12} /></span>
                <span className="cert-meta">{c.issuer} · {c.date}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
