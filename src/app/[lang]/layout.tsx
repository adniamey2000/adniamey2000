import { notFound } from "next/navigation";
import AnnouncementTicker from "@/components/AnnouncementTicker";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getDict, isLocale, pick } from "@/lib/i18n";
import { prisma } from "@/lib/prisma";

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDict(lang);

  const announcements = await prisma.announcement.findMany({
    where: { isPublished: true },
    orderBy: [{ date: "desc" }, { createdAt: "desc" }],
    take: 8,
  });
  const tickerItems = announcements.map((a) => ({
    id: a.id,
    text: pick(lang, a.titleFr, a.titleEn),
  }));

  return (
    <>
      <Header dict={dict} lang={lang} />
      <AnnouncementTicker
        items={tickerItems}
        label={dict.home.announcements.tickerLabel}
        href={`/${lang}/annonces`}
      />
      <main className="flex-1">{children}</main>
      <Footer dict={dict} lang={lang} />
      <BackToTop />
    </>
  );
}
