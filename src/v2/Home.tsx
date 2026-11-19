import { useEffect, useState } from 'react';
import {
  FiArrowUpRight, FiBookOpen, FiCheck, FiChevronDown, FiCopy, FiDownload, FiFileText, FiGithub, FiGlobe,
  FiLinkedin, FiMail, FiMapPin, FiCode, FiCpu, FiLayers, FiServer, FiArrowUp,
} from 'react-icons/fi';
import type { CSSProperties } from 'react';
import { SiGooglescholar, SiOrcid, SiResearchgate } from 'react-icons/si';
import Banner from './Banner';
import { numerals } from './numerals';
import { SkillChip } from '../components/About';
import {
  about, achievements, career, certifications, education, openSource, personalInfo, projects, research,
  researchStats, skillGroups, socials, stats, whatIDo,
} from '../data/portfolioData';
import { articles } from '../data/articles';
import { caseStudies } from '../data/caseStudies';
import contributions from '../data/contributions.json';
import './v2.css';

const projectImages: Record<string, string> = {
  AgentDesk: '/projects/agentdesk.jpg',
  'DocGuard-VLM': '/projects/docguard.jpg',
  CodeHound: '/projects/codehound.jpg',
  PathForge: '/projects/pathforge.jpg',
  MarkMe: '/projects/markme.jpg',
  SoulSync: '/projects/soulsync.jpg',
};

const roles = ['AI Engineer', 'Open-source contributor', 'IEEE author', 'Bug hunter'];

function useTyped(words: string[]) {
  const [text, setText] = useState(words[0]);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let w = 0, i = words[0].length, deleting = true, timer = 0;
    const tick = () => {
      const word = words[w];
      if (deleting) {
        i--;
        if (i <= 0) { deleting = false; w = (w + 1) % words.length; }
      } else {
        i++;
        if (i >= words[w].length) { deleting = true; timer = window.setTimeout(tick, 2200); setText(words[w].slice(0, i)); return; }
      }
      setText((deleting ? word : words[w]).slice(0, Math.max(0, i)));
      timer = window.setTimeout(tick, deleting ? 45 : 85);
    };
    timer = window.setTimeout(tick, 2200);
    return () => clearTimeout(timer);
  }, [words]);
  return text;
}

function useClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = () => new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit' });
    const first = window.setTimeout(() => setTime(fmt()), 0);
    const id = window.setInterval(() => setTime(fmt()), 15000);
    return () => { clearTimeout(first); clearInterval(id); };
  }, []);
  return time;
}

function useReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const els = document.querySelectorAll<HTMLElement>('.v2-reveal');
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px' });
    els.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('is-in');
      else io.observe(el);
    });
    document.documentElement.classList.add('v2-reveal-ready');
    return () => io.disconnect();
  }, []);
}

const Sep = () => <div className="v2-sep" aria-hidden="true" />;

function Section({ id, title, aside, children }: { id: string; title: string; aside?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section id={id} className="v2-section v2-reveal">
      <div className="v2-head">
        <h2>{numerals(title)}</h2>
        {aside}
      </div>
      {children}
    </section>
  );
}

