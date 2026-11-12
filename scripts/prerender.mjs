// Renders the app to static HTML at build time:
//  - dist/index.html gets the home page content, so crawlers that do not run
//    JavaScript still see it (the client then hydrates it);
//  - dist/projects/<slug>/index.html is written for every case study as a
//    script-free page with its own title, description and structured data;
//  - dist/sitemap.xml lists all of them.
import { build } from 'vite';
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const SITE = 'https://www.abhinavbuilds.online';
const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const outDir = path.join(root, 'dist-ssr');

await build({
  root,
  logLevel: 'warn',
  build: { ssr: 'src/entry-server.tsx', outDir, emptyOutDir: true },
});

const { render, renderCaseStudy, caseStudies } = await import(
  pathToFileURL(path.join(outDir, 'entry-server.js')).href
);

const indexPath = path.join(dist, 'index.html');
const template = await readFile(indexPath, 'utf8');
const marker = '<div id="root"></div>';
if (!template.includes(marker)) throw new Error(`${marker} not found in dist/index.html`);

await writeFile(indexPath, template.replace(marker, `<div id="root">${render()}</div>`));

const escapeAttr = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const escapeText = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

function setMeta(html, attr, key, value) {
  const re = new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`);
  if (!re.test(html)) throw new Error(`meta ${attr}=${key} not found`);
  return html.replace(re, `$1${escapeAttr(value)}$2`);
}

for (const study of caseStudies) {
  const url = `${SITE}/projects/${study.slug}/`;
  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeText(study.metaTitle)}</title>`);
  html = setMeta(html, 'name', 'description', study.metaDescription);
  html = html.replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`);
  html = setMeta(html, 'property', 'og:type', 'article');
  html = setMeta(html, 'property', 'og:title', study.metaTitle);
  html = setMeta(html, 'property', 'og:description', study.metaDescription);
  html = setMeta(html, 'property', 'og:url', url);
  html = setMeta(html, 'name', 'twitter:title', study.metaTitle);
  html = setMeta(html, 'name', 'twitter:description', study.metaDescription);
  html = html.replace(/<meta name="keywords"[^>]*>\s*/, '');
  html = html.replace(
    '<meta name="author"',
    `<meta name="keywords" content="${escapeAttr(study.keywords.join(', '))}" />\n    <meta name="author"`,
  );

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: `${study.title}: ${study.tagline}`,
    description: study.metaDescription,
    url,
    datePublished: study.published,
    dateModified: '2026-11-12',
    keywords: study.keywords.join(', '),
    image: `${SITE}/og-image.png`,
    author: { '@type': 'Person', '@id': `${SITE}/#person`, name: 'Abhinav Tarigoppula', url: `${SITE}/` },
    about: {
      '@type': 'SoftwareSourceCode',
      name: study.title,
      codeRepository: study.repo,
      programmingLanguage: 'Python',
    },
  };
  html = html.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json">\n${JSON.stringify(ld, null, 2)}\n    </script>`,
  );

  // Static page: drop the client bundle, keep the stylesheet.
  html = html.replace(/\s*<script type="module"[^>]*><\/script>/g, '');
  html = html.replace(/\s*<link rel="modulepreload"[^>]*>/g, '');
  html = html.replace(marker, `<div id="root">${renderCaseStudy(study.slug)}</div>`);

  const dir = path.join(dist, 'projects', study.slug);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'index.html'), html);
}

const today = new Date().toISOString().slice(0, 10);
const urls = [`${SITE}/`, ...caseStudies.map(s => `${SITE}/projects/${s.slug}/`)];
await writeFile(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map(
      (u, i) =>
        `  <url>\n    <loc>${u}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${i === 0 ? 'weekly' : 'monthly'}</changefreq>\n    <priority>${i === 0 ? '1.0' : '0.8'}</priority>\n  </url>`,
    )
    .join('\n')}\n</urlset>\n`,
);

await rm(outDir, { recursive: true, force: true });
console.log(`prerendered dist/index.html and ${caseStudies.length} case studies`);
