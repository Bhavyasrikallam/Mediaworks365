import type { Service } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Abstract, decorative SVG scene themed per service icon. Pure presentation:
 * always aria-hidden, no text, no claims. Designed for dark backgrounds.
 */
export function ServiceIllustration({ icon, className }: { icon: Service["icon"]; className?: string }) {
  return (
    <svg
      viewBox="0 0 320 240"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("h-auto w-full", className)}
    >
      {scenes[icon]}
    </svg>
  );
}

const line = "rgb(255 255 255 / 0.22)";
const faint = "rgb(255 255 255 / 0.08)";
const amber = "var(--color-brand-500)";
const amberSoft = "rgb(245 173 20 / 0.18)";

const scenes: Record<Service["icon"], React.ReactNode> = {
  // Search bar, ranked results with #1 highlighted, rising trend line.
  search: (
    <g>
      <rect x="40" y="28" width="240" height="34" rx="17" stroke={line} strokeWidth="1.5" />
      <circle cx="62" cy="45" r="7" stroke={amber} strokeWidth="2" />
      <path d="M67 50l6 6" stroke={amber} strokeWidth="2" strokeLinecap="round" />
      <rect x="84" y="41" width="96" height="8" rx="4" fill={faint} />
      <rect x="40" y="80" width="240" height="30" rx="10" fill={amberSoft} stroke={amber} strokeWidth="1.5" />
      <rect x="54" y="91" width="18" height="8" rx="4" fill={amber} />
      <rect x="82" y="91" width="120" height="8" rx="4" fill="rgb(255 255 255 / 0.5)" />
      <rect x="40" y="120" width="240" height="26" rx="10" stroke={line} />
      <rect x="54" y="129" width="100" height="8" rx="4" fill={faint} />
      <rect x="40" y="154" width="240" height="26" rx="10" stroke={line} />
      <rect x="54" y="163" width="80" height="8" rx="4" fill={faint} />
      <path d="M40 222 L100 208 L150 212 L210 192 L280 172" stroke={amber} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="280" cy="172" r="5" fill={amber} />
    </g>
  ),
  // Storefront with striped awning, branded window and door.
  store: (
    <g>
      <path d="M40 210h240" stroke={line} strokeWidth="1.5" />
      <rect x="60" y="88" width="200" height="122" stroke={line} strokeWidth="1.5" />
      <path d="M52 64h216l-8 24H60z" fill={amberSoft} stroke={amber} strokeWidth="1.5" />
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={`M${68 + i * 40} 64h20l-2 24h-20z`} fill={amber} opacity="0.85" />
      ))}
      <rect x="76" y="106" width="104" height="80" rx="4" fill="rgb(245 173 20 / 0.1)" stroke={amber} strokeWidth="1.5" />
      <circle cx="128" cy="138" r="16" stroke={amber} strokeWidth="2" />
      <rect x="104" y="164" width="48" height="6" rx="3" fill="rgb(255 255 255 / 0.5)" />
      <rect x="196" y="122" width="48" height="88" rx="3" stroke={line} strokeWidth="1.5" />
      <circle cx="234" cy="168" r="2.5" fill={amber} />
      <rect x="120" y="36" width="80" height="18" rx="9" stroke={line} />
    </g>
  ),
  // Branded booth with an audience of people gathered around it.
  users: (
    <g>
      <rect x="110" y="70" width="100" height="70" rx="8" fill={amberSoft} stroke={amber} strokeWidth="1.5" />
      <path d="M100 70h120" stroke={amber} strokeWidth="3" strokeLinecap="round" />
      <rect x="130" y="92" width="60" height="8" rx="4" fill="rgb(255 255 255 / 0.5)" />
      <rect x="140" y="108" width="40" height="6" rx="3" fill={faint} />
      <path d="M110 140v40M210 140v40" stroke={line} strokeWidth="1.5" />
      {[
        [56, 168, true],
        [92, 190, false],
        [136, 200, true],
        [184, 200, false],
        [228, 190, true],
        [264, 168, false],
      ].map(([x, y, hi], i) => (
        <g key={i}>
          <circle cx={x as number} cy={(y as number) - 22} r="9" stroke={hi ? amber : line} strokeWidth="1.75" />
          <path
            d={`M${(x as number) - 14} ${y as number}a14 12 0 0 1 28 0`}
            stroke={hi ? amber : line}
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </g>
      ))}
      <circle cx="56" cy="60" r="3" fill={amber} />
      <circle cx="268" cy="44" r="2" fill={amber} />
      <circle cx="240" cy="84" r="2.5" fill="rgb(255 255 255 / 0.4)" />
    </g>
  ),
  // Event stage with spotlight beams and a crowd line.
  ticket: (
    <g>
      <path d="M70 30L120 150H40z" fill="rgb(245 173 20 / 0.12)" />
      <path d="M250 30L280 150H200z" fill="rgb(245 173 20 / 0.12)" />
      <path d="M160 24L200 150H120z" fill="rgb(255 255 255 / 0.05)" />
      <circle cx="70" cy="30" r="6" fill={amber} />
      <circle cx="160" cy="24" r="6" fill="rgb(255 255 255 / 0.6)" />
      <circle cx="250" cy="30" r="6" fill={amber} />
      <rect x="40" y="150" width="240" height="22" rx="4" fill={amberSoft} stroke={amber} strokeWidth="1.5" />
      <rect x="120" y="118" width="80" height="24" rx="6" stroke={amber} strokeWidth="1.5" />
      <rect x="134" y="127" width="52" height="6" rx="3" fill="rgb(255 255 255 / 0.5)" />
      <path
        d="M40 214c10-14 20-14 30 0s20-14 30 0 20-14 30 0 20-14 30 0 20-14 30 0 20-14 30 0 20-14 30 0 20-14 30 0"
        stroke={line}
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path d="M40 228h240" stroke={faint} strokeWidth="1.5" />
    </g>
  ),
  // Consistent brand across desktop, tablet and phone screens.
  monitor: (
    <g>
      <rect x="40" y="40" width="170" height="112" rx="8" stroke={line} strokeWidth="1.5" />
      <path d="M105 152v22M85 176h40" stroke={line} strokeWidth="1.5" strokeLinecap="round" />
      <rect x="52" y="52" width="146" height="18" rx="4" fill={faint} />
      <circle cx="64" cy="61" r="4" fill={amber} />
      <rect x="52" y="80" width="70" height="60" rx="6" fill={amberSoft} stroke={amber} strokeWidth="1.25" />
      <rect x="130" y="80" width="68" height="8" rx="4" fill="rgb(255 255 255 / 0.5)" />
      <rect x="130" y="96" width="52" height="6" rx="3" fill={faint} />
      <rect x="130" y="124" width="44" height="14" rx="7" fill={amber} />
      <rect x="196" y="96" width="70" height="98" rx="8" fill="var(--color-ink-950)" stroke={line} strokeWidth="1.5" />
      <circle cx="210" cy="110" r="3.5" fill={amber} />
      <rect x="206" y="122" width="50" height="34" rx="4" fill={amberSoft} stroke={amber} strokeWidth="1" />
      <rect x="206" y="164" width="40" height="5" rx="2.5" fill="rgb(255 255 255 / 0.45)" />
      <rect x="250" y="132" width="40" height="72" rx="8" fill="var(--color-ink-950)" stroke={line} strokeWidth="1.5" />
      <circle cx="260" cy="144" r="3" fill={amber} />
      <rect x="257" y="154" width="26" height="22" rx="3" fill={amberSoft} stroke={amber} strokeWidth="1" />
      <rect x="257" y="182" width="20" height="4" rx="2" fill="rgb(255 255 255 / 0.45)" />
    </g>
  ),
  // Roadside billboard on posts above a horizon.
  billboard: (
    <g>
      <circle cx="262" cy="52" r="18" fill={amberSoft} stroke={amber} strokeWidth="1.5" />
      <rect x="54" y="44" width="180" height="96" rx="6" stroke={line} strokeWidth="1.5" />
      <rect x="64" y="54" width="160" height="76" rx="3" fill={amberSoft} stroke={amber} strokeWidth="1.5" />
      <rect x="78" y="70" width="90" height="10" rx="5" fill="rgb(255 255 255 / 0.6)" />
      <rect x="78" y="88" width="64" height="7" rx="3.5" fill="rgb(255 255 255 / 0.25)" />
      <rect x="78" y="106" width="46" height="12" rx="6" fill={amber} />
      <circle cx="196" cy="94" r="18" stroke={amber} strokeWidth="2" />
      <path d="M104 140v66M184 140v66" stroke={line} strokeWidth="2" />
      <path d="M90 156h108" stroke={faint} strokeWidth="1.5" />
      <path d="M20 206h280" stroke={line} strokeWidth="1.5" />
      <path d="M40 222h40M120 222h40M200 222h40" stroke={amber} strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
    </g>
  ),
};
