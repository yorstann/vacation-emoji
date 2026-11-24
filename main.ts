import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Entry for make.fun bounty u-grand-elephant-19-one-emoji-one-dream-vacation-62879a35:
// exactly one emoji for your dream vacation — the most evocative one.
// The whole entry is that single emoji. Pass 2 routes it through a
// small picker helper. It wins because a lone island says the whole
// dream at once: far away, nobody around, nothing scheduled — escape
// itself, not just a beach day. No itinerary could be more honest.
// buildEntryLine() is the single source of truth for the exact text.

const ENTRY = "🏝️" as const;

function pickEmoji(): string {
  return ENTRY;
}

export function buildEntryLine(): string {
  return pickEmoji();
}

export const ENTRY_LINE = buildEntryLine();

const MAX_CHARS = 8;

export function charCount(text: string): number {
  return [...text].length;
}

export function isValidEntry(text: string): boolean {
  const length = charCount(text);
  return (
    length >= 1 &&
    length <= MAX_CHARS &&
    text.trim().length > 0 &&
    !/\s/.test(text)
  );
}

if (!isValidEntry(ENTRY_LINE)) {
  throw new Error(
    `entry must be a single emoji of 1–${MAX_CHARS} characters, got ${charCount(ENTRY_LINE)}`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_LINE, "utf8");
