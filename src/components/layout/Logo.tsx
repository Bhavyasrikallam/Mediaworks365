import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/content/site";

/** Brand wordmark. `variant="dark"` is for dark surfaces (white letters). */
export function Logo({ variant = "dark", className, priority = false }: { variant?: "dark" | "light"; className?: string; priority?: boolean }) {
  return (
    <Link href="/" aria-label={`${site.name} — home`} className={cn("inline-flex shrink-0 items-center", className)}>
      <Image
        src={variant === "dark" ? "/brand/logo.png" : "/brand/logo-on-light.png"}
        alt=""
        width={640}
        height={200}
        priority={priority}
        sizes="180px"
        className="h-9 w-auto sm:h-10"
      />
    </Link>
  );
}
