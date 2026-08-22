"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "@/components/MobileMenu";
import { churchName, type Dict, type Locale, locales } from "@/lib/i18n";

export default function Header({ dict, lang }: { dict: Dict; lang: Locale }) {
  const pathname = usePathname();

  const links = [
    { href: "", label: dict.nav.home },
    { href: "/a-propos", label: dict.nav.about },
    { href: "/evenements", label: dict.nav.events },
    { href: "/annonces", label: dict.nav.announcements },
    { href: "/sermons", label: dict.nav.sermons },
    { href: "/galerie", label: dict.nav.gallery },
    { href: "/contact", label: dict.nav.contact },
  ];

  const isActive = (href: string) => {
    const full = `/${lang}${href}`;
    if (href === "") return pathname === full;
    return pathname === full || pathname.startsWith(full + "/");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-primary-soft bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href={`/${lang}`} className="flex items-center gap-3">
          <Image
            src="/adlogo.jpg"
            alt={churchName}
            width={40}
            height={40}
            className="h-12 w-12 rounded-full object-cover"
          />
          <span className="font-serif text-xl font-bold tracking-tight text-ink">
            {churchName}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={`/${lang}${link.href}`}
                className={`group relative text-base font-medium transition ${
                  active
                    ? "font-bold text-primary-dark"
                    : "text-ink/80 hover:text-primary-dark"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-primary-dark transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={`/${lang}/contact`}
            className="hidden rounded-full bg-primary-dark px-5 py-2 text-sm font-semibold text-white shadow-md shadow-primary/25 transition hover:opacity-90 lg:inline-flex"
          >
            {dict.actions.joinUs}
          </Link>
          <div className="flex items-center gap-1 rounded-full bg-primary-soft p-1">
            {locales.map((l) => {
              const switchPath = pathname.replace(`/${lang}`, `/${l}`) || `/${l}`;
              return (
                <Link
                  key={l}
                  href={switchPath}
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase transition ${
                    lang === l
                      ? "bg-primary-dark text-white"
                      : "text-primary-dark hover:bg-white"
                  }`}
                >
                  {l}
                </Link>
              );
            })}
          </div>
          <MobileMenu lang={lang} links={links} />
        </div>
      </div>
    </header>
  );
}
