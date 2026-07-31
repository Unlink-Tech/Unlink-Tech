import type { ReactNode } from "react";

/**
 * Put the hero's shine gradient on the closing word of a heading.
 *
 * The home hero highlights its focus phrase ("run on."); this applies the same
 * treatment to the shared heading components so every page reads as one system.
 *
 * Only plain-string titles are touched. A caller that passes markup has already
 * chosen its own highlight, so it is returned untouched rather than fought with.
 */
export function shineFocusWord(title: ReactNode): ReactNode {
  if (typeof title !== "string") return title;

  const trimmed = title.trim();
  const split = trimmed.lastIndexOf(" ");
  if (split === -1) return <span className="shine-text">{trimmed}</span>;

  return (
    <>
      {trimmed.slice(0, split + 1)}
      <span className="shine-text">{trimmed.slice(split + 1)}</span>
    </>
  );
}
