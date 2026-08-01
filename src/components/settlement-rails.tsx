"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Settlement rails — the hero backdrop.
 *
 * Payments moving across rails. Horizontal lines run the width of the hero;
 * bright packets travel them at their own speeds, and every rail carries a few
 * switch nodes that flash as a packet clears through. The cursor is a clearing
 * gate: packets crossing near it brighten and pick up speed, then settle back.
 *
 * The ink colours are read from the `--particle-rgb` / `--cursor-accent-rgb`
 * custom properties, so the field re-tints itself for light and dark without a
 * theme hook — a MutationObserver on <html>'s class re-reads them the moment
 * the theme flips.
 */

/** Target vertical gap between rails, px. The count is fitted to the hero. */
const RAIL_SPACING = 78;
const MIN_RAILS = 5;
const MAX_RAILS = 12;
/** Packets in flight per rail. */
const PER_RAIL = 2;
/** How near the cursor a packet has to pass to be boosted, px. */
const GATE_RADIUS = 170;
/** Distance at which a node counts as struck by a packet, px. */
const NODE_HIT = 26;
/**
 * Global opacity dial for the whole field. Every alpha in `draw` runs through
 * `fill`, so this scales rails, packets, and nodes together: the backdrop stays
 * behind the hero copy instead of competing with it.
 */
const INTENSITY = 0.62;

type RGB = [number, number, number];
type Node = { x: number; lit: number };
type Rail = { y: number; nodes: Node[] };
type Packet = {
  rail: number;
  x: number;
  speed: number;
  len: number;
  /** 0 is brand indigo, 1 is brand violet. */
  hue: number;
};

