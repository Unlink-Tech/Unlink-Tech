"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Neumorphic splash loader shown on the initial page load / refresh — the app
 * icon sits on a raised core while an accent dot orbits a recessed track.
 * Fades out once the window has loaded (min ~0.7s so it doesn't flash), then
 * unmounts. Does not re-appear on client-side navigation (the layout persists).
 */
export function PageLoader() {
  const [gone, setGone] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    let dismissed = false;
    let loaded = document.readyState === "complete";
    let minDone = false;

    const maybeDismiss = () => {
      if (dismissed || !loaded || !minDone) return;
      dismissed = true;
      setFading(true);
      window.setTimeout(() => setGone(true), 550); // after fade transition
    };

    const onLoad = () => {
      loaded = true;
      maybeDismiss();
    };
    if (!loaded) window.addEventListener("load", onLoad, { once: true });

    const minTimer = window.setTimeout(() => {
      minDone = true;
      maybeDismiss();
    }, 700);
    // hard fallback so the loader can never get stuck
    const maxTimer = window.setTimeout(() => {
      loaded = true;
      minDone = true;
      maybeDismiss();
    }, 3000);

    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ease-out",
        fading && "pointer-events-none opacity-0",
      )}
    >
      {/* soft brand glow */}
      <div className="pointer-events-none absolute h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.16),transparent_70%)] blur-2xl dark:bg-[radial-gradient(circle,rgba(129,140,248,0.15),transparent_70%)]" />

      {/* orbit: app icon on a raised core, accent dot circling a recessed track */}
      <div className="relative h-28 w-28">
        {/* recessed track */}
        <div className="absolute inset-0 rounded-full shadow-[inset_5px_5px_10px_var(--neu-dark),inset_-5px_-5px_10px_var(--neu-light)]" />

        {/* raised core holding the app icon */}
        <div className="absolute left-1/2 top-1/2 grid h-[4.5rem] w-[4.5rem] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-background shadow-[6px_6px_12px_var(--neu-dark),-6px_-6px_12px_var(--neu-light)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/app-icon.png"
            alt="Unlink Technologies"
            className="h-11 w-11 object-contain"
          />
        </div>

        {/* orbiting dot */}
        <div className="absolute inset-0 animate-[spin_1.15s_linear_infinite] motion-reduce:animate-none">
          <span className="absolute -top-1 left-1/2 -ml-[7px] h-3.5 w-3.5 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 shadow-[0_0_10px_rgba(99,102,241,0.55)] dark:from-indigo-400 dark:to-violet-400 dark:shadow-[0_0_10px_rgba(129,140,248,0.55)]" />
        </div>
      </div>

      <span className="sr-only">Loading…</span>
    </div>
  );
}
