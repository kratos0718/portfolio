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
  bio: "I'm Abhinav — a CSE student at Gitam University who decided early that waiting for the right opportunity wasn't a strategy. I started building real systems, broke things, fixed them, and shipped them. My focus is AI engineering: understanding how models actually learn, where they fail, and how to make them useful in production.",
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
      text: "Third year of a four-year degree. Already interned at OneStop AI, shipped three live products, solved 250+ DSA problems with consistency. I'm not trying to look ready. I'm trying to be ready.",
    },
  ],
};

export const challenges = [
  {
    problem: "SoulSync: emotion classification at 34% accuracy",
    context: "Initial transformer model couldn't distinguish neutral text from distress. Generic embeddings were the issue.",
    fix: "Switched to a fine-tuned sentence-transformer on a mental-health-specific dataset. Added multi-label emotion scoring instead of single-class output.",
    result: "Classification accuracy rose to 81%. Context tracking reduced irrelevant responses by ~60%.",
  },
  {
    problem: "OneStop AI: inference latency at 2.4s per request",
    context: "Real-time prediction pipeline was bottlenecked on preprocessing — feature engineering ran synchronously with model inference.",
    fix: "Decoupled preprocessing into an async pipeline. Batched low-priority requests. Pruned one redundant layer after profiling with PyTorch's autograd profiler.",
    result: "Latency dropped to 1.97s — 18% reduction. Three production projects impacted.",
  },
  {
    problem: "DSA: hitting walls on graph problems after day 40",
    context: "Could brute-force most problems but couldn't get sub-O(n²) without looking up patterns.",
    fix: "Spent two weeks only on graph traversal patterns (BFS/DFS/topological sort) before touching new problems. Stopped measuring problems-per-day, started measuring pattern coverage.",
    result: "Solved 60 graph problems in the next 30 days. Now consistently reach O(n log n) on tree/graph problems without hints.",
  },
];

export const socials = {
  github: 'https://github.com/kratos0718',
  linkedin: 'https://www.linkedin.com/in/abhinav0702/',
  leetcode: 'https://leetcode.com/coderboy11',
};

export const career = [
  {
    role: 'Advisory Programme Member',
    company: 'PwC LaunchPad',
    period: '2024 – Present',
    type: 'Programme',
    points: [
      'Selected for PwC LaunchPad Advisory Programme — a competitive cohort for high-potential emerging tech talent.',
      'Gained exposure to enterprise AI strategy, digital transformation frameworks, and professional advisory methodology.',
      'Collaborated with industry mentors on real-world business and technology challenges.',
    ],
  },
  {
    role: 'Machine Learning & AI Intern',
    company: 'OneStop AI',
    period: 'May 2025 – Aug 2025',
    type: 'Remote',
    points: [
      'Inherited three production ML pipelines with accumulating accuracy debt — brought model performance up 12% through targeted hyperparameter tuning and architecture review.',
      'Diagnosed a 2.4s inference bottleneck traced to synchronous preprocessing; restructured as async pipeline, cutting latency to 1.97s.',
      'Built end-to-end data pipelines: preprocessing → feature engineering → scalable inference, reducing manual intervention.',
    ],
  },
];

export const achievements = [
  {
    title: 'PwC LaunchPad Advisory Programme',
    org: 'PricewaterhouseCoopers',
    year: '2024',
    type: 'Programme',
    description: 'Selected for PwC\'s advisory programme for emerging tech talent. One of a limited cohort chosen from competitive applications across India.',
    icon: '🏢',
  },
  {
    title: 'Smart India Hackathon — Finalist',
    org: 'Government of India',
    year: '2024',
    type: 'Hackathon',
    description: 'Built SoulSync — an AI mental health chatbot — and reached finalist stage in India\'s largest national hackathon. Competed against 1M+ student participants across the country.',
    icon: '🇮🇳',
  },
  {
    title: '90-Day DSA Consistency Challenge',
    org: 'Self-directed · LeetCode',
    year: '2024',
    type: 'Achievement',
    description: '250+ problems solved across Arrays, Trees, Graphs, Dynamic Programming, and Recursion. Zero breaks. The streak is documented on GitHub and verifiable on LeetCode (coderboy11).',
    icon: '⚔️',
  },
  {
    title: 'Production ML Deployment',
    org: 'OneStop AI · Internship',
    year: '2025',
    type: 'Technical',
    description: 'Delivered measurable performance improvements across 3 live ML systems — not demos, not side projects, actual production pipelines serving real users.',
    icon: '🚀',
  },
];

