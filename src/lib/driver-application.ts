export type PersonalInfo = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  dob: string;
  address: string;
  city: string;
};

export type VehicleInfo = {
  type: string;
  make: string;
  model: string;
  year: string;
  registration: string;
  color: string;
  confirmed: boolean;
};

export type DocKey = "licence" | "nationalId" | "vehicleReg" | "insurance";

export type UploadedDoc = { name: string; size: number; uploadedAt: string };

export type DriverApplication = {
  applicationId: string;
  submittedAt: string;
  personal: PersonalInfo;
  vehicle: VehicleInfo;
  documents: Partial<Record<DocKey, UploadedDoc>>;
};

export const DOC_LABELS: Record<DocKey, string> = {
  licence: "Driver's Licence",
  nationalId: "National ID",
  vehicleReg: "Vehicle Registration",
  insurance: "Vehicle Insurance",
};

export const emptyPersonal: PersonalInfo = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  dob: "",
  address: "",
  city: "",
};

export const emptyVehicle: VehicleInfo = {
  type: "",
  make: "",
  model: "",
  year: "",
  registration: "",
  color: "",
  confirmed: false,
};

const STORAGE_KEY = "takeoff.driver.application";

export function generateApplicationId() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `TO-${n}`;
}

export function saveApplication(app: DriverApplication) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(app));
}

export function loadApplication(): DriverApplication | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as DriverApplication) : null;
  } catch {
    return null;
  }
}

export function clearApplication() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
