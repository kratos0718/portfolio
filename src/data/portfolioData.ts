export const personalInfo = {
  name: 'Abhinav Tarigoppula',
  headline: 'I build AI systems that hold up in production, and fix the open-source libraries they run on.',
  role: 'AI/ML Engineer · Open-Source Contributor · IEEE Author',
  intro: 'Final-year B.Tech CSE (AI/ML) at GITAM. Three AI internships including PwC, a fine-tuned vision-language model, a multi-agent system, and 29 bug fixes merged into projects like unsloth, Black, pydantic, redis-py, Celery and HuggingFace.',
  email: 'abhinaaavvv07187@gmail.com',
  location: 'Visakhapatnam, India',
  photo: '/images/abhinav.jpg',
  resumeUrl: '/ABHINAV_RESUME.pdf',
  now: 'Fixing connection and event-loop bugs in Celery and asyncpg, and writing the full ICTIRL-2026 paper.',
  updated: 'September 2026',
};

export const socials = {
  github: 'https://github.com/kratos0718',
  linkedin: 'https://www.linkedin.com/in/abhinav0702/',
  leetcode: 'https://leetcode.com/u/GV2023000367/',
  researchgate: 'https://www.researchgate.net/profile/Abhinav-Tarigoppula',
};

// Checked 2026-09-29 with `gh search prs --author kratos0718 --merged`, own repos excluded.
export const stats = [
  { num: '29', label: 'PRs merged upstream' },
  { num: '18', label: 'open-source orgs' },
  { num: '400k+', label: 'combined GitHub stars' },
  { num: '3', label: 'AI internships' },
];

export const about = [
  "Most AI demos work in a notebook and fall apart in production. I like the part in between: agents that call tools safely, retrieval that returns the right context, fine-tuned models that are measured honestly, and async code that doesn't freeze an event loop.",
  'That last one turned into CodeHound, a static analyzer I wrote. The bugs it found were fixed and merged in unsloth, agno, pydantic, Black and Weaviate, and I have since had fixes merged in Celery, redis-py, scapy, pymodbus and Apache Maven. Every one came with a regression test and went through the maintainers\' review.',
  "Alongside that I've shipped ML in three internships (PwC, AVAIntern, OneStop AI), had a paper accepted at IEEE ISED 2026, and placed Top 5 at the BITS Pilani AI/ML hackathon.",
];

export const whatIDo = [
  {
    title: 'LLM, RAG & agents',
    accent: '#A78BFA',
    proof: { num: '4', label: 'cooperating agents in AgentDesk' },
    points: ['Multi-agent systems with validated tool calls', 'RAG that cites its sources', 'Prompt-injection and PII guardrails', 'Eval harnesses that catch regressions'],
  },
  {
    title: 'Model training & fine-tuning',
    accent: '#FB7185',
    proof: { num: '25→92%', label: 'extraction validity after QLoRA fine-tuning' },
    points: ['PyTorch, Transformers, PEFT / QLoRA', 'Vision-language models (Qwen2-VL)', 'Held-out and adversarial evaluation', 'Every result measured against a zero-shot baseline'],
  },
  {
    title: 'Backend & full stack',
    accent: '#2DD4BF',
    proof: { num: '−18%', label: 'inference latency at OneStop AI' },
    points: ['FastAPI services and REST APIs', 'Async Python that never blocks the loop', 'SQL, Docker and CI/CD', 'React front ends, schema to UI'],
  },
];

