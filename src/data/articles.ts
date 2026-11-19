// Long-form articles, prerendered to /writing/<slug>/ at build time
// (scripts/prerender.mjs). Every pull request cited here is merged upstream
// unless the text says otherwise.

import type { Block } from './caseStudies';

export interface Article {
  slug: string;
  title: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  published: string;
  readingMinutes: number;
  sections: { heading: string; blocks: Block[] }[];
}

export const articles: Article[] = [
  {
    slug: 'five-bug-patterns-in-python-ai-infrastructure',
    title: 'Five bug patterns I keep finding in Python AI infrastructure',
    tagline: 'What 51 merged pull requests across 31 open-source projects taught me about where reliable-looking Python code breaks',
    metaTitle: 'Five bug patterns in Python AI infrastructure, from 51 merged pull requests — Abhinav Tarigoppula',
    metaDescription:
      'Blocked event loops, cleanup that only runs on the happy path, state shared between instances, fire-and-forget tasks and empty-input edge cases: five bug patterns behind 51 merged fixes in unsloth, JAX, pydantic, redis-py, asyncpg, Celery and more.',
    keywords: ['Python', 'asyncio', 'bug patterns', 'open source', 'static analysis', 'AI infrastructure', 'resource leaks', 'event loop', 'codehound'],
    published: '2026-11-19',
    readingMinutes: 7,
    sections: [
      {
        heading: 'Why I started looking',
        blocks: [
          {
            type: 'p',
            text: 'Most of the Python that runs AI systems is glue: model servers, agent loops, connection pools, file and queue handling. It passes its tests because tests exercise the happy path. Over the last six months I have had 51 pull requests merged into 31 open-source projects, among them unsloth, JAX, pydantic, Black, redis-py, asyncpg, Celery and Galaxy. Almost none of those bugs were exotic. The same five patterns came up again and again.',
          },
          {
            type: 'p',
            text: 'I found many of them with codehound, a small AST-based static analyzer I wrote for async-safety and resource bugs, and the rest by reading code paths that tests skip. The common thread: each bug is in code that works perfectly until something slightly unusual happens.',
          },
        ],
      },
      {
        heading: '1. Blocking calls inside async code',
        blocks: [
          {
            type: 'p',
            text: 'asyncio runs every task on one thread, so a synchronous call inside an async function freezes everything else on the event loop. In unsloth (#6135), a time.sleep inside an async route paused the whole server for up to 30 seconds while it waited. agno (#8158, #8186), Xorbits Inference (#5055) and the Weaviate Python client (#2104) had the same shape: time.sleep or a blocking requests.get inside a coroutine.',
          },
          {
            type: 'p',
            text: 'The fix is always small: await asyncio.sleep, use the async client, or push the blocking call to a thread with asyncio.to_thread. The hard part is noticing it, because a blocked loop looks like slowness, not like an error.',
          },
        ],
      },
      {
        heading: '2. Cleanup that only runs on the happy path',
        blocks: [
          {
            type: 'p',
            text: 'The most common bug I fix is a resource that is released correctly unless an exception happens first. In redis-py (#4345), an exception inside utils.pipeline() leaked a pooled connection on every failure. In asyncpg (#1373), an exception inside a query_logger() block left the logger attached, so it kept logging every later query. Black (#5432) opened two grammar files and never closed them. Apache Maven\'s JarAnalyzer opens a JarFile in its constructor and, if anything after that throws, the caller never gets an object it could close (that fix is approved and waiting to merge).',
          },
          {
            type: 'list',
            items: [
              'Use with blocks or try/finally for anything that must be released, not a close() call at the end of the function.',
              'For context managers you write yourself, put the teardown in finally so it runs when the body raises.',
              'Write the regression test that raises in the middle, because the normal test will always pass.',
            ],
          },
        ],
      },
      {
        heading: '3. State shared between instances by accident',
        blocks: [
          {
            type: 'p',
            text: 'A mutable class attribute or default argument is created once and shared by every instance. In pymodbus (#3036), every device-identification object shared one class-level dict, so devices overwrote each other\'s data. In Celery\'s kombu (#2676), the SQS transport shared queue caches and AWS clients across every connection in the process. mem0 (#5302) and pydantic-ai (#6189) had mutable default arguments of the same kind.',
          },
          {
            type: 'p',
            text: 'These bugs survive because a test usually creates one instance. The useful test creates two, changes one and checks that the other did not change.',
          },
        ],
      },
      {
        heading: '4. Fire-and-forget tasks and shutdown',
        blocks: [
          {
            type: 'p',
            text: 'asyncio.create_task returns a task the event loop only holds weakly. If nothing keeps a reference, the task can be garbage-collected before it finishes, and at shutdown it can be cancelled halfway through. In OGX (#6226), shutdown returned while a vector-store cleanup task was still running, so process exit cancelled it and left half-deleted batches. The fix keeps a reference to the task and waits for it during shutdown.',
          },
          {
            type: 'p',
            text: 'Not every discarded task is a bug, and maintainers taught me that too. In the OpenAI Agents SDK, a task I flagged only put items onto an unbounded queue, so it could never suspend and the reference did not matter. That pull request was rightly declined, and it made my checker more careful.',
          },
        ],
      },
      {
        heading: '5. Empty, missing and unusual inputs',
        blocks: [
          {
            type: 'p',
            text: 'The last pattern is plain edge cases. jax.random.choice (#42430) dropped every non-sampled dimension when asked for zero samples, so its output shape disagreed with NumPy. TagStudio (#1566) decoded short UTF-8 files with a few emoji as Windows-1254 because the encoding detector guessed wrong. pyfakefs (#1343) accepted truncate calls that the real operating system rejects. In each case the code was correct for typical input and wrong at the boundary.',
          },
        ],
      },
      {
        heading: 'How the fixes got merged',
        blocks: [
          {
            type: 'p',
            text: 'Finding a bug is half the work. The other half is a pull request a busy maintainer can accept in a few minutes. What worked for me:',
          },
          {
            type: 'list',
            items: [
              'Reproduce it first, then add a regression test that fails without the fix. Maintainers merge evidence.',
              'Keep the diff small and explain the failure in one or two sentences before the code.',
              'Check the development branch and search open pull requests by keyword, not only by issue number. I have lost work to fixes that already existed on dev.',
              'Read CONTRIBUTING and the pull request template before writing code. Some projects want an issue first, a label, or a specific branch.',
              'When a maintainer says it is not a bug, ask why and learn from it. Declined pull requests in dspy and the OpenAI Agents SDK showed me false positives that a precise checker has to avoid.',
            ],
          },
          {
            type: 'p',
            text: 'Across the codehound study, maintainers reviewed 12 of the fixes it led to and confirmed 11 as genuine defects. The analyzer is open source at github.com/kratos0718/codehound, and every merged pull request is listed on my open-source page.',
          },
        ],
      },
    ],
  },
];
