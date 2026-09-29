export const personalInfo = {
  name: 'Abhinav Tarigoppula',
  role: 'AI/ML engineer · open-source contributor',
  intro: 'Final-year B.Tech CSE (AI/ML) student at GITAM. I build LLM and RAG systems, fine-tune vision-language models, and fix real bugs in the Python libraries AI teams depend on.',
  email: 'abhinaaavvv07187@gmail.com',
  location: 'Visakhapatnam, India',
  resumeUrl: '/ABHINAV_RESUME.pdf',
};

export const socials = {
  github: 'https://github.com/kratos0718',
  linkedin: 'https://www.linkedin.com/in/abhinav0702/',
  leetcode: 'https://leetcode.com/u/GV2023000367/',
  researchgate: 'https://www.researchgate.net/profile/Abhinav-Tarigoppula',
};

export const stats = [
  { num: '29', label: 'PRs merged upstream' },
  { num: '18', label: 'open-source orgs' },
  { num: '400k+', label: 'combined GitHub stars' },
];

export const about = [
  "Most AI demos work in a notebook and fall apart in production. I like the part in between: agents that call tools safely, retrieval that returns the right context, and async code that doesn't freeze an event loop.",
  'That last one turned into CodeHound, a static analyzer I wrote. The bugs it found were fixed and merged in unsloth, agno, pydantic, Black and Weaviate, and I have since had fixes merged in Celery, redis-py, scapy, pymodbus and Apache Maven.',
];

export const skills = [
  'Python', 'PyTorch', 'Transformers', 'LangChain', 'RAG', 'LLM tool calling',
  'FastAPI', 'SQL', 'React', 'TypeScript', 'Docker', 'Java',
];

export const education = {
  degree: 'B.Tech, Computer Science & Engineering (AI/ML)',
  institution: 'GITAM University, Visakhapatnam',
  period: '2023 – 2027',
  cgpa: '8.12',
};

export const career = [
  {
    role: 'AI & Data Advisory Intern',
    company: 'PwC Launchpad Advisory Program',
    period: 'Feb – Jul 2026',
    points: [
      'Built LLM prompt workflows for enterprise GenAI and data use cases.',
      'Reached Level 10 (1500+ XP), top performance in the cohort.',
    ],
  },
  {
    role: 'AI/ML Engineering Intern',
    company: 'AVAIntern',
    period: 'May – Jun 2026',
    points: [
      'Built and evaluated 5+ ML models on 10,000+ record datasets, reaching up to 92% accuracy.',
      'Automated preprocessing with Pandas and scikit-learn, cutting manual data prep by 40%.',
    ],
  },
  {
    role: 'Machine Learning & AI Intern',
    company: 'OneStop AI',
    period: 'May – Aug 2025',
    points: [
      'Improved model accuracy by 12% across 3 production projects.',
      'Cut real-time inference latency by 18% by moving preprocessing into an async pipeline.',
    ],
  },
];

export const projects = [
  {
    title: 'AgentDesk',
    subtitle: 'Multi-agent assistant for customer support',
    description: 'A planner agent routes each request to knowledge, data and action agents that use validated tool calls. RAG over policy docs with citations, prompt-injection and PII guardrails, human approval for large refunds, and an eval harness.',
    tech: ['Python', 'FastAPI', 'Tool calling', 'RAG', 'SQL'],
    link: 'https://github.com/kratos0718/agentdesk',
    linkLabel: 'GitHub',
  },
  {
    title: 'DocGuard-VLM',
    subtitle: 'Fine-tuned vision-language model',
    description: 'Qwen2-VL-2B fine-tuned with QLoRA for receipt field extraction and forgery detection. Field-extraction validity went from 25% to 92% and forgery F1 from 0.21 to 0.60 over zero-shot.',
    tech: ['PyTorch', 'PEFT / QLoRA', 'unsloth', 'Qwen2-VL'],
    link: 'https://github.com/kratos0718/docguard-vlm',
    linkLabel: 'GitHub',
  },
  {
    title: 'PathForge',
    subtitle: 'AI placement preparation platform',
    description: 'Generates role-specific study material and mock interviews. A skill-gap scoring layer filters retrieval before prompting, which cut token usage by about 30%.',
    tech: ['LangChain', 'FAISS', 'FastAPI', 'React'],
    link: 'https://www.pathforge.online/',
    linkLabel: 'Live site',
  },
  {
    title: 'CodeHound',
    subtitle: 'Python static analyzer',
    description: 'AST checks for async-safety and correctness bugs: blocking calls in async code, fire-and-forget tasks, leaked handles, mutable defaults. Its findings became merged fixes in 7 organisations.',
    tech: ['Python', 'ast', 'pytest', 'GitHub Actions'],
    link: 'https://github.com/kratos0718/codehound',
    linkLabel: 'GitHub',
  },
];

