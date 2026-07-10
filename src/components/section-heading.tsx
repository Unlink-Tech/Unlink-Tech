import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Shared section heading — eyebrow + title + optional subtitle. Used by the
 * home sections and sub-pages so headings stay consistent.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  as: Tag = "h2",
  size = "md",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  as?: ElementType;
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-3xl text-center", className)}>
      <p className="text-sm font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
        {eyebrow}
      </p>
      <Tag
        className={cn(
          "mt-3 font-bold leading-tight tracking-tight text-balance text-foreground",
          size === "lg" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl",
        )}
      >
        {title}
      </Tag>
      {subtitle && (
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
}
