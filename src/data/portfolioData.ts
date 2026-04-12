export const personalInfo = {
  name: 'Abhinav Tarigoppula',
  firstName: 'Abhinav',
  tagline: 'Learning fast. Building smarter. Shipping real.',
  role: 'AI Engineer & Full Stack Developer',
  email: 'abhinaaavvv07187@gmail.com',
  phone: '+91-9121611029',
  location: 'Visakhapatnam, India',
  resumeUrl: '/Abhinav_Tarigoppula_Resume.pdf',
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
    title: '200+ DSA Problems — 90-Day Streak',
    org: 'Self-directed · LeetCode: coderboy11',
    year: '2024',
    type: 'Achievement',
    description: '200+ problems solved across Arrays, Trees, Graphs, Dynamic Programming, and Recursion. Zero breaks. Documented on GitHub and verifiable on LeetCode.',
    icon: '⚔️',
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
    description: 'Production-grade end-to-end AI platform for placement prep. RAG pipeline over FAISS/Pinecone vector databases for context-aware Q&A. Intelligent roadmap engine analyses skill gaps and generates structured learning paths. LLM modules handle dynamic question generation, resume scoring, and mock interview simulation.',
    tech: ['Python', 'LangChain', 'OpenAI API', 'FAISS', 'FastAPI', 'React'],
    live: 'https://www.pathforge.online/auth',
    liveNow: true,
    github: 'https://github.com/kratos0718',
    year: '2025',
    challenge: 'RAG responses were generic — added skill-gap scoring layer before retrieval. Prompt engineering cut token usage ~30%.',
  },
  {
    title: 'SoulSync',
    subtitle: 'AI Mental Health Chatbot · SIH 2024',
    description: 'Transformer-based emotion classification system delivering personalised emotional support with context-aware multi-turn conversation tracking. Modular NLP architecture enables plug-and-play model upgrades. Built for Smart India Hackathon 2024.',
    tech: ['Python', 'NLP', 'Transformers', 'FastAPI'],
    live: 'https://soulsyncfinal.vercel.app/',
    github: 'https://github.com/kratos0718/SoulSync',
    year: '2024',
    challenge: 'Generic embeddings gave 34% accuracy — fine-tuned on domain-specific dataset, added multi-label scoring, reached 81%.',
  },
  {
    title: 'Click N Cut',
    subtitle: 'Full-Stack Camera Rental Platform',
    description: 'Full-stack camera rental and editing services platform. Optimised state management, RESTful backend, real-time availability updates, and seamless booking workflows. First project where I owned the entire stack solo.',
    tech: ['React.js', 'Node.js', 'REST APIs'],
    live: 'https://clickn-cut.vercel.app/',
    github: 'https://github.com/kratos0718',
    year: '2024',
    challenge: 'Concurrent booking conflicts — solved with optimistic UI + server-side conflict detection.',
  },
  {
    title: 'DSA Progress Tracker',
    subtitle: '90-Day Consistency Challenge',
    description: '200+ LeetCode problems solved across Arrays, Trees, Graphs, Dynamic Programming, and Recursion — with optimal time/space complexity solutions. Unbroken GitHub contribution streak across 90 days. Every solution documented.',
    tech: ['Java', 'GitHub', 'Algorithms'],
    live: 'https://leetcode.com/coderboy11',
    github: 'https://github.com/kratos0718/Abhinavs-DSA-progress',
    year: '2024',
    challenge: 'Graph problems stalled at day 40 — isolated traversal patterns for two weeks before continuing. Now O(n log n) without hints.',
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
