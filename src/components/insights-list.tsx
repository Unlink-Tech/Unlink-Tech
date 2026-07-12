"use client";

import { useState } from "react";
import { ArrowUpRight, Clock, PenLine } from "lucide-react";
import { AuroraCard } from "@/components/ui/aurora-card";
import { NeuButton } from "@/components/ui/neu-button";
import { LinkedInIcon } from "@/components/brand-icons";
import { cn } from "@/lib/utils";

const LINKEDIN_URL =
  "https://www.linkedin.com/company/unlink-technologies-private-limited";

const raised =
  "shadow-[8px_8px_16px_var(--neu-dark),-8px_-8px_16px_var(--neu-light)]";
const insetSm =
  "shadow-[inset_4px_4px_8px_var(--neu-dark),inset_-4px_-4px_8px_var(--neu-light)]";

type Post = {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  url: string;
};

/**
 * PLACEHOLDER content. Replace with the 12 real articles — ideally re-hosted on
 * this domain (MDX/CMS) for SEO, with `url` pointing to the on-site post and a
 * canonical link back to LinkedIn. External LinkedIn URLs also work here.
 */
const posts: Post[] = [
  {
    title: "Fintech growth isn't built on product alone",
    excerpt:
      "Fintech growth isn't built on product alone. It's built on operating foundations. Behind every strong fintech business is a system that can build reliably, protect trust, and operate with control.",
    category: "Payments",
    date: "Jul 2026",
    readingTime: "7 min read",
    url: "https://www.linkedin.com/posts/unlink-technologies-private-limited_fintech-payments-paymentinfrastructure-activity-7481218159975292928-P4le?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAsC5AABgWJHsHkJMTnOu3Vige79R5tHGhE",
  },
  {
    title: "Why fintech projects take longer than expected",
    excerpt:
      "As fintech platforms evolve, teams must navigate multiple payment integrations, compliance requirements, infrastructure decisions, and third-party dependencies, each of which can significantly influence delivery timelines and operational readiness.",
    category: "Payments",
    date: "Jul 2026",
    readingTime: "7 min read",
    url: "https://www.linkedin.com/posts/unlink-technologies-private-limited_fintech-fintechinfrastructure-payments-activity-7477224038780583936-bB8S?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAsC5AABgWJHsHkJMTnOu3Vige79R5tHGhE",
  },
  {
    title: "Fintech infrastructure rarely fails at launch",
    excerpt:
      "Infrastructure challenges in fintech rarely appear during the early stages of growth. They emerge when increasing transaction volumes, operational dependencies, and compliance demands begin testing the scalability of underlying systems.",
    category: "Payments",
    date: "Jun 2026",
    readingTime: "6 min read",
    url: "https://www.linkedin.com/posts/unlink-technologies-private-limited_fintech-payments-infrastructure-activity-7459822357352943617-mh86?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAsC5AABgWJHsHkJMTnOu3Vige79R5tHGhE",
  },
  {
    title: "The infrastructure behind every successful fintech",
    excerpt:
      "Every successful fintech is built on more than a great product. Behind every seamless transaction, efficient onboarding journey, and scalable customer experience lies a foundation of infrastructure designed to support growth.",
    category: "Payments",
    date: "Jun 2026",
    readingTime: "8 min read",
    url: "https://www.linkedin.com/posts/unlink-technologies-private-limited_fintech-fintechinfrastructure-payments-activity-7469986526643486721-bq-0?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAsC5AABgWJHsHkJMTnOu3Vige79R5tHGhE",
  },
  {
    title: "3 reasons fintechs miss their launch window",
    excerpt:
      "Most fintechs don't lose momentum because of weak products. They lose momentum because infrastructure becomes the constraint. The real challenge in fintech is not building features. It is building systems that can support speed, reliability, compliance, and scale simultaneously.",
    category: "Payments",
    date: "Jun 2026",
    readingTime: "9 min read",
    url: "https://www.linkedin.com/posts/unlink-technologies-private-limited_fintech-payments-fintechinfrastructure-activity-7465661647777542144-l7lZ?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAsC5AABgWJHsHkJMTnOu3Vige79R5tHGhE",
  },
  {
    title: "Disconnected fintech systems create operational friction",
    excerpt:
      "Disconnected systems rarely fail visibly in fintech. They fail operationally: through delays, fragmented workflows, manual intervention, and integration complexity.",
    category: "Payments",
    date: "Jun 2026",
    readingTime: "6 min read",
    url: "https://www.linkedin.com/posts/unlink-technologies-private-limited_fintech-payments-financialservices-activity-7462344869471068160-wQMm?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAsC5AABgWJHsHkJMTnOu3Vige79R5tHGhE",
  },
  {
    title: "Fintech success requires resilient infrastructure",
    excerpt:
      "Scaling a fintech product is rarely limited by growth alone. As transaction volumes increase, operational complexity begins to surface across infrastructure, compliance, and execution layers.",
    category: "Payments",
    date: "Jun 2026",
    readingTime: "7 min read",
    url: "https://www.linkedin.com/posts/unlink-technologies-private-limited_fintech-saas-infrastructure-activity-7460567876660436992-ZmSH?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAsC5AABgWJHsHkJMTnOu3Vige79R5tHGhE",
  },

];

