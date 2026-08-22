"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { showToast } from "@/components/admin/Toast";

type Settings = {
  address?: { valueFr: string; valueEn: string } | null;
  phone?: { valueFr: string; valueEn: string } | null;
  email?: { valueFr: string; valueEn: string } | null;
};

export default function SettingsForm({ settings }: { settings: Settings }) {
  const router = useRouter();
  const [values, setValues] = useState({
    addressFr: settings.address?.valueFr ?? "",
    addressEn: settings.address?.valueEn ?? "",
    phoneFr: settings.phone?.valueFr ?? "",
    phoneEn: settings.phone?.valueEn ?? "",
    emailFr: settings.email?.valueFr ?? "",
    emailEn: settings.email?.valueEn ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function update(field: keyof typeof values, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function save() {
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setSaving(false);
    if (res.ok) {
      showToast("Coordonnées enregistrées avec succès");
      setMessage("Coordonnées enregistrées ✓");
      router.refresh();
    } else {
      setMessage("Erreur lors de l'enregistrement.");
    }
  }

  const label = "mb-1 block text-xs font-medium text-muted";
  const input =
    "w-full rounded-xl border border-primary-soft px-3 py-2 text-sm outline-none transition focus:border-primary-dark focus:ring-2 focus:ring-primary-dark/30";

  const rows: {
    key: "addressFr" | "addressEn" | "phoneFr" | "phoneEn" | "emailFr" | "emailEn";
    label: string;
  }[] = [
    { key: "addressFr", label: "Adresse (FR)" },
    { key: "addressEn", label: "Address (EN)" },
    { key: "phoneFr", label: "Téléphone (FR)" },
    { key: "phoneEn", label: "Phone (EN)" },
    { key: "emailFr", label: "E-mail (FR)" },
    { key: "emailEn", label: "Email (EN)" },
  ];

  return (
    <div className="max-w-3xl">
      <div className="rounded-2xl border border-primary-soft bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          {rows.map((row) => (
            <div key={row.key}>
              <label className={label}>{row.label}</label>
              <input
                value={values[row.key]}
                onChange={(e) => update(row.key, e.target.value)}
                className={input}
              />
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted">
          Ces coordonnées sont affichées sur la page Contact et dans le pied de
          page. Les horaires des cultes se gèrent dans la section Horaires.
        </p>
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="mt-5 rounded-full bg-primary-dark px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {saving ? "Enregistrement…" : "Enregistrer les coordonnées"}
        </button>
        {message && <p className="mt-3 text-sm font-medium text-green-600">{message}</p>}
      </div>
    </div>
  );
}
