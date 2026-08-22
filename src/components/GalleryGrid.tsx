"use client";

import { useCallback, useEffect, useState } from "react";

type GalleryItem = {
  id: number;
  url: string;
  caption: string;
};

export default function GalleryGrid({ images }: { images: GalleryItem[] }) {
  const [activeId, setActiveId] = useState<number | null>(null);
  const activeIndex = images.findIndex((i) => i.id === activeId);
  const active = activeIndex >= 0 ? images[activeIndex] : null;

  const show = useCallback(
    (index: number) => {
      if (index < 0) index = images.length - 1;
      if (index >= images.length) index = 0;
      setActiveId(images[index]?.id ?? null);
    },
    [images]
  );

  useEffect(() => {
    if (active === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null);
      if (e.key === "ArrowRight") show(activeIndex + 1);
      if (e.key === "ArrowLeft") show(activeIndex - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, activeIndex, show]);

  if (images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {images.map((image) => (
          <button
            key={image.id}
            type="button"
            onClick={() => show(images.findIndex((i) => i.id === image.id))}
            className="group overflow-hidden rounded-2xl border border-slate-200 shadow-sm transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <div className="relative aspect-[3/2] w-full overflow-hidden">
              <img
                src={image.url}
                alt={image.caption || "Photo de la galerie"}
                loading="lazy"
                className="aspect-[3/2] w-full object-cover transition duration-300 group-hover:scale-105"
              />
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm"
          onClick={() => setActiveId(null)}
          role="dialog"
          aria-modal="true"
          aria-label={active.caption || "Aperçu de l'image"}
        >
          <button
            type="button"
            aria-label="Fermer"
            onClick={() => setActiveId(null)}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Image précédente"
            onClick={(e) => {
              e.stopPropagation();
              show(activeIndex - 1);
            }}
            className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-4"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Image suivante"
            onClick={(e) => {
              e.stopPropagation();
              show(activeIndex + 1);
            }}
            className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-4"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>

          <figure
            className="relative max-h-[85vh] max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={active.url}
              alt={active.caption || "Photo de la galerie"}
              loading="lazy"
              className="max-h-[80vh] w-auto rounded-lg object-contain shadow-2xl"
            />
            {active.caption && (
              <figcaption className="mt-3 text-center text-sm text-white/90">
                {active.caption}
              </figcaption>
            )}
          </figure>
        </div>
      )}
    </>
  );
}
