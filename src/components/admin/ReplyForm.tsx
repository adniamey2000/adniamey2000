"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { showToast } from "./Toast";

export default function ReplyForm({
  messageId,
  contactName,
}: {
  messageId: number;
  contactName: string;
}) {
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const router = useRouter();

  async function handleReply(e: React.FormEvent) {
    e.preventDefault();
    const text = body.trim();
    if (!text) return;
    setSending(true);
    try {
      const res = await fetch(`/api/admin/messages/${messageId}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: text }),
      });
      if (res.ok) {
        showToast("Réponse envoyée à " + contactName);
        setBody("");
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        showToast(data.error ?? "Erreur lors de l'envoi", "error");
      }
    } catch {
      showToast("Erreur réseau", "error");
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={handleReply} className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-sm font-semibold text-ink">Répondre</p>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
        rows={4}
        placeholder="Écrire votre réponse…"
        className="mt-3 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted/50 focus:border-primary-dark focus:bg-white focus:ring-2 focus:ring-primary-dark/20"
      />
      <div className="mt-3 flex justify-end">
        <button
          type="submit"
          disabled={sending || !body.trim()}
          className="inline-flex items-center gap-2 rounded-full bg-primary-dark px-5 py-2 text-sm font-semibold text-white transition hover:bg-primary disabled:opacity-50"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 10h10a5 5 0 015 5v4" />
            <path d="M7 14L3 10l4-4" />
          </svg>
          {sending ? "Envoi…" : "Envoyer"}
        </button>
      </div>
    </form>
  );
}