function Heatmap() {
  const weeks = contributions.weeks as [string, number][][];
  const level = (n: number) => (n === 0 ? 0 : n < 3 ? 1 : n < 7 ? 2 : n < 14 ? 3 : 4);
  const months: { label: string; col: number }[] = [];
  weeks.forEach((w, i) => {
    const d = new Date(w[0][0]);
    const label = d.toLocaleString('en', { month: 'short' });
    if (!months.length || months[months.length - 1].label !== label) months.push({ label, col: i });
  });
  return (
    <div className="v2-heat">
      <div className="v2-heat-scroll">
        <div className="v2-heat-months" style={{ gridTemplateColumns: `repeat(${weeks.length}, 1fr)` }}>
          {months.filter((m, i) => i === 0 || m.col - months[i - 1].col > 2).map(m => (
            <span key={m.label + m.col} style={{ gridColumn: m.col + 1 }}>{m.label}</span>
          ))}
        </div>
        <div className="v2-heat-grid" style={{ gridTemplateColumns: `repeat(${weeks.length}, 1fr)` }}>
          {weeks.map((w, i) => (
            <div key={i} className="v2-heat-col">
              {w.map(([date, n]) => (
                <i key={date} data-l={level(n)} title={`${n} contribution${n === 1 ? '' : 's'} on ${date}`} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="v2-heat-foot">
        <span>{contributions.total.toLocaleString('en')} contributions in the last year</span>
        <span className="v2-heat-legend">Less {[0, 1, 2, 3, 4].map(l => <i key={l} data-l={l} />)} More</span>
      </div>
    </div>
  );
}

function StackTabs() {
  const tabs = ['All', ...skillGroups.map(g => g.label)];
  const [tab, setTab] = useState('All');
  const items = skillGroups.filter(g => tab === 'All' || g.label === tab).flatMap(g => g.items);
  return (
    <>
      <div className="v2-tabs" role="tablist">
        {tabs.map(t => (
          <button key={t} role="tab" aria-selected={tab === t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <ul className="skill-chips v2-chips">
        {items.map(s => <SkillChip key={s.name} skill={s} />)}
      </ul>
    </>
  );
}

function CopyEmail() {
  const [done, setDone] = useState(false);
  return (
    <button className="v2-btn" onClick={() => {
      navigator.clipboard?.writeText(personalInfo.email).then(() => { setDone(true); setTimeout(() => setDone(false), 1600); });
    }}>
      {done ? <FiCheck size={15} /> : <FiCopy size={15} />} {done ? 'Copied' : 'Copy email'}
    </button>
  );
}

export default function Home() {
  useReveal();
  const role = useTyped(roles);
  const time = useClock();
  const caseFor = (title: string) => caseStudies.find(s => s.title.toLowerCase() === title.toLowerCase());
  const article = articles[0];

  return (
    <div className="v2">
      <a href="#about" className="skip-link">Skip to content</a>
      <div className="v2-col">
        <Banner />

        <header className="v2-profile" id="top">
          <img className="v2-avatar" src={personalInfo.photo} alt={personalInfo.name} width={120} height={120} />
          <div className="v2-id">
            <h1>{personalInfo.name}</h1>
            <p className="v2-role"><span>{role}</span><i className="v2-caret" aria-hidden="true" /></p>
            <p className="v2-meta">
              <span><FiMapPin size={13} /> {personalInfo.location}</span>
              {time && <span>· {time} IST</span>}
            </p>
          </div>
          <span className="v2-open"><i /> Open to roles</span>
        </header>

        <div className="v2-pad">
          <p className="v2-headline">{personalInfo.headline}</p>
          <p className="v2-intro">{personalInfo.intro}</p>
          <p className="v2-now"><span>Now</span>{personalInfo.now}</p>
          <div className="v2-links">
            <a className="v2-btn v2-btn-solid" href={personalInfo.resumeUrl} download="Abhinav_Tarigoppula_Resume.pdf"><FiDownload size={15} /> Résumé</a>
            <a className="v2-btn" href={socials.github} target="_blank" rel="noopener noreferrer"><FiGithub size={15} /> GitHub</a>
            <a className="v2-btn" href={socials.linkedin} target="_blank" rel="noopener noreferrer"><FiLinkedin size={15} /> LinkedIn</a>
            <a className="v2-btn" href={`mailto:${personalInfo.email}`}><FiMail size={15} /> Email</a>
            <a className="v2-btn" href={socials.researchgate} target="_blank" rel="noopener noreferrer"><SiResearchgate size={14} /> ResearchGate</a>
          </div>
        </div>

        <dl className="v2-stats">
          {stats.map(s => (
            <div key={s.label}><dt>{s.num}</dt><dd>{s.label}</dd></div>
          ))}
        </dl>
        <p className="v2-note">Counts from GitHub, updated {personalInfo.updated}</p>

        <div className="v2-logos">
          <div>
            <p className="v2-k">Worked at</p>
            <ul className="v2-companies">
              {career.map(j => <li key={j.company}><img src={j.logo} alt={j.company} loading="lazy" /></li>)}
            </ul>
          </div>
          <div>
            <p className="v2-k">Code merged into · {openSource.orgs.length} orgs</p>
            <ul className="v2-orgstrip">
              {openSource.orgs.map(o => (
                <li key={o.org} title={o.name}><img src={`/logos/orgs/${o.org}.png`} alt={o.name} width={34} height={34} loading="lazy" /></li>
              ))}
            </ul>
          </div>
        </div>

        <Sep />

        <Section id="about" title="About">
          <ul className="v2-about">
            {about.map(p => <li key={p.slice(0, 20)}>{p}</li>)}
          </ul>
          <div className="v2-edu">
            {education.map((e, i) => (
              <div key={e.degree}>
                {i === 0 && <p className="v2-k">Education</p>}
                <p><strong>{e.degree}</strong></p>
                <p className="v2-dim">{e.institution} · {e.period}{e.detail ? ` · ${e.detail}` : ''}</p>
              </div>
            ))}
          </div>
          <p className="v2-k v2-sub">What I do</p>
          <div className="v2-what">
            {whatIDo.map((w, i) => {
              const Icon = [FiCpu, FiLayers, FiServer][i];
              return (
                <article key={w.title} style={{ '--accent': w.accent } as CSSProperties}>
                  <span className="v2-what-ic"><Icon size={16} aria-hidden="true" /></span>
                  <h3>{w.title}</h3>
                  <p className="v2-what-num">{w.proof.num}</p>
                  <p className="v2-dim v2-small">{w.proof.label}</p>
                  <ul>{w.points.map(pt => <li key={pt}><FiCheck size={13} aria-hidden="true" /> {pt}</li>)}</ul>
                </article>
              );
            })}
          </div>
        </Section>

        <Sep />

        <Section id="stack" title="Tech stack">
          <StackTabs />
        </Section>
        <Sep />

        <Section id="experience" title="Experience">
          <ul className="v2-jobs">
            {career.map((j, i) => (
              <li key={j.company}>
                <details open={i === 0}>
                  <summary>
                    <span className="v2-logo"><img src={j.logo} alt="" loading="lazy" /></span>
                    <span className="v2-job-id">
                      <strong>{j.company}</strong>
                      <span>{j.role}{j.program && j.program !== j.company ? ` · ${j.program}` : ''}</span>
                    </span>
                    <span className="v2-job-when">{j.period}<small>{j.type}</small></span>
                    <FiChevronDown className="v2-chev" size={16} aria-hidden="true" />
                  </summary>
                  <ul className="v2-points">
                    {j.points.map(p => <li key={p.slice(0, 24)}>{p}</li>)}
                  </ul>
                  <ul className="v2-tags">{j.tech.map(t => <li key={t}>{t}</li>)}</ul>
                </details>
              </li>
            ))}
          </ul>
          <a className="v2-more v2-mt" href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer">View full résumé <FiArrowUpRight size={14} /></a>
        </Section>

        <Sep />

        <Section id="projects" title="Projects" aside={<a className="v2-more" href={socials.github} target="_blank" rel="noopener noreferrer">All on GitHub <FiArrowUpRight size={14} /></a>}>
          <div className="v2-projects">
            {projects.map(p => {
              const live = p.links.find(l => /live|playground/i.test(l.label));
              const gh = p.links.find(l => /github/i.test(l.label));
              const cs = caseFor(p.title);
              const href = cs ? `/projects/${cs.slug}/` : p.links[0].url;
              return (
                <article key={p.title} className="v2-proj">
                  <a className="v2-shot" href={href} {...(cs ? {} : { target: '_blank', rel: 'noopener noreferrer' })}>
                    <img src={projectImages[p.title]} alt={`${p.title} preview`} loading="lazy" width={1280} height={800} />
                  </a>
                  <div className="v2-proj-body">
                    <div className="v2-proj-top">
                      <h3><a href={href}>{p.title}</a></h3>
                      {live && <span className="v2-live"><i /> Live</span>}
                    </div>
                    <p className="v2-proj-sub">{p.subtitle}</p>
                    <p className="v2-proj-desc">{p.description}</p>
                    <div className="v2-proj-foot">
                      <ul className="v2-tags">{p.tech.slice(0, 3).map(t => <li key={t}>{t}</li>)}</ul>
                      <span className="v2-icons">
                        {cs && <a href={`/projects/${cs.slug}/`} title="Case study" aria-label={`${p.title} case study`}><FiBookOpen size={16} /></a>}
                        {live && <a href={live.url} target="_blank" rel="noopener noreferrer" title={live.label} aria-label={`${p.title} ${live.label}`}><FiGlobe size={16} /></a>}
                        {gh && <a href={gh.url} target="_blank" rel="noopener noreferrer" title="GitHub" aria-label={`${p.title} on GitHub`}><FiGithub size={16} /></a>}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Section>

        <Sep />

        <Section id="open-source" title="Open source" aside={<a className="v2-more" href="/open-source/">All {openSource.all.length} PRs <FiArrowUpRight size={14} /></a>}>
          <p className="v2-lead">
            <strong>{stats[0].num} pull requests merged</strong> across <strong>{stats[1].num} organisations</strong> with <strong>{stats[2].num} combined stars</strong>. Mostly real bug fixes (event-loop blocking, leaked connections, shared mutable state), each with a regression test and reviewed by the project's maintainers.
          </p>
          <div className="v2-marquee" aria-hidden="true">
            <ul>
              {[...openSource.orgs, ...openSource.orgs].map((o, i) => (
                <li key={o.org + i}>
                  <img src={`/logos/orgs/${o.org}.png`} alt="" width={28} height={28} loading="lazy" />
                  <span>{o.name.replace(/ \(.*\)/, '')}</span>
                </li>
              ))}
            </ul>
          </div>
          <ul className="v2-orgwall">
            {openSource.orgs.map(o => (
              <li key={o.org}>
                <img src={`/logos/orgs/${o.org}.png`} alt="" width={28} height={28} loading="lazy" />
                <span className="v2-org-name">{o.name}</span>
                <span className="v2-org-stars">{o.stars ? `★ ${o.stars}` : 'merged'}</span>
              </li>
            ))}
          </ul>
          <p className="v2-k v2-sub">Highlights</p>
          <ul className="v2-prs">
            {openSource.highlights.map(h => (
              <li key={h.repo + h.number}>
                <a href={`https://github.com/${h.repo}/pull/${h.number}`} target="_blank" rel="noopener noreferrer">
                  <img src={`/logos/orgs/${h.org}.png`} alt="" width={32} height={32} loading="lazy" />
                  <span className="v2-pr-main">
                    <span className="v2-pr-repo">{h.repo} <em>#{h.number}</em></span>
                    <span className="v2-pr-what">{h.what}</span>
                  </span>
                  <span className="v2-pr-side"><span className="v2-merged">Merged</span><small>★ {h.stars}</small></span>
                </a>
              </li>
            ))}
          </ul>
          <details className="v2-allprs">
            <summary>All {openSource.all.length} merged pull requests <FiChevronDown size={16} className="v2-chev" aria-hidden="true" /></summary>
            <ul>
              {openSource.all.map(pr => (
                <li key={pr.repo + pr.number}>
                  <a href={`https://github.com/${pr.repo}/pull/${pr.number}`} target="_blank" rel="noopener noreferrer">
                    <span className="v2-pr-repo">{pr.repo} <em>#{pr.number}</em></span>
                    <span className="v2-dim">{pr.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </details>
          <div className="v2-links">
            <a className="v2-btn" href="/open-source/">Every merged PR, by project <FiArrowUpRight size={14} /></a>
            <a className="v2-btn" href="/writing/five-bug-patterns-in-python-ai-infrastructure/">Read: five bug patterns <FiArrowUpRight size={14} /></a>
            <a className="v2-btn" href={openSource.listUrl} target="_blank" rel="noopener noreferrer">Contributions tracker <FiArrowUpRight size={14} /></a>
          </div>
        </Section>

        <Sep />

        <Section id="github" title="GitHub activity" aside={<a className="v2-more" href={socials.github} target="_blank" rel="noopener noreferrer">@kratos0718 <FiArrowUpRight size={14} /></a>}>
          <Heatmap />
        </Section>

        <Sep />

        <Section id="research" title="Research" aside={<span className="v2-links">
          <a className="v2-btn" href={socials.researchgate} target="_blank" rel="noopener noreferrer"><SiResearchgate size={14} /> ResearchGate</a>
          <a className="v2-btn" href={socials.orcid} target="_blank" rel="noopener noreferrer"><SiOrcid size={14} /> ORCID</a>
          <a className="v2-btn" href={socials.scholar} target="_blank" rel="noopener noreferrer"><SiGooglescholar size={14} /> Google Scholar</a>
        </span>}>
          <dl className="v2-rstats">
            {researchStats.map(r => <div key={r.label}><dt>{r.num}</dt><dd>{r.label}</dd></div>)}
          </dl>
          <ul className="v2-papers">
            {research.map(r => (
              <li key={r.title}>
                <span className={`v2-status ${/published|accepted/i.test(r.status) ? 'ok' : ''}`}>{r.status}</span>
                <div>
                  <h3>{'url' in r && r.url ? <a href={r.url} target="_blank" rel="noopener noreferrer">{r.title}</a> : r.title}</h3>
                  <p className="v2-dim">{r.venue} · {r.authors}</p>
                  <p className="v2-paper-sum">{r.summary}</p>
                  <ul className="v2-tags">{r.tags.map(t => <li key={t}>{t}</li>)}</ul>
                  {'url' in r && r.url && <a className="v2-more v2-mt" href={r.url} target="_blank" rel="noopener noreferrer">Read the paper (DOI) <FiArrowUpRight size={13} /></a>}
                </div>
              </li>
            ))}
          </ul>
        </Section>

        {article && (
          <>
            <Sep />
            <Section id="writing" title="Writing">
              <a className="v2-article" href={`/writing/${article.slug}/`}>
                <FiFileText size={18} />
                <span>
                  <strong>{article.title}</strong>
                  <span className="v2-dim">{article.tagline} · {article.readingMinutes} min read</span>
                </span>
                <FiArrowUpRight size={16} />
              </a>
            </Section>
          </>
        )}


        <Sep />

        <Section id="awards" title="Awards & certificates">
          <ul className="v2-awards">
            {achievements.map(a => (
              <li key={a.title}>
                <span className="v2-dim">{a.year}</span>
                <span className="v2-award-main"><strong>{a.title}</strong><span className="v2-dim">{a.description}</span></span>
                <span className="v2-dim">{a.org}</span>
              </li>
            ))}
          </ul>
          <div className="v2-certs">
            {certifications.map(c => (
              <a key={c.title} href={c.file} target="_blank" rel="noopener noreferrer">
                <img src={c.thumb} alt={`${c.title} certificate`} loading="lazy" />
                <span><strong>{c.title}</strong><small>{c.issuer} · {c.date}</small></span>
              </a>
            ))}
          </div>
        </Section>

        <Sep />

        <section className="v2-quote v2-reveal">
          <span aria-hidden="true">“</span>
          <p>Make it work, make it right, make it fast.</p>
          <small>Kent Beck</small>
        </section>

        <Sep />

        <section className="v2-cta v2-reveal" id="contact">
          <h2>Scrolled this far?</h2>
          <p>I'm looking for AI engineer roles: internships now, full-time from 2027. I usually reply within a day.</p>
          <a className="v2-email" href={`mailto:${personalInfo.email}`}>{personalInfo.email} <FiArrowUpRight size={16} /></a>
          <div className="v2-links v2-center">
            <a className="v2-btn v2-btn-solid" href={`mailto:${personalInfo.email}`}><FiMail size={15} /> Say hello</a>
            <CopyEmail />
          </div>
          <div className="v2-links v2-center v2-mt">
            <a className="v2-btn" href={socials.github} target="_blank" rel="noopener noreferrer"><FiGithub size={15} /> GitHub</a>
            <a className="v2-btn" href={socials.linkedin} target="_blank" rel="noopener noreferrer"><FiLinkedin size={15} /> LinkedIn</a>
            <a className="v2-btn" href={socials.leetcode} target="_blank" rel="noopener noreferrer"><FiCode size={15} /> LeetCode</a>
            <a className="v2-btn" href={socials.researchgate} target="_blank" rel="noopener noreferrer"><SiResearchgate size={14} /> ResearchGate</a>
            <a className="v2-btn" href={socials.orcid} target="_blank" rel="noopener noreferrer"><SiOrcid size={14} /> ORCID</a>
            <a className="v2-btn" href={socials.scholar} target="_blank" rel="noopener noreferrer"><SiGooglescholar size={14} /> Google Scholar</a>
          </div>
        </section>

        <footer className="v2-foot">
          <span>© {new Date().getFullYear()} {personalInfo.name}</span>
          <span>Last updated {personalInfo.updated}</span>
          <a href="#top" className="v2-more">Back to top <FiArrowUp size={13} /></a>
        </footer>
      </div>

      <nav className="v2-dock" aria-label="Sections">
        <a href="#top" className="v2-dock-me" aria-label="Back to top"><img src={personalInfo.photo} alt="" width={28} height={28} /></a>
        <span className="v2-dock-links">
          <a href="#experience">Work</a>
          <a href="#projects">Projects</a>
          <a href="#open-source">Open source</a>
          <a href="#research">Research</a>
        </span>
        <span className="v2-dock-time">{time ? <><i /> {time}</> : <i />}</span>
        <a href={personalInfo.resumeUrl} className="v2-dock-cv" download="Abhinav_Tarigoppula_Resume.pdf"><FiDownload size={14} /> <span>CV</span></a>
      </nav>
    </div>
  );
}

