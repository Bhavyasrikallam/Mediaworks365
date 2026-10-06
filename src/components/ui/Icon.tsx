import {
  BarChart3,
  Brain,
  Check,
  Layers,
  Monitor,
  Rocket,
  Search,
  Signpost,
  Sparkles,
  Store,
  Target,
  Ticket,
  Users,
  type LucideProps,
} from "lucide-react";
import type { IconName } from "@/content/site";

const icons = {
  search: Search,
  store: Store,
  users: Users,
  ticket: Ticket,
  monitor: Monitor,
  billboard: Signpost,
  target: Target,
  chart: BarChart3,
  sparkles: Sparkles,
  layers: Layers,
  brain: Brain,
  rocket: Rocket,
  check: Check,
} satisfies Record<IconName, React.ComponentType<LucideProps>>;

/** Decorative content icon, hidden from assistive tech by default. */
export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Cmp = icons[name];
  return <Cmp aria-hidden="true" strokeWidth={1.75} {...props} />;
}
