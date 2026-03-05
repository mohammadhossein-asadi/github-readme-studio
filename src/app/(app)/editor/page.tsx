import type { Metadata } from "next";
import { EditorWorkspace } from "@/components/editor/editor-workspace";

export const metadata: Metadata = {
  title: "README Editor",
  description:
    "Write and preview your README side by side with GitHub-flavoured markdown rendering.",
  alternates: { canonical: "/editor" },
  robots: { index: false, follow: false },
};

export default async function EditorPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const section = params.section;
  const sectionId = Array.isArray(section) ? section[0] : section;

  return <EditorWorkspace initialSectionId={sectionId} />;
}
