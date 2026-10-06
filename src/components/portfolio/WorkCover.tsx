import type { CSSProperties } from "react";
import type { IconName } from "@/content/site";
import { Icon } from "@/components/ui/Icon";

type Category = "Store Activations" | "Events" | "On Ground Activities" | (string & {});

/**
 * Decorative, photo-free cover art for a work card. Each category has its own
 * motif (storefront grid / stage spotlights / crowd dots) and `variant`
 * shifts composition so cards in the same category still look distinct.
 */
export function WorkCover({ category, variant, icon }: { category: Category; variant: number; icon: IconName }) {
  const v = variant % 3;

  if (category === "Store Activations") {
    const bg: CSSProperties = {
      background: [
        "linear-gradient(135deg, #fbc23a 0%, #f5ad14 45%, #d18f00 100%)",
        "linear-gradient(160deg, #ffd56b 0%, #f5ad14 60%, #8f6100 100%)",
        "linear-gradient(120deg, #f5ad14 0%, #d18f00 55%, #6b4800 100%)",
      ][v],
    };
    return (
      <Frame style={bg} icon={icon} tone="light">
        <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
          {/* awning stripes */}
          {Array.from({ length: 12 }, (_, i) => (
            <rect key={i} x={i * 28 - 8} y={0} width={14} height={34} fill="#08080a" opacity={0.85} />
          ))}
          <path d="M0 34 Q14 46 28 34 T56 34 T84 34 T112 34 T140 34 T168 34 T196 34 T224 34 T252 34 T280 34 T308 34 T336 34 V34 Z" fill="#08080a" opacity={0.85} />
          {/* window panes */}
          {Array.from({ length: 3 }, (_, i) => (
            <rect
              key={i}
              x={34 + i * 88 + (v === 1 ? 10 : 0)}
              y={60 + (v === 2 ? 8 : 0)}
              width={74}
              height={96}
              rx={6}
              fill="#ffffff"
              opacity={i === v ? 0.42 : 0.18}
              stroke="#08080a"
              strokeOpacity={0.25}
            />
          ))}
          <line x1={0} y1={164} x2={320} y2={164} stroke="#08080a" strokeOpacity={0.35} strokeWidth={2} />
        </svg>
      </Frame>
    );
  }

  if (category === "Events") {
    const spot = [
      { x: 70, x2: 250 },
      { x: 160, x2: 40 },
      { x: 260, x2: 120 },
    ][v];
    return (
      <Frame
        style={{ background: "radial-gradient(120% 90% at 50% 110%, #26262d 0%, #0f0f12 55%, #08080a 100%)" }}
        icon={icon}
        tone="dark"
      >
        <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
          <polygon points={`${spot.x - 6},0 ${spot.x + 6},0 ${spot.x + 70},180 ${spot.x - 70},180`} fill="#f5ad14" opacity={0.22} />
          <polygon points={`${spot.x2 - 5},0 ${spot.x2 + 5},0 ${spot.x2 + 55},180 ${spot.x2 - 55},180`} fill="#ffffff" opacity={0.08} />
          {[0, 1, 2, 3].map((r) => (
            <circle key={r} cx={160} cy={190} r={40 + r * 34} fill="none" stroke="#f5ad14" strokeOpacity={0.28 - r * 0.06} strokeWidth={1.5} />
          ))}
          {Array.from({ length: 18 }, (_, i) => (
            <circle key={i} cx={10 + i * 18} cy={8 + ((i * 7 + v * 5) % 14)} r={1.6} fill="#ffd56b" opacity={0.5} />
          ))}
        </svg>
      </Frame>
    );
  }

  // On Ground Activities (and any future category)
  const dots: { x: number; y: number; hot: boolean }[] = [];
  for (let row = 0; row < 7; row++) {
    for (let col = 0; col < 14; col++) {
      const x = 14 + col * 22 + (row % 2) * 11;
      const y = 22 + row * 22;
      const dx = x - [90, 230, 160][v];
      const dy = y - [100, 80, 120][v];
      dots.push({ x, y, hot: dx * dx + dy * dy < 2600 });
    }
  }
  return (
    <Frame style={{ background: "linear-gradient(150deg, #18181d 0%, #26262d 50%, #3a3a44 100%)" }} icon={icon} tone="dark">
      <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.hot ? 4 : 2.2} fill={d.hot ? "#f5ad14" : "#ffffff"} opacity={d.hot ? 0.9 : 0.18} />
        ))}
        <path
          d={["M-10 150 C 60 120, 120 170, 190 110 S 300 60, 340 40", "M-10 60 C 70 40, 140 120, 210 90 S 290 140, 340 120", "M-10 120 C 50 160, 130 60, 200 100 S 300 150, 340 90"][v]}
          fill="none"
          stroke="#fbc23a"
          strokeOpacity={0.55}
          strokeWidth={2}
          strokeDasharray="6 8"
        />
      </svg>
    </Frame>
  );
}

function Frame({
  style,
  icon,
  tone,
  children,
}: {
  style: CSSProperties;
  icon: IconName;
  tone: "light" | "dark";
  children: React.ReactNode;
}) {
  return (
    <div aria-hidden="true" className="relative aspect-[16/9] overflow-hidden" style={style}>
      {children}
      <span
        className={
          tone === "light"
            ? "absolute right-4 bottom-4 grid size-12 place-items-center rounded-2xl bg-ink-950 text-brand-400 shadow-lg"
            : "absolute right-4 bottom-4 grid size-12 place-items-center rounded-2xl bg-brand-500 text-ink-950 shadow-lg"
        }
      >
        <Icon name={icon} className="size-6" />
      </span>
    </div>
  );
}