export const projects = [
  {
    title: 'SoulSync',
    subtitle: 'AI Mental Health Chatbot',
    description: 'Built after watching someone struggle without access to mental health support. NLP-based system with transformer embeddings, multi-label emotion classification, and context tracking. Started at 34% accuracy, shipped at 81%.',
    tech: ['Python', 'NLP', 'Transformers', 'FastAPI'],
    live: 'https://soulsyncfinal.vercel.app/',
    github: 'https://github.com/kratos0718/SoulSync',
    year: '2024',
    challenge: 'Emotion classification accuracy was 34% on generic embeddings — fine-tuned on domain-specific data to reach 81%.',
  },
  {
    title: 'Click N Cut',
    subtitle: 'Camera Rental Platform',
    description: 'Full-stack platform for premium camera rental and editing services. Built the full pipeline: UI, backend API, booking logic, and deployment. First project where I owned the entire stack solo.',
    tech: ['React.js', 'Node.js', 'REST APIs'],
    live: 'https://clickn-cut.vercel.app/',
    github: 'https://github.com/kratos0718',
    year: '2024',
    challenge: 'State management for concurrent bookings across time slots — solved with optimistic UI + server-side conflict detection.',
  },
  {
    title: 'PathForge',
    subtitle: 'Developer Roadmap Dashboard',
    description: 'Dashboard for tracking structured learning paths and career milestones. Solves the "what to learn next" problem with curated, sequenced roadmaps that don\'t overwhelm.',
    tech: ['React.js', 'Node.js', 'REST APIs'],
    live: 'https://pathforge-hazel.vercel.app/dashboard',
    github: 'https://github.com/kratos0718',
    year: '2025',
    challenge: 'Keeping roadmap data flexible enough for different roles without turning the UI into a config nightmare.',
  },
  {
    title: 'DSA Progress Tracker',
    subtitle: '90-Day Consistency Challenge',
    description: 'Solved 250+ problems across every major data structure and algorithm category. The repo documents every solution with complexity analysis. Hit walls on graphs — came back stronger.',
    tech: ['Java', 'GitHub', 'Algorithms'],
    live: 'https://leetcode.com/coderboy11',
    github: 'https://github.com/kratos0718/Abhinavs-DSA-progress',
    year: '2024',
    challenge: 'Graph problems stalled progress at day 40. Took two weeks to isolate and master traversal patterns before continuing.',
  },
];

export const techStack = [
  'Python', 'JavaScript', 'Java', 'React.js', 'Node.js',
  'TensorFlow', 'PyTorch', 'FastAPI', 'Docker', 'AWS',
  'SQL', 'Git', 'Linux', 'Kubernetes', 'OpenCV',
];

export const whatIDo = [
  {
    title: 'AI & Machine Learning',
    description: 'Training, fine-tuning, and shipping models with TensorFlow, PyTorch, and Scikit-learn. Focused on making AI work outside the notebook.',
    icon: '🧠',
  },
  {
    title: 'Full Stack Development',
    description: 'End-to-end web systems with React.js, Node.js, FastAPI, and cloud deployment. I own the stack from UI to infrastructure.',
    icon: '⚡',
  },
  {
    title: 'Data Structures & Algorithms',
    description: '250+ problems solved with documented complexity analysis. Strong on graphs, trees, and DP — areas that broke me before they didn\'t.',
    icon: '🔢',
  },
];

export const education = [
  {
    degree: 'B.Tech in Computer Science (AI/ML)',
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
    period: '– 2020',
  },
];
