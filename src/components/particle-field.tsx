"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Drifting dot field.
 *
 * Dots float slowly on their own. Moving the cursor pushes the ones near it
 * along the direction the cursor travelled, so the field parts and streams the
 * way you swept it, then eases back to its ambient drift. No connecting lines.
 *
 * The ink colour is read from the `--particle-rgb` custom property, so the
 * field re-tints itself for light and dark without a theme hook — a
 * MutationObserver on <html>'s class re-reads it the moment the theme flips.
 */

type Particle = { x: number; y: number; vx: number; vy: number };

/** How far the cursor's push reaches, px. */
const POINTER_RADIUS = 220;
/** Share of the cursor's own movement handed to the nearest particles. */
const PUSH = 0.055;
/** How fast the recorded cursor motion dies off once it stops moving. */
const PUSH_DECAY = 0.86;
/** One particle per this many px² of surface. */
const DENSITY = 8_500;
const MIN_PARTICLES = 40;
const MAX_PARTICLES = 180;
/** Terminal drift speed, px/frame. */
const MAX_SPEED = 1.1;

export function ParticleField({ className }: { className?: string }) {
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

    let width = 0;
    let height = 0;
    let frame = 0;
    let bounds = canvas.getBoundingClientRect();
    const particles: Particle[] = [];
    /** `dx`/`dy` hold the cursor's most recent movement, not its position. */
    const pointer = { x: 0, y: 0, dx: 0, dy: 0, seen: false };
    let ink: [number, number, number] = [99, 102, 241];

    /** Re-read the themed ink from CSS. Falls back to indigo if unparseable. */
    function readInk() {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue("--particle-rgb")
        .trim();
      const parts = raw.split(/[\s,]+/).map(Number);
      if (parts.length >= 3 && parts.every((n) => Number.isFinite(n))) {
        ink = [parts[0], parts[1], parts[2]];
      }
    }

    const fill = (alpha: number) =>
      `rgba(${ink[0]}, ${ink[1]}, ${ink[2]}, ${alpha})`;

    function spawn(): Particle {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
      };
    }

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

      const target = Math.min(
        MAX_PARTICLES,
        Math.max(MIN_PARTICLES, Math.round((width * height) / DENSITY)),
      );
      // Grow or trim in place, so a resize never restarts the whole field.
      while (particles.length < target) particles.push(spawn());
      particles.length = target;

      // With motion off there's no loop to repaint, so redraw on the spot.
      if (reduceMotion) draw();
    }

    function step() {
      const pushing = pointer.seen && (pointer.dx !== 0 || pointer.dy !== 0);

      for (const p of particles) {
        if (pushing) {
          const dist = Math.hypot(pointer.x - p.x, pointer.y - p.y);
          if (dist < POINTER_RADIUS) {
            // Nearer dots take more of the sweep, so the field bends smoothly.
            const grip = 1 - dist / POINTER_RADIUS;
            p.vx += pointer.dx * grip * PUSH;
            p.vy += pointer.dy * grip * PUSH;
          }
        }

        // Bleed off the push so the field settles back to its ambient drift.
        p.vx *= 0.97;
        p.vy *= 0.97;

        const speed = Math.hypot(p.vx, p.vy);
        if (speed > MAX_SPEED) {
          p.vx = (p.vx / speed) * MAX_SPEED;
          p.vy = (p.vy / speed) * MAX_SPEED;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap with a margin, so dots never pop in against the edge.
        if (p.x < -40) p.x = width + 40;
        else if (p.x > width + 40) p.x = -40;
        if (p.y < -40) p.y = height + 40;
        else if (p.y > height + 40) p.y = -40;
      }

      // A cursor that has stopped should stop pushing.
      pointer.dx *= PUSH_DECAY;
      pointer.dy *= PUSH_DECAY;
      if (Math.abs(pointer.dx) < 0.01) pointer.dx = 0;
      if (Math.abs(pointer.dy) < 0.01) pointer.dy = 0;
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = fill(0.7);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.7, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function loop() {
      step();
      draw();
      frame = requestAnimationFrame(loop);
    }

    function onPointerMove(e: PointerEvent) {
      const x = e.clientX - bounds.left;
      const y = e.clientY - bounds.top;
      if (pointer.seen) {
        // Accumulate, so several moves inside one frame all count.
        pointer.dx += x - pointer.x;
        pointer.dy += y - pointer.y;
      }
      pointer.x = x;
      pointer.y = y;
      pointer.seen = true;
    }

    /** Scrolling moves the canvas under a stationary cursor. */
    function onScroll() {
      bounds = canvas.getBoundingClientRect();
    }

    readInk();
    resize();

    const themeObserver = new MutationObserver(readInk);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    if (reduceMotion) {
      // Honour the preference: paint the field once and leave it still.
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
