"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { NeuButton } from "@/components/ui/neu-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

type NavChild = { label: string; href: string; desc: string };
type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
  viewAll?: string;
};

const products: NavChild[] = [
  {
    label: "Cimmetri",
    href: "/products/cimmetri",
    desc: "Reconciliation, automated. A 48-hour pilot.",
  },
  {
    label: "Enclave",
    href: "/products/enclave",
    desc: "AI without the governance trade-off.",
  },
  {
    label: "Payment Gateway",
    href: "/products/payment-gateway",
    desc: "Throughput, routing, settlement certainty.",
  },
  {
    label: "Merchant Onboarding",
    href: "/products/merchant-onboarding",
    desc: "Onboard in hours, not weeks, with a full evidence trail.",
  },
];

const services: NavChild[] = [
  {
    label: "Fintech Platform Engineering",
    href: "/custom-engineering/fintech-platform-engineering",
    desc: "Payment & settlement platforms, built end to end.",
  },
  {
    label: "AI & ML Product Development",
    href: "/custom-engineering/ai-ml-product-development",
    desc: "Fraud, risk, and intelligent automation systems.",
  },
  {
    label: "Enterprise Workflow & Onboarding Systems",
    href: "/custom-engineering/enterprise-workflow-onboarding",
    desc: "KYC/KYB and operational workflow automation.",
  },
  {
    label: "Regulatory Compliance Technology (MAS TRM & Beyond)",
    href: "/custom-engineering/regulatory-compliance-technology",
    desc: "Compliance technology that passes the audit.",
  },
  {
    label: "Mobile & Field Commerce Platforms",
    href: "/custom-engineering/mobile-field-commerce",
    desc: "Offline-first mobile and field commerce.",
  },
];

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    href: "/products",
    children: products,
    viewAll: "View all products →",
  },
  {
    label: "Custom Engineering",
    href: "/custom-engineering",
    children: services,
    viewAll: "View all services →",
  },
  { label: "Proof", href: "/proof" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  // Which dropdown is open, keyed by its label (null = none).
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileMenu, setMobileMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // A nav item is active when we're on its route (or a nested route under it).
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  // A dropdown child is current when it's exactly the page we're on.
  const isCurrent = (href: string) => pathname === href;

  // Transparent over the hero at the top; solid + blurred once scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close any open desktop dropdown on outside click or Escape.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenMenu(null);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-300",
        scrolled || mobileOpen
          ? "border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo className="h-8 sm:h-9" />

        {/* Desktop nav */}
        <nav ref={navRef} className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label} className="relative">
                <NeuButton
                  variant="ghost"
                  size="sm"
                  active={isActive(item.href)}
                  onClick={() =>
                    setOpenMenu((m) => (m === item.label ? null : item.label))
                  }
                  aria-expanded={openMenu === item.label}
                  className="gap-1 font-medium"
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      openMenu === item.label && "rotate-180",
                    )}
                  />
                </NeuButton>
                {openMenu === item.label && (
                  <div className="absolute left-0 top-full mt-2 w-[22rem] rounded-xl border border-border bg-popover p-2 shadow-lg">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => setOpenMenu(null)}
                        aria-current={isCurrent(child.href) ? "page" : undefined}
                        className={cn(
                          "block rounded-lg px-3 py-2.5 transition-colors hover:bg-accent",
                          isCurrent(child.href) && "bg-accent",
                        )}
                      >
                        <span
                          className={cn(
                            "block text-sm font-medium",
                            isCurrent(child.href)
                              ? "text-indigo-600 dark:text-indigo-400"
                              : "text-foreground",
                          )}
                        >
                          {child.label}
                        </span>
                        <span className="block text-xs text-muted-foreground">
                          {child.desc}
                        </span>
                      </Link>
                    ))}
                    <Link
                      href={item.href}
                      onClick={() => setOpenMenu(null)}
                      className="mt-1 block rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-accent"
                    >
                      {item.viewAll}
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <NeuButton
                key={item.label}
                asChild
                variant="ghost"
                size="sm"
                active={isActive(item.href)}
                className="font-medium"
              >
                <Link href={item.href}>{item.label}</Link>
              </NeuButton>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <NeuButton asChild variant="primary" size="sm" active={isActive("/contact")}>
            <Link href="/contact">Contact</Link>
          </NeuButton>
        </div>

        {/* Mobile: theme toggle + menu button */}
        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border/60 bg-background lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <NeuButton
                    variant="ghost"
                    size="md"
                    active={isActive(item.href)}
                    onClick={() =>
                      setMobileMenu((m) =>
                        m === item.label ? null : item.label,
                      )
                    }
                    aria-expanded={mobileMenu === item.label}
                    className="w-full justify-between text-base font-medium"
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        mobileMenu === item.label && "rotate-180",
                      )}
                    />
                  </NeuButton>
                  {mobileMenu === item.label && (
                    <div className="ml-3 flex flex-col gap-0.5 border-l border-border pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          aria-current={isCurrent(child.href) ? "page" : undefined}
                          className={cn(
                            "rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-foreground",
                            isCurrent(child.href)
                              ? "bg-accent font-medium text-indigo-600 dark:text-indigo-400"
                              : "text-foreground/80",
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="rounded-md px-3 py-2 text-sm font-medium text-primary hover:bg-accent"
                      >
                        {item.viewAll}
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <NeuButton
                  key={item.label}
                  asChild
                  variant="ghost"
                  size="md"
                  active={isActive(item.href)}
                  className="w-full justify-start text-base font-medium"
                >
                  <Link href={item.href} onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </Link>
                </NeuButton>
              ),
            )}
            <NeuButton
              asChild
              variant="primary"
              size="md"
              active={isActive("/contact")}
              className="mt-2 w-full"
            >
              <Link href="/contact" onClick={() => setMobileOpen(false)}>
                Contact
              </Link>
            </NeuButton>
          </nav>
        </div>
      )}
    </header>
  );
}
