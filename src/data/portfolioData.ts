export const personalInfo = {
  name: 'Abhinav Tarigoppula',
  firstName: 'Abhinav',
  tagline: 'I build LLM & RAG systems that work in production — not just demos.',
  role: 'AI Engineer & Full Stack Developer',
  email: 'abhinaaavvv07187@gmail.com',
  phone: '+91-9121611029',
  location: 'Visakhapatnam, India',
  resumeUrl: '/ABHINAV_RESUME.pdf',
};

export const about = {
  bio: "I'm Abhinav — a CSE student at Gitam University building production-grade ML systems and LLM pipelines. I've interned at OneStop AI, shipped live products used by real people, and I'm deep into the LLM/RAG stack. My focus is AI engineering: making intelligent systems work outside the notebook.",
};

export const whyIDoThis = {
  headline: "Why I'm building in AI",
  story: [
    {
      label: "The moment it clicked",
      text: "During my first year, I watched a friend struggle with mental health for months without access to affordable support. I didn't have a solution then — but I had Python and free time. That turned into SoulSync. It wasn't perfect. But it worked well enough to help someone, and that changed what I thought software was for.",
    },
    {
      label: "What I actually believe",
      text: "Most AI demos are slick. Most AI in production is messy. The gap between the two is where I want to work — close enough to the real problem to build something that doesn't fall apart outside a notebook.",
    },
    {
      label: "Where I am right now",
      text: "Third year of a four-year degree. Already interned at OneStop AI, shipped live products with RAG pipelines and LLM integrations, solved 200+ DSA problems with consistency. I'm not trying to look ready. I'm trying to be ready.",
    },
  ],
};

export const challenges = [
  {
    problem: "PathForge: RAG responses were generic — not personalised to user skill gaps",
    context: "Initial RAG pipeline retrieved top-k chunks without filtering by user's current knowledge level. Output was accurate but not actionable.",
    fix: "Added a skill-gap scoring layer before retrieval — user profile embeddings filtered vector search results to context relevant to their level. Rewrote prompt templates to inject gap analysis into every query.",
    result: "Response relevance improved significantly. Prompt engineering reduced average token usage per query by ~30%.",
  },
  {
    problem: "OneStop AI: inference latency at 2.4s per request",
    context: "Real-time prediction pipeline was bottlenecked on preprocessing — feature engineering ran synchronously with model inference.",
    fix: "Decoupled preprocessing into an async pipeline. Batched low-priority requests. Pruned one redundant layer after profiling with PyTorch's autograd profiler.",
    result: "Latency dropped to 1.97s — 18% reduction. Three production projects impacted.",
  },
  {
    problem: "SoulSync: emotion classification at 34% accuracy",
    context: "Generic sentence embeddings couldn't distinguish neutral text from emotional distress — the vocabulary overlap was too high.",
    fix: "Fine-tuned a sentence-transformer on a mental-health-specific dataset. Replaced single-class output with multi-label emotion scoring.",
    result: "Classification accuracy reached 81%. Context tracking cut irrelevant responses by ~60%.",
  },
];

export const socials = {
  github: 'https://github.com/kratos0718',
  linkedin: 'https://www.linkedin.com/in/abhinav0702/',
  leetcode: 'https://leetcode.com/coderboy11',
};

export const career = [
  {
    role: 'AI & Data Advisory Intern',
    company: 'PwC Launchpad Advisory Program',
    period: 'Feb 2026 – Present',
    type: 'Intern',
    points: [
      "Selected for PwC's flagship program focused on GenAI, Prompt Engineering, and Data Systems.",
      'Built and optimized LLM prompt workflows for real-world enterprise use cases.',
      'Gained hands-on exposure to enterprise data architectures & AI-driven solutions.',
      'Achieved Level 10 | 1500+ XP demonstrating top performance in the cohort.',
    ],
  },
  {
    role: 'Machine Learning & AI Intern',
    company: 'OneStop AI',
    period: 'May 2025 – Aug 2025',
    type: 'Remote',
    points: [
      'Improved model accuracy by 12% across 3 production AI projects via hyperparameter tuning and architecture optimization.',
      'Reduced real-time inference latency by 18% through async pipeline refactoring and model-level optimizations.',
      'Engineered end-to-end data pipelines — preprocessing, feature engineering, scalable inference — processing thousands of records per batch.',
      'Strengthened deployment reliability by integrating monitoring and model performance tracking with senior engineers.',
    ],
  },
];

