"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm({
  captchaA,
  captchaB,
}: {
  captchaA: number;
  captchaB: number;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const captchaAnswer = Number(form.get("captcha"));
    if (captchaAnswer !== captchaA + captchaB) {
      setError("Réponse incorrecte. Veuillez réessayer.");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
      }),
    });

    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Une erreur est survenue");
      return;
    }
    router.push("/espace-prive-ad-niamey-2000");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm space-y-4 rounded-3xl border border-primary-soft bg-white p-8 shadow-xl"
    >
      <div className="text-center">
        <h1 className="font-serif text-2xl font-bold text-ink">Connexion admin</h1>
        <p className="mt-1 text-sm text-muted">AD Niamey 2000</p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          defaultValue="adniamey2000@gmail.com"
          className="w-full rounded-xl border border-primary-soft px-4 py-3 text-sm outline-none transition focus:border-primary-dark focus:ring-2 focus:ring-primary-dark/30"
        />
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor="password" className="text-sm font-medium">
            Mot de passe
          </label>
          <Link
            href="/espace-prive-ad-niamey-2000/forgot-password"
            className="text-xs font-semibold text-primary-dark transition hover:text-ink"
          >
            Mot de passe oublié ?
          </Link>
        </div>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            className="w-full rounded-xl border border-primary-soft px-4 py-3 pr-11 text-sm outline-none transition focus:border-primary-dark focus:ring-2 focus:ring-primary-dark/30"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition hover:text-ink"
            tabIndex={-1}
          >
            {showPassword ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                <path d="M1 1l22 22" />
                <path d="M14.12 14.12a3 3 0 11-4.24-4.24" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="captcha" className="mb-1.5 block text-sm font-medium">
          Captcha : {captchaA} + {captchaB} = ?
        </label>
        <input
          id="captcha"
          name="captcha"
          type="number"
          required
          className="w-full rounded-xl border border-primary-soft px-4 py-3 text-sm outline-none transition focus:border-primary-dark focus:ring-2 focus:ring-primary-dark/30"
          placeholder="Réponse"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-primary-dark px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}
