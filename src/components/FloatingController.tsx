import { useEffect, useRef, useState } from 'react';
import './styles/FloatingController.css';

export default function FloatingController() {
  const ref = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const [hovered, setHovered] = useState(false);
  const [score, setScore] = useState(0);
  const [showPop, setShowPop] = useState(false);

  const pos   = useRef({ x: 0, y: 0 });
  const vel   = useRef({ x: 0.55, y: 0.38 });
  const angle = useRef(0);
  const t     = useRef(0);
  const SIZE  = 52;

  useEffect(() => {
    // Start at a safe position (right side, away from nav)
    pos.current = { x: window.innerWidth * 0.78, y: window.innerHeight * 0.38 };

    let W = window.innerWidth;
    let H = window.innerHeight;
    const onResize = () => { W = window.innerWidth; H = window.innerHeight; };
    window.addEventListener('resize', onResize);

    const tick = () => {
      t.current += 0.007;

      // Drift with a very gentle sine-wave vertical wobble
      pos.current.x += vel.current.x;
      pos.current.y += vel.current.y + Math.sin(t.current * 2.3) * 0.14;

      // Bounce off edges — add tiny random nudge so path never repeats
      const PAD = 72;
      if (pos.current.x <= PAD || pos.current.x >= W - SIZE - PAD) {
        vel.current.x *= -1;
        vel.current.y += (Math.random() - 0.5) * 0.18;
      }
      if (pos.current.y <= PAD || pos.current.y >= H - SIZE - PAD) {
        vel.current.y *= -1;
        vel.current.x += (Math.random() - 0.5) * 0.18;
      }

      // Clamp speed so it stays gentle
      const spd = Math.sqrt(vel.current.x ** 2 + vel.current.y ** 2);
      const MAX = 0.75;
      if (spd > MAX) { vel.current.x *= MAX / spd; vel.current.y *= MAX / spd; }

      // Lazy oscillating tilt
      angle.current = Math.sin(t.current * 1.2) * 11;

      if (ref.current) {
        ref.current.style.transform =
          `translate(${pos.current.x}px, ${pos.current.y}px) rotate(${angle.current}deg)`;
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const handleClick = () => {
    setScore(s => s + 1);
    setShowPop(true);
    setTimeout(() => setShowPop(false), 900);
    // Brief speed burst on click
    const boost = 2.5;
    vel.current.x *= boost;
    vel.current.y *= boost;
    setTimeout(() => {
      const s = Math.sqrt(vel.current.x ** 2 + vel.current.y ** 2);
      vel.current.x = (vel.current.x / s) * 0.55;
      vel.current.y = (vel.current.y / s) * 0.40;
    }, 600);
  };

  return (
    <div
      ref={ref}
      className={`fc${hovered ? ' fc-hov' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      {/* PS-style controller SVG */}
      <svg className="fc-svg" viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Body */}
        <path d="M14 8 C6 8 2 18 2 26 C2 34 8 38 14 38 C18 38 21 35 24 30 L40 30 C43 35 46 38 50 38 C56 38 62 34 62 26 C62 18 58 8 50 8 L36 8 L36 4 L28 4 L28 8 Z"
          fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        {/* Left analog stick */}
        <circle cx="20" cy="24" r="5" stroke="currentColor" strokeWidth="1.2" fill="currentColor" opacity="0.15"/>
        <circle cx="20" cy="24" r="2.5" fill="currentColor" opacity="0.4"/>
        {/* Right analog stick */}
        <circle cx="38" cy="24" r="5" stroke="currentColor" strokeWidth="1.2" fill="currentColor" opacity="0.15"/>
        <circle cx="38" cy="24" r="2.5" fill="currentColor" opacity="0.4"/>
        {/* D-pad */}
        <rect x="10" y="14" width="3" height="8" rx="1" fill="currentColor" opacity="0.55"/>
        <rect x="7" y="17" width="9" height="3" rx="1" fill="currentColor" opacity="0.55"/>
        {/* ABXY buttons */}
        <circle cx="51" cy="16" r="2.2" fill="currentColor" opacity="0.5"/>
        <circle cx="47" cy="20" r="2.2" fill="currentColor" opacity="0.5"/>
        <circle cx="55" cy="20" r="2.2" fill="currentColor" opacity="0.5"/>
        <circle cx="51" cy="24" r="2.2" fill="currentColor" opacity="0.5"/>
        {/* Center buttons */}
        <rect x="29" y="16" width="6" height="2.5" rx="1.2" fill="currentColor" opacity="0.4"/>
        {/* Shoulder buttons */}
        <path d="M14 8 C14 5 18 4 22 5 L28 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.45"/>
        <path d="M50 8 C50 5 46 4 42 5 L36 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.45"/>
      </svg>

      {/* Hover tooltip */}
      {hovered && (
        <div className="fc-tip">
          <span>easter egg</span>
          {score > 0 && <span className="fc-tip-score">× {score}</span>}
        </div>
      )}

      {/* Click score pop */}
      {showPop && <div className="fc-pop">+1</div>}
    </div>
  );
}
