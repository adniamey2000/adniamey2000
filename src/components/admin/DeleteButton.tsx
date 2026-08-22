"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
import { showToast } from "./Toast";

export default function DeleteButton({
  url,
  label = "Supprimer",
  itemName = "cet élément",
}: {
  url: string;
  label?: string;
  itemName?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  async function handleDelete() {
    setShowConfirm(false);
    setLoading(true);
    await fetch(url, { method: "DELETE" });
    setLoading(false);
    showToast("Élément supprimé", "error");
    router.refresh();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setShowConfirm(true)}
        disabled={loading}
        className="rounded-full border border-red-200 px-4 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-60"
      >
        {loading ? "…" : label}
      </button>
      <ConfirmDialog
        open={showConfirm}
        title="Confirmer la suppression"
        message={`Voulez-vous vraiment supprimer ${itemName} ? Cette action est irréversible.`}
        confirmLabel="Supprimer"
        danger
        onConfirm={handleDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
}
