import type { Service } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { ServiceIllustration } from "./ServiceIllustration";

/** Dark, decorative card framing a service's illustration. Hidden from assistive tech. */
export function ServiceVisualPanel({ service, className }: { service: Service; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative isolate overflow-hidden rounded-card border border-white/10 bg-ink-950 p-6 sm:p-10",
        className,
      )}
    >
      <div className="bg-grid-dark absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="absolute -right-16 -bottom-20 -z-10 size-72 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="mb-4 flex items-center justify-between">
        <span className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-500 text-ink-950">
          <Icon name={service.icon} className="size-5" />
        </span>
        <span className="flex gap-1.5">
          <span className="size-2 rounded-full bg-white/20" />
          <span className="size-2 rounded-full bg-white/20" />
          <span className="size-2 rounded-full bg-brand-500" />
        </span>
      </div>
      <ServiceIllustration icon={service.icon} className="mx-auto max-w-md" />
    </div>
  );
}
