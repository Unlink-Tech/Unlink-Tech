"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
} from "react";

/**
 * Design-skin switching, orthogonal to light/dark theme.
 *
 * "neu"   — neumorphism (default, no class)
 * "glass" — glassmorphism (adds `.glass` to <html>)
 *
 * Both skins render in light AND dark, so this composes with next-themes
 * rather than replacing it. The styling itself lives entirely in globals.css.
 *
 * The skin lives in localStorage — external state — so it's read through
 * useSyncExternalStore. React renders the server snapshot during hydration and
 * swaps to the real value straight after, which keeps the markup consistent
 * without a setState-in-effect.
 */

export type Skin = "neu" | "glass";

export const SKIN_STORAGE_KEY = "unlink-skin";

/** Notifies same-tab subscribers; cross-tab updates arrive via `storage`. */
const SKIN_EVENT = "unlink-skin-change";

/**
 * Runs before first paint to stamp `.glass` on <html>, so a reload in glass
 * mode never flashes the neumorphic skin. Kept in sync with `applySkin`.
 */
export const skinNoFlashScript = `(function(){try{if(localStorage.getItem("${SKIN_STORAGE_KEY}")==="glass"){document.documentElement.classList.add("glass")}}catch(e){}})();`;

function applySkin(skin: Skin) {
  document.documentElement.classList.toggle("glass", skin === "glass");
}

function readSkin(): Skin {
  try {
    return localStorage.getItem(SKIN_STORAGE_KEY) === "glass" ? "glass" : "neu";
  } catch {
    // Private mode / storage disabled — fall back to the default skin.
    return "neu";
  }
}

function subscribe(onStoreChange: () => void) {
  // Another tab changed the skin: bring this document in line with it too.
  function onStorage(e: StorageEvent) {
    if (e.key !== SKIN_STORAGE_KEY) return;
    applySkin(readSkin());
    onStoreChange();
  }
  window.addEventListener(SKIN_EVENT, onStoreChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(SKIN_EVENT, onStoreChange);
    window.removeEventListener("storage", onStorage);
  };
}

/** The server can't know the skin; the no-flash script fixes <html> before paint. */
const getServerSnapshot = (): Skin => "neu";

type SkinContextValue = {
  skin: Skin;
  setSkin: (skin: Skin) => void;
};

const SkinContext = createContext<SkinContextValue | null>(null);

export function SkinProvider({ children }: { children: React.ReactNode }) {
  const skin = useSyncExternalStore(subscribe, readSkin, getServerSnapshot);

  const setSkin = useCallback((next: Skin) => {
    try {
      localStorage.setItem(SKIN_STORAGE_KEY, next);
    } catch {
      // Non-fatal: the skin still applies for this session.
    }
    applySkin(next);
    window.dispatchEvent(new Event(SKIN_EVENT));
  }, []);

  return <SkinContext value={{ skin, setSkin }}>{children}</SkinContext>;
}

export function useSkin() {
  const ctx = useContext(SkinContext);
  if (!ctx) throw new Error("useSkin must be used within <SkinProvider>");
  return ctx;
}
