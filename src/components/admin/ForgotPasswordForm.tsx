"use client";

import { useState } from "react";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<
    { kind: "success"; devLink?: string } | { kind: "error"; message: string } | null
  >(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setState(null);

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setState({ kind: "error", message: data.error ?? "Une erreur est survenue" });
      return;
    }
    setState({ kind: "success", devLink: data.devLink });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm space-y-4 rounded-3xl border border-primary-soft bg-white p-8 shadow-xl"
    >
      <div className="text-center">
        <h1 className="font-serif text-2xl font-bold text-ink">
          Mot de passe oublié
        </h1>
        <p className="mt-1 text-sm text-muted">
          Saisissez votre adresse e-mail pour recevoir un lien de réinitialisation.
        </p>
      </div>

      {state?.kind === "success" && (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          <p className="font-semibold">
            Si cette adresse est enregistrée, un e-mail vient d&apos;être envoyé.
          </p>
          <p className="mt-1 text-xs">
            Vérifiez votre boîte de réception (pensez aussi aux courriers
            indésirables).
          </p>
          {state.devLink && (
            <a
              href={state.devLink}
              className="mt-2 block break-all text-xs font-semibold text-primary-dark underline"
            >
              Lien de démonstration : {state.devLink}
            </a>
          )}
        </div>
      )}

      {state?.kind === "error" && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {state.message}
        </div>
      )}

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
          Adresse e-mail
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@adniamey2000.org"
          className="w-full rounded-xl border border-primary-soft px-4 py-3 text-sm outline-none transition focus:border-primary-dark focus:ring-2 focus:ring-primary-dark/30"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-primary-dark px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "Envoi…" : "Envoyer le lien de réinitialisation"}
      </button>
    </form>
  );
}
