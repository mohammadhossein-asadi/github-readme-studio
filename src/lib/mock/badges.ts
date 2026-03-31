import type { BadgeTemplate } from "@/lib/types";

/**
 * Build a shields.io badge. The alt text is the human-readable label rather
 * than the URL, so the markdown stays accessible when images fail to load.
 */
const shield =
  (label: string, path: string, query = "") =>
  (repo: { owner: string; name: string; license: string | null }) => {
    const resolved = path
      .replace("{owner}", repo.owner)
      .replace("{name}", repo.name)
      .replace("{license}", repo.license ?? "unspecified");
    return `![${label}](https://img.shields.io/${resolved}${query ? `?${query}` : ""})`;
  };

export const badgeTemplates: BadgeTemplate[] = [
  {
    id: "b_ci",
    label: "Build status",
    category: "Status",
    markdown: shield(
      "Build status",
      "{owner}/{name}/actions/workflow/status/ci.yml",
      "branch=main&label=build&logo=githubactions&logoColor=white",
    ),
  },
  {
    id: "b_version",
    label: "Release version",
    category: "Version",
    markdown: shield(
      "Version",
      "github/package-json/v/{owner}/{name}",
      "label=version&color=4f46e5",
    ),
  },
  {
    id: "b_npm",
    label: "npm downloads",
    category: "Platform",
    markdown: shield(
      "Downloads",
      "npm/dm/{name}",
      "color=cb3837&logo=npm&logoColor=white",
    ),
  },
  {
    id: "b_license",
    label: "License",
    category: "Social",
    markdown: shield("License", "license/{license}", "color=15803d"),
  },
  {
    id: "b_stars",
    label: "Stars",
    category: "Social",
    markdown: shield(
      "Stars",
      "github/stars/{owner}/{name}",
      "style=flat&color=f59e0b",
    ),
  },
  {
    id: "b_forks",
    label: "Forks",
    category: "Social",
    markdown: shield(
      "Forks",
      "github/forks/{owner}/{name}",
      "style=flat&color=6366f1",
    ),
  },
  {
    id: "b_issues",
    label: "Open issues",
    category: "Status",
    markdown: shield(
      "Open issues",
      "github/issues/{owner}/{name}",
      "color=0969da",
    ),
  },
  {
    id: "b_coverage",
    label: "Test coverage",
    category: "Quality",
    markdown: shield("Coverage", "badge/coverage-94%25", "color=15803d"),
  },
  {
    id: "b_quality",
    label: "Code quality",
    category: "Quality",
    markdown: shield("Code quality", "badge/code%20quality-A", "color=4f46e5"),
  },
  {
    id: "b_types",
    label: "TypeScript types",
    category: "Quality",
    markdown: shield(
      "Types included",
      "badge/types-included-3178c6",
      "logo=typescript&logoColor=white",
    ),
  },
  {
    id: "b_docker",
    label: "Docker pulls",
    category: "Platform",
    markdown: shield(
      "Docker pulls",
      "docker/pulls/{name}",
      "logo=docker&logoColor=white&color=2496ed",
    ),
  },
  {
    id: "b_commit",
    label: "Last commit",
    category: "Status",
    markdown: shield(
      "Last commit",
      "github/last-commit/{owner}/{name}",
      "color=9a9aa6",
    ),
  },
];

export const badgeCategories = [
  "Status",
  "Version",
  "Social",
  "Quality",
  "Platform",
] as const;

/** Parse existing badge lines back out of a markdown badge block. */
export function parseBadgeLines(content: string): string[] {
  return content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}
