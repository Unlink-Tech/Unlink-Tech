"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Motion primitives for the product and service visuals.
 *
 * The treatment is "live instrument": each panel assembles once as it scrolls
 * into view, walking its steps in order, and then a single restrained ambient
 * loop keeps running. The rule for that loop is that it always marks the thing
 * genuinely still in flight, the unmatched exception, the queued payments, the
 * control still being evidenced, so the movement carries meaning instead of
 * decorating. Everything settled stays still.
 */

/** True when the user has asked the OS to reduce motion. Call inside effects only. */
export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Fires once when the element first scrolls into view, and stays true.
 *
 * Reduced motion is deliberately not special-cased here. Callers pair this
 * with `motion-reduce:transition-none` (or a zero duration), so the sequence
 * still resolves to its finished state, it just arrives instantly instead of
 * animating. Keeping the observer as the only caller of setState also keeps
 * this off React's cascading-render path.
 */
export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);

    /**
     * Safety net. A hidden or backgrounded tab suspends IntersectionObserver
     * callbacks entirely, so a panel mounted there would sit at opacity 0 with
     * nothing left to wake it. Measure once shortly after mount and reveal if
     * the panel is on screen anyway. With a visible tab the observer has
     * already fired long before this runs, so it changes nothing.
     */
    const fallback = window.setTimeout(() => {
      const r = el.getBoundingClientRect();
      const onScreen = r.top < window.innerHeight && r.bottom > 0;
      if (onScreen) {
        setInView(true);
        io.disconnect();
      }
    }, 600);

    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, [threshold]);

  return [ref, inView] as const;
}

/** Eases a number up to its target once active. Lands instantly under reduced motion. */
export function useCountUp(target: number, active: boolean, ms = 1100) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = prefersReducedMotion() ? 0 : ms;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      // rAF hands back the frame's start time, which can predate the
      // performance.now() captured a moment ago. Unclamped that goes negative
      // and the easing overshoots below zero, so the counter opens on a minus
      // figure.
      const elapsed = Math.max(0, now - start);
      const t = duration > 0 ? Math.min(1, elapsed / duration) : 1;
      // ease-out cubic, so it decelerates into the real figure
      setValue(target * (1 - Math.pow(1 - t, 3)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, ms]);

  return value;
}

/**
 * Walks 0..count-1 on a fixed cadence once active, and returns -1 until the
 * first step lands. This is what makes a panel look like it is doing work
 * rather than fading in: rows complete one at a time, in the order the real
 * system would complete them.
 */
export function useSequence(count: number, active: boolean, stepMs = 380) {
  const [step, setStep] = useState(-1);

  useEffect(() => {
    if (!active) return;
    const cadence = prefersReducedMotion() ? 1 : stepMs;
    let i = -1;
    const id = setInterval(() => {
      i += 1;
      setStep(i);
      if (i >= count - 1) clearInterval(id);
    }, cadence);
    return () => clearInterval(id);
  }, [active, count, stepMs]);

  return step;
}
