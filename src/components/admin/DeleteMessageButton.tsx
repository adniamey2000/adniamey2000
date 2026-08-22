"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
import { showToast } from "./Toast";

export default function DeleteMessageButton({ id }: { id: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  async function handleDelete() {
    setShowConfirm(false);
    setLoading(true);
    await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    showToast("Message supprimé", "error");
    router.push("/espace-prive-ad-niamey-2000/messages");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setShowConfirm(true)}
        disabled={loading}
        className="rounded-full border border-red-200 px-4 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-60"
      >
        {loading ? "…" : "Supprimer"}
      </button>
      <ConfirmDialog
        open={showConfirm}
        title="Supprimer ce message"
        message="Voulez-vous vraiment supprimer ce message de contact ? Cette action est irréversible."
        confirmLabel="Supprimer"
        danger
        onConfirm={handleDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
}
