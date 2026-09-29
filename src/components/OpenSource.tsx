import { FiArrowUpRight } from 'react-icons/fi';
import { openSource, stats } from '../data/portfolioData';

export default function OpenSource() {
  const [merged, orgs, stars] = stats;
  return (
    <section className="section reveal" id="open-source">
      <h2 className="section-title">Open Source</h2>
      <p className="lead">
        {merged.num} pull requests merged across {orgs.num} organisations with {stars.num} combined stars,
        each reviewed by the project's maintainers. Mostly bug fixes that came with a regression test.
      </p>

      <ul className="pr-list">
        {openSource.highlights.map(pr => (
          <li key={pr.repo + pr.number}>
            <a href={`https://github.com/${pr.repo}/pull/${pr.number}`} target="_blank" rel="noopener noreferrer">
              <span className="pr-repo">{pr.repo}</span>
              <span className="pr-meta">#{pr.number} · {pr.stars}★</span>
            </a>
            <p className="muted">{pr.what}</p>
          </li>
        ))}
      </ul>

      <p className="muted os-also">{openSource.alsoIn}</p>
      <a className="btn" href={openSource.listUrl} target="_blank" rel="noopener noreferrer">
        Full list of contributions <FiArrowUpRight size={15} />
      </a>
    </section>
  );
}
