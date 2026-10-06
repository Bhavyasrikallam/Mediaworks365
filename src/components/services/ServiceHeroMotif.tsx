import type { Service } from "@/content/site";
import { Container } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/Icon";

/**
 * Decorative motif overlaid on the right side of the shared PageHero.
 * Only shown from xl up, where the hero copy (max-w-4xl) leaves free space;
 * smaller screens get the full-width copy without the motif.
 */
export function ServiceHeroMotif({ icon }: { icon: Service["icon"] }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden items-center xl:flex">
      <Container className="flex justify-end">
        <div className="relative mr-2 size-72 2xl:size-80">
          <div className="absolute inset-0 rounded-full border border-white/10" />
          <div className="absolute inset-8 rounded-full border border-dashed border-brand-500/30" />
          <div className="absolute inset-16 rounded-full border border-white/10 bg-white/[0.02]" />
          <div className="absolute inset-0 m-auto flex size-28 rotate-6 items-center justify-center rounded-[1.75rem] bg-brand-500 text-ink-950 shadow-[0_20px_60px_-12px_rgb(245_173_20/0.55)]">
            <Icon name={icon} className="size-12 -rotate-6" strokeWidth={1.5} />
          </div>
          <span className="absolute top-6 left-1/2 size-3 rounded-full bg-brand-400" />
          <span className="absolute right-3 bottom-16 size-2 rounded-full bg-white/50" />
          <span className="absolute bottom-6 left-10 size-2.5 rounded-full bg-brand-500/70" />
          <span className="absolute top-1/2 -left-1 size-1.5 rounded-full bg-white/40" />
        </div>
      </Container>
    </div>
  );
}
