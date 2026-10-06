"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { ctas, navigation, type NavItem } from "@/content/site";
import { cn } from "@/lib/cn";
import { Container, buttonClasses } from "@/components/ui/primitives";
import { Logo } from "./Logo";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

function DesktopDropdown({ item, pathname }: { item: NavItem; pathname: string }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const active = isActive(pathname, item.href);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <div className="flex items-center">
        <Link
          href={item.href}
          aria-current={pathname === item.href ? "page" : undefined}
          className={cn(
            "rounded-full py-2 pr-1 pl-3 text-sm font-medium transition-colors",
            active ? "text-brand-400" : "text-ink-200 hover:text-white",
          )}
        >
          {item.label}
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="services-menu"
          aria-label={`${item.label} submenu`}
          onClick={() => setOpen((o) => !o)}
          className="rounded-full p-1.5 text-ink-300 hover:text-white"
        >
          <ChevronDown aria-hidden="true" className={cn("size-4 transition-transform", open && "rotate-180")} />
        </button>
      </div>
      <div
        id="services-menu"
        className={cn(
          "absolute top-full left-1/2 w-72 -translate-x-1/2 pt-3 transition-all duration-200",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
        )}
      >
        <ul className="rounded-2xl border border-white/10 bg-ink-900/95 p-2 shadow-2xl backdrop-blur-xl">
          {item.children?.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                onClick={() => setOpen(false)}
                aria-current={pathname === child.href ? "page" : undefined}
                className={cn(
                  "block rounded-xl px-4 py-2.5 text-sm transition-colors",
                  pathname === child.href ? "bg-white/10 text-brand-400" : "text-ink-200 hover:bg-white/5 hover:text-white",
                )}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close the mobile menu on navigation (adjust state during render, not in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock background scroll and allow Escape while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  // Close the mobile menu if the viewport grows into the desktop layout.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setMenuOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled || menuOpen ? "border-white/10 bg-ink-950/90 backdrop-blur-xl" : "border-transparent bg-ink-950",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-18">
        <Logo priority />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) =>
              item.children ? (
                <li key={item.href}>
                  <DesktopDropdown item={item} pathname={pathname} />
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className={cn(
                      "rounded-full px-3 py-2 text-sm font-medium transition-colors",
                      isActive(pathname, item.href) ? "text-brand-400" : "text-ink-200 hover:text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href={ctas.consultation.href} className={buttonClasses("primary", "hidden sm:inline-flex", "sm")}>
            Free Consultation
          </Link>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full text-white hover:bg-white/10 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile / tablet menu */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto overscroll-contain border-t border-white/10 bg-ink-950 sm:top-18 lg:hidden"
      >
        <nav aria-label="Mobile" className="mx-auto max-w-7xl px-4 pt-4 pb-10 sm:px-6">
          <ul className="divide-y divide-white/10">
            {navigation.map((item) => (
              <li key={item.href} className="py-1">
                {item.children ? (
                  <>
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        aria-current={pathname === item.href ? "page" : undefined}
                        className={cn("flex-1 py-3 text-lg font-medium", isActive(pathname, item.href) ? "text-brand-400" : "text-white")}
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        aria-expanded={servicesOpen}
                        aria-controls="mobile-services"
                        aria-label={`${item.label} submenu`}
                        onClick={() => setServicesOpen((o) => !o)}
                        className="inline-flex size-11 items-center justify-center rounded-full text-ink-200 hover:bg-white/10"
                      >
                        <ChevronDown aria-hidden="true" className={cn("size-5 transition-transform", servicesOpen && "rotate-180")} />
                      </button>
                    </div>
                    <ul id="mobile-services" hidden={!servicesOpen} className="mb-3 ml-1 border-l border-white/10 pl-4">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            aria-current={pathname === child.href ? "page" : undefined}
                            className={cn("block py-2.5 text-base", pathname === child.href ? "text-brand-400" : "text-ink-300 hover:text-white")}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className={cn("block py-3 text-lg font-medium", isActive(pathname, item.href) ? "text-brand-400" : "text-white")}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Link href={ctas.consultation.href} className={buttonClasses("primary")}>
              {ctas.consultation.label}
            </Link>
            <Link href={ctas.audit.href} className={buttonClasses("ghost-dark")}>
              {ctas.audit.label}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
