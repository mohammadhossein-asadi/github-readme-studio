# GitHub README Studio

<div align="center">

![GitHub README Studio Logo](public/logo.png)

**Beautiful README Generator & Editor with Live Preview**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Monaco Editor](https://img.shields.io/badge/Monaco_Editor-Latest-007ACC?logo=monaco&logoColor=white)](https://microsoft.github.io/monaco-editor/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

[🇬🇧 English](#-github-readme-studio) • [🇮🇷 فارسی](README.fa.md) • [📖 Documentation](#-documentation) • [🚀 Quick Start](#-quick-start) • [🤝 Contributing](#-contributing)

</div>

---

## 🌟 Overview

**GitHub README Studio** is a powerful, visual **README.md generator and editor** with **live preview**, **template library**, **component blocks**, and **GitHub-flavored markdown** support. Create professional READMEs in minutes, not hours.

### 🎯 Why README Studio?

| Problem | README Studio Solution |
|---------|----------------------|
| Writing markdown is tedious | **Visual block editor** — drag, drop, configure |
| No live preview | **Split view** — edit left, preview right |
| Templates are hard to customize | **Parameterized templates** with forms |
| Badges, shields, TOC manual | **Auto-generate** from package.json, GitHub API |
| No Persian support | **RTL editor** with Vazirmatn, Jalali dates |

---

## ✨ Features

### 📝 **Visual Editor**
- **Block-based** — sections, headers, lists, tables, code, images, badges
- **Drag & drop** reordering with @dnd-kit
- **Inline toolbar** — formatting, links, images, emoji
- **Keyboard shortcuts** — markdown-style (`#`, `##`, `-`, `>`, `` ` ``)

### 👁️ **Live Preview**
- **Split pane** — resizable, synced scroll
- **GitHub-flavored markdown** — task lists, tables, alerts, math
- **Syntax highlighting** — 100+ languages (Shiki)
- **Dark/Light** — matches GitHub theme
- **Mobile preview** — toggle device width

### 🎨 **Template Library**
| Category | Templates |
|----------|-----------|
| **Open Source** | Standard, Minimal, Comprehensive, Enterprise |
| **Personal** | Portfolio, Resume, Blog, Links |
| **Project Types** | CLI, Library, Framework, App, Mobile, API |
| **Frameworks** | React, Vue, Next.js, Rust, Go, Python, Node |
| **Persian** | فارسی استاندارد، مینیمال، سازمانی |

### 🧩 **Smart Components**
- **Badges** — Shields.io generator (version, license, build, coverage, downloads)
- **TOC** — Auto-generated from headers, collapsible
- **Contributors** — Auto-fetch from GitHub API (avatars + links)
- **Stats** — Stars, forks, issues, PRs, last commit, language
- **Social** — Twitter, LinkedIn, Discord, Slack, Email buttons
- **Installation** — Auto-detect package manager (npm, pnpm, yarn, bun, cargo, go, pip)

### 🔗 **GitHub Integration**
- **Import** — Fetch existing README from any repo
- **Export** — Copy markdown, download .md, push to repo (PAT)
- **Sync** — Two-way sync with GitHub (webhook)
- **Preview in context** — See how it looks on GitHub profile/repo

### 🌍 **Persian-First Experience**
| Feature | Implementation |
|---------|----------------|
| **RTL Editor** | Monaco Editor RTL + Tailwind RTL |
| **Typography** | Vazirmatn for Persian, JetBrains Mono for code |
| **Persian Numbers** | ۱۲۳۴۵۶۷۸۹۰ in stats, dates |
| **Jalali Dates** | Auto-convert dates in templates |
| **RTL Preview** | GitHub-style RTL rendering |

---

## 🏗️ Architecture

### Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js (App Router) |
| **Runtime** | React 19 |
| **Language** | TypeScript 5 (Strict) |
| **Styling** | Tailwind CSS v4 |
| **Editor** | Monaco Editor (VS Code core) |
| **Markdown** | remark/rehype + Shiki |
| **Drag & Drop** | @dnd-kit |
| **State** | Zustand |
| **Forms** | React Hook Form + Zod |
| **Deployment** | Vercel |

### Project Structure

```
GitHub README Studio/
├── public/
├── src/
│   ├── app/
│   │   ├── (studio)/
│   │   │   ├── editor/           # Main editor
│   │   │   ├── templates/        # Template gallery
│   │   │   ├── my-readmes/       # Saved READMEs
│   │   │   └── settings/
│   │   ├── api/
│   │   │   ├── github/           # GitHub API proxy
│   │   │   ├── templates/        # Template CRUD
│   │   │   └── readmes/          # README CRUD
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── components/
│   │   ├── editor/
│   │   │   ├── BlockEditor.tsx
│   │   │   ├── BlockPalette.tsx
│   │   │   ├── LivePreview.tsx
│   │   │   ├── Toolbar.tsx
│   │   │   └── blocks/           # Individual block components
│   │   ├── templates/
│   │   │   ├── TemplateCard.tsx
│   │   │   ├── TemplateForm.tsx
│   │   │   └── TemplateGallery.tsx
│   │   └── ui/
│   ├── hooks/
│   │   ├── useEditor.ts
│   │   ├── useTemplates.ts
│   │   └── useGitHub.ts
│   ├── lib/
│   │   ├── markdown.ts           # remark/rehype pipeline
│   │   ├── templates/            # Template definitions
│   │   ├── badges.ts             # Shields.io generator
│   │   ├── github.ts             # GitHub API client
│   │   └── utils.ts
│   ├── store/
│   └── types/
├── .env.example
├── package.json
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20+
- **GitHub PAT** (for import/export/sync)

### Installation

```bash
git clone https://github.com/mohammadhossein-asadi/github-readme-studio.git
cd github-readme-studio
npm install
cp .env.example .env.local
# Edit .env.local
npm run dev
```

### Environment Variables

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="GitHub README Studio"

# GitHub OAuth (for user auth)
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...

# Or use PAT for server-side operations
GITHUB_PAT=ghp_...

# Optional: Database for saved READMEs
DATABASE_URL=postgresql://...
```

---

## 🛠️ Development

```bash
npm run dev          # Dev server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
npm test             # Vitest
```

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [Architecture](docs/ARCHITECTURE.md) | System design |
| [Block API](docs/BLOCK_API.md) | Creating custom blocks |
| [Template System](docs/TEMPLATES.md) | Template authoring |
| [GitHub Integration](docs/GITHUB_INTEGRATION.md) | API usage |
| [Persian Support](docs/PERSIAN.md) | RTL & i18n |

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
vercel --prod
# Add env vars in Vercel dashboard
```

---

## 🔒 Security

- **PAT encryption** — Encrypted at rest
- **OAuth** — Secure GitHub authentication
- **CSP** — Strict content security policy
- **Rate limiting** — On GitHub API proxy
- **No client secrets** — All sensitive ops server-side

---

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 📋 Roadmap

- [x] Monaco Editor + Live Preview
- [x] Block-based editor
- [x] Template gallery (20+)
- [x] Badge generator
- [x] GitHub import/export
- [x] Persian RTL support
- [ ] AI-assisted writing (GPT-4)
- [ ] Collaborative editing (Yjs)
- [ ] Version history
- [ ] Team workspaces
- [ ] VS Code extension
- [ ] Browser extension

---

## 📄 License

**MIT License** — See [LICENSE](LICENSE)

---

## 🙏 Acknowledgments

- **Monaco Editor** — VS Code editor core
- **Shiki** — Syntax highlighting
- **remark/rehype** — Markdown processor
- **Shields.io** — Badge service
- **@dnd-kit** — Drag and drop
- **Vazirmatn Font** — Persian typography

---

## 📞 Support & Community

- **Issues**: [GitHub Issues](https://github.com/mohammadhossein-asadi/github-readme-studio/issues)
- **Discussions**: [GitHub Discussions](https://github.com/mohammadhossein-asadi/github-readme-studio/discussions)

---

<div align="center">

**Built with ❤️ for developers who write READMEs**

[🇬🇧 English](README.md) • [🇮🇷 فارسی](README.fa.md) • [⭐ Star us on GitHub](https://github.com/mohammadhossein-asadi/github-readme-studio)

</div>