"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ImageUploadInput from "@/components/admin/ImageUploadInput";

type Leader = {
  name: string;
  titleFr: string;
  titleEn: string;
  bioFr: string;
  bioEn: string;
  imageUrl: string | null;
};

export default function LeadersEditor({ leaders }: { leaders: Leader[] }) {
  const router = useRouter();
  const [rows, setRows] = useState<Leader[]>(leaders);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function update(index: number, field: keyof Leader, value: string) {
    setRows((prev) => prev.map((r, i) => (i === index ? { ...r, [field]: value } : r)));
  }

  function move(index: number, dir: -1 | 1) {
    setRows((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function addRow() {
    setRows((prev) => [
      ...prev,
      { name: "", titleFr: "", titleEn: "", bioFr: "", bioEn: "", imageUrl: null },
    ]);
  }

  function removeRow(index: number) {
    setRows((prev) => prev.filter((_, i) => i !== index));
  }

  async function save() {
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/admin/leaders", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leaders: rows }),
    });
    setSaving(false);
    if (res.ok) {
      setMessage("Équipe enregistrée ✓");
      router.refresh();
    } else {
      setMessage("Erreur lors de l'enregistrement.");
    }
  }

  const label = "mb-1 block text-xs font-medium text-muted";
  const input =
    "w-full rounded-xl border border-primary-soft px-3 py-2 text-sm outline-none transition focus:border-primary-dark focus:ring-2 focus:ring-primary-dark/30";

  return (
    <div className="max-w-4xl">
      <div className="space-y-3">
        {rows.map((row, i) => (
          <div key={i} className="rounded-2xl border border-primary-soft bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                Responsable #{i + 1}
                {i === 0 && rows.length > 0 && (
                  <span className="ml-2 rounded-full bg-primary-dark px-2 py-0.5 text-[10px] font-bold text-white">
                    Responsable principal
                  </span>
                )}
              </p>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  aria-label="Monter"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary-soft text-primary-dark transition hover:bg-primary-soft disabled:opacity-40"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  disabled={i === rows.length - 1}
                  aria-label="Descendre"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary-soft text-primary-dark transition hover:bg-primary-soft disabled:opacity-40"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => removeRow(i)}
                  className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                >
                  Supprimer
                </button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className={label}>Nom</label>
                <input value={row.name} onChange={(e) => update(i, "name", e.target.value)} placeholder="Jean Dupont" className={input} />
              </div>
              <div>
                <label className={label}>Titre (FR)</label>
                <input value={row.titleFr} onChange={(e) => update(i, "titleFr", e.target.value)} placeholder="Responsable principal" className={input} />
              </div>
              <div>
                <label className={label}>Titre (EN)</label>
                <input value={row.titleEn} onChange={(e) => update(i, "titleEn", e.target.value)} placeholder="Team leader" className={input} />
              </div>
              <div>
                <label className={label}>Photo</label>
                <ImageUploadInput
                  value={row.imageUrl ?? ""}
                  onChange={(url) => update(i, "imageUrl", url)}
                />
              </div>
              <div>
                <label className={label}>Bio (FR)</label>
                <textarea value={row.bioFr} onChange={(e) => update(i, "bioFr", e.target.value)} rows={2} className={input} />
              </div>
              <div>
                <label className={label}>Bio (EN)</label>
                <textarea value={row.bioEn} onChange={(e) => update(i, "bioEn", e.target.value)} rows={2} className={input} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={addRow}
          className="rounded-full border border-primary-soft px-6 py-2.5 text-sm font-semibold text-primary-dark transition hover:bg-primary-soft"
        >
          + Ajouter un responsable
        </button>
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="rounded-full bg-primary-dark px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {saving ? "Enregistrement…" : "Enregistrer l'équipe"}
        </button>
      </div>
      {message && <p className="mt-3 text-sm font-medium text-green-600">{message}</p>}
    </div>
  );
}
