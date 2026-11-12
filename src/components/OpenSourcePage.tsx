import { FiArrowLeft, FiArrowUpRight, FiGithub } from 'react-icons/fi';
import { caseStudies } from '../data/caseStudies';
import { openSource, personalInfo, socials, stats } from '../data/portfolioData';
import './styles/site.css';

const prUrl = (repo: string, n: number) => `https://github.com/${repo}/pull/${n}`;

// Merged PRs grouped by GitHub org, in the order of openSource.orgs.
function groups() {
  return openSource.orgs
    .map(o => ({ ...o, prs: openSource.all.filter(pr => pr.repo.split('/')[0] === o.org) }))
    .filter(g => g.prs.length > 0);
}

// A static, script-free page: rendered to HTML at build time only.
export default function OpenSourcePage() {
  const [merged, orgs, stars] = stats;
  return (
    <div className="app-wrapper">
      <main className="site cs">
        <nav className="cs-top">
          <a className="text-link" href="/#open-source"><FiArrowLeft size={14} /> {personalInfo.name}</a>
        </nav>

        <article>
          <p className="eyebrow">Open source</p>
          <h1 className="cs-title">{merged.num} pull requests merged upstream</h1>
          <p className="cs-tagline">
            Bug fixes in Python libraries used in production by thousands of teams: unsloth, pydantic, Black,
            asyncpg, redis-py, Celery, HuggingFace and more. Each one reviewed and merged by the project's
            maintainers, most with a regression test.
          </p>

          <dl className="hero-stats cs-stats">
            <div><dt>{merged.num}</dt><dd>{merged.label}</dd></div>
            <div><dt>{orgs.num}</dt><dd>{orgs.label}</dd></div>
            <div><dt>{stars.num}</dt><dd>{stars.label}</dd></div>
          </dl>

          <div className="hero-actions">
            <a className="btn btn-primary" href={socials.github}><FiGithub size={15} /> GitHub profile</a>
            <a className="btn" href={openSource.listUrl}>Contributions tracker <FiArrowUpRight size={14} /></a>
          </div>

          <section className="cs-section">
            <h2>How I find these bugs</h2>
            <p>
              Most of these fixes come from reading library code for a small set of failure patterns that tests
              rarely cover: blocking calls such as time.sleep or requests.get inside async functions, file
              handles and pooled connections that leak when an exception is raised, and mutable state shared
              across instances or connections that should be separate.
            </p>
            <p>
              More recently I compare libraries against a reference implementation with the same API, such as
              JAX and dask against NumPy and SciPy, or pyfakefs against the real operating system, and look for
              inputs where the two disagree. Empty and zero-size inputs turn up a surprising number of crashes.
            </p>
            <p>
              Before opening a pull request I reproduce the bug, write a test that fails without the fix, and
              keep the change as small as the maintainers would want it.
            </p>
          </section>

          <section className="cs-section">
            <h2>Highlights</h2>
            <ul className="cs-list">
              {openSource.highlights.map(pr => (
                <li key={pr.repo + pr.number}>
                  <a href={prUrl(pr.repo, pr.number)}>{pr.repo} #{pr.number}</a>
                  {pr.stars && ` (${pr.stars}★)`}: {pr.what}
                </li>
              ))}
            </ul>
          </section>

          <section className="cs-section">
            <h2>Every merged pull request, by project</h2>
            {groups().map(g => (
              <div key={g.org} className="os-group">
                <h3>
                  {g.name}
                  <span className="os-meta">
                    {g.stars ? `${g.stars}★ · ` : ''}{g.prs.length} merged
                  </span>
                </h3>
                <ul className="os-prs">
                  {g.prs.map(pr => (
                    <li key={pr.repo + pr.number}>
                      <a href={prUrl(pr.repo, pr.number)}>
                        <span className="all-repo">{pr.repo} <span className="all-num">#{pr.number}</span></span>
                        <span className="all-title">{pr.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        </article>

        <footer className="cs-footer">
          <p>
            {personalInfo.name}, AI engineer, open to AI engineer roles and internships.{' '}
            <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a> ·{' '}
            <a href={socials.linkedin}>LinkedIn</a> · <a href={socials.github}>GitHub</a>
          </p>
          <p className="cs-more">
            Case studies:{' '}
            {caseStudies.map((s, i) => (
              <span key={s.slug}>
                {i > 0 && ' · '}
                <a href={`/projects/${s.slug}/`}>{s.title}</a>
              </span>
            ))}
          </p>
        </footer>
      </main>
    </div>
  );
}
