import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendMail, isMailConfigured } from "@/lib/mail";
import { newsletterConfirmTemplate } from "@/lib/email-templates";
import crypto from "crypto";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const existing = await prisma.newsletterSubscriber.findUnique({
    where: { email },
  });

  if (existing?.confirmed) {
    return NextResponse.json({ error: "already" }, { status: 409 });
  }

  const confirmToken = crypto.randomUUID();

  if (existing) {
    await prisma.newsletterSubscriber.update({
      where: { email },
      data: { confirmToken, confirmed: false },
    });
  } else {
    await prisma.newsletterSubscriber.create({
      data: { email, confirmToken, confirmed: false },
    });
  }

  if (isMailConfigured()) {
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://adniamey2000.vercel.app";
    const confirmUrl = `${siteUrl}/api/newsletter/confirm?token=${confirmToken}`;
    try {
      await sendMail({
        to: email,
        subject: "Confirmez votre inscription à la newsletter — AD Niamey 2000",
        html: newsletterConfirmTemplate({ confirmUrl }),
      });
    } catch (err) {
      console.error("[newsletter] erreur envoi mail de confirmation :", err);
    }
  }

  return NextResponse.json({ ok: true, confirmSent: true });
}
