# Project DNA — GitHub README Studio

## Project Identity

| Field | Value |
|-------|-------|
| **Project Name** | GitHub README Studio |
| **Repository** | `github-readme-studio` |
| **Type** | Web Application (Next.js) |
| **Primary Language** | TypeScript |
| **Package Manager** | npm |

---

## Purpose & Problem Statement

**Problem**: Developers and open-source maintainers struggle to create professional, visually appealing GitHub READMEs without design skills or knowledge of Markdown best practices.

**Solution**: A modern web application for creating, previewing, and generating professional GitHub READMEs with AI assistance, design templates, and Persian/RTL support.

---

## Target Users

- **Primary**: Open-source maintainers and developers wanting professional READMEs
- **Secondary**: Designers and marketing teams creating brand-consistent documentation
- **Tertiary**: Educators teaching GitHub portfolio best practices

---

## Core Features (Implemented)

| Feature | Status | Description |
|---------|--------|-------------|
| AI-Powered Content | ✅ Integrated | GPT-assisted README generation |
| Design Templates | ✅ Implemented | 20+ professionally designed templates |
| Live Preview | ✅ Implemented | Real-time preview with diff view |
| Persian Localization | ✅ Implemented | RTL support, Vazirmatn font |
| Component Library | ✅ Implemented | Codemirror integration, color picker |
| Template Variables | ✅ Implemented | Dynamic placeholder replacement |

---

## Technical Requirements

| Requirement | Detail |
|-------------|--------|
| **Runtime** | Node.js 20+, Next.js 16+ |
| **UI Library** | shadcn/ui + Radix UI |
| **Code Editor** | @codemirror/react |
| **State Management** | React Query + SWR |
| **Database** | PostgreSQL via Prisma ORM |