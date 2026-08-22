import Link from "next/link";
import { getDict, type Locale } from "@/lib/i18n";

export default async function LangNotFound({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = getDict(lang);
  const nf = dict.notFound;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="text-7xl font-bold text-primary-soft">404</p>
      <h1 className="mt-4 font-serif text-2xl font-bold text-ink">{nf.title}</h1>
      <p className="mt-2 max-w-md text-muted">{nf.text}</p>
      <Link
        href={`/${lang}`}
        className="mt-8 inline-flex rounded-full bg-primary-dark px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
      >
        {nf.backHome}
      </Link>
    </div>
  );
}
