import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { sendMail, isMailConfigured } from "@/lib/mail";

export const runtime = "nodejs";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  const { id } = await params;
  const msg = await prisma.contactMessage.findUnique({
    where: { id: Number(id) },
  });
  if (!msg) {
    return NextResponse.json({ error: "Message introuvable" }, { status: 404 });
  }

  let body: { body?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const replyBody = (body.body ?? "").trim();
  if (!replyBody) {
    return NextResponse.json({ error: "Le message ne peut pas être vide" }, { status: 400 });
  }

  if (!isMailConfigured()) {
    return NextResponse.json(
      { error: "L'envoi d'emails n'est pas configuré (SMTP)" },
      { status: 503 }
    );
  }

  try {
    await sendMail({
      to: msg.email,
      subject: `Re: ${msg.subject || "Votre message — AD Niamey 2000"}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;">
          <p style="color:#555;">Bonjour <strong>${msg.name}</strong>,</p>
          <p style="color:#555;">Voici la réponse à votre message${msg.subject ? ` "${msg.subject}"` : ""} :</p>
          <div style="margin:20px 0;padding:16px;background:#f8f9fa;border-left:4px solid #5256C7;border-radius:8px;color:#333;">
            ${replyBody.replace(/\n/g, "<br>")}
          </div>
          <p style="color:#999;font-size:12px;margin-top:30px;">
            — AD Niamey 2000 · ${msg.email}
          </p>
        </div>
      `,
      replyTo: session.user.email,
    });

    await prisma.messageReply.create({
      data: {
        messageId: msg.id,
        userId: session.user.id,
        body: replyBody,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Reply email error:", err);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi de la réponse" },
      { status: 500 }
    );
  }
}