// icon keys map to brand logos in About.tsx; color is the brand color, lightened where it vanishes on black.
export const skillGroups = [
  { label: 'Languages', items: [
    { name: 'Python', icon: 'python', color: '#4B8BBE' },
    { name: 'TypeScript', icon: 'typescript', color: '#3178C6' },
    { name: 'JavaScript', icon: 'javascript', color: '#F7DF1E' },
    { name: 'Java', icon: 'java', color: '#EA2D2E' },
    { name: 'SQL', icon: 'postgres', color: '#6B8FE8' },
  ] },
  { label: 'AI / ML', items: [
    { name: 'PyTorch', icon: 'pytorch', color: '#EE4C2C' },
    { name: 'Transformers', icon: 'huggingface', color: '#FFD21E' },
    { name: 'PEFT / QLoRA', icon: 'huggingface', color: '#FFD21E' },
    { name: 'unsloth', img: '/logos/orgs/unslothai.png' },
    { name: 'scikit-learn', icon: 'sklearn', color: '#F7931E' },
    { name: 'OpenCV', icon: 'opencv', color: '#8B7BF0' },
    { name: 'Pandas', icon: 'pandas', color: '#E70488' },
  ] },
  { label: 'LLM', items: [
    { name: 'LangChain', icon: 'langchain', color: '#1FBF8F' },
    { name: 'OpenAI API', icon: 'openai', color: '#F1F1EF' },
    { name: 'Claude API', icon: 'claude', color: '#D97757' },
    { name: 'MCP', icon: 'mcp', color: '#F1F1EF' },
    { name: 'RAG', icon: 'rag', color: '#A78BFA' },
    { name: 'FAISS', icon: 'search', color: '#60A5FA' },
    { name: 'Tool calling', icon: 'tool', color: '#FBBF24' },
    { name: 'Evals', icon: 'check', color: '#4ADE80' },
  ] },
  { label: 'Engineering', items: [
    { name: 'FastAPI', icon: 'fastapi', color: '#05A898' },
    { name: 'asyncio', icon: 'zap', color: '#FBBF24' },
    { name: 'React', icon: 'react', color: '#61DAFB' },
    { name: 'Node.js', icon: 'node', color: '#5FA04E' },
    { name: 'Docker', icon: 'docker', color: '#2496ED' },
    { name: 'AWS', icon: 'aws', color: '#FF9900' },
    { name: 'GitHub Actions', icon: 'gha', color: '#2088FF' },
    { name: 'pytest', icon: 'pytest', color: '#0A9EDC' },
    { name: 'Git', icon: 'git', color: '#F05032' },
  ] },
];

export const education = [
  {
    degree: 'B.Tech, Computer Science & Engineering (AI/ML)',
    institution: 'GITAM University, Visakhapatnam',
    period: '2023 – 2027',
    detail: 'CGPA 8.12 · O in Machine Learning · A+ in AI & Deep Learning',
  },
  {
    degree: 'Intermediate (Class XII), MPC',
    institution: 'FIITJEE, Andhra Pradesh',
    period: '2020 – 2022',
  },
];

export const career = [
  {
    role: 'AI & Data Advisory Intern',
    company: 'PwC',
    program: 'Launchpad Advisory Program',
    logo: '/logos/pwc.jpg',
    period: 'Feb 2026 – Jul 2026',
    type: 'Remote',
    points: [
      "Selected for PwC's flagship advisory program on GenAI, prompt engineering and data systems.",
      'Built and optimised LLM prompt workflows for real enterprise use cases.',
      'Worked with enterprise data architectures and AI-driven advisory solutions.',
      'Reached Level 10 with 1500+ XP, top performance in the cohort.',
    ],
    tech: ['GenAI', 'Prompt engineering', 'Data systems'],
  },
  {
    role: 'AI/ML Engineering Intern',
    company: 'AVAIntern',
    program: 'AvaIntern Edutech',
    logo: '/logos/avaintern.png',
    period: 'May 2026 – Jun 2026',
    type: 'On-site · Visakhapatnam',
    points: [
      'Built and evaluated 5+ ML models on 10,000+ record datasets, reaching up to 92% prediction accuracy through feature engineering and tuning.',
      'Automated preprocessing and analysis with Python, Pandas and scikit-learn, cutting manual data preparation by 40%.',
      'Ran EDA and model evaluation across 15+ features, improving model performance by 18%, and presented findings through visualisations.',
    ],
    tech: ['Python', 'Pandas', 'scikit-learn', 'EDA'],
  },
  {
    role: 'Machine Learning & AI Intern',
    company: 'OneStop AI',
    program: '1stop',
    logo: '/logos/onestop.jpg',
    period: 'May 2025 – Aug 2025',
    type: 'Remote',
    points: [
      'Improved model accuracy by 12% across 3 production AI projects through hyperparameter tuning and architecture changes.',
      'Cut inference latency by 18% (220 ms to 180 ms) by refactoring preprocessing and applying model quantization.',
      'Built end-to-end data pipelines for preprocessing, feature engineering and batched inference.',
      'Added monitoring and model performance tracking with the senior engineers to make deployments more reliable.',
    ],
    tech: ['PyTorch', 'asyncio', 'Data pipelines', 'Monitoring'],
  },
];

