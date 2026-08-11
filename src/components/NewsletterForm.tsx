"use client";

import { useState } from "react";
import type { Dict } from "@/lib/i18n";

type Status = "idle" | "loading" | "success" | "error" | "already";

export default function NewsletterForm({
  dict,
  dark,
}: {
  dict: Dict;
  dark?: boolean;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus(data.error === "already" ? "already" : "error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success" || status === "already") {
    return (
      <p
        className={`text-sm ${
          dark ? "text-white/80" : "text-muted"
        }`}
      >
        {status === "success" ? dict.newsletter.success : dict.newsletter.already}
      </p>
    );
  }

  const darkInput = dark
    ? "border-white/20 bg-white/10 text-white placeholder:text-white/65 focus:border-primary focus:ring-2 focus:ring-primary/40"
    : "border-primary-soft bg-white text-ink placeholder:text-muted/60 focus:border-primary-dark focus:ring-2 focus:ring-primary-dark/30";

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={dict.newsletter.placeholder}
          aria-label={dict.newsletter.placeholder}
          className={`min-w-0 flex-1 rounded-full border px-4 py-2.5 text-sm outline-none transition ${darkInput}`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:opacity-60"
        >
          {status === "loading" ? "…" : dict.newsletter.button}
        </button>
      </form>
      {status === "error" && (
        <p className={`mt-2 text-xs ${dark ? "text-red-300" : "text-red-600"}`}>
          {dict.newsletter.error}
        </p>
      )}
    </div>
  );
}
