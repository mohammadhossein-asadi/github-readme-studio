import type { Section } from "@/lib/types";

/** Badge rows read better when every badge sits on its own line. */
const CENTERED_KINDS = new Set<Section["kind"]>(["badges"]);

export function sectionToMarkdown(section: Section): string {
  const body = section.content.trim();
  const heading =
    section.kind === "hero" ? `# ${section.title}` : `## ${section.title}`;

  const inner = CENTERED_KINDS.has(section.kind)
    ? `<div align="center">\n\n${body}\n\n</div>`
    : body;

  return `${heading}\n\n${inner}`.trim();
}

/** Serialize the whole document, respecting enabled flags and ordering. */
export function sectionsToMarkdown(sections: Section[]): string {
  return (
    sections
      .filter((section) => section.enabled)
      .map(sectionToMarkdown)
      .join("\n\n")
      .trim() + "\n"
  );
}

export type DocStats = {
  words: number;
  characters: number;
  readingMinutes: number;
  sections: number;
};

export function getDocStats(sections: Section[]): DocStats {
  const markdown = sectionsToMarkdown(sections);
  const words = markdown.split(/\s+/).filter(Boolean).length;
  return {
    words,
    characters: markdown.length,
    readingMinutes: Math.max(1, Math.round(words / 220)),
    sections: sections.filter((section) => section.enabled).length,
  };
}

/** Slugify a heading for anchor links and the section outline. */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

/** Extract ATX headings so the outline reflects the raw markdown source. */
export function outlineFromMarkdown(markdown: string): {
  level: number;
  text: string;
}[] {
  const headings: { level: number; text: string }[] = [];
  let inFence = false;

  for (const line of markdown.split("\n")) {
    // `# comment` inside a fenced block is code, not a heading.
    if (line.trimStart().startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{1,6})\s+(.*)$/.exec(line);
    if (match) headings.push({ level: match[1].length, text: match[2].trim() });
  }

  return headings;
}

const TITLE_TO_KIND: Record<string, Section["kind"]> = {
  badges: "badges",
  description: "description",
  features: "features",
  "why this project": "description",
  "tech stack": "tech-stack",
  architecture: "architecture",
  installation: "installation",
  "getting started": "installation",
  usage: "usage",
  api: "api",
  "api reference": "api",
  screenshots: "screenshots",
  roadmap: "roadmap",
  contributing: "contributing",
  license: "license",
  acknowledgements: "acknowledgements",
};

let parseCounter = 0;
const nextId = () => `parsed_${Date.now().toString(36)}_${parseCounter++}`;

function stripBadgeWrapper(body: string) {
  const match = /^<div align="center">\s*([\s\S]*?)\s*<\/div>$/m.exec(body.trim());
  return match ? match[1].trim() : body;
}

/**
 * Best-effort inverse of {@link sectionsToMarkdown}. Used when the user edits
 * the raw markdown directly and switches back to the structured view.
 */
export function parseSectionsFromMarkdown(markdown: string): Section[] {
  const lines = markdown.split("\n");
  const sections: Section[] = [];
  let title: string | null = null;
  let level: 1 | 2 = 2;
  let buffer: string[] = [];
  let inFence = false;

  const flush = () => {
    if (title === null) return;
    const body = stripBadgeWrapper(buffer.join("\n").trim());
    const kind =
      level === 1
        ? "hero"
        : (TITLE_TO_KIND[title.toLowerCase()] ?? "custom");
    sections.push({
      id: kind === "hero" ? "sec_hero" : nextId(),
      kind,
      title,
      content: body,
      enabled: true,
      locked: kind === "hero",
    });
  };

  for (const line of lines) {
    // Headings inside fenced code blocks must stay part of the body.
    const fence = line.trimStart().startsWith("```");
    const heading = fence ? null : /^(#{1,2})\s+(.*)$/.exec(line);

    if (fence) {
      inFence = !inFence;
    }

    if (heading && !inFence) {
      flush();
      level = heading[1].length === 1 ? 1 : 2;
      title = heading[2].trim();
      buffer = [];
      continue;
    }
    if (title !== null) buffer.push(line);
  }
  flush();

  return sections.length
    ? sections
    : [{ ...cortexHeroFallback, id: nextId() }];
}

const cortexHeroFallback: Section = {
  id: "sec_hero",
  kind: "hero",
  title: "Project title",
  content: "Add a one-line tagline here.",
  enabled: true,
  locked: true,
};

export function downloadMarkdown(filename: string, markdown: string) {
  const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
