import { FiCpu, FiLayers, FiServer } from 'react-icons/fi';
import { about, whatIDo, skillGroups, education } from '../data/portfolioData';

const icons = [FiCpu, FiLayers, FiServer];

export default function About() {
  return (
    <section className="section reveal" id="about">
      <h2 className="section-title">About</h2>
      <div className="about-grid">
        <div className="prose">
          {about.map(p => <p key={p.slice(0, 24)}>{p}</p>)}
        </div>
        <aside className="about-side">
          <h3 className="label">Education</h3>
          {education.map(e => (
            <div key={e.degree} className="edu">
              <p className="about-edu">{e.degree}</p>
              <p className="muted">{e.institution} · {e.period}</p>
              {e.detail && <p className="edu-detail">{e.detail}</p>}
            </div>
          ))}
        </aside>
      </div>

      <div className="what-grid">
        {whatIDo.map((w, i) => {
          const Icon = icons[i];
          return (
            <article key={w.title} className="card what">
              <Icon size={20} className="what-icon" aria-hidden="true" />
              <h3 className="item-title">{w.title}</h3>
              <p className="muted">{w.description}</p>
            </article>
          );
        })}
      </div>

      <div className="skills">
        {skillGroups.map(g => (
          <div key={g.label} className="skill-row">
            <h3 className="label">{g.label}</h3>
            <ul className="chips">
              {g.items.map(s => <li key={s}>{s}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
