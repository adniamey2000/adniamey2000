"use client";

import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { toDetailPath } from "@/lib/slug";

export type SermonItem = {
  id: number;
  title: string;
  titleFr: string;
  summary: string;
  dateISO: string;
  speaker: string;
  thumb: string | null;
};

export default function SermonBrowser({
  lang,
  sermons,
  labels,
}: {
  lang: Locale;
  sermons: SermonItem[];
  labels: {
    searchPlaceholder: string;
    sortNewest: string;
    sortOldest: string;
    noResults: string;
    summary: string;
    watch: string;
  };
}) {
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState<"newest" | "oldest">("newest");

  const q = query.trim().toLowerCase();
  const filtered = sermons
    .filter(
      (s) =>
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.speaker.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q)
    )
    .sort((a, b) =>
      order === "newest"
        ? b.dateISO.localeCompare(a.dateISO)
        : a.dateISO.localeCompare(b.dateISO)
    );

  const fmt = (iso: string) =>
    new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "fr-FR", {
      dateStyle: "medium",
    }).format(new Date(iso));

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={labels.searchPlaceholder}
            className="w-full rounded-full border border-primary-soft bg-white py-3 pl-11 pr-5 text-sm text-ink outline-none transition placeholder:text-muted/60 focus:border-primary-dark focus:ring-2 focus:ring-primary-dark/30"
          />
        </div>
        <div className="flex rounded-full border border-primary-soft bg-white p-1 text-sm">
          {(["newest", "oldest"] as const).map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setOrder(opt)}
              className={`rounded-full px-4 py-1.5 font-medium transition ${
                order === opt
                  ? "bg-primary-dark text-white"
                  : "text-muted hover:text-primary-dark"
              }`}
            >
              {opt === "newest" ? labels.sortNewest : labels.sortOldest}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-14 text-center text-muted">{labels.noResults}</p>
      ) : (
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {filtered.map((sermon) => (
            <div
              key={sermon.id}
              className="overflow-hidden rounded-2xl border border-primary-soft bg-white shadow-sm transition hover:shadow-md"
            >
              <Link
                href={toDetailPath("sermons", sermon.id, sermon.titleFr, lang)}
                className="group relative block aspect-video w-full bg-slate-950"
              >
                {sermon.thumb ? (
                  <img
                    src={sermon.thumb}
                    alt={sermon.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover opacity-90 transition duration-300 group-hover:scale-105 group-hover:opacity-100"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-white/40">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                )}
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition group-hover:scale-110">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>
              </Link>
              <div className="p-6">
                <Link
                  href={toDetailPath("sermons", sermon.id, sermon.titleFr, lang)}
                  className="font-serif text-xl font-bold transition hover:text-primary-dark"
                >
                  {sermon.title}
                </Link>
                <p className="mt-1 text-xs text-muted">
                  {sermon.speaker} · {fmt(sermon.dateISO)}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  <span className="font-semibold text-ink">{labels.summary} :</span>{" "}
                  {sermon.summary}
                </p>
                <Link
                  href={toDetailPath("sermons", sermon.id, sermon.titleFr, lang)}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary-dark px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  {labels.watch}
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
