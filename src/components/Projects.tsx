import { FiArrowUpRight } from 'react-icons/fi';
import { projects } from '../data/portfolioData';

export default function Projects() {
  return (
    <section className="section reveal" id="projects">
      <h2 className="section-title">Projects</h2>
      <div className="project-grid">
        {projects.map(p => (
          <article key={p.title} className="card project">
            <h3 className="item-title">{p.title}</h3>
            <p className="muted">{p.subtitle}</p>
            <p className="project-desc">{p.description}</p>
            <ul className="chips chips-sm">
              {p.tech.map(t => <li key={t}>{t}</li>)}
            </ul>
            <a className="text-link" href={p.link} target="_blank" rel="noopener noreferrer">
              {p.linkLabel} <FiArrowUpRight size={14} />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
