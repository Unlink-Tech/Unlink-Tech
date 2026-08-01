"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Splash loader shown on the initial page load / refresh.
 *
 * A payment clears a settlement rail, strikes the brand mark, and the curtain
 * parts along the rail line to reveal the page. Same motif as the hero
 * backdrop, so the first thing you see is the thing the hero keeps doing.
 *
 * Fades out once the window has loaded (min ~0.9s so the packet gets to clear
 * rather than flashing), then unmounts. Does not re-appear on client-side
 * navigation, since the layout persists.
 */

/** How long the curtain takes to part; must match the transition below. */
const PART_MS = 900;
/** Floor, so the rail is never cut off mid-clear on a warm cache. */
const MIN_MS = 900;
/** Hard cap, so the loader can never get stuck if `load` never fires. */
const MAX_MS = 3000;

export function PageLoader() {
  const [gone, setGone] = useState(false);
  const [parting, setParting] = useState(false);

  useEffect(() => {
    let dismissed = false;
    let loaded = document.readyState === "complete";
    let minDone = false;

    const maybeDismiss = () => {
      if (dismissed || !loaded || !minDone) return;
      dismissed = true;
      setParting(true);
      window.setTimeout(() => setGone(true), PART_MS);
    };

    const onLoad = () => {
      loaded = true;
      maybeDismiss();
    };
    if (!loaded) window.addEventListener("load", onLoad, { once: true });

    const minTimer = window.setTimeout(() => {
      minDone = true;
      maybeDismiss();
    }, MIN_MS);
    const maxTimer = window.setTimeout(() => {
      loaded = true;
      minDone = true;
      maybeDismiss();
    }, MAX_MS);

    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
    };
  }, []);

  if (gone) return null;

  /**
   * Inline rather than arbitrary Tailwind classes: v4 composes `transform`
   * from its own custom properties, so a `[transform:…]` utility can get
   * flattened back to identity here.
   */
  const move: React.CSSProperties = {
    transition: `transform ${PART_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`,
  };

  return (
    <div
      role="status"
      aria-label="Loading"
      className="fixed inset-0 z-[100] overflow-hidden"
    >
      {/* top half, carrying the rail on its lower edge */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 bg-background motion-reduce:transition-none"
        style={{ ...move, transform: `translateY(${parting ? "-100%" : "0"})` }}
      >
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgb(var(--particle-rgb)/0.5),transparent)]"
        />
      </div>

      {/* bottom half */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-background motion-reduce:transition-none"
        style={{ ...move, transform: `translateY(${parting ? "100%" : "0"})` }}
      />

      {/* the payment clearing the rail */}
      <span
        aria-hidden
        className={cn(
          "rail-clear absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[rgb(var(--particle-rgb))] shadow-[0_0_14px_rgb(var(--particle-rgb))] transition-opacity duration-300 motion-reduce:hidden",
          parting && "opacity-0",
        )}
      />

      {/* the mark on the seam, lifting away as the curtain parts */}
      <div
        className={cn(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out motion-reduce:transition-none",
          parting ? "scale-110 opacity-0" : "scale-100 opacity-100",
        )}
      >
        <div className="grid h-[4.5rem] w-[4.5rem] place-items-center rounded-full bg-background shadow-[6px_6px_12px_var(--neu-dark),-6px_-6px_12px_var(--neu-light)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/app-icon.svg"
            alt=""
            width={151}
            height={158}
            className="h-11 w-11 object-contain"
          />
        </div>
      </div>

      <span className="sr-only">Loading…</span>
    </div>
  );
}
