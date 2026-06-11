import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import './styles/OpenSource.css';

gsap.registerPlugin(ScrollTrigger);

const mergedPRs = [
  {
    repo: 'unslothai/unsloth',
    stars: '40k',
    number: 6135,
    url: 'https://github.com/unslothai/unsloth/pull/6135',
    org: 'unsloth',
    what: 'Fixed a blocking time.sleep (up to 30s) that froze the async event loop in the model-export route — surfaced by my own static analyzer, codehound. Merged into main.',
    quotes: [
      { text: 'Merged #6135 into main.', who: '@wasimysaid, maintainer' },
    ],
    shipped: null,
    featured: true,
    codehound: true,
  },
  {
    repo: 'huggingface/huggingface_hub',
    stars: '40k',
    number: 4289,
    url: 'https://github.com/huggingface/huggingface_hub/pull/4289',
    org: 'HuggingFace',
    what: 'Documented missing Args entries in lfs.py, hf_file_system.py, and repocard_data.py — three public API functions missing parameter documentation.',
    quotes: [
      { text: 'Thank you!', who: '@Wauplin, lead maintainer at HuggingFace' },
      { text: 'This PR has been shipped as part of the v1.17.0 release.', who: 'Release bot' },
    ],
    shipped: 'Shipped · v1.17.0',
    featured: true,
    codehound: false,
  },
  {
    repo: 'pydantic/pydantic',
    stars: '22k',
    number: 13239,
    url: 'https://github.com/pydantic/pydantic/pull/13239',
    org: 'pydantic',
    what: 'Bug fix merged into main by @Viicos.',
    quotes: [
      { text: 'Approved and merged into main.', who: '@Viicos, maintainer' },
    ],
    shipped: null,
    featured: false,
    codehound: false,
  },
  {
    repo: 'marimo-team/marimo',
    stars: '11k',
    number: 9667,
    url: 'https://github.com/marimo-team/marimo/pull/9667',
    org: 'marimo (YC)',
    what: 'New feature — added filter parameter to file_browser component.',
    quotes: [
      { text: '🚀 Thanks for addressing the comments. Ready to merge.', who: '@kirangadhave, maintainer' },
    ],
    shipped: null,
    featured: false,
    codehound: false,
  },
  {
    repo: 'agno-agi/agno',
    stars: '25k',
    number: 8158,
    url: 'https://github.com/agno-agi/agno/pull/8158',
    org: 'agno',
    what: 'Fixed blocking time.sleep call inside async context — real concurrency bug.',
    quotes: [
      { text: 'Thanks for spotting this!', who: '@kausmeows, maintainer' },
      { text: 'Thank you! Merged the fix here — will get it out with the next release!', who: '@kausmeows' },
    ],
    shipped: null,
    featured: false,
    codehound: false,
  },
  {
    repo: 'agno-agi/agno',
    stars: '25k',
    number: 8186,
    url: 'https://github.com/agno-agi/agno/pull/8186',
    org: 'agno',
    what: 'Fixed blocking requests.get inside async Discord handler — bug discovered by codehound.',
    quotes: [
      { text: 'Thanks for this!', who: '@kausmeows, approved' },
    ],
    shipped: null,
    featured: false,
    codehound: true,
  },
  {
    repo: 'agno-agi/agno',
    stars: '25k',
    number: 8161,
    url: 'https://github.com/agno-agi/agno/pull/8161',
    org: 'agno',
    what: 'Fixed file-descriptor leak. Rewrote test to be behavioral after maintainer review.',
    quotes: [
      { text: 'Reviewed and approved after behavioral test rewrite.', who: '@sannya-singal, maintainer' },
    ],
    shipped: null,
    featured: false,
    codehound: false,
  },
  {
    repo: 'mem0ai/mem0',
    stars: '35k',
    number: 5302,
    url: 'https://github.com/mem0ai/mem0/pull/5302',
    org: 'mem0',
    what: 'Fixed mutable default arguments (B006) in Completions.create and BaseEmbedderConfig — with a regression test.',
    quotes: [
      { text: 'Approved and merged into main.', who: '@kartik-mem0, maintainer' },
    ],
    shipped: null,
    featured: false,
    codehound: false,
  },
  {
    repo: 'huggingface/accelerate',
    stars: '8k',
    number: 4051,
    url: 'https://github.com/huggingface/accelerate/pull/4051',
    org: 'HuggingFace',
    what: 'Documented missing public-API parameters in load_accelerator_state, find_executable_batch_size, and send_to_device.',
    quotes: [
      { text: 'Approved this pull request. Thanks!', who: '@SunMarc, maintainer' },
    ],
    shipped: null,
    featured: false,
    codehound: false,
  },
  {
    repo: 'agno-agi/agno',
    stars: '25k',
    number: 8138,
    url: 'https://github.com/agno-agi/agno/pull/8138',
    org: 'agno',
    what: 'First contribution — documentation improvement.',
    quotes: [],
    shipped: null,
    featured: false,
    codehound: false,
  },
];

