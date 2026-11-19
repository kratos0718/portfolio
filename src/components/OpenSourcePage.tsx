import { FiArrowUpRight, FiGithub } from 'react-icons/fi';
import { caseStudies } from '../data/caseStudies';
import { openSource, socials, stats } from '../data/portfolioData';
import Shell from '../v2/Shell';

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
    <Shell
      back="/#open-source"
      kicker="Open source"
      title={`${merged.num} pull requests merged upstream`}
      tagline="Bug fixes in Python libraries used in production by thousands of teams: unsloth, pydantic, Black, asyncpg, redis-py, Celery, HuggingFace and more. Each one reviewed and merged by the project's maintainers, most with a regression test."
      related={
        <>
          <p className="v2-k">Case studies</p>
          <div className="v2-links">
            {caseStudies.map(s => (
              <a key={s.slug} className="v2-btn" href={`/projects/${s.slug}/`}>{s.title} <FiArrowUpRight size={14} /></a>
            ))}
          </div>
        </>
      }
    >
      <dl className="v2-stats v2-stats-3">
        <div><dt>{merged.num}</dt><dd>{merged.label}</dd></div>
        <div><dt>{orgs.num}</dt><dd>{orgs.label}</dd></div>
        <div><dt>{stars.num}</dt><dd>{stars.label}</dd></div>
      </dl>
      <div className="v2-pad v2-page-links">
        <div className="v2-links">
          <a className="v2-btn v2-btn-solid" href={socials.github}><FiGithub size={15} /> GitHub profile</a>
          <a className="v2-btn" href={openSource.listUrl}>Contributions tracker <FiArrowUpRight size={14} /></a>
          <a className="v2-btn" href="/writing/five-bug-patterns-in-python-ai-infrastructure/">Five bug patterns I keep finding <FiArrowUpRight size={14} /></a>
        </div>
        <ul className="v2-orgstrip v2-mt">
          {openSource.orgs.map(o => (
            <li key={o.org} title={o.name}><img src={`/logos/orgs/${o.org}.png`} alt={o.name} width={34} height={34} loading="lazy" /></li>
          ))}
        </ul>
      </div>

      <article className="v2-prose">
        <section>
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
      </article>

      <section className="v2-section">
        <div className="v2-head"><h2>Highlights</h2></div>
        <ul className="v2-prs">
          {openSource.highlights.map(h => (
            <li key={h.repo + h.number}>
              <a href={prUrl(h.repo, h.number)}>
                <img src={`/logos/orgs/${h.org}.png`} alt="" width={32} height={32} loading="lazy" />
                <span className="v2-pr-main">
                  <span className="v2-pr-repo">{h.repo} <em>#{h.number}</em></span>
                  <span className="v2-pr-what">{h.what}</span>
                </span>
                <span className="v2-pr-side"><span className="v2-merged">Merged</span><small>★ {h.stars}</small></span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="v2-section">
        <div className="v2-head"><h2>Every merged pull request, by project</h2></div>
        <div className="v2-groups">
          {groups().map(g => (
            <div key={g.org} className="v2-group">
              <h3>
                <img src={`/logos/orgs/${g.org}.png`} alt="" width={24} height={24} loading="lazy" />
                <span>{g.name}</span>
                <small>{g.stars ? `★ ${g.stars} · ` : ''}{g.prs.length} merged</small>
              </h3>
              <ul>
                {g.prs.map(pr => (
                  <li key={pr.repo + pr.number}>
                    <a href={prUrl(pr.repo, pr.number)}>
                      <span className="v2-pr-repo">{pr.repo} <em>#{pr.number}</em></span>
                      <span className="v2-dim">{pr.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </Shell>
  );
}
