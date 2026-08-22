import type { Metadata } from "next";
import { type Locale, getDict } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDict(lang);
  return {
    title: `${dict.conditions.title} — AD Niamey 2000`,
    description:
      lang === "fr"
        ? "Conditions d'utilisation du site web de l'Assemblée de Dieu Niamey 2000."
        : "Terms of service for the Assemblies of God Niamey 2000 website.",
  };
}

export default async function ConditionsPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = getDict(lang);
  const c = dict.conditions;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-serif text-3xl font-bold text-ink">{c.title}</h1>
      <p className="mt-2 text-sm text-muted">{c.updated}</p>

      <div className="prose-sm mt-8 space-y-6 text-ink/85 leading-relaxed">
        <section>
          <h2 className="font-serif text-lg font-bold text-ink">{c.s1Title}</h2>
          <p>{c.s1Text}</p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-bold text-ink">{c.s2Title}</h2>
          <p>{c.s2Text}</p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-bold text-ink">{c.s3Title}</h2>
          <p>{c.s3Text}</p>
          <ul className="list-disc pl-5 space-y-1">
            {c.s3List.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-lg font-bold text-ink">{c.s4Title}</h2>
          <p>{c.s4Text}</p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-bold text-ink">{c.s5Title}</h2>
          <p>{c.s5Text}</p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-bold text-ink">{c.s6Title}</h2>
          <p>
            {c.s6Text}{" "}
            <a
              href="mailto:adniamey2000@gmail.com"
              className="font-semibold text-primary-dark hover:underline"
            >
              adniamey2000@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
