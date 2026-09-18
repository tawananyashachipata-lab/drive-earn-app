import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  User,
  FileText,
  ClipboardCheck,
  Wallet,
  LifeBuoy,
  LogOut,
  Check,
  Clock,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DOC_LABELS,
  clearApplication,
  loadApplication,
  type DriverApplication,
} from "@/lib/driver-application";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Driver Dashboard — TakeOFF" },
      { name: "description", content: "Track your TakeOFF driver application status, documents, profile and earnings." },
      { property: "og:title", content: "Driver Dashboard — TakeOFF" },
      { property: "og:description", content: "See your verification progress and application timeline." },
    ],
  }),
  component: Dashboard,
});

const NAV = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "profile", label: "My Profile", icon: User },
  { key: "documents", label: "Documents", icon: FileText },
  { key: "status", label: "Application Status", icon: ClipboardCheck },
  { key: "earnings", label: "Earnings", icon: Wallet },
  { key: "help", label: "Help", icon: LifeBuoy },
] as const;

type NavKey = (typeof NAV)[number]["key"];

const TIMELINE = ["Application Submitted", "Documents Reviewed", "Approved", "Ready to Drive"];

function Dashboard() {
  const navigate = useNavigate();
  const [app, setApp] = useState<DriverApplication | null>(null);
  const [active, setActive] = useState<NavKey>("dashboard");
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    setApp(loadApplication());
  }, []);

  const docCount = app ? Object.keys(app.documents).length : 0;

  if (!app) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/50 px-4">
        <div className="max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-card">
          <h1 className="text-xl font-bold text-foreground">No driver application yet</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Complete the driver registration to unlock your TakeOFF dashboard.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild variant="outline">
              <Link to="/">Back to Home</Link>
            </Button>
            <Button asChild variant="brand">
              <Link to="/drivers">Start Registration</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const sidebar = (
    <nav className="space-y-1">
      {NAV.map((item) => (
        <button
          key={item.key}
          onClick={() => {
            setActive(item.key);
            setNavOpen(false);
          }}
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
            active === item.key
              ? "bg-primary-foreground/15 text-primary-foreground"
              : "text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground"
          }`}
        >
          <item.icon className="size-4" /> {item.label}
        </button>
      ))}
      <button
        onClick={() => {
          clearApplication();
          navigate({ to: "/" });
        }}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-primary-foreground/70 transition-colors hover:bg-destructive/20 hover:text-primary-foreground"
      >
        <LogOut className="size-4" /> Logout
      </button>
    </nav>
  );

  return (
    <div className="flex min-h-screen flex-col bg-muted/40 lg:flex-row">
      <aside className="hidden w-64 shrink-0 bg-primary p-5 lg:block">
        <Link to="/" className="mb-8 block text-lg font-extrabold text-primary-foreground">
          Take<span className="text-success">OFF</span>
        </Link>
        {sidebar}
      </aside>

      <div className="bg-primary p-4 lg:hidden">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-lg font-extrabold text-primary-foreground">
            Take<span className="text-success">OFF</span>
          </Link>
          <button
            onClick={() => setNavOpen((v) => !v)}
            aria-label="Toggle dashboard menu"
            className="flex size-9 items-center justify-center rounded-lg bg-primary-foreground/10 text-primary-foreground"
          >
            <Menu className="size-5" />
          </button>
        </div>
        {navOpen && <div className="mt-4">{sidebar}</div>}
      </div>

      <main className="flex-1 p-5 md:p-10">
        <header>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">
            Welcome, {app.personal.firstName}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Application {app.applicationId} · submitted {new Date(app.submittedAt).toLocaleDateString()}
          </p>
        </header>

        {active === "dashboard" || active === "status" ? (
          <>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard label="Application Status" value="Pending Verification" tone="amber" />
              <StatCard label="Documents" value={`${docCount}/4 Submitted`} tone="green" />
              <StatCard label="Profile" value="Complete" tone="green" />
              <StatCard label="Earnings" value="$0.00" tone="plain" />
            </div>

            <section className="mt-8 rounded-2xl border border-border bg-card p-7 shadow-card">
              <h2 className="text-lg font-bold text-foreground">Verification timeline</h2>
              <ol className="mt-7 space-y-6">
                {TIMELINE.map((t, i) => {
                  const done = i === 0;
                  const current = i === 1;
                  return (
                    <li key={t} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <span
                          className={`flex size-8 items-center justify-center rounded-full ${
                            done
                              ? "bg-success text-success-foreground"
                              : current
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {done ? <Check className="size-4" /> : <Clock className="size-4" />}
                        </span>
                        {i < TIMELINE.length - 1 && <span className="mt-1 h-8 w-px bg-border" />}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{t}</p>
                        <p className="text-sm text-muted-foreground">
                          {done ? "Completed" : current ? "In progress" : "Waiting"}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>
          </>
        ) : null}

        {active === "profile" && (
          <Panel title="My Profile">
            <Row label="Name" value={`${app.personal.firstName} ${app.personal.lastName}`} />
            <Row label="Phone" value={app.personal.phone} />
            <Row label="Email" value={app.personal.email} />
            <Row label="City" value={app.personal.city} />
            <Row label="Address" value={app.personal.address} />
            <Row label="Vehicle" value={`${app.vehicle.make} ${app.vehicle.model} (${app.vehicle.year})`} />
            <Row label="Registration" value={app.vehicle.registration} />
          </Panel>
        )}

        {active === "documents" && (
          <Panel title="Documents">
            {(Object.keys(DOC_LABELS) as Array<keyof typeof DOC_LABELS>).map((k) => (
              <Row key={k} label={DOC_LABELS[k]} value={app.documents[k]?.name ?? "Not uploaded"} />
            ))}
          </Panel>
        )}

        {active === "earnings" && (
          <Panel title="Earnings">
            <p className="py-4 text-sm text-muted-foreground">
              You'll start earning once your application is approved. Current balance: <strong>$0.00</strong>
            </p>
          </Panel>
        )}

        {active === "help" && (
          <Panel title="Help">
            <p className="py-4 text-sm text-muted-foreground">
              Need a hand? Reach our driver support team any time.
            </p>
            <Button asChild variant="brand">
              <Link to="/contact">Contact Support</Link>
            </Button>
          </Panel>
        )}
      </main>
    </div>
  );
}

function StatCard({ label, value, tone }: { label: string; value: string; tone: "green" | "amber" | "plain" }) {
  const toneClass =
    tone === "green"
      ? "text-success"
      : tone === "amber"
        ? "text-[oklch(0.65_0.16_70)]"
        : "text-foreground";
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className={`mt-3 text-lg font-bold ${toneClass}`}>{value}</p>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 rounded-2xl border border-border bg-card p-7 shadow-card">
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <div className="mt-4 divide-y divide-border">{children}</div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 py-2.5">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  );
}
