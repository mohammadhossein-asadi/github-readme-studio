import type { Metadata } from "next";
import { Hero, HowItWorks } from "@/components/landing/hero";
import { SiteFooter, SiteHeader } from "@/components/landing/site-chrome";
import {
  BeforeAfter,
  CtaBand,
  Faq,
  FeatureGrid,
  Pricing,
} from "@/components/landing/marketing-sections";

export const metadata: Metadata = {
  title: "Professional GitHub READMEs in minutes",
  description:
    "README Studio analyzes your stack, features and workflows, then writes a professional README.md with badges, architecture diagrams and copy-pasteable examples.",
  alternates: { canonical: "/" },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "GitHub README Studio",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  description:
    "Generates professional GitHub README files from an analysis of your repository's stack, features and workflows.",
  offers: [
    { "@type": "Offer", price: "0", priceCurrency: "USD", name: "Free" },
    { "@type": "Offer", price: "24", priceCurrency: "USD", name: "Team" },
  ],
};

export default function LandingPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main-content"
        className="bg-primary text-primary-foreground sr-only rounded-md px-3 py-2 text-sm focus:not-sr-only focus:absolute focus:top-3 focus:left-3 z-tooltip"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <Hero />
        <HowItWorks />
        <FeatureGrid />
        <BeforeAfter />
        <Pricing />
        <Faq />
        <CtaBand />
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        // Structured data mirrors the pricing and product copy rendered above.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </div>
  );
}
