/**
 * Decorative "365" dial echoing the logo's circle: a year-ring of day ticks,
 * an amber progress arc and slowly orbiting markers. Purely presentational.
 * Rotation is disabled by the global reduced-motion rule in globals.css.
 */
const TICKS = 73; // one tick per five days of the year

export function HeroDial({ className }: { className?: string }) {
  const ticks = Array.from({ length: TICKS }, (_, i) => {
    const angle = (i / TICKS) * Math.PI * 2;
    const major = i % 6 === 0;
    const r1 = major ? 168 : 174;
    const r2 = 182;
    return {
      x1: 200 + r1 * Math.sin(angle),
      y1: 200 - r1 * Math.cos(angle),
      x2: 200 + r2 * Math.sin(angle),
      y2: 200 - r2 * Math.cos(angle),
      major,
    };
  });

  return (
    <div aria-hidden="true" className={className}>
      <div className="relative aspect-square w-full">
        {/* glow */}
        <div className="absolute inset-[12%] rounded-full bg-brand-500/20 blur-3xl" />

        <svg viewBox="0 0 400 400" className="relative size-full" fill="none">
          <defs>
            <linearGradient id="dial-arc" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffd56b" />
              <stop offset="55%" stopColor="#f5ad14" />
              <stop offset="100%" stopColor="#d18f00" stopOpacity="0.1" />
            </linearGradient>
            <radialGradient id="dial-core" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#26262d" />
              <stop offset="100%" stopColor="#0f0f12" />
            </radialGradient>
          </defs>

          {/* day ticks */}
          <g>
            {ticks.map((t, i) => (
              <line
                key={i}
                x1={t.x1.toFixed(2)}
                y1={t.y1.toFixed(2)}
                x2={t.x2.toFixed(2)}
                y2={t.y2.toFixed(2)}
                stroke={t.major ? "#f5ad14" : "rgb(255 255 255 / 0.22)"}
                strokeWidth={t.major ? 2 : 1}
                strokeLinecap="round"
              />
            ))}
          </g>

          {/* slow-rotating outer dashed ring */}
          <g className="origin-center animate-[spin_90s_linear_infinite] motion-reduce:animate-none">
            <circle cx="200" cy="200" r="194" stroke="rgb(255 255 255 / 0.12)" strokeDasharray="2 10" />
          </g>

          {/* amber progress arc, rotating */}
          <g className="origin-center animate-[spin_24s_linear_infinite] motion-reduce:animate-none">
            <circle
              cx="200"
              cy="200"
              r="150"
              stroke="url(#dial-arc)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="660 942"
            />
            <circle cx="200" cy="50" r="7" fill="#ffd56b" />
            <circle cx="200" cy="50" r="14" fill="#f5ad14" fillOpacity="0.25" />
          </g>

          {/* inner track + counter-rotating marker */}
          <circle cx="200" cy="200" r="150" stroke="rgb(255 255 255 / 0.06)" strokeWidth="6" />
          <g className="origin-center animate-[spin_40s_linear_infinite_reverse] motion-reduce:animate-none">
            <circle cx="200" cy="200" r="118" stroke="rgb(255 255 255 / 0.1)" />
            <circle cx="82" cy="200" r="4" fill="#fff" />
          </g>

          {/* core */}
          <circle cx="200" cy="200" r="100" fill="url(#dial-core)" stroke="rgb(255 255 255 / 0.1)" />
          <text
            x="200"
            y="214"
            textAnchor="middle"
            fill="#f5ad14"
            style={{ font: "600 58px var(--font-display)", letterSpacing: "-0.03em" }}
          >
            365
          </text>
          <text
            x="200"
            y="244"
            textAnchor="middle"
            fill="rgb(255 255 255 / 0.55)"
            style={{ font: "500 11px var(--font-sans)", letterSpacing: "0.32em" }}
          >
            DAYS A YEAR
          </text>
        </svg>
      </div>
    </div>
  );
}
