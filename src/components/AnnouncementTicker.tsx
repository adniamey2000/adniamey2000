"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Item = { id: number; text: string };

const REPEAT = 4;

export default function AnnouncementTicker({
  items,
  label,
  href,
}: {
  items: Item[];
  label: string;
  href: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(30);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const update = () => {
      const half = el.scrollWidth / 2;
      setDuration(Math.max(16, half / 45));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [items.length]);

  if (items.length === 0) return null;

  const Group = ({ hidden }: { hidden: boolean }) => (
    <div className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden}>
      {items.map((item) => (
        <span
          key={item.id}
          className="flex items-center gap-10 whitespace-nowrap text-base text-ink"
        >
          <span className="font-semibold text-primary-dark">{item.text}</span>
          <span className="h-1 w-1 shrink-0 rounded-full bg-primary-bright" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="sticky top-16 z-30 border-b border-primary-soft bg-primary-soft/90 shadow-sm backdrop-blur">
      <div className="relative">
        <div className="overflow-hidden py-4 sm:py-5">
          <div
            ref={trackRef}
            className="ticker-track flex w-max will-change-transform"
            style={{ animationDuration: `${duration}s` }}
          >
            {Array.from({ length: REPEAT }).map((_, i) => (
              <Group key={i} hidden={i > 0} />
            ))}
          </div>
        </div>
        <Link
          href={href}
          className="absolute left-3 top-1/2 z-10 flex -translate-y-1/2 items-center gap-1.5 rounded-full bg-primary-dark px-4 py-1.5 text-xs font-bold text-white shadow-md transition hover:opacity-90 sm:left-5"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 11l18-5v12L3 13v-2zM11.6 16.8a3 3 0 11-5.8-1.6" />
          </svg>
          {label}
        </Link>
      </div>
    </div>
  );
}
