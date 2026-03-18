"use client";

import { useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { EditorView } from "@codemirror/view";
import { tags as t } from "@lezer/highlight";
import { useTheme } from "next-themes";

const baseTheme = EditorView.theme({
  "&": {
    backgroundColor: "transparent",
    color: "var(--foreground)",
    fontSize: "13px",
    height: "100%",
  },
  ".cm-scroller": {
    fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
    lineHeight: "1.7",
  },
  ".cm-content": { padding: "12px 0", caretColor: "var(--primary)" },
  ".cm-gutters": {
    backgroundColor: "var(--editor-gutter)",
    color: "var(--muted-foreground)",
    border: "none",
    borderRight: "1px solid var(--border)",
    paddingRight: "4px",
  },
  ".cm-activeLine": {
    backgroundColor: "color-mix(in oklab, var(--muted) 55%, transparent)",
  },
  ".cm-activeLineGutter": {
    backgroundColor: "color-mix(in oklab, var(--muted) 70%, transparent)",
  },
  ".cm-selectionBackground, .cm-content ::selection": {
    backgroundColor: "color-mix(in oklab, var(--primary) 24%, transparent) !important",
  },
  "&.cm-focused": { outline: "none" },
  ".cm-cursor": { borderLeftColor: "var(--primary)" },
});

const lightHighlight = HighlightStyle.define([
  { tag: t.heading, color: "#4f46e5", fontWeight: "600" },
  { tag: t.strong, color: "#16161a", fontWeight: "600" },
  { tag: t.emphasis, color: "#3730a3", fontStyle: "italic" },
  { tag: t.link, color: "#1d4ed8", textDecoration: "underline" },
  { tag: t.url, color: "#0e7490" },
  { tag: t.monospace, color: "#b45309" },
  { tag: t.list, color: "#15803d" },
  { tag: t.quote, color: "#63636b", fontStyle: "italic" },
  { tag: t.comment, color: "#8a8a94" },
]);

const darkHighlight = HighlightStyle.define([
  { tag: t.heading, color: "#c7c2ff", fontWeight: "600" },
  { tag: t.strong, color: "#ededf0", fontWeight: "600" },
  { tag: t.emphasis, color: "#c7c2ff", fontStyle: "italic" },
  { tag: t.link, color: "#7aa2ff", textDecoration: "underline" },
  { tag: t.url, color: "#38bdf8" },
  { tag: t.monospace, color: "#fbbf24" },
  { tag: t.list, color: "#4ade80" },
  { tag: t.quote, color: "#9a9aa6", fontStyle: "italic" },
  { tag: t.comment, color: "#7c7c88" },
]);

export function MarkdownCodeEditor({
  value,
  onChange,
  label = "Markdown source",
}: {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}) {
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";

  const extensions = useMemo(
    () => [
      markdown({ base: markdownLanguage, codeLanguages: languages }),
      baseTheme,
      syntaxHighlighting(dark ? darkHighlight : lightHighlight),
      EditorView.contentAttributes.of({ "aria-label": label }),
      EditorView.lineWrapping,
    ],
    [dark, label],
  );

  return (
    <div className="h-full min-h-0 overflow-hidden">
      <CodeMirror
        value={value}
        onChange={onChange}
        height="100%"
        extensions={extensions}
        basicSetup={{
          lineNumbers: true,
          foldGutter: false,
          highlightActiveLine: true,
          highlightActiveLineGutter: true,
          autocompletion: false,
          bracketMatching: false,
          closeBrackets: false,
          searchKeymap: true,
        }}
        className="h-full [&_.cm-editor]:h-full"
      />
    </div>
  );
}
