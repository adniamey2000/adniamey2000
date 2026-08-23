"use client";

import { Suspense, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { getDict, isLocale, type Locale } from "@/lib/i18n";

function ChoiceContent() {
  const params = useParams<{ lang: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<"fr" | "en" | null>(null);

  const lang: Locale = isLocale(params.lang) ? params.lang : "fr";
  const t = getDict(lang);
  const token = searchParams.get("token") ?? "";

  async function choose(next: "fr" | "en") {
    if (!token || loading) return;
    setLoading(next);
    try {
      const res = await fetch("/api/newsletter/lang", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, lang: next }),
      });
      if (res.ok) {
        router.replace(`/${next}/newsletter-confirmee`);
      }
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="mx-auto max-w-md space-y-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-dark">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        </div>
        <h1 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
          {t.newsletter.choiceTitle}
        </h1>
        <p className="text-sm leading-relaxed text-muted">
          {t.newsletter.choiceText}
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => choose("fr")}
            disabled={loading !== null}
            className="rounded-full bg-primary-dark px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            Français
          </button>
          <button
            onClick={() => choose("en")}
            disabled={loading !== null}
            className="rounded-full bg-primary-dark px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            English
          </button>
        </div>
      </div>
    </div>
  );
}

export default function NewsletterChoicePage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <ChoiceContent />
    </Suspense>
  );
}
