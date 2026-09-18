import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — TakeOFF" },
      { name: "description", content: "How TakeOFF handles driver and customer information." },
      { property: "og:title", content: "Privacy Policy — TakeOFF" },
      { property: "og:description", content: "What we collect, why we collect it, and how your documents are used." },
    ],
  }),
  component: Privacy,
});

const clauses = [
  ["What we collect", "Contact details, vehicle details and verification documents supplied during driver onboarding."],
  ["Why we collect it", "To verify drivers, match trips and support customers and drivers on the platform."],
  ["Your documents", "Documents are used only for verification purposes and are never shared for marketing."],
  ["Your choices", "You may request a copy of your information or ask for your application to be removed at any time."],
  ["Prototype notice", "This site is a student prototype. Information entered here stays in your own browser."],
];

function Privacy() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Legal" title="Privacy Policy" subtitle="Last updated today." />
      <section className="mx-auto max-w-3xl space-y-8 px-4 py-16 sm:px-6">
        {clauses.map(([title, text], i) => (
          <div key={title}>
            <h2 className="text-lg font-bold text-foreground">
              {i + 1}. {title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
          </div>
        ))}
      </section>
    </SiteLayout>
  );
}
