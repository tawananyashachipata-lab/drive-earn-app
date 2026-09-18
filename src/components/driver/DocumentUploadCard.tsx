import { useRef } from "react";
import { CheckCircle2, FileText, Upload, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { UploadedDoc } from "@/lib/driver-application";

type Props = {
  label: string;
  doc: UploadedDoc | undefined;
  onUpload: (file: File) => void;
  onRemove: () => void;
};

export function DocumentUploadCard({ label, doc, onUpload, onRemove }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className={`flex size-10 items-center justify-center rounded-xl ${
              doc ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"
            }`}
          >
            {doc ? <CheckCircle2 className="size-5" /> : <FileText className="size-5" />}
          </span>
          <div>
            <p className="font-semibold text-foreground">{label}</p>
            <p className={`text-xs ${doc ? "text-success" : "text-muted-foreground"}`}>
              {doc ? "Uploaded" : "Not uploaded"}
            </p>
          </div>
        </div>
      </div>

      {doc ? (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-muted/70 px-4 py-3">
          <span className="truncate text-sm text-foreground">{doc.name}</span>
          <Button type="button" variant="ghost" size="sm" onClick={onRemove} className="text-destructive">
            <Trash2 /> Remove
          </Button>
        </div>
      ) : (
        <Button type="button" variant="outline" className="mt-4 w-full" onClick={() => inputRef.current?.click()}>
          <Upload /> Upload file
        </Button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*,.pdf"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onUpload(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
