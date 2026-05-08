import type { Section, Template, TemplateKind } from "@/lib/types";
import { templateSeeds, type TemplateSeed } from "@/lib/mock/template-seeds";

/* ------------------------------------------------------------------ */
/* Deterministic helpers (stable output across reloads and SSR).       */
/* ------------------------------------------------------------------ */

const slug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Small stable string hash → deterministic "uses" count per template. */
function hash(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

const accentForKind: Record<TemplateKind, string> = {
  "Web App": "indigo",
  "Backend / API": "sky",
  CLI: "teal",
  Library: "violet",
  Mobile: "emerald",
  Desktop: "amber",
  "Data / ML": "rose",
  DevOps: "sky",
  Game: "violet",
  Extension: "indigo",
  Database: "teal",
  Bot: "emerald",
  Monorepo: "amber",
  Docs: "violet",
  Minimal: "neutral",
};

/** Ordered kind list used by the gallery filter. */
export const templateKinds: Array<TemplateKind | "All"> = [
  "All",
  "Web App",
  "Backend / API",
  "CLI",
  "Library",
  "Mobile",
  "Desktop",
  "Data / ML",
  "DevOps",
  "Game",
  "Extension",
  "Database",
  "Bot",
  "Monorepo",
  "Docs",
  "Minimal",
];

const codeFenceFor: Record<string, string> = {
  TypeScript: "ts",
  JavaScript: "js",
  Python: "python",
  Go: "go",
  Rust: "rust",
  Ruby: "rb",
  PHP: "php",
  Java: "java",
  "C#": "csharp",
  Kotlin: "kotlin",
  Swift: "swift",
  Dart: "dart",
  Elixir: "elixir",
  "C++": "cpp",
  C: "c",
  Lua: "lua",
  Elm: "elm",
  OCaml: "ocaml",
  Haskell: "hs",
  Scala: "scala",
  Zig: "zig",
  Shell: "bash",
  GDScript: "gdscript",
  SQL: "sql",
  HCL: "hcl",
  Dockerfile: "dockerfile",
  YAML: "yaml",
  Starlark: "python",
  Markdown: "md",
  Any: "bash",
};

function usageSnippet(seed: TemplateSeed): string {
  const repo = `${slug(seed.name)}`;
  switch (seed.kind) {
    case "Library":
      return `import { createClient } from "@acme/${repo}";\n\nconst client = createClient({\n  baseUrl: process.env.API_URL,\n  timeoutMs: 5_000,\n});\n\nconst result = await client.ping();\nconsole.log(result.status); // "ok"`;
    case "CLI":
      return `# The one command most people need\n${seed.install} --help\n\n# Common flags\n${seed.install} run --watch\n${seed.install} run --dry-run --verbose`;
    case "Backend / API":
      return `curl -X POST http://localhost:8080/v1/things \\\n  -H "Authorization: Bearer $TOKEN" \\\n  -H "Content-Type: application/json" \\\n  -d '{"name": "first", "tags": ["demo"]}'`;
    case "Bot":
      return `# Invite the bot, then try it:\n/${repo} start\n/${repo} config set timezone Europe/Stockholm`;
    case "Data / ML":
      return `from ${repo.replace(/-/g, "_")} import pipeline\n\nmodel = pipeline.load("checkpoints/latest")\nmetrics = model.evaluate("data/val")\nprint(metrics.summary())`;
    case "Web App":
    case "Desktop":
    case "Mobile":
    case "Game":
    case "Docs":
      return `${seed.install}\n# Open http://localhost:3000 and sign in with the demo account.`;
    default:
      return `${seed.install}\n# Follow the interactive prompts to finish setup.`;
  }
}

function featureList(seed: TemplateSeed): string {
  return seed.features
    .split("|")
    .map((feature, index) => {
      const icons = ["⚡", "🔒", "📈", "🧩", "🛠️", "🌍"];
      return `- ${icons[index % icons.length]} **${feature}**`;
    })
    .join("\n");
}

/** Extra sections that only make sense for certain project kinds. */
const extraSections: Partial<Record<TemplateKind, Array<[string, string]>>> = {
  "Web App": [
    ["Screenshots", "![Dashboard](docs/screenshots/dashboard.png)\n![Editor](docs/screenshots/editor.png)"],
    ["Deployment", "```bash\n# Vercel is zero-config; any Node host works\nnpx vercel --prod\n```"],
  ],
  "Backend / API": [
    ["API Reference", "| Method | Path | Description |\n| --- | --- | --- |\n| `GET` | `/v1/health` | Liveness + version |\n| `POST` | `/v1/things` | Create a resource |\n| `GET` | `/v1/things/:id` | Fetch one resource |"],
    ["Environment", "```env\nDATABASE_URL=postgres://localhost:5432/app\nREDIS_URL=redis://localhost:6379\nJWT_SECRET=change-me\n```"],
  ],
  CLI: [
    ["Commands", "| Command | Description |\n| --- | --- |\n| `init` | Scaffold config in the current directory |\n| `run` | Execute the main workflow |\n| `doctor` | Diagnose environment problems |"],
    ["Configuration", "Configuration lives in a project config file, and every key can be overridden with an environment variable."],
  ],
  Library: [
    ["API", "See the [full API reference](./docs/api.md). The three entry points:\n\n- `createClient()` — returns a typed client\n- `defineConfig()` — validates options at compile time\n- `plugins` — official plugin registry"],
    ["Compatibility", "| Runtime | Versions | Notes |\n| --- | --- | --- |\n| Node | 18, 20, 22 | Full support |\n| Bun | 1.1+ | Full support |\n| Deno | 2.x | Via npm: compat |"],
  ],
  Mobile: [
    ["Screenshots", "<p align=\"center\">\n  <img src=\"docs/screenshots/home.png\" width=\"250\" alt=\"Home\" />\n  <img src=\"docs/screenshots/detail.png\" width=\"250\" alt=\"Detail\" />\n</p>"],
    ["Building", "Development builds run on the simulator; signed release builds are produced from CI on tagged commits."],
  ],
  Desktop: [
    ["Screenshots", "![Main window](docs/screenshots/main.png)"],
    ["Packaging", "Release binaries are built for macOS (dmg), Windows (msi) and Linux (AppImage) on every tag."],
  ],
  "Data / ML": [
    ["Dataset", "| Split | Examples | Source |\n| --- | --- | --- |\n| train | 24,102 | curated crawl |\n| val | 2,013 | held-out |\n| test | 2,014 | held-out |"],
    ["Results", "| Model | Metric | Score |\n| --- | --- | --- |\n| baseline | F1 | 0.781 |\n| ours | F1 | **0.869** |"],
  ],
  DevOps: [
    ["Inputs", "| Input | Type | Default | Description |\n| --- | --- | --- | --- |\n| `region` | string | `us-east-1` | Deployment region |\n| `ha` | bool | `true` | Run control plane replicas |"],
    ["Usage", "```hcl\nmodule \"stack\" {\n  source = \"acme/stack/cloud\"\n  region = \"eu-west-1\"\n}\n```"],
  ],
  Game: [
    ["Gameplay", "Three-minute rounds. Capture the relay, defend the core. Controls: WASD + mouse, gamepad supported."],
    ["Build", "```bash\n# development\nnpm run dev\n\n# production bundle is written to dist/\n```"],
  ],
  Extension: [
    ["Screenshots", "![Popup](docs/screenshots/popup.png)"],
    ["Development", "Load the unpacked build from `dist/` after `npm run build`, then reload the extension on changes."],
  ],
  Database: [
    ["Schema", "```sql\ncreate table things (\n  id uuid primary key default gen_random_uuid(),\n  name text not null,\n  created_at timestamptz not null default now()\n);\n```"],
    ["Migrations", "Migrations are forward-only. Generate with the CLI, review the SQL, then apply in CI."],
  ],
  Bot: [
    ["Commands", "| Command | Description |\n| --- | --- |\n| `/start` | Onboarding walkthrough |\n| `/config` | Per-channel settings |\n| `/stats` | Usage counters |"],
    ["Hosting", "A single small instance is enough for ~5k guilds. Docker Compose file included."],
  ],
  Monorepo: [
    ["Workspaces", "```\napps/\n  web        # customer-facing app\n  admin      # internal console\npackages/\n  ui         # design system\n  config     # shared tooling\n```"],
    ["Packages", "| Package | Version | Description |\n| --- | --- | --- |\n| `@acme/ui` | 2.4.1 | React component library |\n| `@acme/config` | 1.9.0 | Shared lint/ts config |"],
  ],
  Docs: [
    ["Local development", "```bash\nnpm install\nnpm run start   # live-reload dev server\nnpm run build   # static output in build/\n```"],
    ["Deployment", "Every push to `main` publishes a preview; tagged commits deploy to production."],
  ],
};

function buildDocument(seed: TemplateSeed): Section[] {
  const repoName = slug(seed.name);
  const extra = extraSections[seed.kind] ?? [];
  const def = (kind: Section["kind"], title: string, content: string, locked = false): Section => ({
    id: `tpl_${repoName}_${slug(title)}`,
    kind,
    title,
    content,
    enabled: true,
    locked,
  });

  const badges = [
    `![CI](https://img.shields.io/badge/CI-passing-brightgreen)`,
    `![Version](https://img.shields.io/badge/version-1.0.0-blue)`,
    `![License](https://img.shields.io/badge/license-MIT-green)`,
    `![Stars](https://img.shields.io/badge/stars-1.2k-yellow)`,
  ].join(" ");

  const sections: Section[] = [
    def("hero", seed.name, `> ${kindBlurb(seed)}\n\n${seed.features.split("|")[0]} — out of the box, with sensible defaults you can override.` , true),
    def("badges", "Badges", badges),
    def("description", "Description",
      `${seed.name} is a ${seed.kind.toLowerCase()} project written in ${seed.language}. ` +
      `It bundles ${seed.stack.split(" · ").slice(0, 3).join(", ")}, and everything else it needs, ` +
      `so the first successful run takes minutes, not days.`),
    def("features", "Features", featureList(seed)),
    def("tech-stack", "Tech Stack", `| Layer | Choice |\n| --- | --- |\n${seed.stack.split(" · ").map((s, i) => `| ${["Core", "Runtime", "Data", "Tooling", "Infra", "Testing"][i % 6]} | ${s} |`).join("\n")}`),
    def("installation", "Installation", "```bash\n" + seed.install + "\n```"),
    def("usage", "Usage", "```" + (codeFenceFor[seed.language] ?? "bash") + "\n" + usageSnippet(seed) + "\n```"),
    ...extra.map(([title, content]) =>
      def(title.toLowerCase().startsWith("api") ? "api" : "custom", title, content),
    ),
    def("roadmap", "Roadmap", "- [x] Core workflow\n- [x] Configuration surface\n- [ ] Plugin API\n- [ ] Hosted dashboard"),
    def("contributing", "Contributing", "PRs welcome. Run the test suite locally first:\n\n```bash\n" + seed.install.split("&&")[0].trim() + " --dry-run 2>/dev/null || npm test\n```\n\nPlease read [CONTRIBUTING.md](CONTRIBUTING.md) for style and commit conventions."),
    def("license", "License", "[MIT](LICENSE) © Acme Labs"),
  ];

  return sections;
}

function kindBlurb(seed: TemplateSeed): string {
  const blurbs: Record<TemplateKind, string> = {
    "Web App": "A production-shaped web application with auth, data and deploy wired up",
    "Backend / API": "A batteries-included service with typed endpoints, persistence and observability",
    CLI: "A fast, friendly command-line tool with completions and a dry-run mode",
    Library: "A small, well-typed library with a stable public API",
    Mobile: "A cross-platform mobile app with offline-first data",
    Desktop: "A native-feeling desktop app with auto-update and deep OS integration",
    "Data / ML": "A reproducible data and ML project with configs, metrics and artifacts",
    DevOps: "Infrastructure-as-code with policy checks and per-cloud examples",
    Game: "A compact game codebase with clean scene/state structure",
    Extension: "A lean extension that respects platform review guidelines",
    Database: "Schema-first data tooling with safe migration workflows",
    Bot: "A bot with a small command surface and sane hosting defaults",
    Monorepo: "A workspace layout that scales past a dozen packages",
    Docs: "A docs site with versioning, search and a preview deploy per PR",
    Minimal: "A deliberately tiny README — title, install, license",
  };
  return blurbs[seed.kind];
}

export const templates: Template[] = templateSeeds.map((seed) => {
  const document = buildDocument(seed);
  const id = `tpl_${slug(seed.name)}`;
  const h = hash(seed.name + seed.kind);
  const extras = extraSections[seed.kind]?.map(([title]) => title) ?? [];

  return {
    id,
    name: seed.name,
    description: kindBlurb(seed).replace(/^A /, "Structure for a ") +
      ` — ${seed.language} · ${seed.stack.split(" · ").length} stack items · ${document.length} sections.`,
    kind: seed.kind,
    language: seed.language,
    stack: seed.stack.split(" · "),
    sections: document.length,
    uses: 140 + (h % 5200),
    accent: accentForKind[seed.kind],
    previewSections: ["Hero", "Badges", "Features", ...extras.slice(0, 2), "Roadmap"],
    document,
  };
});

export const templateCount = templates.length;
