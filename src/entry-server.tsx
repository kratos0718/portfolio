import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.tsx';
import CaseStudyPage from './components/CaseStudyPage.tsx';
import OpenSourcePage from './components/OpenSourcePage.tsx';
import ArticlePage from './components/ArticlePage.tsx';
import { articles } from './data/articles.ts';
import { caseStudies } from './data/caseStudies.ts';
import { openSource } from './data/portfolioData.ts';

// Used at build time by scripts/prerender.mjs so the shipped HTML already
// contains the page content for crawlers and link previews.
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

export { caseStudies, articles };
export const openSourceCount = openSource.all.length;
export const openSourceOrgs = openSource.orgs.length;

export function renderCaseStudy(slug: string): string {
  const study = caseStudies.find(s => s.slug === slug);
  if (!study) throw new Error(`unknown case study ${slug}`);
  return renderToString(<CaseStudyPage study={study} />);
}

export function renderOpenSource(): string {
  return renderToString(<OpenSourcePage />);
}

export function renderArticle(slug: string): string {
  const article = articles.find(a => a.slug === slug);
  if (!article) throw new Error(`unknown article ${slug}`);
  return renderToString(<ArticlePage article={article} />);
}
