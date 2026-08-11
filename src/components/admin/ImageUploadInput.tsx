"use client";

import Image from "next/image";
import { useState } from "react";

export default function ImageUploadInput({
  value,
  onChange,
  label,
  hint,
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  hint?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    const form = new FormData();
    form.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Une erreur est survenue");
        return;
      }
      onChange(data.url);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      {label && <label className="mb-1.5 block text-sm font-medium text-ink">{label}</label>}
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFile}
        disabled={uploading}
        className="w-full text-sm text-muted file:mr-3 file:rounded-full file:border-0 file:bg-primary-soft file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-dark hover:file:bg-primary-soft/70 disabled:opacity-60"
      />
      {uploading && <p className="mt-2 text-xs text-primary-dark">Téléversement en cours…</p>}
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
      {value && (
        <div className="relative mt-3 aspect-video w-full max-w-xs overflow-hidden rounded-xl border border-primary-soft bg-slate-100">
          <Image src={value} alt="Aperçu" fill sizes="320px" className="object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Retirer l'image"
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-slate-950/60 text-white transition hover:bg-slate-950"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      )}
      {hint && !value && <p className="mt-2 text-xs text-muted">{hint}</p>}
    </div>
  );
}
