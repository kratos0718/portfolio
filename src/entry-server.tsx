import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.tsx';
import CaseStudyPage from './components/CaseStudyPage.tsx';
import OpenSourcePage from './components/OpenSourcePage.tsx';
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

export { caseStudies };
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
