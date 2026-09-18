import { createFileRoute, Link } from "@tanstack/react-router";
import { Car, User } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — TakeOFF" },
      {
        name: "description",
        content: "See how TakeOFF works for drivers and for customers, from sign up to completed trip.",
      },
      { property: "og:title", content: "How It Works — TakeOFF" },
      {
        property: "og:description",
        content: "Register, get verified and start earning — or request a ride and track your trip.",
      },
    ],
  }),
  component: HowItWorks,
});

const driverSteps = [
  "Register your TakeOFF driver account.",
  "Submit your documents for verification.",
  "Get verified by the TakeOFF team.",
  "Start accepting rides and deliveries.",
  "Earn from every completed trip.",
];

const customerSteps = [
  "Request a ride or a delivery.",
  "Get matched with a nearby driver.",
  "Track your trip in real time.",
  "Complete your journey and rate your driver.",
];

function StepList({ icon: Icon, title, steps }: { icon: typeof Car; title: string; steps: string[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
      <div className="flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
          <Icon className="size-5" />
        </span>
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
      </div>
      <ol className="mt-7 space-y-5">
        {steps.map((s, i) => (
          <li key={s} className="flex gap-4">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-success text-sm font-bold text-success-foreground">
              {i + 1}
            </span>
            <p className="pt-1 text-sm text-muted-foreground">{s}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function HowItWorks() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="How it works"
        title="Simple for drivers. Simple for customers."
        subtitle="TakeOFF keeps both sides of the trip straightforward — no complicated steps, no hidden processes."
      />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          <StepList icon={Car} title="For Drivers" steps={driverSteps} />
          <StepList icon={User} title="For Customers" steps={customerSteps} />
        </div>
        <div className="mt-12 text-center">
          <Button asChild variant="brand" size="xl">
            <Link to="/drivers">Become a Driver</Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}
