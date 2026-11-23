"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

type Slide = { title: string; highlight: string; subtitle: string };

function subscribeReduceMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
function getReduceMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function getReduceMotionServerSnapshot() {
  return false;
}

export default function HeroCarousel({
  slides,
  cta1,
  cta2,
  lang,
}: {
  slides: Slide[];
  cta1: string;
  cta2: string;
  lang: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useSyncExternalStore(
    subscribeReduceMotion,
    getReduceMotionSnapshot,
    getReduceMotionServerSnapshot
  );
  const count = slides.length;
  const en = lang === "en";

  const labels = en
    ? {
        carousel: "Church news",
        prev: "Previous slide",
        next: "Next slide",
        choose: "Choose a slide",
        slide: (n: number) => `Slide ${n}`,
      }
    : {
        carousel: "Actualités de l'église",
        prev: "Slide précédente",
        next: "Slide suivante",
        choose: "Choisir une slide",
        slide: (n: number) => `Slide ${n}`,
      };

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count]
  );

  useEffect(() => {
    if (paused || reduceMotion || count <= 1) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => clearInterval(timer);
  }, [paused, reduceMotion, count]);

  return (
    <div
      className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-16 text-left sm:px-6 md:py-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      aria-roledescription="carrousel"
      aria-label={labels.carousel}
    >
      <div className="min-h-[230px] sm:min-h-[260px]">
        <span className="mb-4 block h-1 w-14 bg-primary-bright" aria-hidden="true" />
        <h1
          key={`title-${index}`}
          className="fade-up max-w-3xl font-serif text-4xl font-bold leading-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl"
        >
          {slides[index].title}{" "}
          <span className="text-primary-bright">{slides[index].highlight}</span>
        </h1>
        <p
          key={`sub-${index}`}
          className="fade-up max-w-2xl text-base leading-relaxed text-white drop-shadow-md sm:text-lg"
        >
          {slides[index].subtitle}
        </p>
      </div>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        <Link
          href={`/${lang}/contact`}
          className="inline-flex items-center justify-center rounded-md border border-primary bg-primary px-7 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
        >
          {cta1}
        </Link>
        <Link
          href={`/${lang}/sermons`}
          className="inline-flex items-center justify-center rounded-md border border-white/50 bg-transparent px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          {cta2}
        </Link>
      </div>

      {count > 1 && (
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label={labels.prev}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-white/40 text-white transition hover:bg-white/10"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="flex items-center gap-2" role="tablist" aria-label={labels.choose}>
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={labels.slide(i + 1)}
                onClick={() => go(i)}
                className={`h-2 rounded-sm transition-all ${
                  i === index ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label={labels.next}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-white/40 text-white transition hover:bg-white/10"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
