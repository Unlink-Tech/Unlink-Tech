"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

/**
 * Transaction-trace cursor — the site-wide pointer.
 *
 * The metaphor is the business: money moving through rails under supervision.
 *
 *   • the dot        the pointer itself, never lagged, so precision is intact
 *   • the trace      a hairline through where the pointer has just been, fading
 *                    oldest-first
 *   • the reticle    a scanner frame trailing the dot; over anything clickable
 *                    it locks onto the element's exact box, corner brackets
 *                    first, the way a settlement locks onto a record
 *   • the pulse      a click sends one confirmation ring outward
 *
 * There was once a fourth element: small squares shed behind every sweep, as
 * transactions in flight. They were removed rather than tuned down further. A
 * cursor is read at the point it is pointing, and anything scattering out
 * behind it competes with the page for exactly the attention the page needs.
 *
 * Everything paints from a single rAF loop: one canvas for the trace and the
 * pulses, plus two positioned divs for the reticle and the dot. Ink is read
 * from CSS custom properties (same trick as SettlementRails), so the whole cursor
 * re-tints itself the instant the theme flips, with no React re-render.
 *
 * The custom cursor only takes over for a real mouse — coarse pointers and
 * `prefers-reduced-motion` keep the system cursor and this renders nothing.
 */

/** Everything the reticle locks onto. */
const SNAP_SELECTOR = [
  "a[href]",
  "button",
  '[role="button"]',
  "input",
  "textarea",
  "select",
  "summary",
  "label[for]",
  "[data-cursor-snap]",
].join(", ");

/** Reticle size while free-floating, px. */
const FREE_SIZE = 42;
/** Breathing room the reticle leaves around a locked element, px. */
const SNAP_PAD = 8;
/** Per-frame share of the remaining distance the reticle closes. */
const FOLLOW = 0.19;
/** Same, for the width/height morph when locking on. */
const MORPH = 0.24;
/** Free-float spin, degrees per frame (~17s a revolution). */
const SPIN = 0.35;

/** Positions kept for the trace hairline. */
const TRACE_LENGTH = 18;

type Pulse = { x: number; y: number; life: number };

/* A real mouse, and no stated preference against motion. Read through
   useSyncExternalStore so the answer stays live: plugging in a mouse or
   flipping the OS motion setting turns the cursor on or off without a reload,
   and the server snapshot keeps SSR rendering nothing. */
const FINE_POINTER = "(pointer: fine)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeToPointerKind(onChange: () => void) {
  const fine = window.matchMedia(FINE_POINTER);
  const reduced = window.matchMedia(REDUCED_MOTION);
  fine.addEventListener("change", onChange);
  reduced.addEventListener("change", onChange);
  return () => {
    fine.removeEventListener("change", onChange);
    reduced.removeEventListener("change", onChange);
  };
}

const wantsCustomCursor = () =>
  window.matchMedia(FINE_POINTER).matches &&
  !window.matchMedia(REDUCED_MOTION).matches;

