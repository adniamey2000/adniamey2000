"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ImageUploadInput from "@/components/admin/ImageUploadInput";
import { showToast } from "@/components/admin/Toast";

type ChurchEvent = {
  id: number;
  titleFr: string;
  titleEn: string;
  date: string;
  time: string;
  place: string;
  summaryFr: string;
  summaryEn: string;
  imageUrl: string | null;
};

export default function EventForm({
  event,
}: {
  event?: ChurchEvent | null;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(event?.imageUrl ?? "");

  const isEdit = Boolean(event);
  const dateValue = event ? event.date.slice(0, 10) : "";

  async function handleSubmit(eventSubmit: React.FormEvent<HTMLFormElement>) {
    eventSubmit.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(eventSubmit.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const url = isEdit ? `/api/admin/events/${event!.id}` : "/api/admin/events";
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
    showToast(isEdit ? "Événement modifié avec succès" : "Événement créé avec succès");
    router.push("/espace-prive-ad-niamey-2000/events");
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
            <input name="titleFr" required defaultValue={event?.titleFr} className={input} />
          </div>
          <div>
            <label className={label}>Title (EN)</label>
            <input name="titleEn" defaultValue={event?.titleEn} className={input} />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-primary-soft bg-white p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary-dark">
          Date et lieu
        </p>
        <div className="mt-3 grid gap-4 sm:grid-cols-3">
          <div>
            <label className={label}>Date</label>
            <input name="date" type="date" required defaultValue={dateValue} className={input} />
          </div>
          <div>
            <label className={label}>Heure</label>
            <input name="time" placeholder="09h00" defaultValue={event?.time} className={input} />
          </div>
          <div>
            <label className={label}>Lieu</label>
            <input name="place" defaultValue={event?.place} className={input} />
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
            <textarea name="summaryFr" rows={3} defaultValue={event?.summaryFr} className={input} />
          </div>
          <div>
            <label className={label}>Summary (EN)</label>
            <textarea name="summaryEn" rows={3} defaultValue={event?.summaryEn} className={input} />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-primary-soft bg-white p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary-dark">
          Image
        </p>
        <div className="mt-3">
          <ImageUploadInput
            label="Image de l'événement (optionnel)"
            value={imageUrl}
            onChange={setImageUrl}
            hint="Cette image illustrera l'événement sur le site."
          />
          <input type="hidden" name="imageUrl" value={imageUrl} />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-primary-dark px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Enregistrement…" : isEdit ? "Enregistrer" : "Créer l'événement"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/espace-prive-ad-niamey-2000/events")}
          className="rounded-full border border-primary-soft px-6 py-2.5 text-sm font-semibold text-muted transition hover:bg-slate-50"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
