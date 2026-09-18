import { createFileRoute } from "@tanstack/react-router";
import { Target, Briefcase, Car, Users, HeartHandshake } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About TakeOFF" },
      {
        name: "description",
        content: "TakeOFF connects customers with drivers for reliable transportation and delivery services.",
      },
      { property: "og:title", content: "About TakeOFF" },
      {
        property: "og:description",
        content: "Our mission, what we do, and the drivers and customers who make up the TakeOFF community.",
      },
    ],
  }),
  component: About,
});

const sections = [
  {
    icon: Target,
    title: "Our Mission",
    text: "To make everyday movement easier by connecting people who need rides and deliveries with drivers they can trust.",
  },
  {
    icon: Briefcase,
    title: "What We Do",
    text: "TakeOFF is a mobility and delivery platform. We match trip requests with verified drivers and keep every journey simple from request to drop-off.",
  },
  {
    icon: Car,
    title: "Drivers",
    text: "Drivers join TakeOFF to earn on their own schedule. We verify documents, support our drivers, and keep the platform fair and transparent.",
  },
  {
    icon: Users,
    title: "Customers",
    text: "Customers get a quick, reliable way to move themselves or their parcels, with clear pricing and real-time trip tracking.",
  },
  {
    icon: HeartHandshake,
    title: "Community",
    text: "We are building a local community of drivers, small businesses and customers who rely on each other every single day.",
  },
];

function About() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="About us"
        title="Connecting people, parcels and drivers."
        subtitle="TakeOFF is a transportation and delivery platform built for the way African cities actually move."
      />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {sections.map((s) => (
            <div key={s.title} className="rounded-2xl border border-border bg-card p-7 shadow-card">
              <div className="flex size-11 items-center justify-center rounded-xl bg-success/15 text-success">
                <s.icon className="size-5" />
              </div>
              <h2 className="mt-5 text-lg font-bold text-foreground">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