/** Deterministic pseudo-random — keeps the rail layout stable across resizes. */
function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export function SettlementRails({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const context = el.getContext("2d");
    if (!context) return;

    // Re-bind as non-nullable: the helpers below are hoisted function
    // declarations, which don't inherit the narrowing from those guards.
    const canvas: HTMLCanvasElement = el;
    const ctx: CanvasRenderingContext2D = context;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const random = seeded(20260731);

    let width = 0;
    let height = 0;
    let frame = 0;
    let bounds = canvas.getBoundingClientRect();
    let rails: Rail[] = [];
    let packets: Packet[] = [];
    const pointer = { x: 0, y: 0, seen: false };

    let ink: RGB = [99, 102, 241];
    let accent: RGB = [124, 58, 237];

    /** Re-read the themed ink from CSS. Falls back to indigo/violet. */
    function readInk() {
      const styles = getComputedStyle(document.documentElement);
      const parse = (name: string, fallback: RGB): RGB => {
        const parts = styles
          .getPropertyValue(name)
          .trim()
          .split(/[\s,]+/)
          .map(Number);
        return parts.length >= 3 && parts.every(Number.isFinite)
          ? [parts[0], parts[1], parts[2]]
          : fallback;
      };
      ink = parse("--particle-rgb", ink);
      accent = parse("--cursor-accent-rgb", accent);
    }

    const fill = (colour: RGB, alpha: number) =>
      `rgba(${colour[0]}, ${colour[1]}, ${colour[2]}, ${alpha * INTENSITY})`;

    /** Ink blended toward accent; 0 is pure indigo, 1 is pure violet. */
    const shade = (amount: number): RGB => [
      ink[0] + (accent[0] - ink[0]) * amount,
      ink[1] + (accent[1] - ink[1]) * amount,
      ink[2] + (accent[2] - ink[2]) * amount,
    ];

    function resize() {
      bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      if (width === 0 || height === 0) return;

      // Cap the backing store at 2× — beyond that the fill cost buys nothing.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(
        MAX_RAILS,
        Math.max(MIN_RAILS, Math.round(height / RAIL_SPACING)),
      );
      const gap = height / (count + 1);

      rails = Array.from({ length: count }, (_, i) => ({
        y: gap * (i + 1),
        // Two to four switches per rail, never hard against either edge.
        nodes: Array.from({ length: 2 + Math.floor(random() * 3) }, () => ({
          x: width * (0.12 + random() * 0.76),
          lit: 0,
        })),
      }));

      packets = rails.flatMap((_, rail) =>
        Array.from({ length: PER_RAIL }, () => ({
          rail,
          x: random() * width,
          // Mixed speeds, so the rails never fall into lockstep.
          speed: 0.5 + random() * 1.5,
          len: 26 + random() * 46,
          hue: random(),
        })),
      );

      // With motion off there's no loop to repaint, so redraw on the spot.
      if (reduceMotion) draw();
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // ---- the rails themselves, faded out at both ends ----
      for (const rail of rails) {
        const grad = ctx.createLinearGradient(0, 0, width, 0);
        grad.addColorStop(0, fill(ink, 0));
        grad.addColorStop(0.5, fill(ink, 0.16));
        grad.addColorStop(1, fill(ink, 0));
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, rail.y);
        ctx.lineTo(width, rail.y);
        ctx.stroke();
      }

      // ---- packets ----
      for (const p of packets) {
        const rail = rails[p.rail];
        if (!rail) continue;

        // Clearing gate: a packet passing the cursor runs hot and quick.
        let boost = 0;
        if (pointer.seen) {
          const dist = Math.hypot(pointer.x - p.x, pointer.y - rail.y);
          if (dist < GATE_RADIUS) boost = 1 - dist / GATE_RADIUS;
        }

        if (!reduceMotion) {
          p.x += p.speed * (1 + boost * 1.8);
          if (p.x - p.len > width) {
            p.x = -p.len;
            p.hue = random();
          }
          for (const node of rail.nodes) {
            if (Math.abs(node.x - p.x) < NODE_HIT) node.lit = 1;
          }
        }

        const colour = shade(p.hue);
        const tail = ctx.createLinearGradient(p.x - p.len, 0, p.x, 0);
        tail.addColorStop(0, fill(colour, 0));
        tail.addColorStop(1, fill(colour, 0.55 + boost * 0.35));
        ctx.strokeStyle = tail;
        ctx.lineWidth = 1.6;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(p.x - p.len, rail.y);
        ctx.lineTo(p.x, rail.y);
        ctx.stroke();

        // The head, with a soft halo so it reads as lit rather than drawn.
        ctx.fillStyle = fill(colour, 0.85);
        ctx.beginPath();
        ctx.arc(p.x, rail.y, 1.9, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = fill(colour, 0.14 + boost * 0.2);
        ctx.beginPath();
        ctx.arc(p.x, rail.y, 7 + boost * 5, 0, Math.PI * 2);
        ctx.fill();
      }

      // ---- switch nodes, decaying back to rest after each strike ----
      for (const rail of rails) {
        for (const node of rail.nodes) {
          if (!reduceMotion) node.lit *= 0.94;
          const size = 2.6 + node.lit * 2.2;
          ctx.strokeStyle = fill(ink, 0.2 + node.lit * 0.65);
          ctx.lineWidth = 1;
          ctx.strokeRect(node.x - size, rail.y - size, size * 2, size * 2);
          if (node.lit > 0.05) {
            ctx.fillStyle = fill(accent, node.lit * 0.18);
            ctx.beginPath();
            ctx.arc(node.x, rail.y, 10 * node.lit, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    }

    function loop() {
      draw();
      frame = requestAnimationFrame(loop);
    }

    function onPointerMove(e: PointerEvent) {
      pointer.x = e.clientX - bounds.left;
      pointer.y = e.clientY - bounds.top;
      pointer.seen = true;
    }

    /** Scrolling moves the canvas under a stationary cursor. */
    function onScroll() {
      bounds = canvas.getBoundingClientRect();
    }

    readInk();
    resize();

    const themeObserver = new MutationObserver(() => {
      readInk();
      if (reduceMotion) draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    if (reduceMotion) {
      // Honour the preference: paint the rails once and leave them still.
      draw();
    } else {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
      frame = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(frame);
      themeObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none h-full w-full", className)}
    />
  );
}
