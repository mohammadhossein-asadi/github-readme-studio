"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * Returns false during SSR and the first client render, then true.
 *
 * Uses useSyncExternalStore rather than a `useEffect(() => setMounted(true))`
 * so the hydration-safe branch never causes a cascading render.
 */
export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
