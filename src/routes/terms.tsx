import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — TakeOFF" },
      { name: "description", content: "The terms that apply when using the TakeOFF rides and delivery platform." },
      { property: "og:title", content: "Terms & Conditions — TakeOFF" },
      { property: "og:description", content: "Read the TakeOFF platform terms for drivers and customers." },
    ],
  }),
  component: Terms,
});

const clauses = [
  ["Using TakeOFF", "TakeOFF is a platform that connects customers with independent drivers for rides and deliveries."],
  ["Driver eligibility", "Drivers must be legally allowed to operate their vehicle and must supply accurate, valid documents."],
  ["Accounts", "You are responsible for keeping your account details accurate and your login secure."],
  ["Payments", "Earnings and fares are calculated per completed trip and shown in your driver dashboard."],
  ["Prototype notice", "This site is a student prototype. No real trips, payments or verifications take place."],
];

function Terms() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Legal" title="Terms & Conditions" subtitle="Last updated today." />
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
