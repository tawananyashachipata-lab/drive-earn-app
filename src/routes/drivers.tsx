import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check, CheckCircle2, ArrowLeft, ArrowRight, ShieldCheck, Pencil } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { DocumentUploadCard } from "@/components/driver/DocumentUploadCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DOC_LABELS,
  emptyPersonal,
  emptyVehicle,
  generateApplicationId,
  saveApplication,
  type DocKey,
  type PersonalInfo,
  type UploadedDoc,
  type VehicleInfo,
} from "@/lib/driver-application";

export const Route = createFileRoute("/drivers")({
  head: () => ({
    meta: [
      { title: "Become a TakeOFF Driver" },
      {
        name: "description",
        content: "Register as a TakeOFF driver in five simple steps: personal details, vehicle, documents, review and submit.",
      },
      { property: "og:title", content: "Become a TakeOFF Driver" },
      { property: "og:description", content: "Flexible hours, rides and deliveries. Start your driver registration today." },
    ],
  }),
  component: DriverOnboarding,
});

const STEPS = [
  "Personal Information",
  "Vehicle Information",
  "Documents",
  "Review",
  "Submitted",
];

const CITIES = ["Harare", "Bulawayo", "Mutare", "Gweru", "Other"];
const VEHICLE_TYPES = ["Car", "Motorcycle", "Van", "Truck"];
const DOC_KEYS: DocKey[] = ["licence", "nationalId", "vehicleReg", "insurance"];

type Errors = Record<string, string>;

function DriverOnboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [personal, setPersonal] = useState<PersonalInfo>(emptyPersonal);
  const [vehicle, setVehicle] = useState<VehicleInfo>(emptyVehicle);
  const [documents, setDocuments] = useState<Partial<Record<DocKey, UploadedDoc>>>({});
  const [confirmAccurate, setConfirmAccurate] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [applicationId, setApplicationId] = useState("");

  const setP = (k: keyof PersonalInfo, v: string) => setPersonal((p) => ({ ...p, [k]: v }));
  const setV = (k: keyof VehicleInfo, v: string | boolean) => setVehicle((p) => ({ ...p, [k]: v }));

  const validatePersonal = () => {
    const e: Errors = {};
    if (!personal.firstName.trim()) e["firstName"] = "First name is required";
    if (!personal.lastName.trim()) e["lastName"] = "Last name is required";
    if (!/^[+\d][\d\s-]{6,}$/.test(personal.phone.trim())) e["phone"] = "Enter a valid phone number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personal.email.trim())) e["email"] = "Enter a valid email address";
    if (!personal.dob) e["dob"] = "Date of birth is required";
    if (!personal.address.trim()) e["address"] = "Residential address is required";
    if (!personal.city) e["city"] = "Please select your city";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateVehicle = () => {
    const e: Errors = {};
    if (!vehicle.type) e["type"] = "Select your vehicle type";
    if (!vehicle.make.trim()) e["make"] = "Vehicle make is required";
    if (!vehicle.model.trim()) e["model"] = "Vehicle model is required";
    const year = Number(vehicle.year);
    if (!vehicle.year || Number.isNaN(year) || year < 1980 || year > new Date().getFullYear() + 1)
      e["year"] = "Enter a valid vehicle year";
    if (!vehicle.registration.trim()) e["registration"] = "Registration number is required";
    if (!vehicle.color.trim()) e["color"] = "Vehicle colour is required";
    if (!vehicle.confirmed) e["confirmed"] = "You must confirm you can legally operate this vehicle";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateDocuments = () => {
    const e: Errors = {};
    for (const k of DOC_KEYS) if (!documents[k]) e[k] = `${DOC_LABELS[k]} is required`;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    const ok = step === 0 ? validatePersonal() : step === 1 ? validateVehicle() : step === 2 ? validateDocuments() : true;
    if (!ok) return;
    setErrors({});
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const back = () => {
    setErrors({});
    setStep((s) => Math.max(0, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = () => {
    if (!confirmAccurate) {
      setErrors({ confirmAccurate: "Please confirm your information is accurate" });
      return;
    }
    const id = generateApplicationId();
    setApplicationId(id);
    saveApplication({
      applicationId: id,
      submittedAt: new Date().toISOString(),
      personal,
      vehicle,
      documents,
    });
    setErrors({});
    setStep(4);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <SiteLayout>
      <section className="border-b border-border bg-muted/60">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            Become a TakeOFF Driver
          </h1>
          <p className="mt-3 text-muted-foreground">
            It takes about five minutes. Your progress is saved on this device.
          </p>
          <Stepper step={step} />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card md:p-9">
          {step === 0 && (
            <div>
              <h2 className="text-xl font-bold text-foreground">Personal Information</h2>
              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <Field label="First Name" error={errors["firstName"]}>
                  <Input value={personal.firstName} onChange={(e) => setP("firstName", e.target.value)} placeholder="Tanaka" />
                </Field>
                <Field label="Last Name" error={errors["lastName"]}>
                  <Input value={personal.lastName} onChange={(e) => setP("lastName", e.target.value)} placeholder="Moyo" />
                </Field>
                <Field label="Phone Number" error={errors["phone"]}>
                  <Input value={personal.phone} onChange={(e) => setP("phone", e.target.value)} placeholder="+263 77 000 0000" />
                </Field>
                <Field label="Email Address" error={errors["email"]}>
                  <Input type="email" value={personal.email} onChange={(e) => setP("email", e.target.value)} placeholder="you@email.com" />
                </Field>
                <Field label="Date of Birth" error={errors["dob"]}>
                  <Input type="date" value={personal.dob} onChange={(e) => setP("dob", e.target.value)} />
                </Field>
                <Field label="City" error={errors["city"]}>
                  <select
                    value={personal.city}
                    onChange={(e) => setP("city", e.target.value)}
                    className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="">Select a city</option>
                    {CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Residential Address" error={errors["address"]}>
                    <Input value={personal.address} onChange={(e) => setP("address", e.target.value)} placeholder="123 Samora Machel Ave" />
                  </Field>
                </div>
              </div>
              <div className="mt-9 flex justify-end">
                <Button variant="brand" size="lg" onClick={next}>
                  Continue <ArrowRight />
                </Button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-foreground">Tell us about your vehicle</h2>
              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <Field label="Vehicle Type" error={errors["type"]}>
                  <select
                    value={vehicle.type}
                    onChange={(e) => setV("type", e.target.value)}
                    className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="">Select a type</option>
                    {VEHICLE_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Vehicle Make" error={errors["make"]}>
                  <Input value={vehicle.make} onChange={(e) => setV("make", e.target.value)} placeholder="Toyota" />
                </Field>
                <Field label="Vehicle Model" error={errors["model"]}>
                  <Input value={vehicle.model} onChange={(e) => setV("model", e.target.value)} placeholder="Aqua" />
                </Field>
                <Field label="Vehicle Year" error={errors["year"]}>
                  <Input value={vehicle.year} onChange={(e) => setV("year", e.target.value)} placeholder="2016" inputMode="numeric" />
                </Field>
                <Field label="Registration Number" error={errors["registration"]}>
                  <Input value={vehicle.registration} onChange={(e) => setV("registration", e.target.value)} placeholder="ABC 1234" />
                </Field>
                <Field label="Vehicle Color" error={errors["color"]}>
                  <Input value={vehicle.color} onChange={(e) => setV("color", e.target.value)} placeholder="Silver" />
                </Field>
              </div>

              <label className="mt-7 flex cursor-pointer items-start gap-3 rounded-xl bg-muted/70 p-4">
                <input
                  type="checkbox"
                  checked={vehicle.confirmed}
                  onChange={(e) => setV("confirmed", e.target.checked)}
                  className="mt-0.5 size-4 accent-[oklch(0.63_0.17_148)]"
                />
                <span className="text-sm text-foreground">
                  I confirm that I am legally allowed to operate this vehicle.
                </span>
              </label>
              {errors["confirmed"] && <p className="mt-2 text-xs font-medium text-destructive">{errors["confirmed"]}</p>}

              <StepNav onBack={back} onNext={next} />
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-foreground">Upload your documents</h2>
              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                {DOC_KEYS.map((k) => (
                  <div key={k}>
                    <DocumentUploadCard
                      label={DOC_LABELS[k]}
                      doc={documents[k]}
                      onUpload={(file) =>
                        setDocuments((d) => ({
                          ...d,
                          [k]: { name: file.name, size: file.size, uploadedAt: new Date().toISOString() },
                        }))
                      }
                      onRemove={() =>
                        setDocuments((d) => {
                          const next = { ...d };
                          delete next[k];
                          return next;
                        })
                      }
                    />
                    {errors[k] && <p className="mt-2 text-xs font-medium text-destructive">{errors[k]}</p>}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-3 rounded-xl bg-accent/70 p-4 text-sm text-accent-foreground">
                <ShieldCheck className="size-5 shrink-0" />
                Your documents will only be used for verification purposes.
              </div>
              <StepNav onBack={back} onNext={next} />
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-foreground">Review your application</h2>

              <ReviewSection title="Personal Information" onEdit={() => setStep(0)}>
                <Row label="Name" value={`${personal.firstName} ${personal.lastName}`} />
                <Row label="Phone" value={personal.phone} />
                <Row label="Email" value={personal.email} />
                <Row label="Date of Birth" value={personal.dob} />
                <Row label="Address" value={personal.address} />
                <Row label="City" value={personal.city} />
              </ReviewSection>

              <ReviewSection title="Vehicle Information" onEdit={() => setStep(1)}>
                <Row label="Type" value={vehicle.type} />
                <Row label="Make" value={vehicle.make} />
                <Row label="Model" value={vehicle.model} />
                <Row label="Year" value={vehicle.year} />
                <Row label="Registration" value={vehicle.registration} />
                <Row label="Colour" value={vehicle.color} />
              </ReviewSection>

              <ReviewSection title="Documents" onEdit={() => setStep(2)}>
                {DOC_KEYS.map((k) => (
                  <div key={k} className="flex flex-wrap items-center justify-between gap-2 py-1.5">
                    <span className="text-sm text-muted-foreground">{DOC_LABELS[k]}</span>
                    <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                      {documents[k]?.name ?? "—"}
                      <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-xs font-semibold text-success">
                        <Check className="size-3" /> Pending verification
                      </span>
                    </span>
                  </div>
                ))}
              </ReviewSection>

              <label className="mt-7 flex cursor-pointer items-start gap-3 rounded-xl bg-muted/70 p-4">
                <input
                  type="checkbox"
                  checked={confirmAccurate}
                  onChange={(e) => setConfirmAccurate(e.target.checked)}
                  className="mt-0.5 size-4 accent-[oklch(0.63_0.17_148)]"
                />
                <span className="text-sm text-foreground">
                  I confirm that the information I provided is accurate and complete.
                </span>
              </label>
              {errors["confirmAccurate"] && (
                <p className="mt-2 text-xs font-medium text-destructive">{errors["confirmAccurate"]}</p>
              )}

              <div className="mt-9 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <Button variant="outline" size="lg" onClick={back}>
                  <ArrowLeft /> Back
                </Button>
                <Button variant="brand" size="lg" onClick={submit}>
                  Submit Application
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="py-6 text-center">
              <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-success/15 text-success">
                <CheckCircle2 className="size-11" />
              </div>
              <h2 className="mt-6 text-2xl font-extrabold text-foreground md:text-3xl">Application Submitted!</h2>
              <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground">
                Thank you for applying to become a TakeOFF driver. Our team will review your application and contact
                you once your verification is complete.
              </p>
              <div className="mx-auto mt-7 inline-flex flex-col rounded-xl bg-muted px-6 py-4">
                <span className="text-xs uppercase tracking-wide text-muted-foreground">Application ID</span>
                <span className="text-lg font-bold text-foreground">{applicationId}</span>
              </div>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild variant="outline" size="lg">
                  <Link to="/">Back to Home</Link>
                </Button>
                <Button variant="brand" size="lg" onClick={() => navigate({ to: "/dashboard" })}>
                  View Application Status
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

function Stepper({ step }: { step: number }) {
  return (
    <ol className="mt-8 grid gap-3 sm:grid-cols-5">
      {STEPS.map((label, i) => {
        const done = i < step;
        const active = i === step;
        return (
          <li key={label} className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-2">
            <span
              className={`flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                done
                  ? "bg-success text-success-foreground"
                  : active
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground ring-1 ring-border"
              }`}
            >
              {done ? <Check className="size-4" /> : i + 1}
            </span>
            <div className="sm:w-full">
              <span
                className={`block text-xs font-semibold ${
                  done ? "text-success" : active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Step {i + 1}
              </span>
              <span className={`text-sm ${active ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                {label}
              </span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function StepNav({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <div className="mt-9 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
      <Button variant="outline" size="lg" onClick={onBack}>
        <ArrowLeft /> Back
      </Button>
      <Button variant="brand" size="lg" onClick={onNext}>
        Continue <ArrowRight />
      </Button>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}

function ReviewSection({
  title,
  onEdit,
  children,
}: {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-7 rounded-2xl border border-border p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-foreground">{title}</h3>
        <Button variant="ghost" size="sm" onClick={onEdit}>
          <Pencil /> Edit
        </Button>
      </div>
      <div className="mt-4 divide-y divide-border">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 py-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value || "—"}</span>
    </div>
  );
}
