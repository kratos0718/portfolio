import { FiArrowUpRight, FiGithub } from 'react-icons/fi';
import type { CaseStudy } from '../data/caseStudies';
import { caseStudies } from '../data/caseStudies';
import Shell, { BlockView } from '../v2/Shell';
import { numerals } from '../v2/numerals';

const covers: Record<string, string> = {
  'docguard-vlm': '/projects/docguard.jpg',
  codehound: '/projects/codehound.jpg',
  agentdesk: '/projects/agentdesk.jpg',
};

// A static, script-free page: rendered to HTML at build time only.
export default function CaseStudyPage({ study }: { study: CaseStudy }) {
  const others = caseStudies.filter(s => s.slug !== study.slug);
  return (
    <Shell
      back="/#projects"
      kicker="Case study"
      title={study.title}
      tagline={study.tagline}
      cover={covers[study.slug]}
      related={
        <>
          <p className="v2-k">More case studies</p>
          <div className="v2-related">
            {others.map(s => (
              <a key={s.slug} href={`/projects/${s.slug}/`}>
                {covers[s.slug] && <img src={covers[s.slug]} alt="" loading="lazy" />}
                <span><strong>{s.title}</strong><span className="v2-dim">{s.tagline}</span></span>
              </a>
            ))}
          </div>
          <div className="v2-links v2-mt">
            <a className="v2-btn" href="/open-source/">Open-source contributions <FiArrowUpRight size={14} /></a>
            <a className="v2-btn" href="/writing/five-bug-patterns-in-python-ai-infrastructure/">Five bug patterns in Python AI infrastructure <FiArrowUpRight size={14} /></a>
          </div>
        </>
      }
    >
      <dl className="v2-stats v2-stats-3">
        {study.highlights.map(h => (
          <div key={h.label}><dt>{h.num}</dt><dd>{h.label}</dd></div>
        ))}
      </dl>
      <div className="v2-pad v2-page-links">
        <div className="v2-links">
          <a className="v2-btn v2-btn-solid" href={study.repo}><FiGithub size={15} /> Source on GitHub</a>
          {study.extraLinks.map(l => (
            <a key={l.url} className="v2-btn" href={l.url}>{l.label} <FiArrowUpRight size={14} /></a>
          ))}
        </div>
        <ul className="v2-tags v2-mt">{study.tech.map(t => <li key={t}>{t}</li>)}</ul>
      </div>
      <article className="v2-prose">
        {study.sections.map(section => (
          <section key={section.heading}>
            <h2>{numerals(section.heading)}</h2>
            {section.blocks.map((block, i) => <BlockView key={i} block={block} />)}
          </section>
        ))}
      </article>
    </Shell>
  );
}
