import {
  BookTemplate,
  LayoutDashboard,
  PenLine,
  Settings,
  Sparkles,
  GitFork,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  description: string;
  shortcut?: string;
};

export const primaryNav: NavItem[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    description: "Overview of your repositories and README health",
    shortcut: "d",
  },
  {
    href: "/repos",
    label: "My Repositories",
    icon: GitFork,
    description: "Connect GitHub and pick repositories to document",
    shortcut: "r",
  },
  {
    href: "/analyze",
    label: "Analyze",
    icon: Sparkles,
    description: "Run the stack and feature detection pipeline",
    shortcut: "a",
  },
  {
    href: "/editor",
    label: "README Editor",
    icon: PenLine,
    description: "Write and preview your README side by side",
    shortcut: "e",
  },
];

export const secondaryNav: NavItem[] = [
  {
    href: "/templates",
    label: "Templates",
    icon: BookTemplate,
    description: "Start from a professional section structure",
    shortcut: "t",
  },
  {
    href: "/settings",
    label: "Settings",
    icon: Settings,
    description: "Theme, GitHub connection and publishing defaults",
    shortcut: ",",
  },
];
