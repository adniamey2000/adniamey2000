"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";

export type EventItem = {
  id: number;
  title: string;
  summary: string;
  dateISO: string;
  time: string;
  place: string;
  imageUrl: string | null;
};

export default function EventsBrowser({
  lang,
  upcoming,
  past,
  labels,
}: {
  lang: Locale;
  upcoming: EventItem[];
  past: EventItem[];
  labels: {
    upcoming: string;
    past: string;
    details: string;
    searchPlaceholder: string;
    noResults: string;
    filterLabel: string;
    allMonths: string;
  };
}) {
  const [query, setQuery] = useState("");
  const [month, setMonth] = useState("all");

  const locale = lang === "en" ? "en-GB" : "fr-FR";

  const monthOptions = useMemo(() => {
    const keys = new Map<string, string>();
    for (const e of [...upcoming, ...past]) {
      const d = new Date(e.dateISO);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      if (!keys.has(key)) {
        keys.set(
          key,
          new Intl.DateTimeFormat(locale, {
            month: "long",
            year: "numeric",
          }).format(d)
        );
      }
    }
    return [...keys.entries()].sort((a, b) => b[0].localeCompare(a[0]));
  }, [upcoming, past, locale]);

  const q = query.trim().toLowerCase();
  const matches = (e: EventItem) => {
    const d = new Date(e.dateISO);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    return (
      (month === "all" || key === month) &&
      (!q ||
        e.title.toLowerCase().includes(q) ||
        e.summary.toLowerCase().includes(q) ||
        e.place.toLowerCase().includes(q))
    );
  };

  const upcomingFiltered = upcoming.filter(matches);
  const pastFiltered = past.filter(matches);
  const empty = upcomingFiltered.length === 0 && pastFiltered.length === 0;

  const fmt = (iso: string) =>
    new Intl.DateTimeFormat(locale, {
      dateStyle: "medium",
    }).format(new Date(iso));

  const card = (e: EventItem) => (
    <Link
      key={e.id}
      href={`/${lang}/evenements/${e.id}`}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
    >
      {e.imageUrl ? (
        <img
          src={e.imageUrl}
          alt={e.title}
          loading="lazy"
          className="aspect-[16/9] w-full object-cover transition duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="flex aspect-[16/9] w-full items-center justify-center bg-slate-100">
          <span className="font-serif text-4xl font-bold text-slate-300">
            {new Intl.DateTimeFormat(locale, { day: "2-digit" }).format(new Date(e.dateISO))}
          </span>
        </div>
      )}
      <div className="p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-dark">
          {fmt(e.dateISO)}
        </p>
        <h3 className="mt-2 font-serif text-lg font-bold transition group-hover:text-primary-dark">
          {e.title}
        </h3>
        <p className="mt-1 text-sm text-muted">
          {e.time} · {e.place}
        </p>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
          {e.summary}
        </p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-dark">
          {labels.details}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
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
            className="w-full rounded-full border border-slate-200 bg-white py-3 pl-11 pr-5 text-sm text-ink outline-none transition placeholder:text-muted/60 focus:border-primary-dark focus:ring-2 focus:ring-primary-dark/30"
          />
        </div>
        {monthOptions.length > 0 && (
          <div>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              aria-label={labels.filterLabel}
              className="w-full rounded-full border border-slate-200 bg-white py-3 pl-5 pr-10 text-sm text-ink outline-none transition focus:border-primary-dark focus:ring-2 focus:ring-primary-dark/30 sm:w-auto"
            >
              <option value="all">{labels.allMonths}</option>
              {monthOptions.map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {empty ? (
        <p className="mt-10 text-center text-muted">{labels.noResults}</p>
      ) : (
        <div className="mt-10 space-y-14">
          {upcomingFiltered.length > 0 && (
            <div>
              <h2 className="font-serif text-2xl font-bold text-primary-dark">
                {labels.upcoming}
              </h2>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {upcomingFiltered.map(card)}
              </div>
            </div>
          )}
          {pastFiltered.length > 0 && (
            <div>
              <h2 className="font-serif text-2xl font-bold text-primary-dark">
                {labels.past}
              </h2>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {pastFiltered.map(card)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