export const projects = [
  {
    title: 'AgentDesk',
    subtitle: 'Multi-agent customer-support assistant',
    description: 'A planner agent routes each request to knowledge, data and action agents that use schema-validated tool calls. RAG over policy docs with citations, prompt-injection and PII guardrails, human approval for large refunds, and an eval harness that scores every change.',
    stat: { num: '4', label: 'cooperating agents' },
    tech: ['Python', 'FastAPI', 'Tool calling', 'RAG', 'SQL', 'Evals'],
    links: [{ label: 'GitHub', url: 'https://github.com/kratos0718/agentdesk' }],
  },
  {
    title: 'DocGuard-VLM',
    subtitle: 'Fine-tuned vision-language model',
    description: 'Qwen2-VL-2B fine-tuned with QLoRA for receipt field extraction and forgery detection. Scored on 120 held-out examples against the zero-shot model, field-extraction validity went from 25% to 92% and forgery F1 from 0.21 to 0.60.',
    stat: { num: '25→92%', label: 'extraction validity' },
    tech: ['PyTorch', 'PEFT / QLoRA', 'unsloth', 'Qwen2-VL'],
    links: [{ label: 'GitHub', url: 'https://github.com/kratos0718/docguard-vlm' }],
  },
  {
    title: 'CodeHound',
    subtitle: 'Python static analyzer',
    description: 'AST checks for async-safety and correctness bugs: blocking calls in async code, fire-and-forget tasks, leaked file handles, mutable defaults. Its findings became merged fixes in unsloth, mem0, agno, Black, Weaviate, Xorbits and pydantic-ai. Zero dependencies, CI-ready, with a citable DOI.',
    stat: { num: '7', label: 'orgs merged its fixes' },
    tech: ['Python', 'ast', 'pytest', 'GitHub Actions'],
    links: [
      { label: 'GitHub', url: 'https://github.com/kratos0718/codehound' },
      { label: 'Playground', url: 'https://kratos0718.github.io/codehound' },
    ],
  },
  {
    title: 'PathForge',
    subtitle: 'AI placement-preparation platform',
    description: 'Generates role-specific study material and mock interviews with RAG over FAISS. A skill-gap scoring layer filters retrieval by the learner\'s level before prompting, so answers are personal instead of generic, and a roadmap engine builds a study plan from the gaps.',
    stat: { num: '−30%', label: 'tokens per query' },
    tech: ['LangChain', 'OpenAI API', 'FAISS', 'FastAPI', 'React'],
    links: [{ label: 'Live site', url: 'https://www.pathforge.online/' }],
  },
  {
    title: 'MarkMe',
    subtitle: 'Proxy-proof attendance system',
    description: 'Three checks before attendance counts: face recognition with liveness detection, GPS geofencing within 100 m, and a rotating 6-digit session key. Face detection runs on the device, so biometric data never leaves the phone.',
    stat: { num: '3', label: 'verification layers' },
    tech: ['Python', 'JavaScript', 'Face recognition', 'Geofencing'],
    links: [
      { label: 'Live site', url: 'https://mark-me-ih3h.vercel.app/' },
      { label: 'GitHub', url: 'https://github.com/kratos0718/MarkMe' },
    ],
  },
  {
    title: 'SoulSync',
    subtitle: 'AI mental-health chatbot · Smart India Hackathon 2024',
    description: 'Generic sentence embeddings could not separate neutral text from distress (34% accuracy). Fine-tuning a sentence-transformer on mental-health data with multi-label emotion scoring raised it to 81%, and context tracking cut irrelevant replies by about 60%.',
    stat: { num: '34→81%', label: 'emotion accuracy' },
    tech: ['Python', 'Transformers', 'NLP', 'FastAPI'],
    links: [
      { label: 'Live site', url: 'https://soulsyncfinal.vercel.app/' },
      { label: 'GitHub', url: 'https://github.com/kratos0718/SoulSync' },
    ],
  },
];

