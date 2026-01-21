"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

/**
 * Theme system: class-based, persisted in localStorage, falls back to the
 * OS preference. `disableTransitionOnChange` avoids a paint flash when the
 * user toggles themes mid-interaction.
 */
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="readme-studio-theme"
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
