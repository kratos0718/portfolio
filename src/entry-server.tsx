import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.tsx';

// Used at build time by scripts/prerender.mjs so the shipped HTML already
// contains the page content for crawlers and link previews.
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