const categories = [
  "All",
  "Payments",
  "Reconciliation",
  "Fraud & AI",
  "Compliance",
  "Onboarding",
  "Enterprise AI",
];

function Meta({ post }: { post: Post }) {
  return (
    <div className="flex items-center gap-3 text-xs text-muted-foreground">
      <span>{post.date}</span>
      <span aria-hidden>·</span>
      <span className="inline-flex items-center gap-1">
        <Clock className="h-3.5 w-3.5" />
        {post.readingTime}
      </span>
    </div>
  );
}

function PostCard({ post, featured }: { post: Post; featured?: boolean }) {
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "block h-full rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        featured && "md:col-span-2 lg:col-span-3",
      )}
    >
      <AuroraCard>
        <div className="flex items-center justify-between gap-3">
          <span
            className={`inline-flex items-center rounded-full bg-background px-3 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 ${insetSm}`}
          >
            {post.category}
          </span>
          <LinkedInIcon className="h-4 w-4" />
        </div>

        <h3
          className={cn(
            "mt-5 font-bold leading-snug tracking-tight text-foreground",
            featured ? "text-2xl sm:text-3xl" : "text-lg",
          )}
        >
          {post.title}
        </h3>
        <p
          className={cn(
            "mt-3 leading-relaxed text-muted-foreground",
            featured ? "max-w-2xl text-base" : "text-sm",
          )}
        >
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <Meta post={post} />
          <span className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">
            Read on LinkedIn
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </AuroraCard>
    </a>
  );
}

/** Professional empty state for topics we haven't published on yet. */
function ComingSoon({ category }: { category: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-background px-6 py-16 text-center sm:px-10 sm:py-20 ${raised}`}
    >
      <span
        className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-background text-indigo-600 dark:text-indigo-400 ${insetSm}`}
      >
        <PenLine className="h-7 w-7" />
      </span>

      <span className="mt-6 inline-flex items-center rounded-full bg-background px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground shadow-[inset_2px_2px_4px_var(--neu-dark),inset_-2px_-2px_4px_var(--neu-light)]">
        In the works
      </span>

      <h3 className="mx-auto mt-5 max-w-xl text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {category} writing is on the way
      </h3>
      <p className="mx-auto mt-3 max-w-lg leading-relaxed text-muted-foreground">
        Our engineers are drafting field notes on {category.toLowerCase()} from
        the systems they&apos;ve shipped. Follow us on LinkedIn to catch them the
        moment they go live.
      </p>

      <div className="mt-8 flex justify-center">
        <NeuButton asChild variant="neutral" size="lg">
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
            <LinkedInIcon className="h-5 w-5" />
            Follow for updates
          </a>
        </NeuButton>
      </div>
    </div>
  );
}

export function InsightsList() {
  const [active, setActive] = useState("All");
  const filtered =
    active === "All" ? posts : posts.filter((p) => p.category === active);
  const [featured, ...rest] = filtered;

  // categories that have no published posts yet — flagged in the filter bar
  const emptyCategories = new Set(
    categories.filter(
      (c) => c !== "All" && !posts.some((p) => p.category === c),
    ),
  );

  return (
    <div>
      {/* category filter — reuses NeuButton (pressed = active) */}
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <NeuButton
            key={c}
            variant="ghost"
            size="sm"
            active={active === c}
            onClick={() => setActive(c)}
            className="font-medium"
          >
            {c}
            {emptyCategories.has(c) && (
              <span className="ml-2 h-1.5 w-1.5 rounded-full bg-indigo-500/70 dark:bg-indigo-400/70" />
            )}
          </NeuButton>
        ))}
      </div>

      {filtered.length === 0 ? (
        /* no posts in this category yet */
        <div className="mt-8">
          <ComingSoon category={active} />
        </div>
      ) : (
        /* featured + grid */
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured && <PostCard post={featured} featured />}
          {rest.map((post) => (
            <PostCard key={post.title} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
