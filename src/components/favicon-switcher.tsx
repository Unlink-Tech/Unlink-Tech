"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

/**
 * Swaps the tab favicon to match the resolved theme (light/dark), so it follows
 * the manual theme toggle — not just the OS preference. Manages a single
 * <link id="theme-favicon"> that wins over the media-query icons in metadata.
 */
export function FaviconSwitcher() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!resolvedTheme) return;
    const href =
      resolvedTheme === "dark" ? "/favicon-dark.ico" : "/favicon-light.ico";

    let link = document.querySelector<HTMLLinkElement>("link#theme-favicon");
    if (!link) {
      link = document.createElement("link");
      link.id = "theme-favicon";
      link.rel = "icon";
      link.type = "image/x-icon";
      document.head.appendChild(link);
    }
    if (!link.href.endsWith(href)) {
      link.href = href;
    }
  }, [resolvedTheme]);

  return null;
}
