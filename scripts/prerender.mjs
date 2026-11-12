// Renders the app to static HTML and writes it into dist/index.html, so the
// page content is in the HTML for crawlers that do not run JavaScript.
import { build } from 'vite';
import { readFile, writeFile, rm } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const outDir = path.join(root, 'dist-ssr');

await build({
  root,
  logLevel: 'warn',
  build: { ssr: 'src/entry-server.tsx', outDir, emptyOutDir: true },
});

const { render } = await import(pathToFileURL(path.join(outDir, 'entry-server.js')).href);
const indexPath = path.join(root, 'dist', 'index.html');
const html = await readFile(indexPath, 'utf8');
const marker = '<div id="root"></div>';
if (!html.includes(marker)) throw new Error(`${marker} not found in dist/index.html`);
await writeFile(indexPath, html.replace(marker, `<div id="root">${render()}</div>`));
await rm(outDir, { recursive: true, force: true });
console.log('prerendered dist/index.html');
