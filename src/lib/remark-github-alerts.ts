type Node = {
  type: string;
  value?: string;
  children?: Node[];
  data?: Record<string, unknown>;
};

const ALERTS = {
  NOTE: "Note",
  TIP: "Tip",
  IMPORTANT: "Important",
  WARNING: "Warning",
  CAUTION: "Caution",
} as const;

const PATTERN = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*\n?/;

function walk(node: Node) {
  if (!node.children) return;
  for (const child of node.children) {
    if (child.type === "blockquote") {
      convert(child);
    }
    walk(child);
  }
}

/**
 * GitHub renders `> [!NOTE]` blockquotes as tinted callouts. mdasat has no
 * plugin for that by default, so we rewrite the first paragraph in place and
 * tag the blockquote with a data attribute the stylesheet can target.
 */
function convert(blockquote: Node) {
  const first = blockquote.children?.[0];
  if (!first || first.type !== "paragraph" || !first.children?.length) return;

  const firstText = first.children[0];
  if (firstText.type !== "text" || typeof firstText.value !== "string") return;

  const match = PATTERN.exec(firstText.value);
  if (!match) return;

  const kind = match[1] as keyof typeof ALERTS;
  firstText.value = firstText.value.slice(match[0].length).trimStart();

  // Drop the now-empty paragraph if the alert has no body text.
  if (!firstText.value) first.children.shift();
  if (first.children.length === 0) blockquote.children?.shift();

  blockquote.children?.unshift({
    type: "paragraph",
    data: { hProperties: { className: ["md-alert-title"] } },
    children: [{ type: "text", value: ALERTS[kind] }],
  });

  blockquote.data = {
    ...(blockquote.data ?? {}),
    hProperties: { className: ["md-alert"], "data-alert": kind.toLowerCase() },
  };
}

export function remarkGithubAlerts() {
  return (tree: Node) => walk(tree);
}