// Star counts from the GitHub API, 2026-09-29.
export const openSource = {
  listUrl: 'https://github.com/kratos0718/open-source-contributions',
  orgs: [
    { org: 'unslothai', name: 'unsloth', stars: '77k' },
    { org: 'mem0ai', name: 'mem0', stars: '66k' },
    { org: 'agno-agi', name: 'agno', stars: '42k' },
    { org: 'psf', name: 'Black', stars: '42k' },
    { org: 'pydantic', name: 'pydantic', stars: '29k' },
    { org: 'marimo-team', name: 'marimo', stars: '23k' },
    { org: 'huggingface', name: 'HuggingFace', stars: '22k' },
    { org: 'grokability', name: 'Snipe-IT', stars: '15k' },
    { org: 'prowler-cloud', name: 'Prowler', stars: '15k' },
    { org: 'redis', name: 'redis-py', stars: '13.6k' },
    { org: 'secdev', name: 'scapy', stars: '12.6k' },
    { org: 'xorbitsai', name: 'Xorbits', stars: '9.6k' },
    { org: 'celery', name: 'Celery', stars: '3.1k' },
    { org: 'pymodbus-dev', name: 'pymodbus', stars: '2.8k' },
    { org: 'weaviate', name: 'Weaviate', stars: '' },
    { org: 'apache', name: 'Apache Maven', stars: '' },
    { org: 'mercari', name: 'Mercari', stars: '' },
    { org: 'phasespace-labs', name: 'palinode', stars: '' },
  ],
  highlights: [
    { repo: 'unslothai/unsloth', org: 'unslothai', stars: '77k', number: 6135, what: 'A time.sleep inside an async route froze the whole event loop for up to 30 seconds. Replaced with a non-blocking wait.' },
    { repo: 'psf/black', org: 'psf', stars: '42k', number: 5432, what: 'Two grammar-file handles in the pgen converter were opened and never closed.' },
    { repo: 'pydantic/pydantic', org: 'pydantic', stars: '29k', number: 13858, what: 'A dead isinstance check validated the wrong object and silently discarded the result.' },
    { repo: 'redis/redis-py', org: 'redis', stars: '13.6k', number: 4345, what: 'An exception inside utils.pipeline() leaked a pooled connection on every failure.' },
    { repo: 'celery/kombu', org: 'celery', stars: '3.1k', number: 2676, what: 'The SQS transport shared queue caches and AWS clients across every connection in a process.' },
    { repo: 'secdev/scapy', org: 'secdev', stars: '12.6k', number: 5204, what: 'A missing tcpreplay binary crashed with UnboundLocalError instead of a clear error.' },
    { repo: 'huggingface/huggingface_hub', org: 'huggingface', stars: '3.9k', number: 4289, what: 'Documented missing public-API parameters. Shipped to PyPI in v1.17.0.' },
    { repo: 'pymodbus-dev/pymodbus', org: 'pymodbus-dev', stars: '2.8k', number: 3036, what: 'Every device-identification object shared one class-level dict, so devices overwrote each other.' },
  ],
  all: [
    { repo: 'pymodbus-dev/pymodbus', number: 3036, title: 'Give each ModbusDeviceIdentification its own data' },
    { repo: 'secdev/scapy', number: 5204, title: 'sendpfast: report a missing tcpreplay instead of UnboundLocalError' },
    { repo: 'apache/maven-source-plugin', number: 320, title: 'Fail the aggregate goal for non-POM packaging' },
    { repo: 'celery/kombu', number: 2676, title: 'SQS: scope queue cache, noack set and predefined clients to Connection' },
    { repo: 'redis/redis-py', number: 4345, title: 'Fix connection leak in utils.pipeline() on exception' },
    { repo: 'pydantic/pydantic', number: 13858, title: 'Fix dead isinstance check in _decorator_infos_for_class()' },
    { repo: 'psf/black', number: 5432, title: 'Fix unclosed file handles in Converter.parse_graminit_h/_c' },
    { repo: 'apache/maven-shared-jar', number: 165, title: 'Return the file hash that was just computed instead of null' },
    { repo: 'phasespace-labs/palinode', number: 132, title: 'Do not overwrite an unrelated memory on a derived-slug collision' },
    { repo: 'apache/maven-help-plugin', number: 424, title: 'Stop reading LATEST from the deprecated Artifact constant' },
    { repo: 'grokability/snipe-it', number: 19514, title: 'Fix --force not skipping the PHP version prompt in ldap:troubleshoot' },
    { repo: 'mercari/pipeline', number: 122, title: 'Correct millis-to-micros conversion for Avro timestamp-millis' },
    { repo: 'mercari/pipeline', number: 119, title: 'Preserve microsecond precision for Avro timestamp-micros in JDBC' },
    { repo: 'apache/maven-source-plugin', number: 318, title: 'Assert the source archive itself is absent in testNoSources' },
    { repo: 'weaviate/weaviate-python-client', number: 2104, title: 'Fix event-loop-blocking time.sleep in async wait_for_weaviate' },
    { repo: 'prowler-cloud/prowler', number: 11761, title: 'Azure: read Flexible Server log retention from logfiles.retention_days' },
    { repo: 'pydantic/pydantic-ai', number: 6189, title: 'Avoid mutable default argument in process_tool_calls' },
    { repo: 'huggingface/peft', number: 3271, title: 'Fix adapter_names parameter name in set_requires_grad docstrings' },
    { repo: 'xorbitsai/inference', number: 5055, title: 'Avoid blocking the event loop in async update_model_type' },
    { repo: 'unslothai/unsloth', number: 6135, title: 'Avoid blocking the event loop with time.sleep in async load_checkpoint' },
    { repo: 'huggingface/accelerate', number: 4051, title: 'Document missing parameters in load_accelerator_state and others' },
    { repo: 'mem0ai/mem0', number: 5302, title: 'Replace mutable default arguments with None sentinels' },
    { repo: 'marimo-team/marimo', number: 9667, title: 'file_browser: add filter param for regex and callable filtering' },
    { repo: 'agno-agi/agno', number: 8186, title: 'Use async Attachment.read() instead of blocking requests.get in Discord client' },
    { repo: 'agno-agi/agno', number: 8161, title: 'Close audio file handle in OpenAITools.transcribe_audio' },
    { repo: 'pydantic/pydantic', number: 13239, title: 'Fix docstring typo' },
    { repo: 'agno-agi/agno', number: 8158, title: 'Replace blocking time.sleep with await asyncio.sleep in collection setup' },
    { repo: 'agno-agi/agno', number: 8138, title: 'Fix duplicate-word typos in cookbook examples' },
    { repo: 'huggingface/huggingface_hub', number: 4289, title: 'Document missing parameters in lfs, hf_file_system and repocard_data' },
  ],
};

