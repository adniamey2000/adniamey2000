"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteMessageButton({ id }: { id: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!window.confirm("Voulez-vous vraiment supprimer ce message ?")) return;
    setLoading(true);
    await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    router.push("/espace-prive-ad-niamey-2000/messages");
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="rounded-full border border-red-200 px-4 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-60"
    >
      {loading ? "…" : "Supprimer"}
    </button>
  );
}
