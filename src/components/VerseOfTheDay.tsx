"use client";

import { useEffect, useState } from "react";
import { getDailyVerse } from "@/lib/verses";

type Verse = { text: string; reference: string };

export default function VerseOfTheDay({
  title,
  subtitle,
  lang,
}: {
  title: string;
  subtitle: string;
  lang: string;
}) {
  const [verse, setVerse] = useState<Verse | null>(null);

  useEffect(() => {
    let active = true;
    fetch(`/api/verse-of-the-day?lang=${encodeURIComponent(lang)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && data?.text && data?.reference) {
          setVerse({ text: data.text, reference: data.reference });
        }
      })
      .catch(() => {
        if (active) setVerse(getDailyVerse());
      });
    return () => {
      active = false;
    };
  }, [lang]);

  return (
    <section className="relative isolate overflow-hidden border-y border-primary-soft bg-gradient-to-br from-primary-soft via-white to-primary-soft/70">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(82,86,199,0.12),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(82,86,199,0.08),transparent_55%)]"
      />
      <div className="relative mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-16">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-dark shadow-sm">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 4h6a4 4 0 014 4v12a3 3 0 00-3-3H4V4z" />
            <path d="M14 8a4 4 0 016 0v9a3 3 0 00-3-3v1a3 3 0 013 3" />
          </svg>
          {title}
        </span>
        <blockquote className="mt-6 min-h-[7.5rem] font-serif text-xl font-medium leading-relaxed text-ink sm:text-2xl">
          {verse ? (
            <>
              <span className="text-accent">«&nbsp;</span>
              {verse.text}
              <span className="text-accent">&nbsp;»</span>
            </>
          ) : (
            <span className="block animate-pulse space-y-3">
              <span className="block h-4 w-full rounded bg-primary-soft" />
              <span className="block h-4 w-3/4 rounded bg-primary-soft" />
            </span>
          )}
        </blockquote>
        <p className="mt-5 text-sm font-semibold uppercase tracking-widest text-primary-dark">
          {verse ? verse.reference : subtitle}
        </p>
      </div>
    </section>
  );
}
