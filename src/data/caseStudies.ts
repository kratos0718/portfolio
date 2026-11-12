// Long-form project pages, prerendered to /projects/<slug>/ at build time
// (scripts/prerender.mjs). Every figure here comes from the project's own
// README and results files.

export type Block =
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'table'; head: string[]; rows: string[][] };

export interface CaseStudy {
  slug: string;
  title: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  published: string;
  repo: string;
  extraLinks: { label: string; url: string }[];
  tech: string[];
  highlights: { num: string; label: string }[];
  sections: { heading: string; blocks: Block[] }[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'docguard-vlm',
    title: 'DocGuard-VLM',
    tagline: 'Fine-tuning Qwen2-VL-2B with QLoRA for receipt field extraction and document forgery detection',
    metaTitle: 'DocGuard-VLM: QLoRA fine-tuning of Qwen2-VL for OCR and forgery detection — Abhinav Tarigoppula',
    metaDescription:
      'Case study: one QLoRA adapter on Qwen2-VL-2B (unsloth, free Colab T4) for receipt field extraction and document forgery detection. JSON-validity 25% to 91.7%, forgery F1 0.21 to 0.60, scored on clean and adversarial test sets.',
    keywords: ['Qwen2-VL', 'QLoRA', 'unsloth', 'vision-language model', 'document forgery detection', 'OCR', 'fine-tuning', 'adversarial robustness'],
    published: '2026-07-24',
    repo: 'https://github.com/kratos0718/docguard-vlm',
    extraLinks: [{ label: 'Post-mortem write-up', url: 'https://github.com/kratos0718/docguard-vlm/blob/main/WRITEUP.md' }],
    tech: ['Qwen2-VL-2B', 'QLoRA', 'unsloth', 'PyTorch', 'PEFT', 'Gradio', 'CORD-v2'],
    highlights: [
      { num: '25% → 91.7%', label: 'receipt JSON-validity (clean)' },
      { num: '13% → 88.3%', label: 'JSON-validity (adversarial)' },
      { num: '0.21 → 0.60', label: 'forgery F1, tampered class' },
    ],
    sections: [
      {
        heading: 'The problem',
        blocks: [
          { type: 'p', text: 'A document-verification intake pipeline has to do two things with the same image: read the fields off it, and decide whether it was edited. DocGuard-VLM trains a single LoRA adapter on a small open-weight vision-language model, Qwen2-VL-2B-Instruct, to do both: return a receipt\'s line items, subtotal and total as JSON, and say whether the document was tampered with and roughly where.' },
          { type: 'p', text: 'Real forged ID scans cannot be used for training, so following the document-forgery literature the project starts from CORD-v2, a public receipt dataset with word-level OCR ground truth, and tampers a subset of it synthetically.' },
        ],
      },
      {
        heading: 'Data: realistic tampering, plus an adversarial test set',
        blocks: [
          { type: 'list', items: [
            'Three tamper types applied to a real text line (from CORD\'s own line boxes, not a random patch): copy-move within the document, splicing from a donor document, and patch-overlay that blanks a field and writes different digits over it.',
            'An earlier version picked a uniformly random region and sometimes "tampered" blank background, which is a trivial signal. Recovering per-line boxes from CORD\'s annotations fixed that.',
            'A separate adversarial test split runs the same kind of images through JPEG re-compression, noise, blur, rotation and downscaling, so robustness is measured instead of assumed.',
            'Splits: 350 training images, and 60 clean plus 60 adversarial test images, each with an OCR task and a roughly 50/50 tampered/authentic forgery task.',
          ] },
        ],
      },
      {
        heading: 'Training and evaluation',
        blocks: [
          { type: 'p', text: 'QLoRA fine-tune of unsloth/Qwen2-VL-2B-Instruct on a free Colab T4: 4-bit base weights, rank-16 LoRA over the vision, language, attention and MLP layers, 2 epochs. The evaluation harness scores the zero-shot base model and the fine-tuned adapter on both test splits, so the gain and the robustness gap are both visible.' },
          { type: 'p', text: 'OCR is scored by JSON-validity (did the model emit parseable output at all) and exact match on the total. Forgery is scored by accuracy and precision, recall and F1 on the tampered class. Verdict parsing is negation-aware, because naive matching on "tamper" misreads answers like "no signs of tampering".' },
        ],
      },
      {
        heading: 'Results',
        blocks: [
          { type: 'table', head: ['Model', 'Split', 'JSON-valid', 'Total match', 'Forgery F1', 'Tampered recall'], rows: [
            ['Zero-shot', 'clean', '25.0%', '33.3%', '0.21', '11.8%'],
            ['Zero-shot', 'adversarial', '13.3%', '18.3%', '0.16', '8.8%'],
            ['LoRA (ours)', 'clean', '91.7%', '90.0%', '0.60', '57.1%'],
            ['LoRA (ours)', 'adversarial', '88.3%', '78.3%', '0.60', '57.1%'],
          ] },
          { type: 'p', text: 'Field extraction is the clear win: the zero-shot model rarely produces valid JSON in this schema, and the adapter does so on about 9 in 10 documents, with the expected drop under perturbation. Forgery recall goes from almost never flagging a tampered document to flagging most of them; the zero-shot model\'s high precision and very low recall is an "always say authentic" failure, not detection.' },
        ],
      },
      {
        heading: 'The bug that inflated my own results',
        blocks: [
          { type: 'p', text: 'The fine-tuned model\'s forgery confusion matrix was bit-for-bit identical on the clean and adversarial splits, even though the images differ. The zero-shot baseline\'s matrix did shift between them, which made the problem diagnosable: the dataset builder reseeded the random generator to the same value for every split, so both test splits got the same shuffle, and with it the same labels, tamper types and prompt wording in the same positions.' },
          { type: 'p', text: 'The seeding is fixed in the code. The published forgery numbers were measured on the earlier data, so the forgery robustness claim is stated as provisional until a retrain; the OCR numbers do not depend on the label pattern and are unaffected. I published the caveat rather than quietly retraining it away.' },
        ],
      },
      {
        heading: 'Limitations',
        blocks: [
          { type: 'list', items: [
            'Tampering is synthetic, so performance on real forged documents is unverified.',
            'Receipts, not identity documents: layouts and field types differ.',
            'A small dataset (470 unique source images), sized for one day on one GPU.',
          ] },
        ],
      },
    ],
  },
  {
    slug: 'codehound',
    title: 'codehound',
    tagline: 'An AST static analyzer for the async-safety and correctness bugs that reach production in Python AI frameworks',
    metaTitle: 'codehound: a Python static analyzer for async and correctness bugs — Abhinav Tarigoppula',
    metaDescription:
      'Case study: codehound, an AST-based Python static analyzer with 104 checks for event-loop blocking, fire-and-forget tasks, leaked file handles and shared mutable state. Its findings became merged fixes in unsloth, mem0, agno, Black, Weaviate, Xorbits and pydantic-ai.',
    keywords: ['Python static analysis', 'AST', 'asyncio', 'linter', 'event loop', 'code quality', 'open source'],
    published: '2026-05-31',
    repo: 'https://github.com/kratos0718/codehound',
    extraLinks: [
      { label: 'Try it in the browser', url: 'https://kratos0718.github.io/codehound/' },
      { label: 'PyPI', url: 'https://pypi.org/project/codehound/' },
    ],
    tech: ['Python', 'ast', 'SARIF', 'Pyodide', 'pytest', 'GitHub Actions'],
    highlights: [
      { num: '104', label: 'checks' },
      { num: '7', label: 'orgs merged its findings' },
      { num: '0', label: 'runtime dependencies' },
    ],
    sections: [
      {
        heading: 'Why I built it',
        blocks: [
          { type: 'p', text: 'While fixing bugs in large AI frameworks I kept seeing the same few mistakes: a blocking call inside an async function that freezes the event loop, an asyncio task whose only reference is dropped so it can be garbage-collected mid-run, a file handle that is never closed, a mutable default argument shared across calls. Rather than keep hunting them by hand, I wrote each one down as an AST rule.' },
        ],
      },
      {
        heading: 'What it found',
        blocks: [
          { type: 'p', text: 'Pointed at agno, it reported a requests.get() call that blocked the Discord bot\'s event loop on every attachment, and an export task that could be garbage-collected mid-run and silently drop telemetry. Findings like these became merged fixes in unsloth, mem0, agno, Black, Weaviate, Xorbits and pydantic-ai, each with a regression test.' },
        ],
      },
      {
        heading: 'How it works',
        blocks: [
          { type: 'list', items: [
            'Parses each file once and builds a child-to-parent map, so a check can ask "what is my enclosing function?" or "am I inside a with block?".',
            'One small, independently tested class per rule.',
            'Text, JSON, CSV and SARIF output (for GitHub code scanning), with CI-friendly exit codes, a config file, --fix for the safe rewrites, a GitHub Action and a pre-commit hook.',
            'A browser playground that runs the real analyzer client-side through Pyodide, so code never leaves the page.',
          ] },
        ],
      },
      {
        heading: 'Being honest about overlap',
        blocks: [
          { type: 'p', text: 'Some patterns overlap with Ruff and flake8-bugbear, and the README says so check by check. Where codehound adapts a bugbear idea it states which one, and several checks are deliberately narrower than the original after measuring where the broader version produces false positives on real frameworks.' },
        ],
      },
    ],
  },
  {
    slug: 'agentdesk',
    title: 'AgentDesk',
    tagline: 'A multi-agent customer-operations assistant with tool calling, RAG with citations, guardrails and an eval harness',
    metaTitle: 'AgentDesk: a multi-agent support assistant with tool calling, RAG and guardrails — Abhinav Tarigoppula',
    metaDescription:
      'Case study: AgentDesk, a plan-and-execute multi-agent assistant with per-agent tool allowlists, RAG over policy documents with citations, prompt-injection and PII guardrails, human approval for large refunds, and an evaluation harness.',
    keywords: ['multi-agent', 'AI agents', 'tool calling', 'RAG', 'guardrails', 'prompt injection', 'LLM evaluation', 'FastAPI'],
    published: '2026-09-28',
    repo: 'https://github.com/kratos0718/agentdesk',
    extraLinks: [],
    tech: ['Python', 'FastAPI', 'Pydantic', 'RAG', 'SQL', 'OpenAI-compatible APIs'],
    highlights: [
      { num: '4', label: 'cooperating agents' },
      { num: '16/16', label: 'eval cases passed' },
      { num: '3/3', label: 'injection attacks blocked' },
    ],
    sections: [
      {
        heading: 'What it does',
        blocks: [
          { type: 'p', text: 'AgentDesk takes a support request such as "Where is order 1042, and can I get a refund?", plans the steps, looks things up, takes actions through tools and answers with sources, while keeping risky actions behind guardrails and human approval.' },
        ],
      },
      {
        heading: 'Architecture',
        blocks: [
          { type: 'table', head: ['Agent', 'Job', 'Tools it may call'], rows: [
            ['Planner', 'Turns the request into an ordered list of tool calls, validated with Pydantic', 'none'],
            ['Knowledge', 'Answers policy questions from the knowledge base', 'search_policies'],
            ['Data', 'Reads order and customer data', 'get_order, list_my_orders'],
            ['Action', 'Changes state', 'request_refund, send_email'],
          ] },
          { type: 'p', text: 'Each agent can only call its own tools, so a plan that asks the knowledge agent to issue a refund is rejected before anything runs. SQL tools use parameterised queries; the model never writes SQL. It works with any OpenAI-compatible API, and without a key it runs a rule-based planner so the demo, tests and evaluation run anywhere.' },
        ],
      },
      {
        heading: 'Guardrails',
        blocks: [
          { type: 'list', items: [
            'Prompt-injection detection on user messages and on retrieved documents; the knowledge base deliberately contains a poisoned document to show this.',
            'Ownership checks, so a customer can only read their own orders.',
            'Refunds above Rs. 5,000 wait for a supervisor\'s approval.',
            'PII redaction of emails, phone numbers and card numbers in replies and logs, and a hard limit on steps per request.',
          ] },
        ],
      },
      {
        heading: 'Evaluation',
        blocks: [
          { type: 'p', text: 'A fixed set of 16 cases covers order status, policy questions, refunds that should be issued, sent for approval or refused, access to another customer\'s order, three prompt-injection attacks and a question that touches the poisoned document. The harness scores tool selection, attack refusals, grounding, latency and token cost. The offline planner passes 16 of 16, with 13 of 13 correct tool selections and 3 of 3 attacks blocked; 28 unit tests cover the rest.' },
        ],
      },
    ],
  },
];
