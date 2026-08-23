import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";
import {
  churchName,
  type Dict,
  type Locale,
} from "@/lib/i18n";
import { getSchedule, getSettings, settingValue } from "@/lib/site";

export default async function Footer({
  dict,
  lang,
}: {
  dict: Dict;
  lang: Locale;
}) {
  const [settings, schedule] = await Promise.all([
    getSettings(),
    getSchedule(lang),
  ]);

  const links = [
    { href: "", label: dict.nav.home },
    { href: "/a-propos", label: dict.nav.about },
    { href: "/evenements", label: dict.nav.events },
    { href: "/annonces", label: dict.nav.announcements },
    { href: "/sermons", label: dict.nav.sermons },
    { href: "/galerie", label: dict.nav.gallery },
    { href: "/contact", label: dict.nav.contact },
  ];

  const contactRows = [
    {
      label: settingValue(settings.address, "Niamey, Niger", lang),
      icon: (
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      ),
    },
    {
      label: settingValue(settings.phone, "+227 00 00 00 00", lang),
      icon: (
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
      ),
    },
    {
      label: settingValue(settings.email, "contact@adniamey2000.org", lang),
      icon: (
        <>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M22 7l-10 6L2 7" />
        </>
      ),
    },
  ];

  return (
    <footer className="mt-auto bg-ink text-white">
      <div className="h-1 bg-gradient-to-r from-primary via-primary-dark to-accent" />

      <div className="border-b border-white/10 bg-white/5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-10 sm:flex-row sm:px-6">
          <div className="text-center sm:text-left">
            <h3 className="font-serif text-lg font-bold">{dict.newsletter.title}</h3>
            <p className="mt-1 text-sm text-white/70">{dict.newsletter.text}</p>
          </div>
          <div className="w-full max-w-md">
            <NewsletterForm dict={dict} dark />
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/adlogo.jpg"
              alt={churchName}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
            <h3 className="font-serif text-lg font-bold">{churchName}</h3>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/85">
            {dict.footer.aboutText}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-primary-soft">
            {dict.footer.quickLinks}
          </h4>
          <ul className="mt-4 space-y-2.5">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={`/${lang}${link.href}`}
                  className="text-sm text-white/85 transition hover:text-primary-bright"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-primary-soft">
            {dict.footer.contactTitle}
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-white/85">
            {contactRows.map((row, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-0.5 shrink-0 text-primary-soft"
                >
                  {row.icon}
                </svg>
                <span>{row.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-primary-soft">
            {dict.footer.servicesTitle}
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-white/85">
            {schedule.map((service) => (
              <li key={service.name}>
                <p className="font-medium text-white">
                  {service.day} · {service.time}
                </p>
                <p className="text-white/60">{service.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6">
          <p className="text-center text-xs leading-relaxed text-white/60">
            © {new Date().getFullYear()} {churchName}. {dict.footer.rights}{" "}
            {dict.footer.madeWith}
          </p>
          <div className="flex items-center gap-4 text-xs text-white/60">
            <Link
              href={`/${lang}/conditions`}
              className="transition hover:text-white/90"
            >
              {dict.footer.terms}
            </Link>
            <span className="text-white/30">·</span>
            <Link
              href={`/${lang}/confidentialite`}
              className="transition hover:text-white/90"
            >
              {dict.footer.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
