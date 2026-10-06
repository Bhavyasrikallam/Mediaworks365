import Image from "next/image";
import {
  ChartLine,
  Code,
  Gem,
  MousePointerClick,
  Palette,
  PenLine,
  Search,
  Share2,
  User,
  type LucideIcon,
} from "lucide-react";
import { about } from "@/content/site";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Expert profile shape. Only `role` is available today; named profiles and
 * photos are pending consent. Add `name`, `title` and `photo` once approved
 * and the card switches from the abstract badge to the real profile.
 */
export type ExpertProfile = {
  role: string;
  name?: string;
  title?: string;
  photo?: { src: string; alt: string };
};

const roleIcons: Record<string, LucideIcon> = {
  "SEO Specialists": Search,
  "PPC Managers": MousePointerClick,
  "Social Media Experts": Share2,
  "Content Strategists": PenLine,
  "Web Developers": Code,
  "Graphic Designers": Palette,
  "Brand Consultants": Gem,
  "Marketing Analysts": ChartLine,
};

/** Rotating geometric badge variants so the grid reads as varied, not repeated. */
const badgeShapes = [
  "rounded-full",
  "rounded-[1.25rem]",
  "rounded-[2rem_0.5rem_2rem_0.5rem]",
  "rounded-[0.5rem_2rem_0.5rem_2rem]",
];

function AbstractAvatar({ icon: RoleIcon, index }: { icon: LucideIcon; index: number }) {
  const shape = badgeShapes[index % badgeShapes.length];
  const rotate = index % 2 === 0 ? "rotate-6" : "-rotate-6";
  return (
    <div aria-hidden="true" className="relative size-20 shrink-0">
      <div className={`absolute inset-0 ${shape} ${rotate} bg-gradient-to-br from-brand-400 to-brand-600 opacity-90`} />
      <div className={`absolute inset-1.5 ${shape} bg-ink-950`} />
      <div className="absolute inset-0 flex items-center justify-center text-brand-400">
        <RoleIcon className="size-8" strokeWidth={1.5} />
      </div>
    </div>
  );
}

export function ExpertCard({ profile, index }: { profile: ExpertProfile; index: number }) {
  const RoleIcon = roleIcons[profile.role] ?? User;
  return (
    <article className="group relative isolate flex h-full flex-col items-start overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-brand-500/40 hover:bg-white/[0.06]">
      <div
        aria-hidden="true"
        className="absolute -top-16 -right-16 -z-10 size-40 rounded-full bg-brand-500/10 blur-2xl transition-opacity group-hover:opacity-100 sm:opacity-60"
      />
      {profile.photo ? (
        <div className="relative size-20 overflow-hidden rounded-full ring-2 ring-brand-500">
          <Image src={profile.photo.src} alt={profile.photo.alt} fill sizes="80px" className="object-cover" />
        </div>
      ) : (
        <AbstractAvatar icon={RoleIcon} index={index} />
      )}
      {profile.name ? (
        <>
          <h3 className="mt-6 text-lg font-semibold text-white">{profile.name}</h3>
          <p className="mt-1 text-sm text-brand-400">{profile.title ?? profile.role}</p>
        </>
      ) : (
        <h3 className="mt-6 text-lg font-semibold break-words text-white">{profile.role}</h3>
      )}
    </article>
  );
}

export function AboutExperts({ profiles }: { profiles?: ExpertProfile[] }) {
  const list: ExpertProfile[] = profiles ?? about.experts.roles.map((role) => ({ role }));

  return (
    <Section tone="dark" aria-labelledby="about-experts-title" className="relative isolate overflow-hidden">
      <SectionHeading id="about-experts-title" eyebrow="Our Team" title={about.experts.title} intro={about.experts.body} tone="dark" />
      <ul className="mt-10 grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 sm:mt-14 sm:gap-5 lg:grid-cols-4">
        {list.map((profile, i) => (
          <Reveal as="li" key={profile.name ?? profile.role} delay={(i % 4) * 70}>
            <ExpertCard profile={profile} index={i} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
