import { FiArrowLeft, FiGithub } from 'react-icons/fi';
import type { Article } from '../data/articles';
import { personalInfo, socials } from '../data/portfolioData';
import { BlockView } from './CaseStudyPage';
import './styles/site.css';

// A static, script-free article page: rendered to HTML at build time only.
export default function ArticlePage({ article }: { article: Article }) {
  const date = new Date(`${article.published}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
  return (
    <div className="app-wrapper">
      <main className="site cs">
        <nav className="cs-top">
          <a className="text-link" href="/"><FiArrowLeft size={14} /> {personalInfo.name}</a>
        </nav>

        <article>
          <p className="eyebrow">Writing · {date} · {article.readingMinutes} min read</p>
          <h1 className="cs-title">{article.title}</h1>
          <p className="cs-tagline">{article.tagline}</p>

          {article.sections.map(section => (
            <section key={section.heading} className="cs-section">
              <h2>{section.heading}</h2>
              {section.blocks.map((block, i) => <BlockView key={i} block={block} />)}
            </section>
          ))}

          <div className="hero-actions">
            <a className="btn btn-primary" href="/open-source/">Every merged pull request</a>
            <a className="btn" href="https://github.com/kratos0718/codehound"><FiGithub size={15} /> codehound on GitHub</a>
          </div>
        </article>

        <footer className="cs-footer">
          <p>
            Written by <a href="/">{personalInfo.name}</a>, AI engineer, open to AI engineer roles and internships.{' '}
            <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a> ·{' '}
            <a href={socials.linkedin}>LinkedIn</a> · <a href={socials.github}>GitHub</a>
          </p>
        </footer>
      </main>
    </div>
  );
}
