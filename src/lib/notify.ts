import { prisma } from "@/lib/prisma";
import { sendMail, isMailConfigured } from "@/lib/mail";
import { SITE_URL } from "@/lib/email-templates";
import {
  eventNotificationTemplate,
  sermonNotificationTemplate,
} from "@/lib/email-templates";
import { toDetailPath } from "@/lib/slug";

const SITE = SITE_URL.replace(/\/+$/, "");

export async function notifyNewEvent(event: {
  id: number;
  titleFr: string;
  titleEn: string;
  date: Date;
  time: string;
  place: string;
  summaryFr: string;
  summaryEn: string;
}) {
  if (!isMailConfigured()) return;

  const subscribers = await prisma.newsletterSubscriber.findMany({
    where: { confirmed: true },
    select: { email: true, lang: true },
  });
  if (subscribers.length === 0) return;

  const dateStr = event.date.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  for (const sub of subscribers) {
    const lang = (sub.lang === "en" ? "en" : "fr") as "fr" | "en";
    const title = lang === "en" ? event.titleEn || event.titleFr : event.titleFr;
    const summary = lang === "en" ? event.summaryEn || event.summaryFr : event.summaryFr;
    const detailPath = toDetailPath("evenements", event.id, event.titleFr, lang);
    const detailUrl = `${SITE}${detailPath}`;

    sendMail({
      to: sub.email,
      subject: lang === "en" ? `New Event: ${title}` : `Nouvel événement : ${title}`,
      html: eventNotificationTemplate({
        title,
        date: dateStr,
        time: event.time,
        place: event.place,
        summary,
        detailUrl,
        lang,
      }),
    }).catch((err) => console.error(`Newsletter event email failed for ${sub.email}:`, err));
  }
}

export async function notifyNewSermon(sermon: {
  id: number;
  titleFr: string;
  titleEn: string;
  date: Date;
  speaker: string;
  summaryFr: string;
  summaryEn: string;
}) {
  if (!isMailConfigured()) return;

  const subscribers = await prisma.newsletterSubscriber.findMany({
    where: { confirmed: true },
    select: { email: true, lang: true },
  });
  if (subscribers.length === 0) return;

  const dateStr = sermon.date.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  for (const sub of subscribers) {
    const lang = (sub.lang === "en" ? "en" : "fr") as "fr" | "en";
    const title = lang === "en" ? sermon.titleEn || sermon.titleFr : sermon.titleFr;
    const summary = lang === "en" ? sermon.summaryEn || sermon.summaryFr : sermon.summaryFr;
    const detailPath = toDetailPath("sermons", sermon.id, sermon.titleFr, lang);
    const detailUrl = `${SITE}${detailPath}`;

    sendMail({
      to: sub.email,
      subject: lang === "en" ? `New Sermon: ${title}` : `Nouveau sermon : ${title}`,
      html: sermonNotificationTemplate({
        title,
        speaker: sermon.speaker,
        date: dateStr,
        videoUrl: "", // video URL not in email body directly, link goes to detail page
        summary,
        detailUrl,
        lang,
      }),
    }).catch((err) => console.error(`Newsletter sermon email failed for ${sub.email}:`, err));
  }
}
