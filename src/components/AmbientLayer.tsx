import './styles/AmbientLayer.css';

export default function AmbientLayer() {
  return (
    <div className="ambient-layer" aria-hidden="true">

      {/* ── Hanging pendants from top ── */}
      <div className="hanging hanging-a">
        <div className="hang-line" />
        <div className="hang-orb" />
      </div>
      <div className="hanging hanging-b">
        <div className="hang-line" />
        <div className="hang-diamond" />
      </div>
      <div className="hanging hanging-c">
        <div className="hang-line" />
        <div className="hang-orb" />
      </div>
      <div className="hanging hanging-d">
        <div className="hang-line" />
        <div className="hang-square" />
      </div>

      {/* ── Floating geometric shapes ── */}
      {/* Large thin circle — top right */}
      <div className="fshape fshape-circle-lg" />

      {/* Medium circle — lower right */}
      <div className="fshape fshape-circle-md" />

      {/* Small circle — mid left edge */}
      <div className="fshape fshape-circle-sm" />

      {/* Diamond (rotated square) — upper left */}
      <div className="fshape fshape-diamond" />

      {/* Thin rectangle — bottom center-left */}
      <div className="fshape fshape-rect" />

      {/* Small square — lower right area */}
      <div className="fshape fshape-square" />

      {/* Plus / cross mark — mid right edge */}
      <div className="fshape fshape-cross">
        <span className="cross-v" />
        <span className="cross-h" />
      </div>

      {/* 3×3 dot grid — right edge */}
      <div className="fshape fshape-dots">
        {Array.from({ length: 9 }).map((_, i) => <span key={i} />)}
      </div>

    </div>
  );
}
