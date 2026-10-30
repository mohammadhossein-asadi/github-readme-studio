# Project DNA — GitHub README Studio

## Project Identity

| Field | Value |
|-------|-------|
| **Project Name** | GitHub README Studio |
| **Repository** | `github-readme-studio` |
| **Type** | Web Application (Next.js 16) — GitHub Profile README Generator |
| **Primary Language** | TypeScript |
| **Package Manager** | npm |
| **Framework** | Next.js 16.3.8 (App Router) |
| **Styling** | Tailwind CSS v4 |
| **Editor** | CodeMirror 6 (@codemirror, @uiw/react-codemirror) |
| **UI Components** | Radix UI, shadcn/ui patterns |
| **Animation** | Motion (Framer Motion) 14 |

---

## Purpose & Problem Statement

**Problem**: Creating an attractive, well-structured GitHub profile README requires knowledge of Markdown, GitHub-flavored extensions, and design sense. Many developers struggle to create professional-looking profiles.

**Solution**: An interactive web-based editor for creating GitHub profile READMEs with live preview, templates, component library (stats cards, skill badges, project showcases, activity graphs), and one-click copy/deploy.

---

## Target Users

- **Primary**: Developers wanting to improve their GitHub profile
- **Secondary**: Open source maintainers creating project READMEs
- **Tertiary**: Students and junior developers learning Markdown

---

## Core Features (Detected from Structure)

| Feature | Status | Evidence |
|---------|--------|----------|
| Markdown Editor | ✅ Implemented | CodeMirror 6 with @codemirror/lang-markdown |
| Live Preview | ✅ Implemented | Split-pane editor/preview |
| Templates | ✅ Implemented | Template system in components |
| Component Library | ✅ Implemented | Stats, skills, projects, activity components |
| Export/Copy | ✅ Implemented | Copy to clipboard, download |
| GitHub Integration | ✅ Implemented | Direct deploy to profile |
| Dark/Light Theme | ✅ Implemented | next-themes + Radix UI |
| Responsive Design | ✅ Implemented | Tailwind CSS v4 |
| Animation | ✅ Implemented | Motion 14 |

---

## Technical Requirements

| Requirement | Detail |
|-------------|--------|
| **Runtime** | Node.js 20+, Next.js 16.3.8 |
| **Editor** | CodeMirror 6 (state, view, language, markdown) |
| **UI** | Radix UI primitives + Tailwind CSS v4 |
| **Animation** | Motion 14 (Framer Motion) |
| **Markdown** | react-markdown + rehype-raw + remark-gfm |
| **Type Checking** | TypeScript 5 (strict) |
| **Linting** | ESLint 9 + Next.js config |

---

## Functional Requirements

| ID | Requirement | Status |
|----|-------------|--------|
| FR-01 | Markdown editor with syntax highlighting | ✅ |
| FR-02 | Real-time preview pane | ✅ |
| FR-03 | Pre-built templates (minimal, detailed, creative) | ✅ |
| FR-04 | Drag-and-drop component builder | ✅ |
| FR-05 | GitHub stats integration (stars, followers, etc.) | ✅ |
| FR-06 | Skill badge generator | ✅ |
| FR-07 | Project showcase cards | ✅ |
| FR-08 | Activity graph / contribution calendar | ✅ |
| FR-09 | One-click copy to clipboard | ✅ |
| FR-10 | Download as .md file | ✅ |
| FR-11 | Deploy to GitHub profile (gist/repo) | ✅ |
| FR-12 | Dark/light theme toggle | ✅ |
| FR-13 | Responsive layout | ✅ |

---

## Non-Functional Requirements

| ID | Requirement | Status |
|----|-------------|--------|
| NFR-01 | Editor latency < 50ms | [NOT VERIFIED] |
| NFR-02 | Preview updates in real-time | [NOT VERIFIED] |
| NFR-03 | Works offline (PWA) | [NOT VERIFIED] |
| NFR-04 | Accessible editor (ARIA) | [NOT VERIFIED] |
| NFR-05 | Mobile-responsive | [NOT VERIFIED] |

---

## Business/Technical Objectives

- [ ] Launch public GitHub README Studio
- [ ] Add more templates (academic, designer, backend, frontend)
- [ ] Add AI-assisted content suggestions
- [ ] Community template marketplace
- [ ] GitHub Action for auto-updating stats
- [ ] VS Code extension
- [ ] Analytics for template popularity

---

## Known Limitations

1. **No backend/database** - All client-side, no persistence
2. **No user accounts** - Templates not saved across sessions
3. **GitHub API rate limits** - Stats fetching limited
4. **No collaborative editing** - Single user only
5. **Template library limited** - Need more variety

---

## Confirmed Decisions

| Decision | Rationale |
|----------|-----------|
| Next.js 16 App Router | Modern React, Server Components |
| CodeMirror 6 | Best-in-class extensible editor |
| Radix UI | Accessible, unstyled primitives |
| Tailwind CSS v4 | Performance, utility-first |
| Motion (Framer Motion) | Smooth animations |
| Client-side only | No backend needed, free hosting |

---

## Unknown Information / Needs Confirmation

| Question | Priority |
|----------|----------|
| Will user accounts be added for template saving? | HIGH |
| Is PWA/offline support planned? | MEDIUM |
| Will there be a template marketplace? | MEDIUM |
| Analytics for template usage? | LOW |

---

*Generated: 2026-10-30 | Stage 1 of 5 | [NEEDS CONFIRMATION] on unknowns*