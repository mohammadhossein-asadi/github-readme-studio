# GitHub README Studio

<div align="center">

**Professional README Generator — AI-Assisted, Design Templates, Persian/RTL Support**

[![Next.js](https://img.shields.io/badge/Next.js-16+-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![CodeMirror](https://img.shields.io/badge/CodeMirror-6-FF6B6B?logo=codemirror&logoColor=white)](https://codemirror.net/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

[🇬🇧 English](#-github-readme-studio) • [🇮🇷 فارسی](README.fa.md) • [📖 Documentation](#-documentation) • [🚀 Quick Start](#-quick-start) • [🤝 Contributing](#-contributing)

</div>

---

## 🌟 Overview

**GitHub README Studio** is a modern web application for creating, previewing, and generating professional GitHub READMEs. Built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and **CodeMirror 6**, it features **AI-assisted content generation**, **20+ professionally designed templates**, **real-time preview**, and **full Persian/RTL support**.

### 🎯 Why README Studio?

| Problem | README Studio Solution |
|---------|------------------------|
| Writing READMEs is time-consuming | **AI generation** — GPT-assisted content from repo analysis |
| Design skills required for badges/layout | **20+ templates** — Professional, copy-paste ready |
| No live preview while editing | **Real-time** — Split view with diff highlighting |
| Persian READMEs are hard | **Full RTL** — Vazirmatn, Persian badges, RTL preview |
| Template variables are manual | **Dynamic placeholders** — Auto-filled from package.json |

---

## ✨ Features

### 🤖 **AI-Powered Content Generation**
- **Repo Analysis** — Fetches package.json, source files, git history
- **Smart Sections** — Auto-generates: Description, Installation, Usage, API, Contributing
- **Framework Detection** — Tailors content for React, Vue, Svelte, Next.js, etc.
- **Persian Translation** — One-click EN ↔ FA translation
- **Tone Control** — Professional, friendly, minimal, comprehensive

### 🎨 **Design Templates (20+)**
| Category | Templates |
|----------|-----------|
| **Minimal** | Clean, typography-focused, whitespace-heavy |
| **Feature-Rich** | Badges, screenshots, feature grids, tables |
| **Project Showcase** | Hero, demo GIF, tech stack, live links |
| **Library/Docs** | API reference, examples, migration guide |
| **Persian-Optimized** | RTL layouts, Vazirmatn, Persian badges |

### 👁️ **Live Preview & Diff**
- **Split View** — Editor left, preview right
- **Sync Scrolling** — Linked editor/preview positions
- **Diff Mode** — See changes vs. GitHub rendered
- **Mobile Preview** — Toggle device viewport
- **Raw Markdown** — Copy GitHub-ready markdown

### 🔧 **Component Library**
- **Badge Builder** — Shields.io, custom colors, dynamic data
- **Table Generator** — Markdown tables from JSON/CSV
- **TOC Generator** — Auto table of contents with anchors
- **Code Block** — Syntax highlighting, line numbers, copy button
- **Image Optimization** — WebP conversion, CDN upload
- **Emoji Picker** — Categorized, searchable, Persian names

### 🌍 **Persian/RTL First-Class**
| Feature | Implementation |
|---------|----------------|
| **RTL Editor** | CodeMirror RTL direction, Persian numerals |
| **RTL Preview** | Mirrored layout, Vazirmatn font |
| **Persian Badges** | Translated labels, RTL-compatible shields |
| **Jalali Dates** | Auto-convert dates in changelogs |
| **Persian Templates** | Pre-written Persian sections |
| **Keyboard** | Persian layout awareness |

### 📤 **Export & Integration**
- **Copy to Clipboard** — Raw markdown, GitHub-flavored
- **Download** — `.md` file with front matter
- **GitHub Gist** — Direct gist creation
- **Repo Sync** — Push to repo via GitHub App (planned)
- **CI Badge** — Auto-generate workflow badges

---

## 🏗️ Architecture

### Tech Stack
| Layer | Technology | Version |
|-------|------------|---------|
| **Framework** | Next.js (App Router) | 16+ |
| **Runtime** | React | 19 |
| **Language** | TypeScript | 5 (Strict) |
| **Styling** | Tailwind CSS | v4 |
| **Editor** | CodeMirror 6 | 6.x |
| **AI** | OpenAI SDK / Vercel AI SDK | Latest |
| **State** | Zustand + TanStack Query | Latest |
| **Database** | PostgreSQL (Prisma) / Supabase | - |
| **Auth** | NextAuth.js v5 | 5.x |
| **Testing** | Vitest + Playwright | Latest |
| **Deployment** | Vercel | - |

### Project Structure
```
GitHub-README-Studio/
├── public/
│   ├── templates/              # Template thumbnails
│   ├── badges/                 # Badge presets
│   └── fonts/                  # Vazirmatn
├── src/
│   ├── app/
│   │   ├── (auth)/             # Sign in/up
│   │   ├── (studio)/           # Studio routes
│   │   │   ├── editor/         # CodeMirror editor
│   │   │   ├── preview/        # Live preview
│   │   │   ├── templates/      # Template gallery
│   │   │   ├── ai/             # AI generation panel
│   │   │   ├── export/         # Export options
│   │   │   └── history/        # Version history
│   │   ├── api/
│   │   │   ├── ai/             # AI generation endpoints
│   │   │   ├── templates/      # Template CRUD
│   │   │   ├── github/         # Repo analysis, gist
│   │   │   ├── export/         # Export pipelines
│   │   │   └── auth/           # NextAuth routes
│   │   ├── globals.css         # Global styles + Tailwind v4
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Landing page
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── editor/             # CodeMirror, toolbar
│   │   ├── preview/            # Preview renderer
│   │   ├── templates/          # Template cards, modal
│   │   ├── ai/                 # AI panel, streaming
│   │   ├── badges/             # Badge builder
│   │   └── export/             # Export dialogs
│   ├── lib/
│   │   ├── ai/                 # AI prompts, streaming
│   │   ├── github/             # Octokit, repo analysis
│   │   ├── templates/          # Template engine
│   │   ├── export/             # Markdown, HTML, PDF
│   │   ├── persian/            # Persian utilities
│   │   ├── prisma/             # Database client
│   │   └── utils/              # Shared utilities
│   ├── hooks/                  # Custom React hooks
│   ├── store/                  # Zustand stores
│   └── types/                  # TypeScript types
├── prisma/
│   └── schema.prisma           # Database schema
├── templates/                  # Markdown templates
├── .env.example
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** v26+
- **npm** 11+
- **PostgreSQL** (local/Supabase/Neon)
- **OpenAI API key** (for AI features)
- **GitHub OAuth App** (for repo access)
- **Vercel account** for deployment

### Installation
```bash
# Clone the repository
git clone https://github.com/mohammadhossein-asadi/github-readme-studio.git
cd github-readme-studio

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Set up database
npx prisma migrate dev
npx prisma db seed

# Start development server
npm run dev
```

### Environment Variables
```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="GitHub README Studio"

# Database (PostgreSQL via Prisma)
DATABASE_URL=postgresql://user:pass@localhost:5432/readme_studio
# Or Supabase
# DATABASE_URL=postgresql://postgres:pass@db.xxx.supabase.co:5432/postgres

# Auth (NextAuth.js v5)
AUTH_SECRET=your-secret-min-32-chars
GITHUB_CLIENT_ID=your-github-oauth-client-id
GITHUB_CLIENT_SECRET=your-github-oauth-secret

# AI (OpenAI-compatible)
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini
# Or use Azure, Anthropic, local LLM

# GitHub App (for repo sync - planned)
GITHUB_APP_ID=123456
GITHUB_APP_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n..."

# Storage (for exports, images)
AWS_S3_BUCKET=readme-studio-exports
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 🛠️ Development

### Available Commands
```bash
npm run dev          # Start dev server with Turbopack
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
npm run typecheck    # TypeScript check
npm run db:push      # Prisma push schema
npm run db:studio    # Prisma Studio
npm test             # Run Vitest tests
npm run test:watch   # Watch mode
npm run test:e2e     # Playwright e2e tests
```

### AI Prompt Engineering
```typescript
// src/lib/ai/prompts.ts
export const README_GENERATION_PROMPT = `
You are an expert technical writer creating GitHub READMEs.

Analyze the repository data and generate a professional README.

Repository Data:
- Name: {{repoName}}
- Description: {{description}}
- Language: {{primaryLanguage}}
- Package.json: {{packageJson}}
- File Structure: {{fileStructure}}
- Recent Commits: {{recentCommits}}

Generate sections:
1. **Title & Badges** — Project name, version, license, build status
2. **Description** — What it does, why it exists, target audience
3. **Features** — Key capabilities with icons
4. **Installation** — Prerequisites, steps, verification
5. **Usage** — Quick start, common examples, configuration
6. **API/CLI** — If applicable, command reference
7. **Architecture** — High-level diagram description
8. **Contributing** — Guidelines, setup, PR process
9. **License** — License type, link

Tone: {{tone}} (professional/friendly/minimal/comprehensive)
Language: {{language}} (en/fa)
RTL: {{isRTL}}

Output: Valid GitHub-Flavored Markdown with front matter.
`;

export const PERSIAN_TRANSLATION_PROMPT = `
Translate the following README to Persian (Farsi).
Preserve: Code blocks, badge URLs, links, markdown syntax.
Convert: Text content, section headers, descriptions.
Use: Vazirmatn-compatible Persian, RTL-friendly formatting.
Jalali dates for any timestamps.
`;
```

### Template System
```markdown
<!-- templates/minimal.md -->
---
name: Minimal
category: minimal
description: Clean, typography-focused README
rtl: true
---

# {{projectName}}

{{#if description}}
{{description}}
{{/if}}

## Features

{{#each features}}
- {{this}}
{{/each}}

## Installation

\`\`\`bash
{{installCommand}}
\`\`\`

## Usage

\`\`\`bash
{{usageExample}}
\`\`\`

## License

{{license}}
```

---

## 🧪 Testing
```bash
# Unit tests (AI prompts, template engine, export)
npm test

# E2E tests (editor, preview, AI generation, export)
npm run test:e2e

# Visual regression (preview rendering)
npm run test:visual
```

**Test Coverage Areas:**
- AI generation quality (snapshot testing)
- Template rendering with all variables
- CodeMirror editor (RTL, Persian, syntax highlight)
- Preview renderer (GitHub-flavored markdown)
- Export pipelines (markdown, HTML, PDF)
- GitHub API integration (repo analysis, gist)

---

## 📚 Documentation
| Document | Description |
|----------|-------------|
| [Architecture](docs/ARCHITECTURE.md) | System design & data flow |
| [AI Prompts](docs/AI_PROMPTS.md) | Prompt engineering guide |
| [Templates](docs/TEMPLATES.md) | Creating custom templates |
| [GitHub Integration](docs/GITHUB.md) | Octokit, Apps, OAuth |
| [Persian UX](docs/PERSIAN_UX.md) | RTL, fonts, calendar guidelines |
| [Deployment](docs/DEPLOYMENT.md) | Vercel guide |

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel --prod
```

**Configure in Vercel Dashboard:**
- All environment variables from `.env.example`
- `NEXT_PUBLIC_APP_URL` = your production URL
- **Edge Functions** for AI streaming endpoints
- **Cron Jobs** for template updates

### Docker
```dockerfile
FROM node:26-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY prisma ./prisma/
RUN npx prisma generate
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🔒 Security
- **AI Input Sanitization** — No prompt injection, length limits
- **GitHub OAuth** — Minimal scopes (read:repo, user:email)
- **Rate Limiting** — AI endpoints, export endpoints
- **CSP Headers** — Strict script/style sources
- **Dependency Scanning** — GitHub Dependabot
- **Secrets Management** — Vercel env vars, no client exposure

---

## 🤝 Contributing
We welcome template designers, AI prompt engineers, and developers!

### Quick Contribution Steps
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-template`
3. Add template in `templates/`
4. Add thumbnail in `public/templates/`
5. Write Persian variant if applicable
6. Run checks: `npm run lint && npm run typecheck && npm test`
7. Commit: `git commit -m "feat: add Persian minimal template"`
8. Push: `git push origin feature/new-template`
9. Open a Pull Request

### Template Contribution Guidelines
- Include **both EN and FA** variants
- Test **RTL preview** rendering
- Use **semantic markdown** (headings, lists, tables)
- Add **badge presets** for common tools
- Document **variables** in template front matter

---

## 📋 Roadmap

### ✅ Phase 1 - Foundation
- [x] Next.js 16 + React 19 + TypeScript setup
- [x] Tailwind CSS v4 + Vazirmatn + RTL
- [x] CodeMirror 6 editor with Persian support
- [x] Live preview with GitHub-flavored markdown

### 🔄 Phase 2 - Core Features
- [ ] AI generation (OpenAI + streaming)
- [ ] 20+ design templates
- [ ] Template variables (package.json, git)
- [ ] Export (markdown, HTML, PDF, gist)

### 📅 Phase 3 - Polish
- [ ] Version history & diff
- [ ] Collaborative editing (Yjs)
- [ ] Template marketplace
- [ ] Analytics dashboard

### 🌟 Phase 4 - Integrations
- [ ] GitHub App for repo sync
- [ ] VS Code extension
- [ ] CLI tool (`npx create-readme`)
- [ ] GitHub Action for auto-update
- [ ] Multi-language (Arabic, Turkish, etc.)

---

## 📄 License
**MIT License** — See [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments
- **CodeMirror 6** — Extensible code editor
- **Vercel AI SDK** — AI streaming utilities
- **Octokit** — GitHub API client
- **Tailwind CSS** — Utility-first styling
- **Vazirmatn Font** — Persian typography by [Rastikerdar](https://github.com/rastikerdar/vazirmatn)
- **shadcn/ui** — Beautiful component library
- **GitHub** — For the platform we all document on

---

## 📞 Support & Community
- **Documentation**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/mohammadhossein-asadi/github-readme-studio/issues)
- **Discussions**: [GitHub Discussions](https://github.com/mohammadhossein-asadi/github-readme-studio/discussions)
- **Templates**: [github-readme-studio.vercel.app/templates](https://github-readme-studio.vercel.app/templates)
- **Email**: hello@readme-studio.dev

---

<div align="center">

**Built with ❤️ for developers who want beautiful READMEs**

[🇬🇧 English](README.md) • [🇮🇷 فارسی](README.fa.md) • [⭐ Star us on GitHub](https://github.com/mohammadhossein-asadi/github-readme-studio)

</div>