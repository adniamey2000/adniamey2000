"use client";

import { useState } from "react";

export default function ShareButtons({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const [copied, setCopied] = useState(false);

  const fullUrl = typeof window !== "undefined" ? window.location.origin + url : "";
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedText = encodeURIComponent(title + " — AD Niamey 2000");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = fullUrl;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!fullUrl) return null;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-semibold text-muted">Partager :</span>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Partager sur Facebook"
        className="inline-flex items-center gap-2 rounded-full bg-[#1877F2] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#166FE5]"
      >
        Facebook
      </a>
      <a
        href={`https://wa.me/?text=${encodedText}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Partager sur WhatsApp"
        className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#20BD5A]"
      >
        WhatsApp
      </a>
      <a
        href={`https://www.instagram.com/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Partager sur Instagram"
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
      >
        Instagram
      </a>
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-ink transition hover:bg-slate-50"
      >
        {copied ? (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            Lien copié
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
            Copier le lien
          </>
        )}
      </button>
    </div>
  );
}
