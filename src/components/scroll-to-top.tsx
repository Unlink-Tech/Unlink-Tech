"use client";

import { ArrowUp } from "lucide-react";
import { NeuButton } from "@/components/ui/neu-button";

export function ScrollToTop() {
  return (
    <NeuButton
      type="button"
      variant="neutral"
      size="sm"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="group gap-2"
      aria-label="Scroll back to top"
    >
      Back to top
      <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
    </NeuButton>
  );
}
