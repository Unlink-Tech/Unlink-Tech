"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

/**
 * Loads the custom cursor only once the page has settled.
 *
 * The cursor is pure decoration on a page that has real work to do first, and
 * it is not cheap: a canvas, a requestAnimationFrame loop, and pointer
 * listeners. Shipping it in the initial bundle put its parse, hydration, and
 * first frames inside the same long task as everything else, for an effect
 * nobody can see until they move the mouse.
 *
 * So it is split into its own chunk (`ssr: false`, since it renders nothing on
 * the server anyway) and mounted on the first idle callback after load. Nobody
 * notices the delay; the main thread does.
 */

const TraceCursor = dynamic(
  () => import("@/components/trace-cursor").then((m) => m.TraceCursor),
  { ssr: false },
);

export function DeferredTraceCursor() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // A coarse pointer never gets the custom cursor, so never pay for it.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let idle: number | undefined;
    let timer: number | undefined;

    // Read off `window` first: an `in` check here narrows `window` itself to
    // `never` in the else branch, which then rejects window.setTimeout.
    const ric = window.requestIdleCallback;

    const arm = () => {
      if (typeof ric === "function") {
        idle = ric(() => setReady(true), { timeout: 2500 });
      } else {
        timer = window.setTimeout(() => setReady(true), 1200);
      }
    };

    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });

    return () => {
      window.removeEventListener("load", arm);
      if (idle !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idle);
      }
      if (timer !== undefined) clearTimeout(timer);
    };
  }, []);

  return ready ? <TraceCursor /> : null;
}
