/**
 * Calm hero backdrop — a faint tech grid with a slow aurora that drifts only
 * near the edges. A radial "calm pocket" fades the surface back in over the
 * centre so the headline always sits on clean, still ground.
 * Pure CSS (no JS), reduced-motion aware.
 */
export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* faint tech grid, masked to fade at the outer frame */}
      <div className="hero-grid absolute inset-0" />

      {/* aurora — blurred blobs drifting toward the edges */}
      <div className="absolute inset-[-20%] opacity-90 blur-3xl">
        <span className="hero-aurora-1 absolute left-[8%] top-[-4%] h-[46%] w-[46%] rounded-full opacity-50 bg-[radial-gradient(circle,#6366f1,transparent_60%)] dark:bg-[radial-gradient(circle,#818cf8,transparent_60%)]" />
        <span className="hero-aurora-2 absolute bottom-[-6%] right-[6%] h-[46%] w-[46%] rounded-full opacity-45 bg-[radial-gradient(circle,#7c3aed,transparent_60%)] dark:bg-[radial-gradient(circle,#a78bfa,transparent_60%)]" />
        <span className="hero-aurora-3 absolute right-[28%] top-[30%] h-[42%] w-[42%] rounded-full opacity-25 bg-[radial-gradient(circle,#38bdf8,transparent_60%)]" />
      </div>

      {/* calm pocket: fade the surface back over the centre behind the text */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_50%,var(--background)_30%,transparent_78%)]" />
    </div>
  );
}
