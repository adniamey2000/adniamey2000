"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { churchName, type Locale, locales } from "@/lib/i18n";

export default function MobileMenu({
  lang,
  links,
}: {
  lang: Locale;
  links: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    const full = `/${lang}${href}`;
    if (href === "") return pathname === full;
    return pathname === full || pathname.startsWith(full + "/");
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Menu"
        onClick={() => setOpen(true)}
        className="flex h-10 w-10 items-center justify-center rounded-md text-ink transition hover:bg-primary-soft lg:hidden"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex flex-col bg-white">
            <div className="flex h-16 items-center justify-between border-b border-primary-soft px-4 sm:px-6">
              <Link href={`/${lang}`} className="flex items-center gap-3" onClick={() => setOpen(false)}>
                <Image
                  src="/adlogo.jpg"
                  alt={churchName}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <span className="font-serif text-lg font-bold tracking-tight text-ink">
                  {churchName}
                </span>
              </Link>
              <button
                type="button"
                aria-label="Fermer le menu"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-md text-ink transition hover:bg-primary-soft"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-1 flex-col items-center justify-center gap-2 px-6">
              {links.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={`/${lang}${link.href}`}
                    onClick={() => setOpen(false)}
                    className={`w-full rounded-2xl px-4 py-3 text-center font-serif text-2xl font-bold transition ${
                      active
                        ? "bg-primary-soft text-primary-dark ring-1 ring-primary/20"
                        : "text-ink hover:bg-primary-soft hover:text-primary-dark"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex flex-col items-center gap-4 border-t border-primary-soft px-6 py-6">
              <div className="flex items-center gap-1 rounded-full bg-primary-soft p-1">
                {locales.map((l) => (
                  <Link
                    key={l}
                    href={`/${l}`}
                    className={`rounded-full px-3.5 py-1.5 text-sm font-semibold uppercase transition ${
                      lang === l
                        ? "bg-primary-dark text-white"
                        : "text-primary-dark hover:bg-white"
                    }`}
                  >
                    {l}
                  </Link>
                ))}
              </div>
              <p className="text-xs text-muted">© {churchName}</p>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
