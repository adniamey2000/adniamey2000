import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import DeleteMessageButton from "@/components/admin/DeleteMessageButton";

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "full", timeStyle: "short" }).format(date);
}

export default async function AdminMessageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const msg = await prisma.contactMessage.findUnique({
    where: { id: Number(id) },
  });

  if (!msg) notFound();

  if (!msg.read) {
    await prisma.contactMessage.update({
      where: { id: msg.id },
      data: { read: true },
    });
  }

  return (
    <div className="overflow-hidden">
      <Link
        href="/espace-prive-ad-niamey-2000/messages"
        className="inline-flex items-center gap-2 text-sm font-medium text-primary-dark transition hover:text-ink"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Retour aux messages
      </Link>

      <div className="mt-6 rounded-2xl border border-primary-soft bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl font-bold text-ink">
              {msg.subject || "Sans sujet"}
            </h1>
            <p className="mt-1 text-sm text-muted">
              De : <span className="font-semibold text-ink">{msg.name}</span> ({msg.email})
            </p>
            <p className="mt-0.5 text-xs text-muted">
              {formatDate(msg.createdAt)}
            </p>
          </div>
          <DeleteMessageButton id={msg.id} />
        </div>

        <div className="mt-6 whitespace-pre-wrap break-words text-sm leading-relaxed text-ink/85">
          {msg.message}
        </div>

        {msg.fileName && (
          <div className="mt-4 rounded-xl border border-primary-soft bg-primary-soft/30 px-4 py-3 text-sm text-muted">
            📎 {msg.fileName}
          </div>
        )}

        <div className="mt-6">
          <a
            href={`mailto:${msg.email}?subject=${encodeURIComponent(`Re: ${msg.subject || "Votre message — AD Niamey 2000"}`)}`}
            className="inline-flex items-center gap-2 rounded-full bg-primary-dark px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 7l-10 6L2 7" />
            </svg>
            Répondre par e-mail
          </a>
        </div>
      </div>
    </div>
  );
}
