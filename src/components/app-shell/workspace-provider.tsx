"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getRepo, mockRepos } from "@/lib/mock/repos";
import type { Repo, Section } from "@/lib/types";

const STORAGE_KEY = "readme-studio:repo";

export type PendingTemplate = {
  id: string;
  name: string;
  sections: Section[];
};

type WorkspaceValue = {
  repo: Repo;
  repoId: string;
  repos: Repo[];
  setRepoId: (id: string) => void;
  /** Extra repositories queued for batch generation. */
  queued: string[];
  toggleQueued: (id: string) => void;
  /** Template chosen in the gallery, applied by the editor on next mount. */
  pendingTemplate: PendingTemplate | null;
  setPendingTemplate: (template: PendingTemplate | null) => void;
};

const WorkspaceContext = createContext<WorkspaceValue | null>(null);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [repoId, setRepoIdState] = useState(() => getRepo(null).id);
  const [queued, setQueued] = useState<string[]>(["r_orbit"]);
  const [pendingTemplate, setPendingTemplate] = useState<PendingTemplate | null>(null);

  // Restore the last chosen repository after mount so SSR stays deterministic.
  // This is a one-time read from an external system (localStorage).
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && mockRepos.some((repo) => repo.id === stored)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRepoIdState(stored);
    }
  }, []);

  const setRepoId = useCallback((id: string) => {
    setRepoIdState(id);
    window.localStorage.setItem(STORAGE_KEY, id);
  }, []);

  const toggleQueued = useCallback((id: string) => {
    setQueued((current) =>
      current.includes(id)
        ? current.filter((entry) => entry !== id)
        : [...current, id],
    );
  }, []);

  const value = useMemo<WorkspaceValue>(
    () => ({
      repo: getRepo(repoId),
      repoId,
      repos: mockRepos,
      setRepoId,
      queued,
      toggleQueued,
      pendingTemplate,
      setPendingTemplate,
    }),
    [repoId, setRepoId, queued, toggleQueued, pendingTemplate],
  );

  return <WorkspaceContext value={value}>{children}</WorkspaceContext>;
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used inside <WorkspaceProvider>");
  }
  return context;
}
