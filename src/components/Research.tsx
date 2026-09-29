import { FiArrowUpRight } from 'react-icons/fi';
import { SiOrcid, SiResearchgate } from 'react-icons/si';
import { research, researchStats, socials } from '../data/portfolioData';

export default function Research() {
  return (
    <section className="section reveal" id="research">
      <div className="research-head">
        <h2 className="section-title">Research</h2>
        <div className="research-profiles">
          <a className="btn profile-btn rg" href={socials.researchgate} target="_blank" rel="noopener noreferrer">
            <SiResearchgate size={16} /> ResearchGate <FiArrowUpRight size={14} />
          </a>
          <a className="btn profile-btn orcid" href={socials.orcid} target="_blank" rel="noopener noreferrer">
            <SiOrcid size={16} /> ORCID <FiArrowUpRight size={14} />
          </a>
        </div>
      </div>
      <dl className="research-stats">
        {researchStats.map(r => (
          <div key={r.label}>
            <dt>{r.num}</dt>
            <dd>{r.label}</dd>
          </div>
        ))}
      </dl>
      <ul className="research-list">
        {research.map(r => (
          <li key={r.title} className="card paper">
            <div className="paper-top">
              <span className={`status status-${r.status === 'Accepted' ? 'ok' : 'wip'}`}>{r.status}</span>
              <span className="paper-venue">{r.venue}</span>
            </div>
            <h3 className="item-title">{r.title}</h3>
            <p className="paper-authors">{r.authors}</p>
            <p className="muted">{r.summary}</p>
            <ul className="chips chips-sm">
              {r.tags.map(t => <li key={t}>{t}</li>)}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
