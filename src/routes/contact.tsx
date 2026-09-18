import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { LifeBuoy, Car, Building2, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact TakeOFF" },
      { name: "description", content: "Get in touch with TakeOFF support, driver support or our business team." },
      { property: "og:title", content: "Contact TakeOFF" },
      { property: "og:description", content: "Send us a message or reach support, driver support and business enquiries." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  message: z.string().trim().min(10, "Your message should be at least 10 characters").max(1000),
});

const cards = [
  { icon: LifeBuoy, title: "Support", text: "General help with your account or a trip.", email: "support@takeoff.co.zw" },
  { icon: Car, title: "Driver Support", text: "Onboarding, verification and earnings questions.", email: "drivers@takeoff.co.zw" },
  { icon: Building2, title: "Business Enquiries", text: "Partnerships and deliveries for your business.", email: "business@takeoff.co.zw" },
];

function Contact() {
  const [values, setValues] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(values);
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setSent(true);
    setValues({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <SiteLayout>
      <PageHeader eyebrow="Contact" title="We'd love to hear from you." subtitle="Send us a message and our team will respond within one working day." />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <form onSubmit={submit} noValidate className="rounded-2xl border border-border bg-card p-7 shadow-card">
            {sent && (
              <div className="mb-6 flex items-center gap-3 rounded-xl bg-success/10 p-4 text-sm font-medium text-success">
                <CheckCircle2 className="size-5" /> Thanks! Your message has been sent.
              </div>
            )}
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full Name" error={errors.name}>
                <Input value={values.name} onChange={set("name")} placeholder="Tanaka Moyo" />
              </Field>
              <Field label="Email" error={errors.email}>
                <Input type="email" value={values.email} onChange={set("email")} placeholder="you@email.com" />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Phone Number" error={errors.phone}>
                  <Input value={values.phone} onChange={set("phone")} placeholder="+263 77 000 0000" />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Message" error={errors.message}>
                  <Textarea rows={5} value={values.message} onChange={set("message")} placeholder="How can we help?" />
                </Field>
              </div>
            </div>
            <Button type="submit" variant="brand" size="lg" className="mt-7 w-full sm:w-auto">
              Send Message
            </Button>
          </form>

          <div className="space-y-5">
            {cards.map((c) => (
              <div key={c.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <c.icon className="size-5" />
                </div>
                <h3 className="mt-4 font-bold text-foreground">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.text}</p>
                <p className="mt-3 text-sm font-medium text-primary">{c.email}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}