export const research = [
  {
    title: 'Machine Learning-Based Student Performance Prediction: A Comparative Study Using Ensemble Methods and Explainable AI',
    venue: 'IEEE ISED 2026 · NIT Warangal',
    status: 'Accepted',
    authors: 'Second author of six, with D. Jaggupalli and C. Mahanty',
    summary: 'Compares ensemble models for predicting student performance and uses SHAP so the drivers behind each prediction can be inspected rather than trusted blindly.',
    tags: ['Ensemble methods', 'Explainable AI', 'SHAP'],
  },
  {
    title: 'From Compression Ratios to Wall-Clock Gains: A Systems-Level Review of Lightweight Deep Learning on Edge Hardware',
    venue: 'Springer book chapter · Lightweight Deep Learning for Efficient AI',
    status: 'Abstract submitted',
    authors: 'First and corresponding author',
    summary: 'Argues that the gap between reported model compression and real latency or energy gains is a systems problem, and proposes a hardware-aware evaluation protocol.',
    tags: ['Model compression', 'Edge AI', 'Quantisation'],
  },
  {
    title: 'AI-Assisted Bug Detection and the Accountability Gap: A Case Study of an Open-Source Static Analyzer',
    venue: 'ICTIRL-2026 · Springer Nature – Atlantis Press proceedings',
    status: 'Abstract accepted',
    authors: 'First author with D. Jaggupalli and R. Edupuganti',
    summary: 'Uses CodeHound\'s documented validation record to argue that AI developer tools should be judged on how their rules were validated, not only on whether an output was right.',
    tags: ['Algorithmic accountability', 'Static analysis', 'AI governance'],
  },
  {
    title: 'HAPS: A Hybrid AI Proctoring System for Unified Online and Offline Examination Integrity',
    venue: 'ResearchGate · May 2026',
    status: 'Preprint',
    authors: 'First author with D. Jaggupalli and J. Pujith',
    summary: 'Combines dual-stream CNNs, YOLO object detection and multi-modal behavioural signals to catch malpractice in both online and in-hall exams.',
    tags: ['Computer vision', 'YOLO', 'Multi-modal'],
  },
  {
    title: 'AI, ML and DL-Based Integrated Drone Detection and Autonomous Defence Systems: A Review',
    venue: 'ResearchGate · March 2026',
    status: 'Preprint',
    authors: 'Co-author with D. Jaggupalli and J. Pujith',
    summary: 'Surveys deep-learning architectures and deployment strategies for detecting drones and autonomous defence.',
    tags: ['Deep learning', 'Detection', 'Survey'],
  },
];

