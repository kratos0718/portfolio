import { FiArrowUpRight, FiGithub } from 'react-icons/fi';
import type { Article } from '../data/articles';
import Shell, { BlockView } from '../v2/Shell';
import { numerals } from '../v2/numerals';

// A static, script-free article page: rendered to HTML at build time only.
export default function ArticlePage({ article }: { article: Article }) {
  const date = new Date(`${article.published}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
  return (
    <Shell
      back="/#writing"
      kicker={`Writing · ${date} · ${article.readingMinutes} min read`}
      title={article.title}
      tagline={article.tagline}
      related={
        <div className="v2-links">
          <a className="v2-btn v2-btn-solid" href="/open-source/">Every merged pull request <FiArrowUpRight size={14} /></a>
          <a className="v2-btn" href="https://github.com/kratos0718/codehound"><FiGithub size={15} /> codehound on GitHub</a>
          <a className="v2-btn" href="/projects/codehound/">codehound case study <FiArrowUpRight size={14} /></a>
        </div>
      }
    >
      <article className="v2-prose v2-prose-first">
        {article.sections.map(section => (
          <section key={section.heading}>
            <h2>{numerals(section.heading)}</h2>
            {section.blocks.map((block, i) => <BlockView key={i} block={block} />)}
          </section>
        ))}
      </article>
    </Shell>
  );
}
