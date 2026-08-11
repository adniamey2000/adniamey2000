import { NextResponse } from "next/server";
import { resetPasswordTemplate } from "@/lib/email-templates";
import { isMailConfigured, sendMail } from "@/lib/mail";
import { prisma } from "@/lib/prisma";
import { createPasswordResetToken, resetTokenUrl } from "@/lib/reset-token";

export async function POST(request: Request) {
  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase() ?? "";
  if (!email) {
    return NextResponse.json({ error: "Adresse e-mail requise" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ ok: true });
  }

  const token = await createPasswordResetToken(user.id);
  const origin = new URL(request.url).origin;
  const resetUrl = resetTokenUrl(origin, token);

  if (isMailConfigured()) {
    await sendMail({
      to: user.email,
      subject: "Réinitialisation de votre mot de passe — AD Niamey 2000",
      html: resetPasswordTemplate({ resetUrl }),
    });
    return NextResponse.json({ ok: true });
  }

  console.log(
    `[reset-password] E-mail non configuré — lien de réinitialisation : ${resetUrl}`
  );
  return NextResponse.json({ ok: true, devLink: resetUrl });
}
