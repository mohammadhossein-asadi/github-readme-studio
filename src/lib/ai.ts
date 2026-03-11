export type RewriteAction = "professional" | "detailed" | "shorter" | "friendly";

export const rewriteActions: {
  id: RewriteAction;
  label: string;
  description: string;
}[] = [
  {
    id: "professional",
    label: "Make it more professional",
    description: "Tighter phrasing, active voice, no filler.",
  },
  {
    id: "detailed",
    label: "Add more detail",
    description: "Adds specifics reviewers usually ask for.",
  },
  {
    id: "shorter",
    label: "Make it shorter",
    description: "Keeps the first two lines and trims the rest.",
  },
  {
    id: "friendly",
    label: "Soften the tone",
    description: "Warmer and more inviting for contributors.",
  },
];

const FILLER = [
  [/\bvery\s+/gi, ""],
  [/\breally\s+/gi, ""],
  [/\bjust\s+/gi, ""],
  [/\bsimple\b/gi, "straightforward"],
  [/\bstuff\b/gi, "capabilities"],
  [/\bthings\b/gi, "capabilities"],
  [/\ba lot of\b/gi, "many"],
  [/\bstuff\b/gi, "components"],
];

/**
 * Stand-in for the generation model. Deterministic so the UI is testable and
 * the prototype never depends on a network call.
 */
export function rewrite(content: string, action: RewriteAction): string {
  const trimmed = content.trim();
  if (!trimmed) return trimmed;

  switch (action) {
    case "professional": {
      let output = trimmed;
      for (const [pattern, replacement] of FILLER) {
        output = output.replace(pattern, replacement as string);
      }
      return output.replace(/ {2,}/g, " ").trim();
    }
    case "detailed": {
      return [
        trimmed,
        "",
        "### Highlights",
        "",
        "- Works with the toolchain you already use — no global installs required",
        "- Ships with typed APIs, so editors surface errors before you run anything",
        "- Covered by unit and end-to-end tests in CI",
        "- Documented end to end, including migration notes for breaking changes",
      ].join("\n");
    }
    case "shorter": {
      const lines = trimmed.split("\n");
      const kept = lines.slice(0, 3);
      return [
        ...kept,
        "",
        "_Full details moved to the docs — see `docs/` in the repository._",
      ].join("\n");
    }
    case "friendly": {
      return [
        "> We would love your help making this better.",
        "",
        trimmed,
        "",
        "If anything here is unclear, open an issue — no question is too small.",
      ].join("\n");
    }
    default:
      return trimmed;
  }
}

/** Mock latency so progressive states are visible in the UI. */
export const REWRITE_LATENCY = 900;
