import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://readme-studio.dev";
const DESCRIPTION =
  "Turn any GitHub repository into a polished, professional README.md in minutes. Analyze your stack, generate badges, sections and architecture diagrams, then publish straight back to the repo.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GitHub README Studio — professional READMEs in minutes",
    template: "%s · GitHub README Studio",
  },
  description: DESCRIPTION,
  applicationName: "GitHub README Studio",
  keywords: [
    "README generator",
    "GitHub",
    "markdown",
    "badges",
    "developer tools",
    "documentation",
  ],
  alternates: { canonical: "/" },
  // Social images come from app/opengraph-image.tsx so there is one source of
  // truth for og:image and twitter:image.
  openGraph: {
    type: "website",
    url: "/",
    siteName: "GitHub README Studio",
    title: "GitHub README Studio — professional READMEs in minutes",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "GitHub README Studio — professional READMEs in minutes",
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0e11" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-background text-foreground flex min-h-full flex-col font-sans">
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
