import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/TechStack.css';
import { techStack } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

/* ─── Force-directed neural network (pure canvas — no Three.js dependency here) ─── */
type TechNode = {
  id: string; x: number; y: number;
  vx: number; vy: number;
  r: number; hovered: boolean; pulse: number;
  group: number;
};

const GROUPS = [
  { label: 'AI / ML', color: '#00f5ff', items: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV'] },
  { label: 'Web Dev', color: '#00c8d4', items: ['React.js', 'Node.js', 'FastAPI', 'JavaScript'] },
  { label: 'DevOps / Cloud', color: '#006a75', items: ['AWS', 'Docker', 'Kubernetes', 'Git', 'Linux'] },
  { label: 'Data / Lang', color: '#40f8ff', items: ['SQL', 'Java', 'GitHub Actions', 'Google Colab'] },
];

function buildNodes(W: number, H: number): TechNode[] {
  return techStack.map((name, _i) => {
    const gIdx = GROUPS.findIndex(g => g.items.includes(name));
    return {
      id: name, x: W * 0.2 + Math.random() * W * 0.6, y: H * 0.2 + Math.random() * H * 0.6,
      vx: 0, vy: 0, r: 28, hovered: false, pulse: Math.random() * Math.PI * 2,
      group: gIdx >= 0 ? gIdx : 0,
    };
  });
}

function NeuralGraph({ visible }: { visible: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodes = useRef<TechNode[]>([]);
  const mouse = useRef({ x: -9999, y: -9999 });
  const frameRef = useRef<number>(0);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let W = canvas.width = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;

    nodes.current = buildNodes(W, H);

    const onResize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };

    const getCanvasPos = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onMove = (e: MouseEvent) => {
      const p = getCanvasPos(e);
      mouse.current = p;
      let found: string | null = null;
      for (const n of nodes.current) {
        const dx = n.x - p.x, dy = n.y - p.y;
        n.hovered = Math.sqrt(dx * dx + dy * dy) < n.r + 6;
        if (n.hovered) found = n.id;
      }
      setHoveredNode(found);
    };

    canvas.addEventListener('mousemove', onMove);
    window.addEventListener('resize', onResize);

    const colors = GROUPS.map(g => g.color);

    const tick = () => {
      ctx.clearRect(0, 0, W, H);

      const ns = nodes.current;

      // Forces
      for (let i = 0; i < ns.length; i++) {
        const a = ns[i];
        a.pulse += 0.025;

        // Gravity toward center
        a.vx += (W / 2 - a.x) * 0.0008;
        a.vy += (H / 2 - a.y) * 0.0008;

        // Mouse repel
        const mdx = a.x - mouse.current.x, mdy = a.y - mouse.current.y;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 100) {
          const f = (100 - md) / 100;
          a.vx += (mdx / md) * f * 1.8;
          a.vy += (mdy / md) * f * 1.8;
        }

        // Repel from same group (spreading)
        for (let j = i + 1; j < ns.length; j++) {
          const b = ns[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy) || 1;
          const minD = 80;
          if (d < minD) {
            const f = (minD - d) / minD * 0.4;
            a.vx += (dx / d) * f; a.vy += (dy / d) * f;
            b.vx -= (dx / d) * f; b.vy -= (dy / d) * f;
          }
        }

        // Damping
        a.vx *= 0.88; a.vy *= 0.88;
        a.x += a.vx; a.y += a.vy;

        // Bounce walls
        const pad = 50;
        if (a.x < pad) { a.x = pad; a.vx *= -0.5; }
        if (a.x > W - pad) { a.x = W - pad; a.vx *= -0.5; }
        if (a.y < pad) { a.y = pad; a.vy *= -0.5; }
        if (a.y > H - pad) { a.y = H - pad; a.vy *= -0.5; }
      }

      // Draw connections
      for (let i = 0; i < ns.length; i++) {
        for (let j = i + 1; j < ns.length; j++) {
          const a = ns[i], b = ns[j];
          if (a.group !== b.group) continue;
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d > 200) continue;
          const alpha = (1 - d / 200) * 0.4;
          const col = colors[a.group];
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          const hex = parseInt(col.slice(1), 16);
          const r = (hex >> 16) & 255, g = (hex >> 8) & 255, bv = hex & 255;
          ctx.strokeStyle = `rgba(${r},${g},${bv},${alpha})`;
          ctx.lineWidth = alpha * 1.5;
          ctx.stroke();
        }
      }

      // Draw nodes
      for (const n of nodes.current) {
        const col = colors[n.group];
        const glow = (Math.sin(n.pulse) + 1) * 0.5;
        const r = n.r + (n.hovered ? 6 : 0);

        // Outer glow
        const grad = ctx.createRadialGradient(n.x, n.y, r * 0.3, n.x, n.y, r + 12);
        grad.addColorStop(0, col + '30');
        grad.addColorStop(1, col + '00');
        ctx.beginPath();
        ctx.arc(n.x, n.y, r + 12, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Node circle
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = n.hovered ? col + 'cc' : '#0d1820';
        ctx.strokeStyle = col;
        ctx.lineWidth = n.hovered ? 2 : 1 + glow * 0.5;
        ctx.fill();
        ctx.stroke();

        // Label
        ctx.fillStyle = n.hovered ? '#000' : col;
        ctx.font = `${n.hovered ? 700 : 500} ${n.hovered ? 11.5 : 10.5}px 'Space Grotesk', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(n.id, n.x, n.y);
      }

      frameRef.current = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(frameRef.current);
      canvas.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
    };
  }, [visible]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block', cursor: hoveredNode ? 'none' : 'none' }}
    />
  );
}

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: 'top 72%' };

      gsap.to(tagRef.current, { clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'power3.inOut', scrollTrigger: st });
      gsap.to(titleRef.current, { clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'power3.out', delay: 0.1, scrollTrigger: st });
      gsap.to(leftRef.current, { clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'power3.out', delay: 0.2, scrollTrigger: st });
      gsap.to(canvasWrapRef.current, {
        opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.3,
        scrollTrigger: st,
        onStart: () => setVisible(true),
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="techstack" id="techstack">
      <div ref={tagRef} className="section-tag">Tech Stack</div>
      <h2 ref={titleRef} className="section-title">
        Tools I <span className="accent">work with</span>
      </h2>

      <div className="techstack-inner">
        <div ref={leftRef} className="techstack-left">
          <p className="techstack-desc">
            My toolkit spans the full AI-to-deployment pipeline — from training neural networks
            in PyTorch to shipping full-stack apps in React and Node, containerized with Docker
            and running on AWS.
          </p>

          <div className="techstack-legend">
            {GROUPS.map(g => (
              <div key={g.label} className="techstack-legend-item">
                <span className="techstack-legend-dot" style={{ background: g.color, boxShadow: `0 0 8px ${g.color}` }} />
                <span className="techstack-legend-label">{g.label}</span>
              </div>
            ))}
          </div>

          <div className="techstack-tags">
            {techStack.map(t => (
              <span key={t} className="techstack-tag">{t}</span>
            ))}
          </div>
        </div>

        <div ref={canvasWrapRef} className="techstack-canvas-wrap" style={{ opacity: 0 }}>
          <NeuralGraph visible={visible} />
          <div className="techstack-canvas-label">NEURAL NETWORK · DRAG TO EXPLORE</div>
        </div>
      </div>
    </section>
  );
}
