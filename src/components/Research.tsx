import { FiArrowUpRight } from 'react-icons/fi';
import { research, socials } from '../data/portfolioData';

export default function Research() {
  return (
    <section className="section reveal" id="research">
      <h2 className="section-title">Research</h2>
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
      <a className="text-link" href={socials.researchgate} target="_blank" rel="noopener noreferrer">
        ResearchGate profile <FiArrowUpRight size={14} />
      </a>
    </section>
  );
}