export const openSource = {
  listUrl: 'https://github.com/kratos0718/open-source-contributions',
  highlights: [
    { repo: 'unslothai/unsloth', stars: '77k', number: 6135, what: 'A time.sleep inside an async route froze the event loop for up to 30 seconds.' },
    { repo: 'psf/black', stars: '42k', number: 5432, what: 'Two grammar-file handles in the pgen converter were opened and never closed.' },
    { repo: 'pydantic/pydantic', stars: '29k', number: 13858, what: 'A dead isinstance check validated the wrong object and discarded the result.' },
    { repo: 'huggingface/huggingface_hub', stars: '3.9k', number: 4289, what: 'Documented missing public-API parameters. Shipped in v1.17.0.' },
    { repo: 'redis/redis-py', stars: '13.6k', number: 4345, what: 'An exception inside utils.pipeline() leaked a pooled connection.' },
    { repo: 'celery/kombu', stars: '3.1k', number: 2676, what: 'The SQS transport shared queue caches and clients across every connection in a process.' },
    { repo: 'secdev/scapy', stars: '12.6k', number: 5204, what: 'A missing tcpreplay binary surfaced as UnboundLocalError instead of a clear error.' },
    { repo: 'pymodbus-dev/pymodbus', stars: '2.8k', number: 3036, what: 'Every device-identification object shared one class-level dict.' },
  ],
  alsoIn: 'Also merged in mem0, agno, marimo, Weaviate, Prowler, pydantic-ai, Xorbits Inference, HuggingFace accelerate and peft, Apache Maven, Mercari and Snipe-IT.',
};

export const research = [
  {
    title: 'ML-Based Student Performance Prediction: A Comparative Study Using Ensemble Methods and Explainable AI',
    venue: 'IEEE ISED 2026 · NIT Warangal',
    status: 'Accepted',
  },
  {
    title: 'ICTIRL-2026 · GITAM School of Law',
    venue: 'Springer Nature – Atlantis Press proceedings',
    status: 'Abstract accepted',
  },
  {
    title: 'From Compression Ratios to Wall-Clock Gains: Lightweight Deep Learning on Edge Hardware',
    venue: 'Springer book chapter · first author',
    status: 'Abstract submitted',
  },
  {
    title: 'HAPS: A Hybrid AI Proctoring System Using Dual-Stream CNNs, YOLO and Multi-Modal Behavioural Analysis',
    venue: 'ResearchGate',
    status: 'Preprint',
  },
];

export const achievements = [
  'Top 5 at the AI & ML Hackathon, BITS Pilani Hyderabad (2025)',
  'Smart India Hackathon 2024 participant with SoulSync, an AI mental-health chatbot',
  'GitHub Galaxy Brain and Pull Shark achievements',
  '212 LeetCode problems, 82-day max streak',
];

export const certifications = [
  'Anthropic Academy: Claude API, MCP, Agent Skills',
  'Salesforce Agentblazer Champion 2026',
  'AWS Solutions Architecture simulation',
  'Udemy: Mastering AI Agents',
];
