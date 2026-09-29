import { FiArrowUpRight } from 'react-icons/fi';
import { projects } from '../data/portfolioData';

export default function Projects() {
  return (
    <section className="section reveal" id="projects">
      <h2 className="section-title">Projects</h2>
      <div className="project-grid">
        {projects.map(p => (
          <article key={p.title} className="card project">
            <div className="project-stat">
              <strong>{p.stat.num}</strong>
              <span>{p.stat.label}</span>
            </div>
            <h3 className="item-title">
              <a className="title-link" href={p.links[0].url} target="_blank" rel="noopener noreferrer">
                {p.title} <FiArrowUpRight size={15} aria-hidden="true" />
              </a>
            </h3>
            <p className="project-sub">{p.subtitle}</p>
            <p className="project-desc">{p.description}</p>
            <ul className="chips chips-sm">
              {p.tech.map(t => <li key={t}>{t}</li>)}
            </ul>
            <div className="project-links">
              {p.links.map(l => (
                <a key={l.url} className="text-link" href={l.url} target="_blank" rel="noopener noreferrer">
                  {l.label} <FiArrowUpRight size={14} />
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
