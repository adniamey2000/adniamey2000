"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Item = {
  label: string;
  value: string;
};

export default function DonationsEditor({ items }: { items: Item[] }) {
  const router = useRouter();
  const [rows, setRows] = useState<Item[]>(items);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function update(index: number, field: keyof Item, value: string) {
    setRows((prev) => prev.map((r, i) => (i === index ? { ...r, [field]: value } : r)));
  }

  function addRow() {
    setRows((prev) => [...prev, { label: "", value: "" }]);
  }

  function removeRow(index: number) {
    setRows((prev) => prev.filter((_, i) => i !== index));
  }

  async function save() {
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/admin/donations", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: rows }),
    });
    setSaving(false);
    if (res.ok) {
      setMessage("Dons enregistrés ✓");
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
      <div className="mt-4 space-y-3">
        {rows.map((row, i) => (
          <div key={i} className="rounded-2xl border border-primary-soft bg-white p-4 shadow-sm">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className={label}>Moyen (FR)</label>
                <input value={row.label} onChange={(e) => update(i, "label", e.target.value)} placeholder="Orange Money" className={input} />
              </div>
              <div>
                <label className={label}>Numéro / Identifiant</label>
                <input value={row.value} onChange={(e) => update(i, "value", e.target.value)} placeholder="90 00 00 00" className={input} />
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeRow(i)}
              className="mt-3 rounded-xl border border-red-200 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={addRow}
          className="rounded-full border border-primary-soft px-6 py-2.5 text-sm font-semibold text-primary-dark transition hover:bg-primary-soft"
        >
          + Ajouter un moyen de don
        </button>
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="rounded-full bg-primary-dark px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {saving ? "Enregistrement…" : "Enregistrer les dons"}
        </button>
      </div>
      {message && <p className="mt-3 text-sm font-medium text-green-600">{message}</p>}
    </div>
  );
}
