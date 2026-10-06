import Image from "next/image";
import { Building2, Rocket, Store, type LucideIcon } from "lucide-react";
import { clientLogos, home } from "@/content/site";
import { Section } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";

/** Audience segments named in `home.trustedBy.body`; shown until client logos are rights-cleared. */
const audiences: { label: string; icon: LucideIcon }[] = [
  { label: "Startups", icon: Rocket },
  { label: "Small Businesses", icon: Store },
  { label: "Enterprises", icon: Building2 },
];

export function TrustedBy() {
  const hasLogos = clientLogos.length > 0;

  return (
    <Section tone="light" aria-labelledby="trusted-by-title" className="border-y border-ink-200/70 py-14! sm:py-16!">
      <Reveal className="mx-auto max-w-3xl text-center">
        <h2 id="trusted-by-title" className="text-sm font-semibold tracking-[0.18em] text-brand-700 uppercase">
          {home.trustedBy.title}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-ink-700 sm:text-xl">{home.trustedBy.body}</p>
      </Reveal>

      {hasLogos ? (
        <Reveal delay={120} className="mt-10">
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <ul className="flex w-max animate-marquee items-center gap-12 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center sm:gap-16">
              {[...clientLogos, ...clientLogos].map((logo, i) => {
                const duplicate = i >= clientLogos.length;
                return (
                  <li
                    key={`${logo.name}-${i}`}
                    aria-hidden={duplicate || undefined}
                    className={duplicate ? "motion-reduce:hidden" : undefined}
                  >
                    <Image
                      src={logo.src}
                      alt={duplicate ? "" : logo.name}
                      width={160}
                      height={64}
                      className="h-10 w-auto object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 sm:h-12"
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      ) : (
        <Reveal delay={120} className="mt-10">
          <ul className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {audiences.map(({ label, icon: AudienceIcon }) => (
              <li
                key={label}
                className="inline-flex min-h-12 items-center gap-3 rounded-full border border-ink-200 bg-paper px-5 py-2.5 text-base font-medium text-ink-800"
              >
                <span className="grid size-8 place-items-center rounded-full bg-ink-950 text-brand-400">
                  <AudienceIcon aria-hidden="true" className="size-4" strokeWidth={1.75} />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </Section>
  );
}
