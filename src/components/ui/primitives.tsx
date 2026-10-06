import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

/** Horizontal page gutter: 16px on phones, growing with the viewport. */
export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

type Tone = "light" | "paper" | "dark";

const toneClasses: Record<Tone, string> = {
  light: "bg-white text-ink-900",
  paper: "bg-paper text-ink-900",
  dark: "bg-ink-950 text-white",
};

export function Section({
  id,
  tone = "paper",
  className,
  children,
  "aria-labelledby": labelledBy,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
  "aria-labelledby"?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("py-16 sm:py-20 lg:py-28", toneClasses[tone], className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children, tone = "light", className }: { children: React.ReactNode; tone?: "light" | "dark"; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase",
        tone === "dark" ? "text-brand-400" : "text-brand-700",
        className,
      )}
    >
      <span aria-hidden="true" className={cn("h-px w-6", tone === "dark" ? "bg-brand-400" : "bg-brand-600")} />
      {children}
    </p>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  tone = "light",
  align = "left",
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow tone={tone} className={cn("mb-4", align === "center" && "justify-center")}>{eyebrow}</Eyebrow>}
      <h2 id={id} className="text-3xl leading-tight font-semibold sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {intro && (
        <p className={cn("mt-5 text-base leading-relaxed sm:text-lg", tone === "dark" ? "text-ink-300" : "text-ink-600")}>{intro}</p>
      )}
    </div>
  );
}

type ButtonVariant = "primary" | "secondary" | "ghost-dark" | "ghost-light";

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-brand-500 text-ink-950 hover:bg-brand-400 shadow-[0_8px_30px_-8px_rgb(245_173_20/0.6)]",
  secondary: "bg-ink-950 text-white hover:bg-ink-800",
  "ghost-dark": "border border-white/25 text-white hover:border-white/60 hover:bg-white/5",
  "ghost-light": "border border-ink-300 text-ink-900 hover:border-ink-900 hover:bg-ink-950/[0.03]",
};

const buttonBase =
  "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-200 sm:text-base";

export function ButtonLink({
  href,
  variant = "primary",
  arrow = false,
  className,
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={cn(buttonBase, buttonVariants[variant], className)}>
      {children}
      {arrow && <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />}
    </Link>
  );
}

export function buttonClasses(variant: ButtonVariant = "primary", className?: string) {
  return cn(buttonBase, buttonVariants[variant], className);
}
