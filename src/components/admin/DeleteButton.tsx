"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({
  url,
  label = "Supprimer",
}: {
  url: string;
  label?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!window.confirm("Voulez-vous vraiment supprimer cet élément ?")) return;
    setLoading(true);
    await fetch(url, { method: "DELETE" });
    setLoading(false);
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="rounded-full border border-red-200 px-4 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-60"
    >
      {loading ? "…" : label}
    </button>
  );
}
