export type Visibility = "public" | "private";

export type Repo = {
  id: string;
  owner: string;
  name: string;
  fullName: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  visibility: Visibility;
  updatedAt: string;
  updatedLabel: string;
  defaultBranch: string;
  topics: string[];
  /** How much the tool can do with this repo, used for filters. */
  readmeScore: number;
  hasReadme: boolean;
  license: string | null;
};

export type StackItem = {
  id: string;
  name: string;
  /** simple-icons slug, used for the CDN logo with an initials fallback. */
  slug: string;
  category: "Language" | "Framework" | "Styling" | "Database" | "Tooling" | "Infrastructure" | "Testing";
  version?: string;
  note?: string;
};

export type FeatureFlag = {
  id: string;
  label: string;
  description: string;
  confidence: "high" | "medium" | "low";
};

export type SectionKind =
  | "hero"
  | "badges"
  | "description"
  | "features"
  | "tech-stack"
  | "architecture"
  | "installation"
  | "usage"
  | "api"
  | "screenshots"
  | "roadmap"
  | "contributing"
  | "license"
  | "acknowledgements"
  | "custom";

export type Section = {
  id: string;
  kind: SectionKind;
  /** Heading text. The hero section renders as `# title`. */
  title: string;
  /** Markdown body without the heading. */
  content: string;
  enabled: boolean;
  /** Hero cannot be deleted or reordered, only edited. */
  locked?: boolean;
};

export type AnalysisStageId =
  | "fetch"
  | "stack"
  | "features"
  | "artifacts"
  | "compose";

export type AnalysisStage = {
  id: AnalysisStageId;
  label: string;
  detail: string;
  /** Mock duration in ms. */
  duration: number;
  result: string;
};

export type ReadmeFinding = {
  id: string;
  label: string;
  status: "missing" | "outdated" | "present";
  advice: string;
};

export type TemplateKind =
  | "Web App"
  | "Backend / API"
  | "CLI"
  | "Library"
  | "Mobile"
  | "Desktop"
  | "Data / ML"
  | "DevOps"
  | "Game"
  | "Extension"
  | "Database"
  | "Bot"
  | "Monorepo"
  | "Docs"
  | "Minimal";

export type Template = {
  id: string;
  name: string;
  description: string;
  kind: TemplateKind;
  language: string;
  stack: string[];
  sections: number;
  uses: number;
  accent: string;
  previewSections: string[];
  /** Fully generated document so preview and apply are real operations. */
  document: Section[];
};

export type BadgeTemplate = {
  id: string;
  label: string;
  category: "Status" | "Version" | "Social" | "Quality" | "Platform";
  /** shields.io path + query, expanded per repository. */
  markdown: (repo: Pick<Repo, "owner" | "name" | "license">) => string;
};

export type VersionEntry = {
  id: string;
  label: string;
  at: string;
  author: string;
  summary: string;
  /** Full section snapshot so revert is a real operation. */
  sections: Section[];
};