export const achievements = [
  {
    title: 'PwC Launchpad Advisory Program — AI & Data Advisory Intern',
    org: 'PricewaterhouseCoopers India',
    year: '2026',
    type: 'Internship',
    description: "Selected for PwC's flagship GenAI & Data Advisory internship. Built LLM prompt workflows, explored enterprise AI architectures, and achieved Level 10 | 1500+ XP — top performance in the cohort.",
    icon: '🏢',
  },
  {
    title: 'Smart India Hackathon — Participant',
    org: 'Government of India',
    year: '2024',
    type: 'Hackathon',
    description: "Built SoulSync — an AI mental health chatbot — and participated in India's largest national hackathon, competing against 1M+ student participants.",
    icon: '🇮🇳',
  },
  {
    title: '212 DSA Problems — 127 Active Days',
    org: 'Self-directed · LeetCode: coderboy11',
    year: '2025',
    type: 'Achievement',
    description: '212 problems solved (91 Easy · 108 Medium · 13 Hard). 354 submissions in the past year, 127 active days, 82-day max streak. Consistent grind, not bursts.',
    icon: '⚔️',
  },
  {
    title: 'CGPA 8.12 — Top semester in ML-heavy sem (SGPA 8.83)',
    org: 'GITAM University · B.Tech CSE AI/ML',
    year: '2025',
    type: 'Academic',
    description: 'Outstanding (O) in Machine Learning, A+ in AI & Deep Learning (Sem 6), A+ in DBMS & Automata. CGPA trajectory improved each semester — 7.66 → 7.75 → 7.82 → 8.12 — with best SGPA (8.83) in the most ML-intensive semester.',
    icon: '🎓',
  },
  {
    title: 'Production ML Deployment',
    org: 'OneStop AI · Internship',
    year: '2025',
    type: 'Technical',
    description: 'Delivered measurable performance improvements across 3 live ML systems — not demos, not side projects. Actual production pipelines, measured results.',
    icon: '🚀',
  },
];

export const projects = [
  {
    title: 'PathForge',
    subtitle: 'AI Placement Preparation System',
    description: 'End-to-end AI placement prep platform with LLM pipelines for role-specific study material and mock interviews. RAG over FAISS/Pinecone for context-aware Q&A. Intelligent roadmap engine analyses skill gaps and auto-generates structured learning paths.',
    tech: ['Python', 'LangChain', 'OpenAI API', 'FAISS', 'FastAPI', 'React'],
    live: 'https://www.pathforge.online/auth',
    liveNow: true,
    github: 'https://github.com/kratos0718',
    year: '2025',
    stat: { num: '-30%', label: 'token usage' },
    images: ['/images/PHOTO-2026-04-18-13-20-43.jpg', '/images/PHOTO-2026-04-18-13-20-43 2.jpg'],
    caseStudy: {
      problem: 'RAG retrieved generic chunks — responses weren\'t personalised to the user\'s actual skill gaps.',
      fix: 'Built a skill-gap scoring layer before retrieval. User profile embeddings filter vector search to level-relevant context. Rewrote prompt templates to inject gap analysis into every query.',
      result: 'Token usage cut ~30%. Responses became context-aware to individual skill levels. Live at pathforge.online.',
    },
  },
  {
    title: 'MarkMe',
    subtitle: 'Smart Attendance System',
    description: 'Triple-layer attendance verification combining real-time face recognition, GPS geo-fencing (100m radius), and rotating 6-digit session keys — eliminating proxy attendance entirely. Client-side face detection ensures biometric data never leaves the device.',
    tech: ['Python', 'JavaScript', 'Face Recognition', 'GPS Geo-fencing', 'Liveness Detection'],
    live: 'https://mark-me-ih3h.vercel.app/',
    liveNow: true,
    github: 'https://github.com/kratos0718/MarkMe',
    year: '2025',
    stat: { num: '0', label: 'proxy incidents' },
    images: [] as string[],
    caseStudy: null,
  },
  {
    title: 'SoulSync',
    subtitle: 'AI Mental Health Chatbot · SIH 2024',
    description: 'Transformer-based emotion classification delivering personalised emotional support. Fine-tuned sentence-transformer on mental-health-specific dataset. Multi-label emotion scoring and context-aware multi-turn conversation tracking. Built for Smart India Hackathon 2024.',
    tech: ['Python', 'NLP', 'Transformers', 'FastAPI'],
    live: 'https://soulsyncfinal.vercel.app/',
    github: 'https://github.com/kratos0718/SoulSync',
    year: '2024',
    stat: { num: '81%', label: 'accuracy' },
    images: [] as string[],
    caseStudy: null,
  },
  {
    title: 'Click N Cut',
    subtitle: 'Full-Stack Camera Rental Platform',
    description: 'Full-stack camera rental and editing services platform. Optimised state management, RESTful backend, real-time availability updates, and seamless booking workflows. First project where I owned the entire stack solo from UI to deployment.',
    tech: ['React.js', 'Node.js', 'REST APIs'],
    live: 'https://clickn-cut.vercel.app/',
    github: 'https://github.com/kratos0718',
    year: '2024',
    stat: { num: 'solo', label: 'full-stack' },
    images: [] as string[],
    caseStudy: null,
  },
  {
    title: 'PaperMind',
    subtitle: 'RAG-Powered arXiv Paper Explainer',
    description: 'RAG pipeline that explains arXiv papers with streaming responses and D3.js knowledge graphs. Built with LangChain, Next.js, OpenAI API — deployed on Vercel.',
    tech: ['Python', 'LangChain', 'Next.js', 'D3.js', 'RAG', 'Vercel'],
    live: 'https://github.com/kratos0718',
    liveNow: false,
    github: 'https://github.com/kratos0718',
    year: '2025',
    stat: { num: 'RAG', label: 'arxiv explainer' },
    images: [] as string[],
    caseStudy: null,
  },
  {
    title: 'pytorch/torchtune',
    subtitle: 'PR under review at pytorch/torchtune (Meta) · PR #2964',
    description: 'Fixed distributed training bug where config printed on every GPU rank instead of once. Root cause: rank-detection utility didn\'t account for period before torch.distributed initialization.',
    tech: ['PyTorch', 'Distributed Training', 'Python', 'Open Source'],
    live: 'https://github.com/pytorch/torchtune/pull/2964',
    liveNow: false,
    github: 'https://github.com/pytorch/torchtune/pull/2964',
    linkLabel: 'View PR',
    year: '2025',
    stat: { num: 'PR', label: 'under review · Meta' },
    images: [] as string[],
    caseStudy: null,
  },
  {
    title: 'marimo',
    subtitle: 'PR under review at marimo (YC-backed) · PR #9667',
    description: 'Open source contribution to marimo, the reactive Python notebook backed by Y Combinator. PR #9667 under active review.',
    tech: ['Python', 'Open Source', 'YC-backed', 'Notebooks'],
    live: 'https://github.com/marimo-team/marimo/pull/9667',
    liveNow: false,
    github: 'https://github.com/marimo-team/marimo/pull/9667',
    linkLabel: 'View PR',
    year: '2025',
    stat: { num: 'PR', label: 'under review · YC' },
    images: [] as string[],
    caseStudy: null,
  },
];

