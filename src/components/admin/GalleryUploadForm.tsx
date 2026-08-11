"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function GalleryUploadForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const file = form.get("file");
    if (!(file instanceof File) || file.size === 0) {
      setError("Veuillez choisir une image.");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/admin/gallery", {
      method: "POST",
      body: form,
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Une erreur est survenue");
      return;
    }
    formRef.current?.reset();
    router.refresh();
  }

  const label = "mb-1.5 block text-sm font-medium text-ink";
  const input =
    "w-full rounded-xl border border-primary-soft px-4 py-2.5 text-sm outline-none transition focus:border-primary-dark focus:ring-2 focus:ring-primary-dark/30";

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="max-w-2xl space-y-4">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="rounded-2xl border border-primary-soft bg-white p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary-dark">
          Ajouter une photo
        </p>
        <div className="mt-3 space-y-4">
          <div>
            <label className={label}>
              Image (JPG, PNG, WEBP ou GIF — max 10 Mo)
            </label>
            <input
              type="file"
              name="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              required
              className="w-full text-sm text-muted file:mr-3 file:rounded-full file:border-0 file:bg-primary-soft file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-dark hover:file:bg-primary-soft/70"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={label}>Légende (FR)</label>
              <input name="captionFr" className={input} />
            </div>
            <div>
              <label className={label}>Caption (EN)</label>
              <input name="captionEn" className={input} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-primary-dark px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Ajout en cours…" : "Ajouter la photo"}
        </button>
      </div>
    </form>
  );
}
