"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import MobileMenu from "@/components/MobileMenu";
import { churchName, type Dict, type Locale } from "@/lib/i18n";

const languageNames: Record<Locale, string> = {
  fr: "Français",
  en: "English",
};

function LanguageSelect({ lang, pathname }: { lang: Locale; pathname: string }) {
  const router = useRouter();
  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">Langue / Language</span>
      <select
        value={lang}
        onChange={(e) => {
          const next = e.target.value as Locale;
          const target = pathname.replace(`/${lang}`, `/${next}`) || `/${next}`;
          router.push(target);
        }}
        className="cursor-pointer appearance-none rounded-md border border-primary/15 bg-white py-2 pl-3 pr-8 text-sm font-semibold text-primary-dark outline-none transition hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary"
      >
        {(Object.keys(languageNames) as Locale[]).map((l) => (
          <option key={l} value={l}>
            {languageNames[l]}
          </option>
        ))}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="pointer-events-none absolute right-2.5 h-4 w-4 text-primary-dark"
      >
        <path
          fillRule="evenodd"
          d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
          clipRule="evenodd"
        />
      </svg>
    </label>
  );
}

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
    <header className="sticky top-0 z-40 border-b border-primary/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href={`/${lang}`} className="flex shrink-0 items-center gap-3">
          <Image
            src="/images/logo/logo-blue.jpeg"
            alt={churchName}
            width={48}
            height={48}
            priority
            className="h-12 w-12 object-contain"
          />
          <span className="font-serif text-lg font-bold tracking-tight text-ink">
            {churchName}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={`/${lang}${link.href}`}
                className={`group relative text-sm font-medium transition ${
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

        <div className="flex items-center gap-4">
          <Link
            href={`/${lang}/contact`}
            className="hidden rounded-md bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark lg:inline-flex"
          >
            {dict.actions.joinUs}
          </Link>
          <LanguageSelect lang={lang} pathname={pathname} />
          <MobileMenu lang={lang} links={links} />
        </div>
      </div>
    </header>
  );
}
