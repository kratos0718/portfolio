import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './styles/Loading.css';
import { useLoading } from '../context/LoadingProvider';

export default function Loading() {
  const { setIsLoading } = useLoading();
  const [count, setCount] = useState(0);
  const [ready, setReady] = useState(false);
  const [exiting, setExiting] = useState(false);
  const screenRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const progressObj = useRef({ val: 0 });

  useEffect(() => {
    // Steps counter — jumps in 14 discrete increments (mechanical feel)
    gsap.to(progressObj.current, {
      val: 100,
      duration: 2.6,
      ease: 'steps(14)',
      onUpdate: () => setCount(Math.floor(progressObj.current.val)),
      onComplete: () => { setTimeout(() => setReady(true), 300); },
    });

    // Smooth bar fill (separate from counter)
    gsap.to(barRef.current, {
      scaleX: 1,
      duration: 2.8,
      ease: 'power2.inOut',
      transformOrigin: 'left',
    });
  }, []);

  const handleEnter = () => {
    setExiting(true);
    // Clip-path wipe out
    gsap.to(screenRef.current, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.9,
      ease: 'power4.inOut',
      onComplete: () => setIsLoading(false),
    });
  };

  const marquee = Array(8).fill('ABHINAV · AI ENGINEER · FULL STACK · ML · REACT · PYTHON · DOCKER · ').join('');

  return (
    <div
      ref={screenRef}
      className="loading-screen"
      style={{ clipPath: 'inset(0 0 0% 0)' }}
    >
      {/* Background grid lines */}
      <div className="loading-grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="loading-grid-col" />
        ))}
      </div>

      {/* Center content */}
      <div className="loading-body">
        {/* Name */}
        <div className="loading-name">
          <span className="loading-name-part">ABHI</span>
          <span className="loading-name-accent">NAV</span>
          <span className="loading-cursor-blink" />
        </div>

        {/* Role */}
        <div className="loading-role">AI Engineer &amp; Full Stack Developer</div>

        {/* Bar */}
        <div className="loading-bar-track">
          <div ref={barRef} className="loading-bar-fill" style={{ transform: 'scaleX(0)' }} />
        </div>

        {/* Counter */}
        <div ref={counterRef} className="loading-counter">
          {String(count).padStart(3, '0')}
          <span className="loading-counter-pct">%</span>
        </div>

        {/* Enter button */}
        <button
          className={`loading-enter${ready ? ' visible' : ''}`}
          onClick={handleEnter}
          disabled={!ready || exiting}
        >
          <span className="loading-enter-text">Enter</span>
          <span className="loading-enter-arrow">→</span>
        </button>
      </div>

      {/* Bottom marquee */}
      <div className="loading-marquee">
        <div className="loading-marquee-track">{marquee}</div>
      </div>
    </div>
  );
}
