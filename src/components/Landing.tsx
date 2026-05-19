import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import './styles/Landing.css';
import { personalInfo } from '../data/portfolioData';

/* ─── Neural Network Canvas ─── */
function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMove);

    /* Nodes */
    const NODE_COUNT = 55;
    type Node = { x: number; y: number; vx: number; vy: number; r: number; pulse: number; };
    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 2 + 1,
      pulse: Math.random() * Math.PI * 2,
    }));

    const CONNECT_DIST = 160;
    const MOUSE_REPEL = 120;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Update nodes
      for (const n of nodes) {
        n.pulse += 0.02;
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;

        // Mouse repulsion
        const dx = n.x - mouse.current.x;
        const dy = n.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_REPEL) {
          const force = (MOUSE_REPEL - dist) / MOUSE_REPEL;
          n.vx += (dx / dist) * force * 0.4;
          n.vy += (dy / dist) * force * 0.4;
          // Clamp speed
          const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
          if (speed > 2.5) { n.vx *= 2.5 / speed; n.vy *= 2.5 / speed; }
        }
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_DIST) {
            const alpha = (1 - d / CONNECT_DIST) * 0.35;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0,245,255,${alpha})`;
            ctx.lineWidth = alpha * 1.2;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const n of nodes) {
        const glow = (Math.sin(n.pulse) + 1) * 0.5;
        const r = n.r + glow * 1.2;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,245,255,${0.35 + glow * 0.45})`;
        ctx.fill();

        // Glow ring on bigger nodes
        if (n.r > 2.2) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, r + 3, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0,245,255,${0.08 + glow * 0.1})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.55 }}
    />
  );
}

/* ─── Magnetic Button ─── */
function MagneticBtn({ children, className, href }: { children: React.ReactNode; className: string; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current!;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * 0.28, y: y * 0.28, duration: 0.4, ease: 'power2.out' });
  }, []);
  const onLeave = useCallback(() => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.5)' });
  }, []);
  return (
    <a ref={ref} href={href} className={`btn-magnetic ${className}`}
      onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </a>
  );
}

export default function Landing() {
  const pillRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cornerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // Pill clip-path reveal
    tl.to(pillRef.current, {
      clipPath: 'inset(0 0% 0 0)',
      duration: 0.8,
      ease: 'power3.inOut',
    })
    // Name lines slide up
    .to([line1Ref.current, line2Ref.current], {
      y: '0%',
      duration: 1,
      stagger: 0.1,
      ease: 'power4.out',
    }, '-=0.3')
    // Role items slide up
    .to(roleRef.current?.children ?? [], {
      y: '0%',
      duration: 0.7,
      stagger: 0.08,
      ease: 'power3.out',
    }, '-=0.5')
    // Tagline clip-path reveal
    .to(taglineRef.current, {
      clipPath: 'inset(0 0 0% 0)',
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.3')
    // Actions fade
    .to(actionsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
    }, '-=0.3')
    // Side elements
    .to([rightRef.current, scrollRef.current, cornerRef.current], {
      opacity: 1,
      duration: 0.7,
      stagger: 0.1,
    }, '-=0.3');
  }, []);

  return (
    <section className="landing" id="home">
      <div className="landing-canvas">
        <NeuralCanvas />
      </div>

      <div className="landing-content">
        <div ref={pillRef} className="landing-pill">
          <span className="landing-pill-dot" />
          <span className="landing-pill-text">Available for opportunities</span>
        </div>

        <h1 className="landing-name">
          <span className="landing-name-line">
            <span ref={line1Ref} className="landing-name-inner">
              {personalInfo.firstName}
            </span>
          </span>
          <span className="landing-name-line">
            <span ref={line2Ref} className="landing-name-inner cyan">
              {personalInfo.name.split(' ').slice(1).join(' ')}
            </span>
          </span>
        </h1>

        <div ref={roleRef} className="landing-role-strip">
          <span className="landing-role-item">AI Engineer</span>
          <span className="landing-role-sep">·</span>
          <span className="landing-role-item">Full Stack Dev</span>
          <span className="landing-role-sep">·</span>
          <span className="landing-role-item">ML Enthusiast</span>
        </div>

        <p ref={taglineRef} className="landing-tagline">
          {personalInfo.tagline}
        </p>

        <div ref={actionsRef} className="landing-actions" style={{ opacity: 0, transform: 'translateY(16px)' }}>
          <MagneticBtn href="#work" className="btn-primary-mag">
            View Work
          </MagneticBtn>
          <MagneticBtn href="#contact" className="btn-outline-mag">
            <span>Let's Talk</span>
          </MagneticBtn>
        </div>
      </div>

      {/* Right stats */}
      <div ref={rightRef} className="landing-right">
        {[
          { num: '150+', label: 'LeetCode Solved' },
          { num: '3+', label: 'Live Projects' },
          { num: '+12%', label: 'ML Accuracy Gain' },
        ].map(s => (
          <div key={s.label} className="landing-stat">
            <div className="landing-stat-num">{s.num}</div>
            <div className="landing-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="landing-scroll">
        <div className="scroll-line" />
        <span className="scroll-label">Scroll</span>
      </div>

      {/* Corner label */}
      <div ref={cornerRef} className="landing-corner">
        <span className="landing-corner-text">Portfolio · 2025</span>
      </div>
    </section>
  );
}
