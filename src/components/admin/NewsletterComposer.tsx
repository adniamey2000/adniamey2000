"use client";

import { useState } from "react";

export default function NewsletterComposer({ subscriberCount }: { subscriberCount: number }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    ok: boolean;
    text: string;
    dev?: boolean;
  } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/admin/newsletter/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, message }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setResult({ ok: false, text: data.error ?? "Une erreur est survenue" });
      return;
    }
    if (data.dev) {
      setResult({
        ok: true,
        dev: true,
        text: `E-mail non configuré : l'envoi a été simulé pour ${data.total} abonné(s). Configurez SMTP dans le fichier .env pour un envoi réel.`,
      });
      return;
    }
    setResult({
      ok: true,
      text: `E-mail envoyé à ${data.sent} abonné(s) sur ${data.total}${data.failed?.length ? ` (${data.failed.length} échec(s))` : ""}.`,
    });
  }

  const input =
    "w-full rounded-xl border border-primary-soft px-4 py-2.5 text-sm outline-none transition focus:border-primary-dark focus:ring-2 focus:ring-primary-dark/30";

  return (
    <div className="rounded-2xl border border-primary-soft bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary-dark">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22 7l-10 6L2 7" />
          </svg>
        </div>
        <div>
          <h2 className="font-serif text-lg font-bold text-ink">Envoyer une newsletter</h2>
          <p className="text-xs text-muted">
            {subscriberCount} abonné{subscriberCount > 1 ? "s" : ""} — le message sera envoyé à tous.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        {result && (
          <div
            className={`rounded-xl px-4 py-3 text-sm ${
              result.ok
                ? result.dev
                  ? "border border-amber-200 bg-amber-50 text-amber-700"
                  : "border border-green-200 bg-green-50 text-green-700"
                : "border border-red-200 bg-red-50 text-red-600"
            }`}
          >
            {result.text}
          </div>
        )}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Sujet</label>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            maxLength={120}
            placeholder="Ex : Annonce du culte de dimanche"
            className={input}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={6}
            maxLength={10000}
            placeholder="Écrivez le message qui sera envoyé à tous les abonnés…"
            className={input}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-primary-dark px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Envoi en cours…" : "Envoyer à tous les abonnés"}
        </button>
      </form>
    </div>
  );
}
