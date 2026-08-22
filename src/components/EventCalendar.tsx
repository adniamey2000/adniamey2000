"use client";

import { useState } from "react";
import { toDetailPath } from "@/lib/slug";

type CalendarEvent = {
  id: number;
  title: string;
  titleFr: string;
  date: string;
  time: string;
  place: string;
};

function startOfWeek(date: Date) {
  const d = new Date(date);
  const day = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
}

export default function EventCalendar({
  events,
  locale,
  labels,
}: {
  events: CalendarEvent[];
  locale: string;
  labels: {
    emptyDay: string;
    monthPrev: string;
    monthNext: string;
  };
}) {
  const today = new Date();
  const [cursor, setCursor] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selected, setSelected] = useState<string | null>(null);

  const month = cursor.getMonth();
  const year = cursor.getFullYear();

  const weekdays = Array.from({ length: 7 }, (_, i) =>
    new Intl.DateTimeFormat(locale, { weekday: "short" }).format(
      new Date(2024, 0, i + 1)
    )
  );
  const monthName = new Intl.DateTimeFormat(locale, {
    month: "long",
  }).format(cursor);

  const byDate = new Map<string, CalendarEvent[]>();
  for (const e of events) {
    const key = e.date.slice(0, 10);
    const list = byDate.get(key) ?? [];
    list.push(e);
    byDate.set(key, list);
  }

  const firstWeekStart = startOfWeek(new Date(year, month, 1));
  const cells: Date[] = [];
  for (let i = 0; i < 42; i++) {
    cells.push(new Date(firstWeekStart.getTime() + i * 86400000));
  }

  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const selectedEvents = selected ? (byDate.get(selected) ?? []) : [];
  const langPrefix = locale.startsWith("en") ? "en" : "fr";
  const dateLabel = (iso: string) => {
    const d = iso.includes("T") ? new Date(iso) : new Date(`${iso}T00:00:00`);
    return new Intl.DateTimeFormat(locale, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(d);
  };

  return (
    <div className="rounded-2xl border border-primary-soft bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg font-bold text-ink">
          {monthName} {year}
        </h3>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label={labels.monthPrev}
            onClick={() => setCursor(new Date(year, month - 1, 1))}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition hover:bg-primary-soft hover:text-primary-dark"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label={labels.monthNext}
            onClick={() => setCursor(new Date(year, month + 1, 1))}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition hover:bg-primary-soft hover:text-primary-dark"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs font-semibold text-muted">
        {weekdays.map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((cell) => {
          const key = `${cell.getFullYear()}-${String(cell.getMonth() + 1).padStart(2, "0")}-${String(cell.getDate()).padStart(2, "0")}`;
          const inMonth = cell.getMonth() === month;
          const hasEvent = byDate.has(key);
          const isSelected = selected === key;
          const isToday = key === todayKey;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setSelected(isSelected ? null : key)}
              className={`relative flex aspect-square flex-col items-center justify-center rounded-lg text-sm transition ${
                !inMonth
                  ? "text-muted/30"
                  : isSelected
                    ? "bg-primary-dark font-semibold text-white"
                    : isToday
                      ? "font-bold text-primary-dark ring-2 ring-primary-dark/40"
                      : "text-ink hover:bg-primary-soft"
              }`}
            >
              {cell.getDate()}
              {hasEvent && inMonth && (
                <span
                  className={`absolute bottom-1.5 h-1.5 w-1.5 rounded-full ${
                    isSelected ? "bg-white" : "bg-primary-dark"
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>

      {selectedEvents.length > 0 ? (
        <ul className="mt-5 space-y-3 border-t border-primary-soft pt-4">
          {selectedEvents.map((e) => (
            <li key={e.id}>
              <a
                href={toDetailPath("evenements", e.id, e.titleFr, langPrefix as "fr" | "en")}
                className="block rounded-xl border border-primary-soft bg-primary-soft/40 p-3 transition hover:bg-primary-soft"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-primary-dark">
                  {dateLabel(e.date)}
                </p>
                <p className="mt-0.5 font-serif text-sm font-bold text-ink">{e.title}</p>
                <p className="mt-0.5 text-xs text-muted">
                  {e.time} · {e.place}
                </p>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        selected && (
          <p className="mt-5 border-t border-primary-soft pt-4 text-sm text-muted">
            {labels.emptyDay}
          </p>
        )
      )}
    </div>
  );
}
