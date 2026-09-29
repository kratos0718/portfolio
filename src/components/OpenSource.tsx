import { FiArrowUpRight, FiChevronDown } from 'react-icons/fi';
import { openSource, stats } from '../data/portfolioData';

export default function OpenSource() {
  const [merged, orgs, stars] = stats;
  return (
    <section className="section reveal" id="open-source">
      <h2 className="section-title">Open Source</h2>
      <p className="lead">
        <strong>{merged.num} pull requests merged</strong> across <strong>{orgs.num} organisations</strong> with{' '}
        <strong>{stars.num} combined stars</strong>. Mostly real bug fixes (event-loop blocking, leaked connections,
        shared mutable state), each with a regression test and reviewed by the project's maintainers.
      </p>

      <ul className="org-wall">
        {openSource.orgs.map(o => (
          <li key={o.org}>
            <img src={`/logos/orgs/${o.org}.png`} alt="" width={32} height={32} loading="lazy" />
            <span className="org-name">{o.name}</span>
            <span className="org-stars">{o.stars ? `${o.stars}★` : 'merged'}</span>
          </li>
        ))}
      </ul>

      <h3 className="label sub-label">Highlights</h3>
      <div className="pr-grid">
        {openSource.highlights.map(pr => (
          <a
            key={pr.repo + pr.number}
            className="card pr-card"
            href={`https://github.com/${pr.repo}/pull/${pr.number}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="pr-head">
              <img src={`/logos/orgs/${pr.org}.png`} alt="" width={28} height={28} loading="lazy" />
              <span className="pr-repo">{pr.repo}</span>
              <span className="pr-meta">{pr.stars}★</span>
            </div>
            <p className="muted">{pr.what}</p>
            <span className="pr-num">Merged · #{pr.number} <FiArrowUpRight size={13} /></span>
          </a>
        ))}
      </div>

      <details className="all-prs">
        <summary>
          All {openSource.all.length} merged pull requests <FiChevronDown size={16} className="chev" />
        </summary>
        <ul>
          {openSource.all.map(pr => (
            <li key={pr.repo + pr.number}>
              <a href={`https://github.com/${pr.repo}/pull/${pr.number}`} target="_blank" rel="noopener noreferrer">
                <span className="all-repo">{pr.repo} <span className="all-num">#{pr.number}</span></span>
                <span className="all-title">{pr.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </details>

      <a className="btn" href={openSource.listUrl} target="_blank" rel="noopener noreferrer">
        Contributions tracker on GitHub <FiArrowUpRight size={15} />
      </a>
    </section>
  );
}
