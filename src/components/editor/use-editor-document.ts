"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  cortexSections,
  emptySectionBody,
} from "@/lib/mock/sections";
import { parseSectionsFromMarkdown, sectionsToMarkdown } from "@/lib/markdown";
import { useWorkspace } from "@/components/app-shell/workspace-provider";
import type { Section, VersionEntry } from "@/lib/types";
import type { DocStats } from "@/lib/markdown";

export type EditorMode = "sections" | "markdown";
export type PreviewWidth = "desktop" | "tablet" | "mobile";

const nextId = () => `sec_${Math.random().toString(36).slice(2, 9)}`;

function snapshot(label: string, summary: string, sections: Section[]): VersionEntry {
  return {
    id: `v_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 5)}`,
    label,
    summary,
    at: "just now",
    author: "Ava Lindqvist",
    sections: structuredClone(sections),
  };
}

/**
 * Owns the README document: section state, raw markdown, version history and
 * every mutation the UI can trigger.
 */
export function useEditorDocument() {
  const { pendingTemplate, setPendingTemplate } = useWorkspace();
  const [sections, setSections] = useState<Section[]>(() =>
    pendingTemplate
      ? structuredClone(pendingTemplate.sections)
      : structuredClone(cortexSections),
  );
  const [mode, setMode] = useState<EditorMode>("sections");
  const [raw, setRaw] = useState(() => sectionsToMarkdown(cortexSections));
  const [activeId, setActiveId] = useState<string | null>("sec_desc");
  const [versions, setVersions] = useState<VersionEntry[]>(() => [
    pendingTemplate
      ? snapshot(
          `Template: ${pendingTemplate.name}`,
          `${pendingTemplate.sections.length} sections applied from the gallery`,
          pendingTemplate.sections,
        )
      : snapshot("Generated from analysis", "12 sections drafted for acme/cortex", cortexSections),
  ]);

  // The pending template was consumed by the state initialisers above; drop it
  // so re-entering the editor does not re-apply an already-applied template.
  useEffect(() => {
    if (pendingTemplate) {
      setPendingTemplate(null);
    }
  }, [pendingTemplate, setPendingTemplate]);

  const markdown = useMemo(
    () => (mode === "markdown" ? raw : sectionsToMarkdown(sections)),
    [mode, raw, sections],
  );

  const stats: DocStats = useMemo(() => {
    const words = markdown.split(/\s+/).filter(Boolean).length;
    return {
      words,
      characters: markdown.length,
      readingMinutes: Math.max(1, Math.round(words / 220)),
      sections: sections.filter((section) => section.enabled).length,
    };
  }, [markdown, sections]);

  const pushVersion = useCallback(
    (label: string, summary: string, from?: Section[]) => {
      setVersions((current) => [
        snapshot(label, summary, from ?? sections),
        ...current,
      ]);
    },
    [sections],
  );

  const saveVersion = useCallback(
    (label = "Manual snapshot") => {
      pushVersion(label, `${sections.filter((s) => s.enabled).length} sections · ${stats.words} words`);
      toast.success("Version saved");
    },
    [pushVersion, sections, stats.words],
  );

  const revertTo = useCallback(
    (versionId: string) => {
      const target = versions.find((version) => version.id === versionId);
      if (!target) return;
      pushVersion("Before revert", `Restored “${target.label}”`);
      setSections(structuredClone(target.sections));
      toast.success(`Reverted to “${target.label}”`);
    },
    [pushVersion, versions],
  );

  const changeMode = useCallback(
    (next: EditorMode) => {
      if (next === mode) return;
      if (next === "markdown") {
        setRaw(sectionsToMarkdown(sections));
      } else {
        setSections(parseSectionsFromMarkdown(raw));
      }
      setMode(next);
    },
    [mode, sections, raw],
  );

  const patchSection = useCallback((id: string, patch: Partial<Section>) => {
    setSections((current) =>
      current.map((section) =>
        section.id === id ? { ...section, ...patch } : section,
      ),
    );
  }, []);

  const reorder = useCallback((next: Section[]) => {
    setSections(next);
  }, []);

  const moveSection = useCallback((id: string, direction: -1 | 1) => {
    setSections((current) => {
      const index = current.findIndex((section) => section.id === id);
      const target = index + direction;
      if (index < 0 || target < 0 || target >= current.length) return current;
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }, []);

  const deleteSection = useCallback(
    (id: string) => {
      setSections((current) => {
        const index = current.findIndex((section) => section.id === id);
        const removed = current[index];
        if (!removed) return current;
        const next = current.filter((section) => section.id !== id);
        toast(`Deleted “${removed.title}”`, {
          action: {
            label: "Undo",
            onClick: () =>
              setSections((latest) => {
                const restored = [...latest];
                restored.splice(index, 0, removed);
                return restored;
              }),
          },
        });
        return next;
      });
    },
    [],
  );

  const addSection = useCallback(
    (kind: Section["kind"], title: string, insertAt?: number) => {
      const section: Section = {
        id: nextId(),
        kind,
        title,
        content: emptySectionBody[kind] ?? emptySectionBody.custom,
        enabled: true,
      };
      setSections((current) => {
        const next = [...current];
        const index = insertAt ?? next.length;
        next.splice(Math.min(index, next.length), 0, section);
        return next;
      });
      setActiveId(section.id);
      toast.success(`Added “${title}” section`);
    },
    [],
  );

  /** Append a snippet to the active section (or the last enabled one). */
  const insertSnippet = useCallback(
    (snippet: string, label: string) => {
      if (mode === "markdown") {
        setRaw((current) => `${current.trimEnd()}\n\n${snippet}\n`);
        toast.success(`Inserted ${label}`);
        return;
      }
      const target =
        sections.find((section) => section.id === activeId) ??
        [...sections].reverse().find((section) => section.enabled) ??
        sections[sections.length - 1];
      if (!target) {
        toast.error("Add a section first", {
          description: "Snippets need somewhere to live.",
        });
        return;
      }
      setSections((current) =>
        current.map((section) =>
          section.id === target.id
            ? { ...section, content: `${section.content.trimEnd()}\n\n${snippet}` }
            : section,
        ),
      );
      setActiveId(target.id);
      toast.success(`Inserted ${label} into “${target.title}”`);
    },
    [activeId, mode, sections],
  );

  const setBadgeRow = useCallback(
    (badgeMarkdown: string) => {
      setSections((current) => {
        const existing = current.find((section) => section.kind === "badges");
        if (existing) {
          return current.map((section) =>
            section.id === existing.id
              ? { ...section, content: badgeMarkdown, enabled: true }
              : section,
          );
        }
        const heroIndex = current.findIndex((section) => section.kind === "hero");
        const created: Section = {
          id: nextId(),
          kind: "badges",
          title: "Badges",
          content: badgeMarkdown,
          enabled: true,
        };
        const next = [...current];
        next.splice(heroIndex + 1, 0, created);
        return next;
      });
      pushVersion("Badges updated", "Badge row regenerated from shields.io");
      toast.success("Badges inserted");
    },
    [pushVersion],
  );

  const focusSection = useCallback((id: string) => {
    setActiveId(id);
    // Both the desktop and the mobile pane are mounted; scroll the visible one.
    const candidates = Array.from(
      document.querySelectorAll<HTMLElement>(`[data-section-id="${id}"]`),
    );
    const target =
      candidates.find((element) => element.offsetParent !== null) ?? candidates[0];
    target?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, []);

  /** Jump from a preview heading back to the matching structured section. */
  const jumpToHeading = useCallback(
    (title: string) => {
      const match = sections.find(
        (section) => section.title.toLowerCase() === title.toLowerCase(),
      );
      if (match) {
        setMode("sections");
        requestAnimationFrame(() => focusSection(match.id));
      } else {
        toast("That heading only exists in the raw markdown", {
          description: "Switch to Markdown mode to edit it.",
        });
      }
    },
    [focusSection, sections],
  );

  return {
    sections,
    mode,
    raw,
    markdown,
    stats,
    activeId,
    versions,
    setActiveId,
    changeMode,
    setRaw,
    reorder,
    patchSection,
    moveSection,
    deleteSection,
    addSection,
    insertSnippet,
    setBadgeRow,
    saveVersion,
    revertTo,
    focusSection,
    jumpToHeading,
  };
}
