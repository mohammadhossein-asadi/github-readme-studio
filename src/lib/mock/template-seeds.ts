import type { TemplateKind } from "@/lib/types";

/**
 * Compact seed record. `stack` and `features` use dot/pipe separators so the
 * 130-template catalog stays readable and diff-friendly.
 */
export type TemplateSeed = {
  name: string;
  kind: TemplateKind;
  language: string;
  stack: string; // " · " separated
  features: string; // "|" separated
  install: string;
  usage?: string; // override code snippet language (defaults derived)
};

export const templateSeeds: TemplateSeed[] = [
  // ---- Web App (15) -------------------------------------------------------
  { name: "Aurora", kind: "Web App", language: "TypeScript", stack: "Next.js 15 · React 19 · Prisma · PostgreSQL · Stripe", features: "Multi-tenant workspaces|Stripe subscriptions|Magic-link auth|Audit trail", install: "npx create-aurora-app@latest" },
  { name: "Helios", kind: "Web App", language: "TypeScript", stack: "Nuxt 3 · Vue 3 · Pinia · Tailwind", features: "Server-side rendering|Role-based dashboards|Realtime widgets|CSV export", install: "npx nuxi init helios" },
  { name: "Verdant", kind: "Web App", language: "TypeScript", stack: "SvelteKit · Svelte 5 · MDsveX", features: "MDsveX content pipeline|RSS + sitemap|Newsletter hooks|Image CDN", install: "npx sv create verdant" },
  { name: "Meridian", kind: "Web App", language: "TypeScript", stack: "Remix · Hydrogen · Shopify API", features: "Storefront with cart|Product search|Edge caching|Webhook sync", install: "npx create-remix@latest" },
  { name: "Cascade", kind: "Web App", language: "TypeScript", stack: "Astro 5 · Tailwind · Partytown", features: "Zero-JS islands|Content collections|Lighthouse 100|MDX support", install: "npm create astro@latest" },
  { name: "Keystone", kind: "Web App", language: "TypeScript", stack: "Angular 18 · NgRx · Angular Material", features: "Typed reactive forms|NgRx store|Material theming|RTL support", install: "npx @angular/cli new keystone" },
  { name: "Harbor", kind: "Web App", language: "TypeScript", stack: "Vue 3 · Vite · Pinia · Vue Router", features: "Listing marketplace|Stripe Connect payouts|Chat threads|Moderation queue", install: "npm create vue@latest" },
  { name: "Pulse", kind: "Web App", language: "TypeScript", stack: "React 19 · Vite · TanStack Query", features: "Optimistic updates|Offline queue|Interactive charts|PWA ready", install: "npm create vite@latest -- --template react-ts" },
  { name: "Nimbus", kind: "Web App", language: "TypeScript", stack: "SolidStart · SolidJS", features: "Fine-grained reactivity|File-based routes|Edge-ready deploy", install: "npm degit solidjs/solid-start/examples/basic" },
  { name: "Summit", kind: "Web App", language: "TypeScript", stack: "Gatsby 5 · MDX · GraphQL", features: "Image pipeline|CMS sourcing|SEO schema|Incremental builds", install: "npm init gatsby" },
  { name: "Zephyr", kind: "Web App", language: "TypeScript", stack: "Qwik · Qwik City", features: "Resumability|Minimal hydration|Cloudflare deploy", install: "npm create qwik@latest" },
  { name: "Prairie", kind: "Web App", language: "Elm", stack: "Elm 0.19 · Vite", features: "Typed Elm architecture|No runtime exceptions|Tiny bundles", install: "npm create elm-app" },
  { name: "Emberly", kind: "Web App", language: "TypeScript", stack: "Preact · Vite", features: "Embeddable widget|Shadow DOM isolation|PostMessage API", install: "npm create vite@latest -- --template preact-ts" },
  { name: "Halo", kind: "Web App", language: "TypeScript", stack: "Lit · Vite · Storybook", features: "Web components|Design tokens|Storybook docs", install: "npm init @litelement" },
  { name: "Refinery", kind: "Web App", language: "TypeScript", stack: "Refine · Ant Design · TanStack Query", features: "CRUD resources|Auth providers|Realtime subscriptions", install: "npm create refine-app@latest" },

  // ---- Backend / API (15) -------------------------------------------------
  { name: "Forger", kind: "Backend / API", language: "TypeScript", stack: "Express 5 · Zod · Prisma · PostgreSQL", features: "OpenAPI generation|JWT + refresh rotation|Rate limiting|Request tracing", install: "git clone https://github.com/acme/forger && npm i" },
  { name: "Swiftline", kind: "Backend / API", language: "TypeScript", stack: "Fastify 5 · TypeBox · Redis", features: "JSON schema validation|Plugin architecture|Redis caching|Health probes", install: "npm create fastify@latest" },
  { name: "Bastion", kind: "Backend / API", language: "TypeScript", stack: "NestJS 10 · TypeORM · BullMQ", features: "Modular DI|Queue processing|Guards and interceptors|Swagger UI", install: "npx @nestjs/cli new bastion" },
  { name: "Palmetto", kind: "Backend / API", language: "Python", stack: "Django 5 · DRF · Celery · Postgres", features: "Serializer framework|Celery task queue|Django admin|Filter backends", install: "pip install palmetto" },
  { name: "Tidepool", kind: "Backend / API", language: "Python", stack: "Flask 3 · SQLAlchemy · Alembic", features: "Blueprint modules|SQLAlchemy models|Migration recipes|Gunicorn config", install: "pip install tidepool-api" },
  { name: "Vantablack", kind: "Backend / API", language: "Python", stack: "FastAPI · Pydantic v2 · ONNX", features: "Async endpoints|Pydantic validation|Model warm pools|Prometheus metrics", install: "pip install vantablack-serve" },
  { name: "Railcar", kind: "Backend / API", language: "Ruby", stack: "Rails 7 · RSpec · Sidekiq", features: "API-only mode|Serializer layer|RSpec suite|JWT auth", install: "gem install railcar" },
  { name: "ArtisanAPI", kind: "Backend / API", language: "PHP", stack: "Laravel 11 · Sanctum · Horizon", features: "Eloquent resources|Sanctum auth|Queued jobs|Feature tests", install: "composer create-project acme/artisan-api" },
  { name: "Foundry", kind: "Backend / API", language: "Java", stack: "Spring Boot 3 · JPA · Flyway", features: "Layered architecture|Flyway migrations|Testcontainers|Actuator health", install: "spring init -d=web,data-jpa foundry" },
  { name: "Northwind", kind: "Backend / API", language: "C#", stack: ".NET 8 · EF Core · MediatR", features: "Minimal APIs|EF Core migrations|MediatR pipeline|OpenAPI docs", install: "dotnet new install Northwind.Templates" },
  { name: "Otter", kind: "Backend / API", language: "Go", stack: "Go 1.22 · Gin · GORM", features: "Middleware chain|GORM models|Graceful shutdown|Request IDs", install: "go install github.com/acme/otter@latest" },
  { name: "Cobalt", kind: "Backend / API", language: "Go", stack: "Go · Fiber v2 · sqlc", features: "Zero-allocation router|sqlc typed queries|Docker slim images", install: "go get github.com/acme/cobalt" },
  { name: "Lighthouse", kind: "Backend / API", language: "Go", stack: "Go · Echo v4 · pgx · OpenTelemetry", features: "pgx connection pool|OpenTelemetry traces|Middleware stack", install: "go get github.com/acme/lighthouse" },
  { name: "Canal", kind: "Backend / API", language: "Elixir", stack: "Phoenix 1.7 · Ecto · Telemetry", features: "Channels for realtime|Ecto changesets|Telemetry dashboards", install: "mix archive.install hex phx_new" },
  { name: "Driftwood", kind: "Backend / API", language: "Rust", stack: "Rust · Actix Web 4 · SQLx", features: "Compile-time checked SQL|Actor model workers|Zero-cost abstractions", install: "cargo install driftwood-server" },

  // ---- CLI (12) -----------------------------------------------------------
  { name: "Quarry", kind: "CLI", language: "Rust", stack: "Rust · Clap 4 · Tokio", features: "Shell completions|Colored output|Parallel jobs", install: "cargo install quarry" },
  { name: "Waypoint", kind: "CLI", language: "Go", stack: "Go · Cobra · Bubble Tea", features: "Interactive TUI|Cobra commands|Cross-platform builds", install: "go install github.com/acme/waypoint@latest" },
  { name: "Shovel", kind: "CLI", language: "TypeScript", stack: "Node 20 · Commander · execa", features: "Plugin commands|Spinner UX|Config discovery", install: "npm install -g shovel-cli" },
  { name: "Rucksack", kind: "CLI", language: "Python", stack: "Python 3.12 · Typer · Rich", features: "Rich terminal UI|Typed options|Shell completion", install: "pipx install rucksack" },
  { name: "Kettle", kind: "CLI", language: "TypeScript", stack: "Deno 2 · Cliffy", features: "URL imports|Permission flags|Single-binary compile", install: "deno install -A -n kettle jsr:@acme/kettle" },
  { name: "Chisel", kind: "CLI", language: "Zig", stack: "Zig 0.13", features: "Allocator-aware core|Cross compilation|No runtime deps", install: "zig build --release=fast" },
  { name: "Cobbler", kind: "CLI", language: "Shell", stack: "Bash 5 · fzf", features: "Composable functions|fuzzy picker|Dry-run mode", install: "curl -fsSL acme.dev/cobbler | bash" },
  { name: "Loam", kind: "CLI", language: "Haskell", stack: "GHC 9.6 · optparse-applicative", features: "Applicative parsers|Pure core|Type-safe args", install: "cabal install loam" },
  { name: "Tapir", kind: "CLI", language: "OCaml", stack: "OCaml 5 · cmdliner · Dune", features: "cmdliner parsers|Dune build|Effect handlers", install: "opam install tapir" },
  { name: "Anchor", kind: "CLI", language: "C#", stack: ".NET 8 · System.CommandLine · Spectre.Console", features: "Binder-based options|DI integration|Rich console output", install: "dotnet tool install -g acme.anchor" },
  { name: "Rivet", kind: "CLI", language: "C", stack: "C17 · CMake", features: "Zero dependencies|Valgrind clean|Portable Makefile", install: "cmake -B build && cmake --build build" },
  { name: "Vale", kind: "CLI", language: "Dart", stack: "Dart 3 · args · mason", features: "Mason templates|args parsing|pub global activate", install: "dart pub global activate vale_cli" },

  // ---- Library (15) -------------------------------------------------------
  { name: "Tick", kind: "Library", language: "TypeScript", stack: "React 19 · tsup · Vitest", features: "Tree-shakeable ESM|SSR-safe hooks|Zero dependencies|Playground docs", install: "npm install @acme/tick" },
  { name: "Satchel", kind: "Library", language: "TypeScript", stack: "TypeScript 5.9 · tsup", features: "Function toolkit|Full type inference|Bundlephobia friendly", install: "npm install satchel-utils" },
  { name: "Vessel", kind: "Library", language: "TypeScript", stack: "Zustand 5 · Immer", features: "Slice factories|Devtools support|Persist adapters", install: "npm install @acme/vessel" },
  { name: "Peat", kind: "Library", language: "Python", stack: "Python · Pydantic v2", features: "Typed models|JSON schema export|Strict mode", install: "pip install peat" },
  { name: "Sediment", kind: "Library", language: "Rust", stack: "Rust · no_std optional", features: "Zero-copy parsing|no_std support|Fuzz tested", install: "cargo add sediment" },
  { name: "Drift", kind: "Library", language: "Go", stack: "Go 1.22", features: "Backoff strategies|Context aware|Generic errors", install: "go get github.com/acme/drift" },
  { name: "Gemstone", kind: "Library", language: "Ruby", stack: "Ruby 3.3 · RSpec", features: "Refinements API|RSpec suite|YARD docs", install: "gem install gemstone" },
  { name: "Relic", kind: "Library", language: "PHP", stack: "PHP 8.3 · Psalm", features: "Typed properties|Psalm level 1|PSR-12 compliant", install: "composer require acme/relic" },
  { name: "Anvil", kind: "Library", language: "Java", stack: "Java 21 · JUnit 5 · Maven", features: "Record-friendly API|JMH benchmarks|JPMS modules", install: "add to pom.xml" },
  { name: "Compass", kind: "Library", language: "Kotlin", stack: "Kotlin 2.0 · KMP", features: "jvm/ios/js targets|Coroutines|Expect/actual", install: "implementation(\"com.acme:compass:1.0\")" },
  { name: "Beacon", kind: "Library", language: "Swift", stack: "Swift 6 · SPM", features: "Sendable-first API|AsyncSequence helpers|DocC guides", install: "via Xcode package manager" },
  { name: "Sailboat", kind: "Library", language: "Dart", stack: "Dart 3", features: "Null-safe|pub score 140|Example gallery", install: "dart pub add sailboat" },
  { name: "Fern", kind: "Library", language: "Elixir", stack: "Elixir 1.17", features: "Pipe-friendly API|Dialyzer clean|ExDoc guides", install: "mix deps.add fern" },
  { name: "Basalt", kind: "Library", language: "C++", stack: "C++20 · CMake · Conan", features: "Header-only mode|Conan package|Concepts-based API", install: "conan install basalt" },
  { name: "Coral", kind: "Library", language: "Lua", stack: "Lua 5.4 · LuaRocks", features: "Module-per-file|Busted tests|CFFI optional", install: "luarocks install coral" },

  // ---- Mobile (8) ---------------------------------------------------------
  { name: "Wayfare", kind: "Mobile", language: "TypeScript", stack: "React Native 0.75 · Expo SDK 51 · Reanimated", features: "Expo Router|Reanimated gestures|Offline sync", install: "npx create-expo-app wayfare" },
  { name: "Lumen", kind: "Mobile", language: "Dart", stack: "Flutter 3.24 · Riverpod", features: "Riverpod state|Platform channels|Golden tests", install: "flutter create lumen" },
  { name: "Tidewater", kind: "Mobile", language: "Swift", stack: "SwiftUI · SwiftData", features: "SwiftData models|Home screen widgets|App Intents", install: "open Tidewater.xcodeproj" },
  { name: "Slate", kind: "Mobile", language: "Kotlin", stack: "Kotlin 2.0 · Jetpack Compose", features: "Compose UI|Room + DataStore|Hilt DI", install: "clone and open in Android Studio" },
  { name: "Skylark", kind: "Mobile", language: "TypeScript", stack: "Expo · EAS Build", features: "EAS pipelines|OTA updates|Push notifications", install: "npx create-expo-app skylark" },
  { name: "Tinderbox", kind: "Mobile", language: "TypeScript", stack: "Ionic 8 · Capacitor 6", features: "Capacitor plugins|Ionic theming|Live reload", install: "ionic start tinderbox" },
  { name: "Keel", kind: "Mobile", language: "C#", stack: ".NET 8 MAUI", features: "Single project|Handlers|MVVM toolkit", install: "dotnet new maui" },
  { name: "Ballast", kind: "Mobile", language: "TypeScript", stack: "Capacitor 6", features: "Native bridges|Generated types|Example app", install: "npm install @acme/cap-ballast" },

  // ---- Desktop (5) --------------------------------------------------------
  { name: "Lantern", kind: "Desktop", language: "TypeScript", stack: "Electron 31 · Vite", features: "Typed IPC bridge|Auto-update|Tray menu", install: "npm i && npm run dev" },
  { name: "Hearth", kind: "Desktop", language: "Rust", stack: "Tauri 2 · Svelte", features: "Tiny binary|Rust core|Cross-platform", install: "cargo tauri dev" },
  { name: "Crucible", kind: "Desktop", language: "C++", stack: "Qt 6.7 · CMake", features: "QML UI|Qt Quick Controls|Installer framework", install: "cmake -B build" },
  { name: "Timber", kind: "Desktop", language: "C", stack: "GTK 4 · Meson · Libadwaita", features: "Blueprint UI|Flatpak manifest|GNOME HIG", install: "meson setup build" },
  { name: "Crest", kind: "Desktop", language: "C#", stack: "Avalonia 11", features: "XAML UI|MVVM toolkit|Win + macOS + Linux", install: "dotnet run --project Crest" },

  // ---- Data / ML (12) -----------------------------------------------------
  { name: "Stratum", kind: "Data / ML", language: "Python", stack: "PyTorch 2.4 · Lightning · W&B", features: "Lightning modules|Hydra configs|Reproducible seeds", install: "pip install -e . && stratum train" },
  { name: "Mosaic", kind: "Data / ML", language: "Python", stack: "TensorFlow 2.17 · Keras 3", features: "Keras 3 models|tf.data inputs|TFX skeleton", install: "pip install mosaic-tf" },
  { name: "Grove", kind: "Data / ML", language: "Python", stack: "scikit-learn 1.5 · joblib", features: "Pipelines + grids|Model cards|Artifact registry", install: "pip install grove-ml" },
  { name: "Ledger", kind: "Data / ML", language: "Python", stack: "JupyterLab · Poetry · DVC", features: "Notebook style guide|Papermill batching|Data versioning", install: "poetry install" },
  { name: "Millrace", kind: "Data / ML", language: "Python", stack: "pandas 2 · Dagster · GE", features: "Typed schemas|Dagster assets|Expectation suites", install: "pip install millrace-etl" },
  { name: "Torque", kind: "Data / ML", language: "Python", stack: "Polars · DuckDB", features: "Lazy frames|DuckDB SQL|Parquet lakehouse", install: "pip install torque-analytics" },
  { name: "Sonnet", kind: "Data / ML", language: "Python", stack: "transformers · PEFT · LoRA", features: "LoRA adapters|Dataset streaming|GGUF export", install: "pip install sonnet-ft" },
  { name: "Cothrane", kind: "Data / ML", language: "Python", stack: "LangChain · LangGraph", features: "Graph runtime|Tool calling|Trace UI", install: "pip install cothrane" },
  { name: "Glimmer", kind: "Data / ML", language: "Python", stack: "LlamaIndex · pgvector · FastAPI", features: "Hybrid retrieval|Rerankers|Eval harness", install: "pip install glimmer-rag" },
  { name: "Blast", kind: "Data / ML", language: "Scala", stack: "Spark 3.5 · Scala 2.13 · Delta", features: "Delta Lake tables|Structured streaming|Schema tests", install: "sbt assembly" },
  { name: "Loom", kind: "Data / ML", language: "SQL", stack: "dbt 1.8 · Postgres", features: "Layered models|Tests + docs|Slim CI", install: "dbt deps && dbt run" },
  { name: "Prism", kind: "Data / ML", language: "Python", stack: "Streamlit · Plotly", features: "Multi-page apps|Caching|Auth gate", install: "streamlit run app.py" },

  // ---- DevOps (10) --------------------------------------------------------
  { name: "Terracotta", kind: "DevOps", language: "HCL", stack: "Terraform 1.9", features: "VPC + subnet module|Cloud examples|Policy tests", install: "terraform init" },
  { name: "Helmsman", kind: "DevOps", language: "Go", stack: "Go · controller-runtime", features: "CRD scaffolds|Webhook suite|OLM bundle", install: "kubectl apply -f crds" },
  { name: "Rigging", kind: "DevOps", language: "YAML", stack: "Helm 3", features: "Values schema|Chart tests|Library subchart", install: "helm install my-rigging ./chart" },
  { name: "Yoke", kind: "DevOps", language: "YAML", stack: "Ansible 9 · Molecule", features: "Molecule tests|Idempotent tasks|Lint clean", install: "ansible-galaxy install acme.yoke" },
  { name: "Plum", kind: "DevOps", language: "TypeScript", stack: "Pulumi 3 · AWS", features: "Component resources|Policy packs|Stack references", install: "pulumi up" },
  { name: "Relay", kind: "DevOps", language: "YAML", stack: "GitHub Actions · composite", features: "Reusable workflows|Release automation|SLSA provenance", install: "reference workflow from your repo" },
  { name: "Slipway", kind: "DevOps", language: "Dockerfile", stack: "Docker · BuildKit", features: "Multi-arch builds|SBOM attestation|Slim layers", install: "docker buildx bake" },
  { name: "Seaplane", kind: "DevOps", language: "TypeScript", stack: "SST v3 · AWS", features: "SST ion|Realtime API|Queue consumers", install: "npx sst deploy" },
  { name: "Joiner", kind: "DevOps", language: "HCL", stack: "Packer 1.11", features: "AMI + ISO builds|Provisioners|HCP registry", install: "packer init ." },
  { name: "Fathom", kind: "DevOps", language: "Go", stack: "Crossplane 1.17", features: "Provider schema|Composition functions|Upjet generated", install: "kubectl crossplane install provider" },

  // ---- Game (5) -----------------------------------------------------------
  { name: "Bulwark", kind: "Game", language: "C#", stack: "Unity 6 · URP", features: "URP pipeline|Input System|Addressables", install: "open in Unity Hub" },
  { name: "Sprite", kind: "Game", language: "GDScript", stack: "Godot 4.3", features: "Scene inheritance|GDScript 2|Export presets", install: "open project.godot" },
  { name: "Thicket", kind: "Game", language: "Rust", stack: "Bevy 0.14", features: "ECS systems|State machine|WASM build", install: "cargo run --release" },
  { name: "Plaza", kind: "Game", language: "TypeScript", stack: "Phaser 3.80 · Vite", features: "Arcade physics|Tilemaps|WebGL fallback", install: "npm i && npm run dev" },
  { name: "Hearthfire", kind: "Game", language: "Lua", stack: "LÖVE 11.5", features: "HUMP gamestates|Tiled maps|Nightly builds", install: "love ." },

  // ---- Extension (6) ------------------------------------------------------
  { name: "Highlighter", kind: "Extension", language: "TypeScript", stack: "Manifest V3 · Vite", features: "Service worker|Content scripts|Popup UI", install: "npm i && load unpacked" },
  { name: "Soot", kind: "Extension", language: "JavaScript", stack: "WebExtension APIs", features: "Event pages|Sync storage|addons-linter", install: "web-ext run" },
  { name: "Quill", kind: "Extension", language: "TypeScript", stack: "VS Code API · esbuild", features: "Commands + keybindings|Language server|Marketplace CI", install: "code --install-extension quill.vsix" },
  { name: "Zinc", kind: "Extension", language: "Lua", stack: "Neovim 0.10", features: "Lua API|Treesitter queries|Health checks", install: "lazy.nvim spec" },
  { name: "Glyph", kind: "Extension", language: "TypeScript", stack: "Obsidian API", features: "Editor extensions|Settings tab|Dataview compat", install: "BRAT plugin install" },
  { name: "Vellum", kind: "Extension", language: "TypeScript", stack: "Figma Plugin API", features: "UI iframe|Token export|Codegen mode", install: "npm i && import from manifest" },

  // ---- Database (6) -------------------------------------------------------
  { name: "Trowel", kind: "Database", language: "TypeScript", stack: "Prisma 5", features: "Multi-schema|Seed scripts|Migration recipes", install: "npx prisma migrate dev" },
  { name: "Furrow", kind: "Database", language: "TypeScript", stack: "Drizzle ORM", features: "Relations API|Migrations|Zod inference", install: "npm install drizzle-kit" },
  { name: "Trellis", kind: "Database", language: "TypeScript", stack: "Supabase · Next.js", features: "RLS policies|Auth flows|Realtime subscriptions", install: "supabase init && supabase start" },
  { name: "Keep", kind: "Database", language: "TypeScript", stack: "PlanetScale · Vitess", features: "Sharding patterns|Deploy requests|Branch databases", install: "pscale connect" },
  { name: "Hoist", kind: "Database", language: "C", stack: "Redis 7 · Module API", features: "Module API|Command registration|Integration suites", install: "redis-server --loadmodule" },
  { name: "Shale", kind: "Database", language: "C", stack: "SQLite · C API", features: "Virtual tables|Fuzz harness|Amalgamation build", install: "make sqlite3" },

  // ---- Bot (6) ------------------------------------------------------------
  { name: "Troubadour", kind: "Bot", language: "TypeScript", stack: "discord.js 14 · Bun", features: "Slash commands|Component buttons|Sharding", install: "bun install && bun run start" },
  { name: "Herald", kind: "Bot", language: "TypeScript", stack: "Bolt SDK", features: "Block Kit modals|Socket mode|Workflow steps", install: "npm run dev" },
  { name: "Courier", kind: "Bot", language: "Python", stack: "aiogram 3", features: "FSM storage|Middleware|Webhook mode", install: "pip install -r requirements.txt" },
  { name: "TownCrier", kind: "Bot", language: "Python", stack: "tweepy · APScheduler", features: "Streaming filter|Scheduled posts|Media upload", install: "python -m towncrier" },
  { name: "Foreman", kind: "Bot", language: "TypeScript", stack: "Probot", features: "Webhook handlers|Checks API|Manifest flow", install: "npm run build && npm start" },
  { name: "Signal", kind: "Bot", language: "Rust", stack: "matrix-rust-sdk", features: "E2EE rooms|Sync loops|Key verification", install: "cargo run" },

  // ---- Monorepo (5) -------------------------------------------------------
  { name: "Constellation", kind: "Monorepo", language: "TypeScript", stack: "Turborepo 2 · pnpm", features: "Remote caching|Pipeline graph|Codegen packages", install: "pnpm install && pnpm dev" },
  { name: "Grid", kind: "Monorepo", language: "TypeScript", stack: "Nx 19", features: "Affected commands|Inference plugins|Distributed cache", install: "npx nx serve my-app" },
  { name: "Cartouche", kind: "Monorepo", language: "TypeScript", stack: "pnpm 9 · Changesets", features: "Catalog versions|Workspace protocol|Changesets", install: "pnpm install" },
  { name: "Bastille", kind: "Monorepo", language: "Starlark", stack: "Bazel 7", features: "Hermetic builds|Remote execution|Ruleset lint", install: "bazel build //..." },
  { name: "Chorus", kind: "Monorepo", language: "TypeScript", stack: "Lerna 8 · pnpm", features: "Independent versions|Changelogs|Canary releases", install: "npx lerna publish" },

  // ---- Docs (5) -----------------------------------------------------------
  { name: "Atlas", kind: "Docs", language: "TypeScript", stack: "Docusaurus 3", features: "Versioned docs|Algolia search|Blog plugin", install: "npm run start" },
  { name: "Northlight", kind: "Docs", language: "TypeScript", stack: "Astro Starlight", features: "i18n routing|OpenAPI docs|Edit links", install: "npm run dev" },
  { name: "Cartography", kind: "Docs", language: "Python", stack: "MkDocs Material", features: "Material theme|Macros plugin|Site search", install: "mkdocs serve" },
  { name: "Folio", kind: "Docs", language: "Python", stack: "Sphinx 7 · MyST", features: "MyST parser|Autodoc API|ePub builder", install: "make html" },
  { name: "Gazette", kind: "Docs", language: "Go", stack: "Hugo 0.133", features: "Asset pipeline|Taxonomies|Multilingual", install: "hugo server -D" },

  // ---- Minimal (5) --------------------------------------------------------
  { name: "Blank Slate", kind: "Minimal", language: "Any", stack: "Node · npm", features: "Just the essentials|No config|Copy-paste friendly", install: "npm install" },
  { name: "Curated", kind: "Minimal", language: "Markdown", stack: "Markdown", features: "Table of contents|Contribution guide|Badge row", install: "edit README.md" },
  { name: "Dotplot", kind: "Minimal", language: "Shell", stack: "zsh · tmux · stow", features: "Stow symlinks|Bootstrap script|Per-machine config", install: "./bootstrap.sh" },
  { name: "Quarryman", kind: "Minimal", language: "Python", stack: "Python · pytest", features: "Per-algorithm tests|Complexity notes|Micro-benchmarks", install: "pytest" },
  { name: "Kindling", kind: "Minimal", language: "Python", stack: "Python · just", features: "Day scaffolds|Input fetching|Solution runner", install: "just day 01" }
];