const openPRs = [
  {
    repo: 'openai/openai-agents-python',
    org: 'OpenAI (official)',
    stars: null,
    number: 3553,
    url: 'https://github.com/openai/openai-agents-python/pull/3553',
    what: 'Fire-and-forget asyncio tasks silently dropping error events. Found by codehound.',
    quote: null,
    codehound: true,
  },
  {
    repo: 'BerriAI/litellm',
    org: 'litellm',
    stars: '15k',
    number: 29417,
    url: 'https://github.com/BerriAI/litellm/pull/29417',
    what: 'Fire-and-forget cache-write tasks silently failing. Found by codehound.',
    quote: 'This PR fixes a silent cache-write failure caused by asyncio\'s weak-reference semantics.',
    quotewho: 'greptile AI reviewer',
    codehound: true,
  },
  {
    repo: 'BerriAI/litellm',
    org: 'litellm',
    stars: '15k',
    number: 29162,
    url: 'https://github.com/BerriAI/litellm/pull/29162',
    what: 'Second litellm contribution — under review.',
    quote: null,
    codehound: false,
  },
  {
    repo: 'vibrantlabsai/ragas',
    org: 'ragas',
    stars: null,
    number: 2757,
    url: 'https://github.com/vibrantlabsai/ragas/pull/2757',
    what: 'Deprecated asyncio API fix.',
    quote: null,
    codehound: false,
  },
  {
    repo: 'agno-agi/agno',
    org: 'agno',
    stars: '25k',
    number: 8183,
    url: 'https://github.com/agno-agi/agno/pull/8183',
    what: 'Span-exporter fix.',
    quote: 'Nice fix — the root cause is well-understood and well-documented... the canonical pattern for this.',
    quotewho: 'Reviewer',
    codehound: false,
  },
  {
    repo: 'agno-agi/agno',
    org: 'agno',
    stars: '25k',
    number: 8152,
    url: 'https://github.com/agno-agi/agno/pull/8152',
    what: 'Under review.',
    quote: null,
    codehound: false,
  },
  {
    repo: 'pydantic/pydantic-ai',
    org: 'pydantic-ai',
    stars: '8k',
    number: 5700,
    url: 'https://github.com/pydantic/pydantic-ai/pull/5700',
    what: 'Under review.',
    quote: null,
    codehound: false,
  },
];

const earlierPRs = [
  { repo: 'crewAIInc/crewAI', number: 5970, url: 'https://github.com/crewAIInc/crewAI/pull/5970', stars: '25k' },
  { repo: 'crewAIInc/crewAI', number: 5969, url: 'https://github.com/crewAIInc/crewAI/pull/5969', stars: '25k' },
  { repo: 'crewAIInc/crewAI', number: 5968, url: 'https://github.com/crewAIInc/crewAI/pull/5968', stars: '25k' },
  { repo: 'run-llama/llama_index', number: 21797, url: 'https://github.com/run-llama/llama_index/pull/21797', stars: '35k' },
  { repo: '567-labs/instructor', number: 2325, url: 'https://github.com/567-labs/instructor/pull/2325', stars: '10k' },
  { repo: 'huggingface/datasets', number: 8223, url: 'https://github.com/huggingface/datasets/pull/8223', stars: '18k' },
  { repo: 'huggingface/peft', number: 3271, url: 'https://github.com/huggingface/peft/pull/3271', stars: '16k' },
  { repo: 'pytorch/torchtune', number: 2964, url: 'https://github.com/pytorch/torchtune/pull/2964', stars: '4k' },
];

const otherRepos = [
  {
    name: 'oss-learning-path',
    url: 'https://github.com/kratos0718/oss-learning-path',
    desc: 'Concepts behind my open-source work',
  },
  {
    name: 'project-anatomy',
    url: 'https://github.com/kratos0718/project-anatomy',
    desc: 'How real codebases are structured',
  },
  {
    name: 'core-cs-interview-prep',
    url: 'https://github.com/kratos0718/core-cs-interview-prep',
    desc: '500 CS interview Q&A',
  },
];

