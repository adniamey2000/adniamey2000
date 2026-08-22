"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { showToast } from "@/components/admin/Toast";

type Item = {
  dayFr: string;
  dayEn: string;
  time: string;
  nameFr: string;
  nameEn: string;
};

export default function ScheduleEditor({ items }: { items: Item[] }) {
  const router = useRouter();
  const [rows, setRows] = useState<Item[]>(items);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function update(index: number, field: keyof Item, value: string) {
    setRows((prev) => prev.map((r, i) => (i === index ? { ...r, [field]: value } : r)));
  }

  function addRow() {
    setRows((prev) => [...prev, { dayFr: "", dayEn: "", time: "", nameFr: "", nameEn: "" }]);
  }

  function removeRow(index: number) {
    setRows((prev) => prev.filter((_, i) => i !== index));
  }

  async function save() {
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/admin/schedule", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: rows }),
    });
    setSaving(false);
    if (res.ok) {
      showToast("Horaires enregistrés avec succès");
      setMessage("Horaires enregistrés ✓");
      router.refresh();
    } else {
      setMessage("Erreur lors de l'enregistrement.");
    }
  }

  const label = "mb-1 block text-xs font-medium text-muted";
  const input =
    "w-full rounded-xl border border-primary-soft px-3 py-2 text-sm outline-none transition focus:border-primary-dark focus:ring-2 focus:ring-primary-dark/30";

  return (
    <div className="max-w-3xl">
      <div className="space-y-3">
        {rows.map((row, i) => (
          <div key={i} className="rounded-2xl border border-primary-soft bg-white p-4 shadow-sm">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className={label}>Jour (FR)</label>
                <input value={row.dayFr} onChange={(e) => update(i, "dayFr", e.target.value)} className={input} />
              </div>
              <div>
                <label className={label}>Day (EN)</label>
                <input value={row.dayEn} onChange={(e) => update(i, "dayEn", e.target.value)} className={input} />
              </div>
              <div>
                <label className={label}>Heures</label>
                <input value={row.time} onChange={(e) => update(i, "time", e.target.value)} placeholder="09h00 – 11h30" className={input} />
              </div>
              <div>
                <label className={label}>Activité (FR)</label>
                <input value={row.nameFr} onChange={(e) => update(i, "nameFr", e.target.value)} className={input} />
              </div>
              <div>
                <label className={label}>Activity (EN)</label>
                <input value={row.nameEn} onChange={(e) => update(i, "nameEn", e.target.value)} className={input} />
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => removeRow(i)}
                  className="rounded-xl border border-red-200 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                >
                  Supprimer
                </button>
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
          + Ajouter une ligne
        </button>
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="rounded-full bg-primary-dark px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {saving ? "Enregistrement…" : "Enregistrer les horaires"}
        </button>
      </div>
      {message && <p className="mt-3 text-sm font-medium text-green-600">{message}</p>}
    </div>
  );
}
