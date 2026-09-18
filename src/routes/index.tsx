import { createFileRoute, Link } from "@tanstack/react-router";
import {
  UserPlus,
  ShieldCheck,
  Wallet,
  Clock,
  Package,
  Smartphone,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import heroImage from "@/assets/hero-driver.jpg";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TakeOFF — Move. Deliver. Earn." },
      {
        name: "description",
        content:
          "Join TakeOFF and connect with customers who need reliable rides and deliveries. Sign up, get verified and start earning.",
      },
      { property: "og:title", content: "TakeOFF — Move. Deliver. Earn." },
      {
        property: "og:description",
        content: "Drive with TakeOFF: flexible hours, rides and deliveries, and a simple driver platform.",
      },
    ],
  }),
  component: Index,
});

const steps = [
  { icon: UserPlus, title: "Sign Up", text: "Create your TakeOFF driver account." },
  { icon: ShieldCheck, title: "Get Verified", text: "Submit your required information and documents." },
  { icon: Wallet, title: "Start Earning", text: "Once approved, start accepting rides and deliveries." },
];

const benefits = [
  { icon: Clock, title: "Flexible working hours", text: "Drive when it suits you — mornings, evenings or weekends." },
  { icon: Package, title: "Earn from rides and deliveries", text: "One account, two ways to make money every day." },
  { icon: Smartphone, title: "Easy-to-use driver platform", text: "Simple tools built for real roads and real drivers." },
  { icon: TrendingUp, title: "Grow your income", text: "Build a reputation, get more trips and earn more." },
];

function Index() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "var(--brand-gradient)" }}>
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
          <div className="text-primary-foreground">
            <span className="inline-flex rounded-full bg-success/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-success">
              Rides &amp; Deliveries
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
              Move. Deliver. <span className="text-success">Earn</span> with TakeOFF.
            </h1>
            <p className="mt-5 max-w-lg text-base text-primary-foreground/80 md:text-lg">
              Join TakeOFF and connect with customers who need reliable rides and deliveries.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="brand" size="xl">
                <Link to="/drivers">
                  Become a Driver <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="hero" size="xl">
                <Link to="/how-it-works">Explore TakeOFF</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl bg-background/95 p-3 shadow-2xl">
              <img
                src={heroImage}
                alt="TakeOFF driver on a motorcycle making a delivery in the city"
                width={1280}
                height={1024}
                className="h-auto w-full rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">How TakeOFF Works</h2>
          <p className="mt-3 text-muted-foreground">Three simple steps between you and your first trip.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="rounded-2xl border border-border bg-card p-7 shadow-card transition-transform hover:-translate-y-1"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <s.icon className="size-6" />
              </div>
              <span className="mt-6 block text-xs font-semibold uppercase tracking-wide text-success">
                Step {i + 1}
              </span>
              <h3 className="mt-1 text-lg font-bold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-muted/60 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            Why Drive With TakeOFF?
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="flex size-11 items-center justify-center rounded-xl bg-success/15 text-success">
                  <b.icon className="size-5" />
                </div>
                <h3 className="mt-5 text-base font-bold text-foreground">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div
          className="rounded-3xl px-6 py-14 text-center text-primary-foreground md:px-16"
          style={{ background: "var(--brand-gradient)" }}
        >
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">Ready to start earning?</h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
            Join TakeOFF as a driver and become part of a growing mobility and delivery community.
          </p>
          <Button asChild variant="brand" size="xl" className="mt-8">
            <Link to="/drivers">
              Start Driver Registration <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}
