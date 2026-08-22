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
    title: `${dict.confidentialite.title} — AD Niamey 2000`,
    description:
      lang === "fr"
        ? "Politique de confidentialité du site web de l'Assemblée de Dieu Niamey 2000."
        : "Privacy policy for the Assemblies of God Niamey 2000 website.",
  };
}

export default async function ConfidentialitePage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = getDict(lang);
  const p = dict.confidentialite;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-serif text-3xl font-bold text-ink">{p.title}</h1>
      <p className="mt-2 text-sm text-muted">{p.updated}</p>

      <div className="prose-sm mt-8 space-y-6 text-ink/85 leading-relaxed">
        <section>
          <h2 className="font-serif text-lg font-bold text-ink">{p.s1Title}</h2>
          <p>{p.s1Text}</p>
          <ul className="list-disc pl-5 space-y-1">
            {p.s1List.map((item, i) => (
              <li key={i}>
                <strong>{item.strong}</strong> {item.text}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-lg font-bold text-ink">{p.s2Title}</h2>
          <p>{p.s2Text}</p>
          <ul className="list-disc pl-5 space-y-1">
            {p.s2List.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-lg font-bold text-ink">{p.s3Title}</h2>
          <p>{p.s3Text}</p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-bold text-ink">{p.s4Title}</h2>
          <p>{p.s4Text}</p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-bold text-ink">{p.s5Title}</h2>
          <p>{p.s5Text}</p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-bold text-ink">{p.s6Title}</h2>
          <p>{p.s6Text}</p>
          <ul className="list-disc pl-5 space-y-1">
            {p.s6List.map((item, i) => (
              <li key={i}>
                <strong>{item.strong}</strong> {item.text}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-lg font-bold text-ink">{p.s7Title}</h2>
          <p>{p.s7Text}</p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-bold text-ink">{p.s8Title}</h2>
          <p>
            {p.s8Text}{" "}
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
