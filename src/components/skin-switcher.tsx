"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Droplets, Layers, Settings } from "lucide-react";
import { NeuButton } from "@/components/ui/neu-button";
import { useSkin, type Skin } from "@/components/skin-provider";
import { cn } from "@/lib/utils";

/**
 * Floating design-skin switcher, pinned bottom-right.
 *
 * Tapping the gear pops two labelled options out above it — Glassmorphism and
 * Neumorphism — which re-skin the entire site. Built from NeuButton so the
 * control itself is re-skinned by whichever design is active.
 */

const options: { skin: Skin; label: string; icon: typeof Droplets }[] = [
  { skin: "glass", label: "Glassmorphism", icon: Droplets },
  { skin: "neu", label: "Neumorphism", icon: Layers },
];

export function SkinSwitcher() {
  const { skin, setSkin } = useSkin();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape, matching the header dropdowns.
  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3 print:hidden"
    >
      {/* Options pop out above the gear, stacked and staggered. */}
      <div className="flex flex-col items-end gap-3">
        {options.map((option, i) => {
          const Icon = option.icon;
          const selected = skin === option.skin;
          return (
            <NeuButton
              key={option.skin}
              type="button"
              variant="neutral"
              size="sm"
              active={selected}
              aria-pressed={selected}
              tabIndex={open ? 0 : -1}
              onClick={() => {
                setSkin(option.skin);
                setOpen(false);
              }}
              className={cn(
                "gap-2 rounded-full pr-4 pl-3.5 transition-all duration-300 ease-out",
                open
                  ? "translate-y-0 scale-100 opacity-100"
                  : "pointer-events-none translate-y-4 scale-90 opacity-0",
                selected && "text-indigo-600 dark:text-indigo-400",
              )}
              // Stagger so the two pills cascade rather than snap in together.
              style={{
                transitionDelay: `${(open ? i : options.length - 1 - i) * 60}ms`,
              }}
            >
              <Icon className="h-4 w-4" />
              {option.label}
              <Check
                className={cn(
                  "h-3.5 w-3.5 transition-opacity",
                  selected ? "opacity-100" : "opacity-0",
                )}
              />
            </NeuButton>
          );
        })}
      </div>

      <NeuButton
        type="button"
        variant="neutral"
        size="icon"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close design settings" : "Open design settings"}
        className="h-14 w-14"
      >
        <Settings
          className={cn(
            "h-5 w-5 transition-transform duration-300 ease-out",
            open && "rotate-90",
          )}
        />
      </NeuButton>
    </div>
  );
}