export default function OpenSource() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.os-section-tag', {
        clipPath: 'inset(0 100% 0 0)', duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      });
      gsap.from('.os-section-title', {
        clipPath: 'inset(0 0 100% 0)', duration: 0.8, delay: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      });
      gsap.from('.os-stat-item', {
        opacity: 0, y: 20, duration: 0.5, stagger: 0.08, ease: 'power2.out',
        scrollTrigger: { trigger: '.os-stats-bar', start: 'top 88%' },
      });
      gsap.from('.os-featured', {
        opacity: 0, y: 36, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.os-featured', start: 'top 88%' },
      });
      gsap.from('.os-card', {
        opacity: 0, y: 24, duration: 0.55, stagger: 0.07, ease: 'power2.out',
        scrollTrigger: { trigger: '.os-grid', start: 'top 88%' },
      });
      gsap.from('.os-open-card', {
        opacity: 0, y: 24, duration: 0.55, stagger: 0.08, ease: 'power2.out',
        scrollTrigger: { trigger: '.os-open-grid', start: 'top 88%' },
      });
      gsap.from('.os-codehound-box', {
        opacity: 0, y: 32, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.os-codehound-box', start: 'top 88%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="open-source" className="open-source">
      <div className="os-bg-text" aria-hidden="true">OSS</div>

      <div className="os-section-tag section-tag">Open Source</div>
      <h2 className="os-section-title section-title">
        Contributions that <span className="accent">shipped</span>
      </h2>

      {/* ── Stats bar ── */}
      <div className="os-stats-bar">
        {[
          { num: '10', label: 'Merged PRs' },
          { num: '15', label: 'Open PRs' },
          { num: '18+', label: 'Organizations' },
        ].map(s => (
          <div key={s.label} className="os-stat-item">
            <span className="os-stat-num">{s.num}</span>
            <span className="os-stat-label">{s.label}</span>
          </div>
        ))}

        {/* GitHub achievement badges */}
        <div className="os-gh-badges">
          {[
            { icon: '🫛', name: 'Pair Extraordinaire', desc: 'Co-authored commits merged' },
            { icon: '🦈', name: 'Pull Shark', desc: 'Opened PRs that got merged' },
            { icon: '🤠', name: 'YOLO', desc: 'Merged a PR without review' },
          ].map(b => (
            <a
              key={b.name}
              href="https://github.com/kratos0718"
              target="_blank"
              rel="noopener noreferrer"
              className="os-gh-badge"
              title={b.desc}
            >
              <span className="os-gh-badge-icon">{b.icon}</span>
              <span className="os-gh-badge-name">{b.name}</span>
            </a>
          ))}
        </div>

        <div className="os-stat-links">
          <a href="https://github.com/kratos0718" target="_blank" rel="noopener noreferrer" className="os-stat-btn">
            <FiGithub size={13} /> GitHub
          </a>
          <a href="https://github.com/kratos0718/codehound" target="_blank" rel="noopener noreferrer" className="os-stat-btn os-stat-btn-accent">
            ⚙ codehound
          </a>
        </div>
      </div>

      {/* ══════════════════════════════════
          MERGED — featured HF card
          ══════════════════════════════════ */}
      <div className="os-subhead-row">
        <span className="os-subhead-badge os-merged-badge">✓ Merged</span>
        <span className="os-subhead-label">10 pull requests · reviewed by lead maintainers</span>
      </div>

      {/* Featured HuggingFace card */}
      <a
        href={mergedPRs[0].url}
        target="_blank"
        rel="noopener noreferrer"
        className="os-featured"
      >
        <div className="os-featured-left">
          <div className="os-featured-org">🤗 HuggingFace</div>
          <div className="os-featured-repo">{mergedPRs[0].repo}</div>
          <div className="os-featured-stars">★ {mergedPRs[0].stars} stars</div>
          <div className="os-featured-pr">PR #{mergedPRs[0].number}</div>
          <span className="os-badge-merged">✓ MERGED</span>
          {mergedPRs[0].shipped && (
            <span className="os-shipped-badge">{mergedPRs[0].shipped}</span>
          )}
        </div>
        <div className="os-featured-right">
          <p className="os-featured-what">{mergedPRs[0].what}</p>
          <div className="os-quotes">
            {mergedPRs[0].quotes.map((q, i) => (
              <blockquote key={i} className="os-quote">
                <span className="os-quote-text">"{q.text}"</span>
                <span className="os-quote-who">— {q.who}</span>
              </blockquote>
            ))}
          </div>
        </div>
        <FiExternalLink className="os-featured-ext" size={16} />
      </a>

      {/* Remaining 8 merged PRs */}
      <div className="os-grid">
        {mergedPRs.slice(1).map(pr => (
          <a
            key={pr.number}
            href={pr.url}
            target="_blank"
            rel="noopener noreferrer"
            className="os-card"
          >
            <div className="os-card-top">
              <div className="os-card-repo-row">
                <span className="os-card-repo">{pr.repo}</span>
                {pr.stars && <span className="os-card-stars">★ {pr.stars}</span>}
              </div>
              <div className="os-card-badges">
                {pr.codehound && <span className="os-badge-tool">⚙ codehound</span>}
                <span className="os-badge-merged">✓</span>
              </div>
            </div>
            <div className="os-card-pr">PR #{pr.number}</div>
            <p className="os-card-what">{pr.what}</p>
            {pr.quotes.length > 0 && (
              <blockquote className="os-quote os-quote-sm">
                <span className="os-quote-text">"{pr.quotes[0].text}"</span>
                <span className="os-quote-who">— {pr.quotes[0].who}</span>
              </blockquote>
            )}
            <FiExternalLink className="os-card-ext" size={12} />
          </a>
        ))}
      </div>

      {/* ══════════════════════════════════
          OPEN PRs — compact pill list
          ══════════════════════════════════ */}
      <div className="os-open-compact">
        <div className="os-open-compact-head">
          <span className="os-subhead-badge os-review-badge">⟳ 17 Open PRs</span>
          <span className="os-subhead-label">under review across 18+ organizations</span>
        </div>
        <div className="os-open-pills">
          {[...openPRs, ...earlierPRs].map(pr => (
            <a
              key={`${pr.repo}-${pr.number}`}
              href={pr.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`os-open-pill${'codehound' in pr && pr.codehound ? ' os-open-pill-tool' : ''}`}
            >
              <span className="os-pill-repo">{pr.repo.split('/')[1]}</span>
              <span className="os-pill-num">#{pr.number}</span>
              {'codehound' in pr && pr.codehound && <span className="os-pill-ch">⚙</span>}
            </a>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════
          CODEHOUND SPOTLIGHT
          ══════════════════════════════════ */}
      <div className="os-subhead-row" style={{ marginTop: 64 }}>
        <span className="os-subhead-badge os-tool-badge">⚙ Tool I built</span>
      </div>

      <a
        href="https://github.com/kratos0718/codehound"
        target="_blank"
        rel="noopener noreferrer"
        className="os-codehound-box"
      >
        <div className="os-codehound-left">
          <div className="os-codehound-name">codehound</div>
          <div className="os-codehound-sub">AST static analyzer for Python</div>
          <div className="os-codehound-meta">
            <span>~750 lines</span>
            <span className="os-meta-sep">·</span>
            <span>zero dependencies</span>
            <span className="os-meta-sep">·</span>
            <span>CI on 3.9 / 3.11 / 3.12</span>
            <span className="os-meta-sep">·</span>
            <span>6 checks</span>
          </div>
          <div className="os-codehound-tags">
            <span className="os-badge-tool">⚙ Python</span>
            <span className="os-badge-tool">⚙ Open Source</span>
            <span className="os-badge-tool">⚙ AST</span>
          </div>
        </div>
        <div className="os-codehound-right">
          <p className="os-codehound-desc">
            Each of the 6 checks is distilled from a real bug I found in production OSS codebases.
            I ran codehound on agno and OpenAI's Agents SDK — it found new, unreported bugs.
            One is already merged into agno. More are under review.
          </p>
          <div className="os-codehound-proof">
            <span className="os-proof-item">✓ Bug in agno → merged (PR #8186)</span>
            <span className="os-proof-item">✓ Bug in OpenAI Agents SDK → under review (PR #3553)</span>
            <span className="os-proof-item">✓ Bug in litellm → under review (PR #29417)</span>
          </div>
        </div>
        <FiExternalLink className="os-featured-ext" size={16} />
      </a>

      {/* ══════════════════════════════════
          OTHER REPOS
          ══════════════════════════════════ */}
      <div className="os-subhead-row" style={{ marginTop: 48 }}>
        <span className="os-subhead-badge" style={{ background: 'var(--bg-2)', color: 'var(--text-muted)', borderColor: 'var(--border)' }}>Other repos</span>
      </div>
      <div className="os-repos-row">
        {otherRepos.map(r => (
          <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer" className="os-repo-mini">
            <FiGithub size={13} />
            <span className="os-repo-mini-name">{r.name}</span>
            <span className="os-repo-mini-desc">{r.desc}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
