import { FiArrowLeft, FiArrowUpRight, FiGithub } from 'react-icons/fi';
import type { Block, CaseStudy } from '../data/caseStudies';
import { caseStudies } from '../data/caseStudies';
import { personalInfo, socials } from '../data/portfolioData';
import './styles/site.css';

function BlockView({ block }: { block: Block }) {
  if (block.type === 'p') return <p>{block.text}</p>;
  if (block.type === 'list') {
    return (
      <ul className="cs-list">
        {block.items.map(item => <li key={item}>{item}</li>)}
      </ul>
    );
  }
  return (
    <div className="cs-table-wrap">
      <table className="cs-table">
        <thead>
          <tr>{block.head.map(h => <th key={h}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {block.rows.map(row => (
            <tr key={row.join('|')}>{row.map((cell, i) => <td key={i}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// A static, script-free page: rendered to HTML at build time only.
export default function CaseStudyPage({ study }: { study: CaseStudy }) {
  const others = caseStudies.filter(s => s.slug !== study.slug);
  return (
    <div className="app-wrapper">
      <main className="site cs">
        <nav className="cs-top">
          <a className="text-link" href="/#projects"><FiArrowLeft size={14} /> {personalInfo.name}</a>
        </nav>

        <article>
          <p className="eyebrow">Case study</p>
          <h1 className="cs-title">{study.title}</h1>
          <p className="cs-tagline">{study.tagline}</p>

          <dl className="hero-stats cs-stats">
            {study.highlights.map(h => (
              <div key={h.label}>
                <dt>{h.num}</dt>
                <dd>{h.label}</dd>
              </div>
            ))}
          </dl>

          <div className="hero-actions">
            <a className="btn btn-primary" href={study.repo}><FiGithub size={15} /> Source on GitHub</a>
            {study.extraLinks.map(l => (
              <a key={l.url} className="btn" href={l.url}>{l.label} <FiArrowUpRight size={14} /></a>
            ))}
          </div>

          <ul className="chips chips-sm cs-chips">
            {study.tech.map(t => <li key={t}>{t}</li>)}
          </ul>

          {study.sections.map(section => (
            <section key={section.heading} className="cs-section">
              <h2>{section.heading}</h2>
              {section.blocks.map((block, i) => <BlockView key={i} block={block} />)}
            </section>
          ))}
        </article>

        <footer className="cs-footer">
          <p>
            Built by <a href="/">{personalInfo.name}</a>, AI engineer, open to AI engineer roles and internships.{' '}
            <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a> ·{' '}
            <a href={socials.linkedin}>LinkedIn</a> · <a href={socials.github}>GitHub</a>
          </p>
          <p className="cs-more">
            More case studies:{' '}
            {others.map((s, i) => (
              <span key={s.slug}>
                {i > 0 && ' · '}
                <a href={`/projects/${s.slug}/`}>{s.title}</a>
              </span>
            ))}
            {' · '}<a href="/open-source/">Open-source contributions</a>
          </p>
        </footer>
      </main>
    </div>
  );
}
