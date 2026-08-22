import { NextResponse } from "next/server";
import { contactTemplate } from "@/lib/email-templates";
import { isMailConfigured, sendMail } from "@/lib/mail";
import { prisma } from "@/lib/prisma";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FILE_BYTES = 10 * 1024 * 1024;
const ACCEPTED_MIME = /^(application\/pdf|text\/|application\/msword|application\/vnd\.|image\/)/;

function sanitizeFilename(filename: string) {
  const clean = filename.replace(/[^\w.\-() ]+/g, "").trim();
  return clean.slice(0, 120);
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const subject = String(form.get("subject") ?? "").trim();
  const message = String(form.get("message") ?? "").trim();
  const lang: "fr" | "en" = form.get("lang") === "en" ? "en" : "fr";

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Adresse e-mail invalide" }, { status: 400 });
  }

  const file = form.get("document");
  let attachment: { filename: string; content: Buffer } | undefined;
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json({ error: "Fichier trop volumineux" }, { status: 400 });
    }
    if (!ACCEPTED_MIME.test(file.type)) {
      return NextResponse.json({ error: "Type de fichier non autorisé" }, { status: 400 });
    }
    attachment = {
      filename: sanitizeFilename(file.name),
      content: Buffer.from(await file.arrayBuffer()),
    };
  }

  const fileName = attachment?.filename;

  try {
    await prisma.contactMessage.create({
      data: { name, email, subject, message, fileName },
    });
  } catch (err) {
    console.error("[contact] erreur sauvegarde message :", err);
  }

  if (!isMailConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[contact] SMTP non configuré — e-mail simulé :", {
        name,
        email,
        subject,
        message,
        fileName: fileName ?? null,
      });
      return NextResponse.json({ ok: true, simulated: true });
    }
    return NextResponse.json(
      { error: "Le service de messagerie n'est pas configuré" },
      { status: 500 }
    );
  }

  const to = process.env.CONTACT_TO ?? process.env.SMTP_USER;
  if (!to) {
    return NextResponse.json(
      { error: "Le service de messagerie n'est pas configuré" },
      { status: 500 }
    );
  }

  try {
    await sendMail({
      to,
      subject: `[Site] ${subject || "Nouveau message de contact"}`,
      html: contactTemplate({ name, email, subject, message, fileName, lang }),
      replyTo: email,
      attachments: attachment ? [attachment] : undefined,
    });
  } catch (err) {
    console.error("[contact] échec d'envoi :", err);
  }

  return NextResponse.json({ ok: true });
}