export function TraceCursor() {
  const enabled = useSyncExternalStore(
    subscribeToPointerKind,
    wantsCustomCursor,
    () => false,
  );

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    const canvasEl = canvasRef.current;
    const ringEl = ringRef.current;
    const dotEl = dotRef.current;
    if (!canvasEl || !ringEl || !dotEl) return;
    const context = canvasEl.getContext("2d");
    if (!context) return;

    // Re-bind as non-nullable: the helpers below are hoisted function
    // declarations, which don't inherit the narrowing from those guards.
    const canvas: HTMLCanvasElement = canvasEl;
    const ring: HTMLDivElement = ringEl;
    const dot: HTMLDivElement = dotEl;
    const ctx: CanvasRenderingContext2D = context;

    // Take the system cursor away only once we know we're replacing it.
    document.documentElement.setAttribute("data-trace-cursor", "");

    let frame = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;

    /** Live pointer position. */
    const pointer = { x: width / 2, y: height / 2 };
    let seen = false;

    /** The reticle's own eased state — it chases the pointer, never matches it. */
    const reticle = {
      x: pointer.x,
      y: pointer.y,
      w: FREE_SIZE,
      h: FREE_SIZE,
      rot: 0,
      radius: FREE_SIZE / 2,
    };
    /** Last values written to the DOM, so unchanged frames skip layout. */
    const painted = { x: 0, y: 0, w: 0, h: 0, rot: 0, radius: -1 };

    let hovered: Element | null = null;
    let snapped = false;
    /** Eased 0→1 opacity, so entering and leaving the window fades. */
    let visible = 0;
    let paintedVisible = -1;

    const pulses: Pulse[] = [];
    const trace: { x: number; y: number }[] = [];

    let ink: [number, number, number] = [99, 102, 241];

    /** Re-read the themed ink from CSS; keeps indigo/violet if unparseable. */
    function readInk() {
      const styles = getComputedStyle(document.documentElement);
      const parse = (name: string, fallback: [number, number, number]) => {
        const parts = styles.getPropertyValue(name).trim().split(/[\s,]+/).map(Number);
        return parts.length >= 3 && parts.every(Number.isFinite)
          ? ([parts[0], parts[1], parts[2]] as [number, number, number])
          : fallback;
      };
      ink = parse("--particle-rgb", ink);
    }

    const rgba = (c: [number, number, number], a: number) =>
      `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${a})`;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      // Cap the backing store at 2× — past that the fill cost buys nothing.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function step() {
      // ---- trace ----
      if (seen) {
        trace.unshift({ x: pointer.x, y: pointer.y });
        if (trace.length > TRACE_LENGTH) trace.pop();
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        pulses[i].life -= 0.026;
        if (pulses[i].life <= 0) pulses.splice(i, 1);
      }

      // ---- reticle target ----
      let targetX = pointer.x;
      let targetY = pointer.y;
      let targetW = FREE_SIZE;
      let targetH = FREE_SIZE;
      let targetRadius = FREE_SIZE / 2;

      if (hovered) {
        const rect = hovered.getBoundingClientRect();
        if (rect.width === 0 && rect.height === 0) {
          // The element went away under the cursor (menu closed, route change).
          hovered = null;
        } else {
          targetX = rect.left + rect.width / 2;
          targetY = rect.top + rect.height / 2;
          targetW = rect.width + SNAP_PAD * 2;
          targetH = rect.height + SNAP_PAD * 2;
          const own = parseFloat(getComputedStyle(hovered).borderTopLeftRadius);
          targetRadius = (Number.isFinite(own) ? own : 0) + SNAP_PAD;
        }
      }

      snapped = hovered !== null;

      reticle.x += (targetX - reticle.x) * FOLLOW;
      reticle.y += (targetY - reticle.y) * FOLLOW;
      reticle.w += (targetW - reticle.w) * MORPH;
      reticle.h += (targetH - reticle.h) * MORPH;
      reticle.radius += (targetRadius - reticle.radius) * MORPH;
      // Locked on, the frame settles square with the element; free, it drifts.
      reticle.rot += snapped
        ? (Math.round(reticle.rot / 360) * 360 - reticle.rot) * MORPH
        : SPIN;

      visible += ((seen ? 1 : 0) - visible) * 0.18;
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      if (visible < 0.01) return;

      // ---- the trace: a hairline through where the cursor has just been ----
      for (let i = 1; i < trace.length; i++) {
        const fade = (1 - i / trace.length) * 0.3 * visible;
        ctx.beginPath();
        ctx.moveTo(trace[i - 1].x, trace[i - 1].y);
        ctx.lineTo(trace[i].x, trace[i].y);
        ctx.strokeStyle = rgba(ink, fade);
        ctx.lineWidth = (1 - i / trace.length) * 1.6 + 0.3;
        ctx.lineCap = "round";
        ctx.stroke();
      }

      // ---- confirmation pulses ----
      for (const pulse of pulses) {
        const grow = 1 - pulse.life;
        ctx.beginPath();
        ctx.arc(pulse.x, pulse.y, 8 + grow * 46, 0, Math.PI * 2);
        ctx.strokeStyle = rgba(ink, pulse.life * 0.5 * visible);
        ctx.lineWidth = 1 + pulse.life * 1.4;
        ctx.stroke();
      }
    }

    /** Write the reticle and dot, skipping sub-pixel no-op style changes. */
    function paint() {
      const moved =
        Math.abs(reticle.x - painted.x) > 0.05 ||
        Math.abs(reticle.y - painted.y) > 0.05 ||
        Math.abs(reticle.rot - painted.rot) > 0.05;

      if (moved) {
        painted.x = reticle.x;
        painted.y = reticle.y;
        painted.rot = reticle.rot;
        ring.style.transform = `translate3d(${reticle.x - reticle.w / 2}px, ${
          reticle.y - reticle.h / 2
        }px, 0) rotate(${reticle.rot}deg)`;
      }
      if (Math.abs(reticle.w - painted.w) > 0.1) {
        painted.w = reticle.w;
        ring.style.width = `${reticle.w}px`;
      }
      if (Math.abs(reticle.h - painted.h) > 0.1) {
        painted.h = reticle.h;
        ring.style.height = `${reticle.h}px`;
      }
      if (Math.abs(reticle.radius - painted.radius) > 0.1) {
        painted.radius = reticle.radius;
        ring.style.borderRadius = `${reticle.radius}px`;
      }

      // The dot is never eased — it marks the true hit point.
      dot.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%)`;

      const shown = ring.hasAttribute("data-snap");
      if (shown !== snapped) ring.toggleAttribute("data-snap", snapped);
      if (dot.hasAttribute("data-snap") !== snapped)
        dot.toggleAttribute("data-snap", snapped);

      if (Math.abs(visible - paintedVisible) > 0.01) {
        paintedVisible = visible;
        ring.style.opacity = `${visible}`;
        dot.style.opacity = `${visible}`;
      }
    }

    function loop() {
      step();
      draw();
      paint();
      frame = requestAnimationFrame(loop);
    }

    function onPointerMove(e: PointerEvent) {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      if (!seen) {
        // First sighting: drop the reticle where the cursor already is instead
        // of flying it in from the middle of the screen.
        seen = true;
        reticle.x = pointer.x;
        reticle.y = pointer.y;
      }
    }

    function onOver(e: Event) {
      const target = e.target;
      if (!(target instanceof Element)) return;
      hovered = target.closest(SNAP_SELECTOR);
    }

    function onDown(e: PointerEvent) {
      pulses.push({ x: e.clientX, y: e.clientY, life: 1 });
    }

    function onLeave() {
      seen = false;
      hovered = null;
    }

    readInk();
    resize();

    const themeObserver = new MutationObserver(readInk);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("resize", resize);
    // `pointerover` bubbles, so one listener covers every element on the page,
    // including anything a route change or a menu mounts later.
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      themeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("resize", resize);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      document.documentElement.removeAttribute("data-trace-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="trace-cursor" aria-hidden>
      <canvas ref={canvasRef} className="trace-canvas" />
      <div ref={ringRef} className="trace-ring">
        <span className="trace-ring-core" />
        <span className="trace-corner trace-corner-tl" />
        <span className="trace-corner trace-corner-tr" />
        <span className="trace-corner trace-corner-br" />
        <span className="trace-corner trace-corner-bl" />
      </div>
      <div ref={dotRef} className="trace-dot" />
    </div>
  );
}
