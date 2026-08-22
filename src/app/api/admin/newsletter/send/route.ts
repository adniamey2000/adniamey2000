import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin";
import { newsletterTemplate } from "@/lib/email-templates";
import { isMailConfigured, sendMail } from "@/lib/mail";
import { prisma } from "@/lib/prisma";

export const maxDuration = 300;

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  let body: { subject?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const subject = body.subject?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!subject || !message) {
    return NextResponse.json({ error: "Sujet et message requis" }, { status: 400 });
  }
  if (subject.length > 120) {
    return NextResponse.json({ error: "Le sujet est trop long (120 caractères max)" }, { status: 400 });
  }
  if (message.length > 10000) {
    return NextResponse.json({ error: "Le message est trop long (10 000 caractères max)" }, { status: 400 });
  }

  const subscribers = await prisma.newsletterSubscriber.findMany({
    where: { confirmed: true },
    select: { email: true },
  });
  if (subscribers.length === 0) {
    return NextResponse.json({ error: "Aucun abonné à la newsletter" }, { status: 400 });
  }

  const html = newsletterTemplate({ subject, message });

  if (!isMailConfigured()) {
    console.log(
      `[newsletter] SMTP non configuré — ${subscribers.length} destinataire(s) ignoré(s). Sujet : « ${subject} »`
    );
    return NextResponse.json({
      ok: true,
      dev: true,
      sent: 0,
      total: subscribers.length,
    });
  }

  const emails = [...new Set(subscribers.map((s) => s.email))];
  let sent = 0;
  const failed: string[] = [];

  for (const email of emails) {
    try {
      await sendMail({ to: email, subject: `[AD Niamey 2000] ${subject}`, html });
      sent++;
    } catch {
      failed.push(email);
    }
  }

  return NextResponse.json({ ok: true, sent, total: emails.length, failed });
}
