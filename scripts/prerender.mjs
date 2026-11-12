// Renders the app to static HTML at build time:
//  - dist/index.html gets the home page content, so crawlers that do not run
//    JavaScript still see it (the client then hydrates it);
//  - dist/projects/<slug>/index.html is written for every case study as a
//    script-free page with its own title, description and structured data;
//  - dist/open-source/index.html lists every merged pull request;
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

const { render, renderCaseStudy, renderOpenSource, openSourceCount, openSourceOrgs, caseStudies } = await import(
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

// Writes a script-free page at dist/<route>index.html from the home template,
// with its own title, description, canonical URL, keywords and JSON-LD.
async function writeStaticPage({ route, metaTitle, metaDescription, keywords, ogType, ld, body }) {
  const url = `${SITE}/${route}`;
  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeText(metaTitle)}</title>`);
  html = setMeta(html, 'name', 'description', metaDescription);
  html = html.replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`);
  html = setMeta(html, 'property', 'og:type', ogType);
  html = setMeta(html, 'property', 'og:title', metaTitle);
  html = setMeta(html, 'property', 'og:description', metaDescription);
  html = setMeta(html, 'property', 'og:url', url);
  html = setMeta(html, 'name', 'twitter:title', metaTitle);
  html = setMeta(html, 'name', 'twitter:description', metaDescription);
  html = html.replace(/<meta name="keywords"[^>]*>\s*/, '');
  html = html.replace(
    '<meta name="author"',
    `<meta name="keywords" content="${escapeAttr(keywords.join(', '))}" />\n    <meta name="author"`,
  );
  html = html.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json">\n${JSON.stringify({ '@context': 'https://schema.org', url, ...ld }, null, 2)}\n    </script>`,
  );

  // Static page: drop the client bundle, keep the stylesheet.
  html = html.replace(/\s*<script type="module"[^>]*><\/script>/g, '');
  html = html.replace(/\s*<link rel="modulepreload"[^>]*>/g, '');
  html = html.replace(marker, `<div id="root">${body}</div>`);

  const dir = path.join(dist, route);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'index.html'), html);
  return url;
}

const author = { '@type': 'Person', '@id': `${SITE}/#person`, name: 'Abhinav Tarigoppula', url: `${SITE}/` };
const pages = [];

for (const study of caseStudies) {
  pages.push(
    await writeStaticPage({
      route: `projects/${study.slug}/`,
      metaTitle: study.metaTitle,
      metaDescription: study.metaDescription,
      keywords: study.keywords,
      ogType: 'article',
      body: renderCaseStudy(study.slug),
      ld: {
        '@type': 'TechArticle',
        headline: `${study.title}: ${study.tagline}`,
        description: study.metaDescription,
        datePublished: study.published,
        dateModified: '2026-11-12',
        keywords: study.keywords.join(', '),
        image: `${SITE}/og-image.png`,
        author,
        about: {
          '@type': 'SoftwareSourceCode',
          name: study.title,
          codeRepository: study.repo,
          programmingLanguage: 'Python',
        },
      },
    }),
  );
}

const osTitle = `Open-source contributions: ${openSourceCount} merged pull requests — Abhinav Tarigoppula`;
const osDescription = `Every pull request Abhinav Tarigoppula has had merged upstream: ${openSourceCount} bug fixes across ${openSourceOrgs} organisations including unsloth, pydantic, Black, asyncpg, redis-py, Celery and HuggingFace.`;
pages.push(
  await writeStaticPage({
    route: 'open-source/',
    metaTitle: osTitle,
    metaDescription: osDescription,
    keywords: ['Abhinav Tarigoppula', 'open source', 'Python', 'pull requests', 'unsloth', 'pydantic', 'Black', 'asyncpg', 'redis-py', 'Celery', 'HuggingFace', 'JAX', 'dask'],
    ogType: 'profile',
    body: renderOpenSource(),
    ld: {
      '@type': 'CollectionPage',
      name: osTitle,
      description: osDescription,
      dateModified: '2026-11-12',
      author,
      about: author,
    },
  }),
);

const today = new Date().toISOString().slice(0, 10);
const urls = [`${SITE}/`, ...pages];
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
console.log(`prerendered dist/index.html and ${pages.length} static pages`);
