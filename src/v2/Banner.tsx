import { useEffect, useRef } from 'react';

// Pixel-art night scene of the Visakhapatnam coast: hills, a lighthouse with a
// sweeping beam, moonlight on the sea and a fishing boat drifting past.
// Drawn on a low-resolution canvas and scaled up with crisp pixels.

const PX = 4; // CSS pixels per art pixel
const H = 52; // art pixels tall

function rand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

// 1D value noise for the hill silhouettes.
function ridge(w: number, seed: number, base: number, amp: number, freq: number) {
  const r = rand(seed);
  const pts = Array.from({ length: Math.ceil(w * freq) + 3 }, () => r());
  return Array.from({ length: w }, (_, x) => {
    const t = x * freq;
    const i = Math.floor(t);
    const f = t - i;
    const s = f * f * (3 - 2 * f);
    return Math.round(base - amp * (pts[i] * (1 - s) + pts[i + 1] * s));
  });
}

const SKY = ['#080a16', '#0c1022', '#11152c', '#171a38', '#201e44', '#2d2350', '#422a58', '#5e3460', '#7a3f62'];

export default function Banner() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W = 0;
    let stars: { x: number; y: number; p: number; b: number }[] = [];
    let far: number[] = [];
    let near: number[] = [];
    let raf = 0;
    let city: { x: number; w: number; h: number; win: [number, number, number][] }[] = [];

    const horizon = 36;

    const setup = () => {
      W = Math.max(80, Math.ceil(canvas.clientWidth / PX));
      canvas.width = W;
      canvas.height = H;
      const r = rand(7);
      stars = Array.from({ length: Math.round(W * 0.28) }, () => ({
        x: Math.floor(r() * W), y: Math.floor(r() * 26), p: r() * Math.PI * 2, b: r(),
      }));
      far = ridge(W, 3, horizon, 9, 0.035);
      near = ridge(W, 11, horizon + 1, 6, 0.06).map((y, x) => (x < W * 0.62 ? y : horizon + 2));
      const rc = rand(21);
      city = [];
      for (let x = Math.round(W * 0.3); x < W * 0.66;) {
        const w = 3 + Math.floor(rc() * 4);
        const h = 3 + Math.floor(rc() * (x > W * 0.45 && x < W * 0.55 ? 10 : 6));
        const win: [number, number, number][] = [];
        for (let wy = 1; wy < h - 1; wy += 2) for (let wx = 1; wx < w - 1; wx += 2) if (rc() > 0.45) win.push([wx, wy, rc() * 6.3]);
        city.push({ x, w, h, win });
        x += w + (rc() > 0.7 ? 1 : 0);
      }
    };

    const px = (x: number, y: number, c: string) => { ctx.fillStyle = c; ctx.fillRect(x, y, 1, 1); };

    const draw = (t: number) => {
      // Sky in dithered bands
      const band = horizon / SKY.length;
      for (let y = 0; y < horizon; y++) {
        const f = y / band;
        const i = Math.min(SKY.length - 1, Math.floor(f));
        for (let x = 0; x < W; x++) {
          const next = Math.min(SKY.length - 1, i + 1);
          const dither = (x + y) % 2 === 0 && f - i > 0.5 ? next : i;
          px(x, y, SKY[dither]);
        }
      }
      // Stars
      for (const s of stars) {
        const tw = 0.5 + 0.5 * Math.sin(t / 700 + s.p);
        if (tw < 0.25) continue;
        px(s.x, s.y, s.b > 0.85 ? `rgba(255,236,200,${tw})` : `rgba(200,210,255,${0.35 + tw * 0.5})`);
      }
      // Moon
      const mx = Math.round(W * 0.2), my = 8;
      for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) {
        const inDisc = dx * dx + dy * dy <= 13;
        const inShadow = (dx + 2) ** 2 + (dy + 1) ** 2 <= 10;
        if (inDisc && !inShadow) px(mx + dx, my + dy, dx > 1 ? '#FFF3D6' : '#EBD9AE');
      }
      // Far hills (Kailasagiri) and near headland
      for (let x = 0; x < W; x++) {
        for (let y = far[x]; y < horizon; y++) px(x, y, y === far[x] ? '#4a3d73' : y < far[x] + 3 ? '#352c5a' : '#272146');
        for (let y = near[x]; y < horizon + 2; y++) px(x, y, y === near[x] ? '#2b2542' : '#17142a');
      }
      // Beach Road skyline with lit windows
      for (const b of city) {
        for (let x = b.x; x < b.x + b.w; x++) for (let y = horizon - b.h; y < horizon + 1; y++) px(x, y, '#120f22');
        for (const [wx, wy, ph] of b.win) {
          if (Math.sin(t / 2200 + ph) > -0.6) px(b.x + wx, horizon - b.h + wy, ph > 4 ? '#9CC7FF' : '#F2B562');
        }
      }
      // Sea
      for (let y = horizon; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const d = (y - horizon) / (H - horizon);
          px(x, y, d < 0.3 ? '#0d1022' : d < 0.65 ? '#0a0c1a' : '#080913');
        }
      }
      // Moon path on the water: broken horizontal glints
      for (let y = horizon + 1; y < H; y += 2) {
        const span = 2 + Math.floor((y - horizon) * 0.7);
        for (let k = -span; k <= span; k++) {
          const g = Math.sin(t / 320 + y * 2.1 + k * 0.9);
          if (g > 0.55) px(mx + k, y, g > 0.9 && Math.abs(k) < span / 2 ? 'rgba(255,236,190,0.85)' : 'rgba(235,217,174,0.35)');
        }
      }
      // Horizon haze
      ctx.fillStyle = 'rgba(122,63,98,0.25)';
      ctx.fillRect(0, horizon, W, 1);
      // Wave crests
      for (let y = horizon + 3; y < H; y += 4) {
        for (let x = 0; x < W; x++) {
          if (Math.sin(x * 0.45 + t / 500 + y * 3) > 0.93) px(x, y, '#2b3150');
        }
      }
      // Lighthouse on the right headland
      const lx = Math.round(W * 0.84);
      const ground = horizon + 1;
      for (let x = lx - 9; x <= lx + 12; x++) for (let y = ground - 2 + Math.abs(x - lx) / 6; y < ground + 1; y++) px(x, Math.floor(y), '#14121f');
      for (let y = ground - 15; y < ground - 1; y++) {
        const half = 1 + Math.floor((y - (ground - 15)) / 7);
        for (let k = -half; k <= half; k++) px(lx + k, y, Math.floor(y / 3) % 2 === 0 ? '#d8d2c6' : '#a8423c');
      }
      px(lx, ground - 17, '#3a3550'); px(lx - 1, ground - 16, '#3a3550'); px(lx + 1, ground - 16, '#3a3550');
      // Beam: sweeps left and right, with a pulse when it faces us
      const ang = reduce ? -2.6 : Math.sin(t / 1600) * 1.25 + Math.PI;
      const facing = Math.max(0, Math.cos(t / 1600 * 1) ** 8);
      const ly = ground - 16;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(lx, ly);
      ctx.lineTo(lx + Math.cos(ang - 0.09) * W, ly + Math.sin(ang - 0.09) * W * 0.25);
      ctx.lineTo(lx + Math.cos(ang + 0.09) * W, ly + Math.sin(ang + 0.09) * W * 0.25);
      ctx.closePath();
      ctx.fillStyle = 'rgba(255,225,150,0.10)';
      ctx.fill();
      ctx.restore();
      px(lx, ly, '#FFE7A3');
      ctx.fillStyle = `rgba(255,231,163,${0.25 + facing * 0.5})`;
      ctx.fillRect(lx - 1, ly - 1, 3, 3);
      // Boat drifting across with a lantern
      const bx = reduce ? Math.round(W * 0.45) : Math.round(((t / 140) % (W + 20)) - 10);
      const by = horizon + 6 + Math.round(Math.sin(t / 400));
      for (let k = -3; k <= 3; k++) px(bx + k, by, '#05060c');
      for (let k = -2; k <= 2; k++) px(bx + k, by + 1, '#05060c');
      px(bx, by - 1, '#05060c'); px(bx, by - 2, '#05060c');
      px(bx + 1, by - 2, Math.sin(t / 300) > -0.5 ? '#FFC870' : '#a77a3a');
      px(bx + 1, by + 2, 'rgba(255,200,112,0.35)');
    };

    let last = 0;
    const loop = (t: number) => {
      if (t - last > 50) { draw(t); last = t; }
      raf = requestAnimationFrame(loop);
    };
    setup();
    if (reduce) draw(4000);
    else raf = requestAnimationFrame(loop);
    const ro = new ResizeObserver(() => { setup(); if (reduce) draw(4000); });
    ro.observe(canvas);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <div className="v2-banner">
      <canvas ref={ref} aria-hidden="true" />
      <span className="v2-banner-tag">Visakhapatnam · 17.7°N 83.3°E</span>
    </div>
  );
}