export const achievements = [
  {
    icon: 'trophy',
    title: 'Top 5 · AI & ML Hackathon',
    org: 'BITS Pilani Hyderabad · Techgyan',
    year: '2025',
    description: 'Placed in the top five at a 24-hour in-person AI/ML hackathon hosted at BITS Pilani, Hyderabad.',
  },
  {
    icon: 'paper',
    title: 'Paper accepted at IEEE ISED 2026',
    org: 'NIT Warangal',
    year: '2026',
    description: 'Ensemble ML with SHAP explainability for student performance prediction, accepted for the IEEE conference proceedings.',
  },
  {
    icon: 'git',
    title: '29 PRs merged in 18 organisations',
    org: 'Open source',
    year: '2026',
    description: 'Reviewed and merged by maintainers at HuggingFace, pydantic, Black, redis-py, Celery, unsloth, Apache and more, with code shipping on PyPI.',
  },
  {
    icon: 'flag',
    title: 'Smart India Hackathon',
    org: 'Government of India',
    year: '2024',
    description: "Built SoulSync, an AI mental-health chatbot, for India's largest national hackathon.",
  },
  {
    icon: 'code',
    title: '212 LeetCode problems',
    org: 'LeetCode',
    year: '2025',
    description: '91 easy, 108 medium and 13 hard over 127 active days, with an 82-day best streak.',
  },
  {
    icon: 'star',
    title: 'GitHub Galaxy Brain',
    org: 'GitHub achievements',
    year: '2026',
    description: 'Earned for answers accepted by the people who asked them, including one in Snipe-IT that became a merged fix.',
  },
];

export const certifications = [
  { title: 'AI & ML Virtual Internship', issuer: 'APSCHE · SmartBridge', date: 'Aug 2026', thumb: '/certs/thumbs/apsche-smartbridge.jpg', file: '/certs/apsche-smartbridge.pdf' },
  { title: 'Artificial Intelligence Intern', issuer: 'AvaIntern Edutech', date: 'Jun 2026', thumb: '/certs/thumbs/avaintern-ai.jpg', file: '/certs/avaintern-ai.pdf' },
  { title: 'Code Generation with IBM Granite', issuer: 'IBM SkillsBuild', date: 'Jun 2026', thumb: '/certs/thumbs/ibm-granite.jpg', file: '/certs/ibm-granite.png' },
  { title: 'Digital Application Fundamentals', issuer: 'FutureSkills Prime · Nasscom', date: 'May 2026', thumb: '/certs/thumbs/futureskills-nasscom.jpg', file: '/certs/futureskills-nasscom.png' },
  { title: 'AI/ML Hackathon', issuer: 'Techgyan · BITS Pilani', date: 'Jan 2026', thumb: '/certs/thumbs/techgyan-hackathon.jpg', file: '/certs/techgyan-hackathon.jpg' },
  { title: 'AWS Solutions Architecture', issuer: 'Forage · Amazon Web Services', date: 'Jul 2025', thumb: '/certs/thumbs/aws-forage.jpg', file: '/certs/aws-forage.jpg' },
  { title: 'AI Program & Internship', issuer: '1stop · IIT Guwahati', date: 'Jun 2025', thumb: '/certs/thumbs/1stop-ai-iitg.jpg', file: '/certs/1stop-ai-iitg.png' },
  { title: 'Mastering AI Agents', issuer: 'Udemy', date: 'Jun 2025', thumb: '/certs/thumbs/ai-agents-udemy.jpg', file: '/certs/ai-agents-udemy.jpg' },
  { title: 'What Is Generative AI?', issuer: 'LinkedIn Learning', date: 'Jun 2025', thumb: '/certs/thumbs/genai-linkedin.jpg', file: '/certs/genai-linkedin.jpg' },
  { title: 'Alpha: DSA with Java', issuer: 'Apna College', date: '2025', thumb: '/certs/thumbs/dsa-java-apna.jpg', file: '/certs/dsa-java-apna.jpg' },
  { title: 'Python for Beginners', issuer: 'Scaler Topics', date: 'Jul 2025', thumb: '/certs/thumbs/python-scaler.jpg', file: '/certs/python-scaler.jpg' },
  { title: 'MATLAB Fundamentals', issuer: 'MathWorks', date: 'Jan 2025', thumb: '/certs/thumbs/matlab-mathworks.jpg', file: '/certs/matlab-mathworks.jpg' },
];
