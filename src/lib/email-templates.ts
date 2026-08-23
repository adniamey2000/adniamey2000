export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://adniamey2000.org";

const COLORS = {
  primary: "#5256c7",
  primaryDark: "#3a41c7",
  bright: "#b0b2ea",
  soft: "#eef0fb",
  softLight: "#f7f8fe",
  ink: "#1b2a4a",
  muted: "#5b6b8c",
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function layout(title: string, content: string) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)} — AD Niamey 2000</title>
</head>
<body style="margin:0;padding:0;background-color:${COLORS.soft};font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.soft};padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 12px 34px rgba(27,42,74,0.14);">
          <!-- En-tête -->
          <tr>
            <td style="background:${COLORS.primaryDark};padding:30px 32px;text-align:center;">
              <img src="${SITE_URL}/adlogo.jpg" alt="AD Niamey 2000" width="64" height="64" style="width:64px;height:64px;border-radius:50%;border:3px solid ${COLORS.bright};display:inline-block;" />
              <p style="margin:14px 0 0;color:#ffffff;font-family:Georgia,serif;font-size:22px;font-weight:bold;letter-spacing:0.5px;">AD Niamey 2000</p>
              <p style="margin:4px 0 0;color:${COLORS.bright};font-family:Georgia,serif;font-size:13px;">Assemblée de Dieu Niamey 2000</p>
            </td>
          </tr>
          <tr>
            <td style="background:${COLORS.primary};height:6px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <!-- Contenu -->
          <tr>
            <td style="padding:38px 34px;">
              ${content}
            </td>
          </tr>
          <!-- Citation biblique -->
          <tr>
            <td style="background:${COLORS.softLight};padding:24px 34px;border-top:1px solid ${COLORS.soft};">
              <p style="margin:0;color:${COLORS.ink};font-family:Georgia,serif;font-size:14px;font-style:italic;line-height:1.7;text-align:center;">
                « Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle. »
                <br/>
                <span style="color:${COLORS.primaryDark};font-weight:bold;">— Jean 3:16</span>
              </p>
            </td>
          </tr>
          <!-- Pied de page -->
          <tr>
            <td style="background:${COLORS.soft};padding:22px 32px;text-align:center;">
              <p style="margin:0;color:${COLORS.muted};font-family:Georgia,serif;font-size:12px;line-height:1.7;">
                <a href="${SITE_URL}" style="color:${COLORS.primaryDark};text-decoration:none;font-weight:bold;">${SITE_URL.replace(/^https?:\/\//, "")}</a><br/>
                © ${new Date().getFullYear()} AD Niamey 2000 — Tous droits réservés.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function heading(text: string) {
  return `<p style="margin:0;color:${COLORS.ink};font-family:Georgia,serif;font-size:19px;font-weight:bold;">${escapeHtml(text)}</p>`;
}

function text(content: string, opts: { muted?: boolean; small?: boolean } = {}) {
  const color = opts.muted ? COLORS.muted : COLORS.ink;
  const size = opts.small ? 13 : 15;
  return `<p style="margin:16px 0 0;color:${color};font-family:Georgia,serif;font-size:${size}px;line-height:1.7;">${escapeHtml(content)}</p>`;
}

function field(label: string, value: string) {
  const safe = escapeHtml(value).replace(/\n/g, "<br/>");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:18px;">
    <tr>
      <td style="color:${COLORS.primaryDark};font-family:Georgia,serif;font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:1.2px;">${escapeHtml(label)}</td>
    </tr>
    <tr>
      <td style="color:${COLORS.ink};font-family:Georgia,serif;font-size:15px;line-height:1.7;padding-top:5px;word-break:break-word;">${safe}</td>
    </tr>
  </table>`;
}

function ctaButton(url: string, label: string) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding-top:26px;">
        <a href="${url}" style="display:inline-block;background:${COLORS.primaryDark};color:#ffffff;font-family:Georgia,serif;font-size:15px;font-weight:bold;padding:14px 34px;border-radius:999px;text-decoration:none;box-shadow:0 6px 18px rgba(16,24,229,0.3);">${escapeHtml(label)}</a>
      </td>
    </tr>
  </table>`;
}

export function contactTemplate({
  name,
  email,
  subject,
  message,
  fileName,
  lang,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
  fileName?: string;
  lang: "fr" | "en";
}) {
  const isEn = lang === "en";
  const content = `
    ${heading(isEn ? "New message from the contact form" : "Nouveau message depuis le formulaire de contact")}
    ${field(isEn ? "Name" : "Nom", name)}
    ${field("E-mail", email)}
    ${field(isEn ? "Subject" : "Sujet", subject || "—")}
    ${field(isEn ? "Message" : "Message", message)}
    ${field(isEn ? "Attached document" : "Document joint", fileName ?? (isEn ? "None" : "Aucun"))}
  `;
  return layout(isEn ? "New message" : "Nouveau message", content);
}

export function resetPasswordTemplate({
  resetUrl,
  expiresInHours = 1,
}: {
  resetUrl: string;
  expiresInHours?: number;
}) {
  const content = `
    ${heading("Réinitialisation de votre mot de passe")}
    ${text("Vous avez demandé à réinitialiser le mot de passe de votre compte administrateur AD Niamey 2000.")}
    ${ctaButton(resetUrl, "Réinitialiser mon mot de passe")}
    ${text(`Ce lien expire dans ${expiresInHours} heure${expiresInHours > 1 ? "s" : ""}. Si vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet e-mail : votre mot de passe ne sera pas modifié.`, { muted: true, small: true })}
  `;
  return layout("Réinitialisation de mot de passe", content);
}

export function newsletterTemplate({
  subject,
  message,
}: {
  subject: string;
  message: string;
}) {
  const safe = escapeHtml(message).replace(/\n/g, "<br/>");
  const content = `
    ${heading(subject)}
    <div style="margin:18px 0 0;color:${COLORS.ink};font-family:Georgia,serif;font-size:15px;line-height:1.75;">${safe}</div>
    ${text(`Pour ne plus recevoir nos e-mails, contactez-nous ou écrivez-nous à l'église.`, { muted: true, small: true })}
  `;
  return layout(subject, content);
}

export function newsletterConfirmTemplate({
  confirmUrl,
}: {
  confirmUrl: string;
}) {
  const content = `
    ${heading("Confirmez votre inscription")}
    ${text("Merci de vous être inscrit(e) à la newsletter de l'AD Niamey 2000. Veuillez cliquer sur le bouton ci-dessous pour confirmer votre adresse e-mail.")}
    ${ctaButton(confirmUrl, "Confirmer mon inscription")}
    ${text("Si vous n'avez pas demandé cette inscription, vous pouvez ignorer cet e-mail.", { muted: true, small: true })}
  `;
  return layout("Confirmation d'inscription", content);
}

export function eventNotificationTemplate({
  title,
  date,
  time,
  place,
  summary,
  detailUrl,
  lang,
}: {
  title: string;
  date: string;
  time: string;
  place: string;
  summary: string;
  detailUrl: string;
  lang: "fr" | "en";
}) {
  const isEn = lang === "en";
  const content = `
    ${heading(isEn ? "New Event" : "Nouvel événement")}
    ${text(isEn ? "A new event has been published on the AD Niamey 2000 website:" : "Un nouvel événement a été publié sur le site de l'AD Niamey 2000 :")}
    ${field(isEn ? "Event" : "Événement", title)}
    ${field(isEn ? "Date" : "Date", date)}
    ${field(isEn ? "Time" : "Heure", time || (isEn ? "N/A" : "N/C"))}
    ${field(isEn ? "Location" : "Lieu", place || (isEn ? "N/A" : "N/C"))}
    ${field(isEn ? "Summary" : "Résumé", summary || "—")}
    ${ctaButton(detailUrl, isEn ? "View event" : "Voir l'événement")}
    ${text(isEn ? "To unsubscribe from these notifications, contact us at the church." : "Pour ne plus recevoir ces notifications, contactez-nous à l'église.", { muted: true, small: true })}
  `;
  return layout(isEn ? "New Event" : "Nouvel événement", content);
}

export function sermonNotificationTemplate({
  title,
  speaker,
  date,
  videoUrl,
  summary,
  detailUrl,
  lang,
}: {
  title: string;
  speaker: string;
  date: string;
  videoUrl: string;
  summary: string;
  detailUrl: string;
  lang: "fr" | "en";
}) {
  const isEn = lang === "en";
  const content = `
    ${heading(isEn ? "New Sermon" : "Nouveau sermon")}
    ${text(isEn ? "A new sermon has been published on the AD Niamey 2000 website:" : "Un nouveau sermon a été publié sur le site de l'AD Niamey 2000 :")}
    ${field(isEn ? "Sermon" : "Sermon", title)}
    ${field(isEn ? "Speaker" : "Prédicateur", speaker || "—")}
    ${field(isEn ? "Date" : "Date", date)}
    ${field(isEn ? "Summary" : "Résumé", summary || "—")}
    ${ctaButton(detailUrl, isEn ? "Watch sermon" : "Voir le sermon")}
    ${videoUrl ? ctaButton(videoUrl, isEn ? "Watch on YouTube" : "Voir sur YouTube") : ""}
    ${text(isEn ? "To unsubscribe from these notifications, contact us at the church." : "Pour ne plus recevoir ces notifications, contactez-nous à l'église.", { muted: true, small: true })}
  `;
  return layout(isEn ? "New Sermon" : "Nouveau sermon", content);
}

export function contactAutoReplyTemplate({
  name,
  lang,
}: {
  name: string;
  lang: "fr" | "en";
}) {
  const isEn = lang === "en";
  const content = `
    ${heading(isEn ? "Thank you for contacting us" : "Merci de nous avoir contactés")}
    ${text(isEn
      ? `Dear ${escapeHtml(name)}, we have received your message and our team will get back to you as soon as possible.`
      : `Cher(e) ${escapeHtml(name)}, nous avons bien reçu votre message. Notre équipe vous répondra dans les plus brefs délais.`)}
    ${text(isEn
      ? "We thank you for your interest and pray that God blesses you."
      : "Nous vous remercions de votre intérêt et prions que Dieu vous bénisse.", { muted: true })}
  `;
  return layout(isEn ? "Message received" : "Message bien reçu", content);
}