export const publications = [
  {
    title: 'HAPS: A Hybrid AI Proctoring System for Unified Online and Offline Examination Integrity Using 2-Longitudinal-Stream CNNs, YOLO, and Multi-Modal Behavioral Analysis',
    shortTitle: 'HAPS: Hybrid AI Proctoring System',
    type: 'Preprint',
    date: 'May 2026',
    reads: 12,
    coAuthors: ['Abhinav Tarigoppula', 'Deepak Jaggupalli', 'Jaggupalli Pujith'],
    abstract: 'A hybrid AI-driven proctoring architecture combining dual-stream CNNs, YOLO object detection, and multi-modal behavioural signals to ensure examination integrity across both online and offline settings.',
    tags: ['CNNs', 'YOLO', 'Computer Vision', 'Multi-Modal AI'],
    link: 'https://www.researchgate.net/profile/Abhinav-Tarigoppula',
    featured: true,
  },
  {
    title: 'AI, ML and DL-Based Integrated Drone Detection and Autonomous Defence Systems: A Review',
    shortTitle: 'AI/ML/DL Drone Detection & Autonomous Defence',
    type: 'Preprint',
    date: 'March 2026',
    reads: 45,
    coAuthors: ['Deepak Jaggupalli', 'Abhinav Tarigoppula', 'Jaggupalli Pujith'],
    abstract: 'Comprehensive review of AI, Machine Learning, and Deep Learning techniques applied to drone detection and autonomous defence, surveying state-of-the-art architectures and deployment strategies.',
    tags: ['Deep Learning', 'Drone Detection', 'Computer Vision', 'Autonomous Systems'],
    link: 'https://www.researchgate.net/profile/Abhinav-Tarigoppula',
    featured: false,
  },
];

export const techStack = [
  'Python', 'JavaScript', 'Java',
  'LangChain', 'OpenAI API', 'RAG',
  'TensorFlow', 'PyTorch', 'Scikit-learn',
  'React.js', 'Node.js', 'FastAPI',
  'FAISS', 'Docker', 'AWS',
  'SQL', 'Kubernetes', 'OpenCV',
];

export const whatIDo = [
  {
    title: 'LLM & RAG Engineering',
    description: 'Building production LLM pipelines with LangChain, OpenAI API, and vector databases (FAISS/Pinecone). RAG systems that retrieve context, not just keywords.',
    icon: '🤖',
  },
  {
    title: 'AI & Machine Learning',
    description: 'Training, fine-tuning, and shipping models with TensorFlow, PyTorch, and Scikit-learn. From notebook to production inference pipeline.',
    icon: '🧠',
  },
  {
    title: 'Full Stack Development',
    description: 'End-to-end systems with React.js, Node.js, and FastAPI. I own the stack from UI to cloud infrastructure.',
    icon: '⚡',
  },
];

export const education = [
  {
    degree: 'B.Tech in Computer Science & Engineering (AI/ML)',
    institution: 'Gitam University',
    location: 'Visakhapatnam, Andhra Pradesh',
    period: '2023 – 2027',
    cgpa: '8.12',
    highlight: 'O in Machine Learning · A+ in AI & Deep Learning',
  },
  {
    degree: 'Intermediate (Class XII) — MPC',
    institution: 'FIITJEE',
    location: 'Andhra Pradesh',
    period: '2020 – 2022',
  },
  {
    degree: 'Schooling (Class I – X)',
    institution: 'Sri Prakash Vidyaniketan',
    location: 'Visakhapatnam, Andhra Pradesh',
    period: '2015 – 2020',
  },
];
