"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Sermon = {
  id: number;
  titleFr: string;
  titleEn: string;
  videoUrl: string;
  date: string;
  speaker: string;
  summaryFr: string;
  summaryEn: string;
};

export default function SermonForm({
  sermon,
}: {
  sermon?: Sermon | null;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isEdit = Boolean(sermon);
  const dateValue = sermon ? sermon.date.slice(0, 10) : "";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const url = isEdit ? `/api/admin/sermons/${sermon!.id}` : "/api/admin/sermons";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Une erreur est survenue");
      return;
    }
    router.push("/admin/sermons");
    router.refresh();
  }

  const label = "mb-1.5 block text-sm font-medium text-ink";
  const input =
    "w-full rounded-xl border border-primary-soft px-4 py-2.5 text-sm outline-none transition focus:border-primary-dark focus:ring-2 focus:ring-primary-dark/30";

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="rounded-2xl border border-primary-soft bg-white p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary-dark">
          Titres
        </p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label}>Titre (FR)</label>
            <input name="titleFr" required defaultValue={sermon?.titleFr} className={input} />
          </div>
          <div>
            <label className={label}>Title (EN)</label>
            <input name="titleEn" defaultValue={sermon?.titleEn} className={input} />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-primary-soft bg-white p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary-dark">
          Vidéo YouTube
        </p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={label}>Lien de la vidéo</label>
            <input
              name="videoUrl"
              required
              type="url"
              placeholder="https://www.youtube.com/watch?v=…"
              defaultValue={sermon?.videoUrl}
              className={input}
            />
          </div>
          <div>
            <label className={label}>Prédicateur</label>
            <input name="speaker" defaultValue={sermon?.speaker} className={input} />
          </div>
          <div>
            <label className={label}>Date</label>
            <input name="date" type="date" defaultValue={dateValue} className={input} />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-primary-soft bg-white p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary-dark">
          Résumé
        </p>
        <div className="mt-3 grid gap-4">
          <div>
            <label className={label}>Résumé (FR)</label>
            <textarea name="summaryFr" rows={3} defaultValue={sermon?.summaryFr} className={input} />
          </div>
          <div>
            <label className={label}>Summary (EN)</label>
            <textarea name="summaryEn" rows={3} defaultValue={sermon?.summaryEn} className={input} />
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-primary-dark px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Enregistrement…" : isEdit ? "Enregistrer" : "Créer le sermon"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/sermons")}
          className="rounded-full border border-primary-soft px-6 py-2.5 text-sm font-semibold text-muted transition hover:bg-slate-50"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
