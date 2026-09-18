import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHeader({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <section className="border-b border-border bg-muted/60">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        {eyebrow && (
          <span className="inline-flex rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-foreground">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">{subtitle}</p>}
      </div>
    </section>
  );
}
