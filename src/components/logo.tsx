import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Brand logo, links home. Renders both theme variants and shows the right one
 * via the `dark:` class variant — no JS, no flash (next-themes stamps `.dark`
 * on <html> before paint). Pass a height class, e.g. `h-9`.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Unlink Technologies, home"
      className="flex items-center"
    >
      {/* light theme → dark-tagline logo (legible on the light surface) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-unlink-dark.svg"
        alt="Unlink Technologies"
        className={cn("w-auto dark:hidden", className)}
      />
      {/* dark theme → light-tagline logo (legible on the dark surface) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-unlink-light.svg"
        alt="Unlink Technologies"
        className={cn("hidden w-auto dark:block", className)}
      />
    </Link>
  );
}
