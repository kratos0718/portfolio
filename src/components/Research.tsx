import { FiArrowUpRight } from 'react-icons/fi';
import { research, achievements, certifications, socials } from '../data/portfolioData';

export default function Research() {
  return (
    <section className="section reveal" id="research">
      <h2 className="section-title">Research &amp; Achievements</h2>

      <ul className="research-list">
        {research.map(r => (
          <li key={r.title}>
            <span className="status">{r.status}</span>
            <div>
              <h3 className="item-title">{r.title}</h3>
              <p className="muted">{r.venue}</p>
            </div>
          </li>
        ))}
      </ul>
      <a className="text-link" href={socials.researchgate} target="_blank" rel="noopener noreferrer">
        ResearchGate profile <FiArrowUpRight size={14} />
      </a>

      <div className="two-col">
        <div>
          <h3 className="label">Achievements</h3>
          <ul className="points">
            {achievements.map(a => <li key={a}>{a}</li>)}
          </ul>
        </div>
        <div>
          <h3 className="label">Certifications</h3>
          <ul className="points">
            {certifications.map(c => <li key={c}>{c}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
