"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { showToast } from "@/components/admin/Toast";

type Announcement = {
  id: number;
  titleFr: string;
  titleEn: string;
  contentFr: string;
  contentEn: string;
  date: string;
  isPublished: boolean;
};

export default function AnnouncementForm({
  announcement,
}: {
  announcement?: Announcement | null;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isEdit = Boolean(announcement);
  const dateValue = announcement ? announcement.date.slice(0, 10) : "";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const url = isEdit
      ? `/api/admin/announcements/${announcement!.id}`
      : "/api/admin/announcements";
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
    showToast(isEdit ? "Annonce modifiée avec succès" : "Annonce créée avec succès");
    router.push("/espace-prive-ad-niamey-2000/announcements");
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
          Annonce
        </p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label}>Titre (FR)</label>
            <input name="titleFr" required defaultValue={announcement?.titleFr} className={input} />
          </div>
          <div>
            <label className={label}>Title (EN)</label>
            <input name="titleEn" defaultValue={announcement?.titleEn} className={input} />
          </div>
          <div className="sm:col-span-2">
            <label className={label}>Message (FR)</label>
            <textarea
              name="contentFr"
              rows={4}
              required
              defaultValue={announcement?.contentFr}
              className={input}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={label}>Message (EN)</label>
            <textarea
              name="contentEn"
              rows={4}
              defaultValue={announcement?.contentEn}
              className={input}
            />
          </div>
          <div>
            <label className={label}>Date de l&apos;annonce</label>
            <input name="date" type="date" defaultValue={dateValue} className={input} />
          </div>
          <div className="flex items-end">
            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-ink">
              <input
                name="isPublished"
                type="checkbox"
                defaultChecked={announcement ? announcement.isPublished : true}
                className="h-4 w-4 rounded border-primary-soft accent-primary-dark"
              />
              Publiée sur le site
            </label>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-primary-dark px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Enregistrement…" : isEdit ? "Enregistrer" : "Créer l'annonce"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/espace-prive-ad-niamey-2000/announcements")}
          className="rounded-full border border-primary-soft px-6 py-2.5 text-sm font-semibold text-muted transition hover:bg-slate-50"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
