import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/PageHeader";
import DonationSection from "@/components/DonationSection";
import { getDict, isLocale } from "@/lib/i18n";
import { images } from "@/lib/images";
import { getSchedule, getSettings, settingValue } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDict(lang);
  return {
    title: `${dict.nav.contact} — AD Niamey 2000`,
    description: dict.meta.contactDescription,
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDict(lang);

  const [settings, schedule] = await Promise.all([
    getSettings(),
    getSchedule(lang),
  ]);

  const infos = [
    {
      label: dict.contact.addressLabel,
      value: settingValue(settings.address, "Niamey, Niger", lang),
      icon: (
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1116 0zM12 13a3 3 0 100-6 3 3 0 000 6z" />
      ),
    },
    {
      label: dict.contact.phoneLabel,
      value: settingValue(settings.phone, "+227 00 00 00 00", lang),
      icon: (
        <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.4 1.8.7 2.7a2 2 0 01-.5 2.1L8 9.6a16 16 0 006 6l1.1-1.1a2 2 0 012.1-.5c.9.3 1.8.6 2.7.7a2 2 0 011.7 2z" />
      ),
    },
    {
      label: dict.contact.emailLabel,
      value: settingValue(settings.email, "contact@adniamey2000.org", lang),
      icon: (
        <>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M22 7l-10 6L2 7" />
        </>
      ),
    },
    {
      label: dict.contact.hoursLabel,
      value: schedule.map((s) => `${s.day} : ${s.time}`).join(" · "),
      icon: (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" />
        </>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title={dict.contact.title}
        subtitle={dict.contact.subtitle}
        image={images.pageHeaders.contact}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="grid content-start gap-5 order-last lg:order-none">
            {infos.map((info) => (
              <div
                key={info.label}
                className="flex items-start gap-4 rounded-2xl border border-primary-soft bg-white p-5 shadow-sm"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary-dark">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {info.icon}
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary-dark">
                    {info.label}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {info.value}
                  </p>
                </div>
              </div>
            ))}

            <div className="overflow-hidden rounded-2xl border border-primary-soft shadow-sm">
              <iframe
                title="AD Niamey 2000"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124593.12987682352!2d2.020366421571413!3d13.512668411136536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x11c1cd2a0b4b7b1b%3A0x9d8b6f2e7a1e1c9e!2sNiamey%2C%20Niger!5e0!3m2!1sfr!2sne!4v1700000000000"
                className="h-64 w-full"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <ContactForm dict={dict} lang={lang} />
        </div>
      </section>

      <DonationSection dict={dict} />
    </div>
  );
}
