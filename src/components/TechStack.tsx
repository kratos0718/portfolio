import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/TechStack.css';

gsap.registerPlugin(ScrollTrigger);

const BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

type TechItem = { name: string; src: string };

const ROW1: TechItem[] = [
  { name: 'Python',      src: `${BASE}/python/python-original.svg` },
  { name: 'JavaScript',  src: `${BASE}/javascript/javascript-original.svg` },
  { name: 'TypeScript',  src: `${BASE}/typescript/typescript-original.svg` },
  { name: 'React',       src: `${BASE}/react/react-original.svg` },
  { name: 'Node.js',     src: `${BASE}/nodejs/nodejs-original.svg` },
  { name: 'FastAPI',     src: `${BASE}/fastapi/fastapi-original.svg` },
  { name: 'TensorFlow',  src: `${BASE}/tensorflow/tensorflow-original.svg` },
  { name: 'PyTorch',     src: `${BASE}/pytorch/pytorch-original.svg` },
  { name: 'Docker',      src: `${BASE}/docker/docker-original.svg` },
  { name: 'AWS',         src: `${BASE}/amazonwebservices/amazonwebservices-plain-wordmark.svg` },
];

const ROW2: TechItem[] = [
  { name: 'Java',        src: `${BASE}/java/java-original.svg` },
  { name: 'Git',         src: `${BASE}/git/git-original.svg` },
  { name: 'GitHub',      src: `${BASE}/github/github-original.svg` },
  { name: 'MySQL',       src: `${BASE}/mysql/mysql-original.svg` },
  { name: 'PostgreSQL',  src: `${BASE}/postgresql/postgresql-original.svg` },
  { name: 'Scikit-learn',src: `${BASE}/scikitlearn/scikitlearn-original.svg` },
  { name: 'OpenCV',      src: `${BASE}/opencv/opencv-original.svg` },
  { name: 'Kubernetes',  src: `${BASE}/kubernetes/kubernetes-plain.svg` },
  { name: 'Linux',       src: `${BASE}/linux/linux-original.svg` },
  { name: 'VS Code',     src: `${BASE}/vscode/vscode-original.svg` },
];

function IconCard({ item }: { item: TechItem }) {
  return (
    <div className="tech-icon-card">
      <img
        src={item.src}
        alt={item.name}
        className="tech-icon-img"
        loading="lazy"
        onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.3'; }}
      />
      <span className="tech-icon-name">{item.name}</span>
    </div>
  );
}

function Marquee({ items, reverse }: { items: TechItem[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="tech-marquee-wrap">
      <div className={`tech-track ${reverse ? 'tech-track-reverse' : ''}`}>
        {doubled.map((item, i) => (
          <IconCard key={`${item.name}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const rowsRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: 'top 75%' };
      gsap.from(headRef.current, {
        opacity: 0, y: 40, duration: 0.9, ease: 'power3.out', scrollTrigger: st,
      });
      gsap.from(rowsRef.current, {
        opacity: 0, y: 32, duration: 0.9, ease: 'power3.out', delay: 0.2, scrollTrigger: st,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="techstack" id="techstack">
      <div ref={headRef} className="techstack-head">
        <div className="section-tag">Tech Stack</div>
        <h2 className="techstack-title">
          Technical <span className="techstack-title-accent">Arsenal</span>
        </h2>
        <p className="techstack-subtitle">Technologies powering my builds</p>
        <div className="techstack-divider" />
      </div>

      <div ref={rowsRef} className="techstack-rows">
        <Marquee items={ROW1} />
        <Marquee items={ROW2} reverse />
      </div>
    </section>
  );
}
