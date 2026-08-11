"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ImageUploadInput from "@/components/admin/ImageUploadInput";

type Department = {
  id: number;
  nameFr: string;
  nameEn: string;
  descFr: string;
  descEn: string;
  imageUrl: string | null;
};

export default function DepartmentForm({
  department,
}: {
  department?: Department | null;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isEdit = Boolean(department);
  const [imageUrl, setImageUrl] = useState(department?.imageUrl ?? "");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const url = isEdit
      ? `/api/admin/departments/${department!.id}`
      : "/api/admin/departments";
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
    router.push("/admin/departments");
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
          Nom
        </p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label}>Nom (FR)</label>
            <input name="nameFr" required defaultValue={department?.nameFr} className={input} />
          </div>
          <div>
            <label className={label}>Name (EN)</label>
            <input name="nameEn" defaultValue={department?.nameEn} className={input} />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-primary-soft bg-white p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary-dark">
          Description
        </p>
        <div className="mt-3 grid gap-4">
          <div>
            <label className={label}>Description (FR)</label>
            <textarea name="descFr" rows={3} defaultValue={department?.descFr} className={input} />
          </div>
          <div>
            <label className={label}>Description (EN)</label>
            <textarea name="descEn" rows={3} defaultValue={department?.descEn} className={input} />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-primary-soft bg-white p-6">
        <ImageUploadInput
          label="Image (optionnel)"
          value={imageUrl}
          onChange={setImageUrl}
          hint="Choisissez une image pour illustrer le département."
        />
        <input type="hidden" name="imageUrl" value={imageUrl} />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-primary-dark px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Enregistrement…" : isEdit ? "Enregistrer" : "Créer le département"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/departments")}
          className="rounded-full border border-primary-soft px-6 py-2.5 text-sm font-semibold text-muted transition hover:bg-slate-50"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
