import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import DeleteMessageButton from "@/components/admin/DeleteMessageButton";
import ReplyForm from "@/components/admin/ReplyForm";

export const dynamic = "force-dynamic";

function formatFull(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
}

export default async function AdminMessageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const msg = await prisma.contactMessage.findUnique({
    where: { id: Number(id) },
    include: { replies: { orderBy: { createdAt: "asc" } } },
  });

  if (!msg) notFound();

  if (!msg.read) {
    await prisma.contactMessage.update({
      where: { id: msg.id },
      data: { read: true },
    });
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Back */}
      <Link
        href="/espace-prive-ad-niamey-2000/messages"
        className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-ink"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition group-hover:-translate-x-0.5">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Messages
      </Link>

      {/* Message card */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-dark text-sm font-bold text-white">
              {msg.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="truncate text-base font-bold text-ink">{msg.name}</p>
              <p className="truncate text-xs text-muted">{msg.email}</p>
              <p className="mt-0.5 text-[11px] text-muted/60">{formatFull(msg.createdAt)}</p>
            </div>
          </div>
          <DeleteMessageButton id={msg.id} />
        </div>

        {msg.subject && (
          <div className="border-b border-slate-100 px-6 py-3">
            <p className="text-sm font-semibold text-ink">{msg.subject}</p>
          </div>
        )}

        <div className="px-6 py-5">
          <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-ink/80">
            {msg.message}
          </p>
        </div>

        {msg.fileName && (
          <div className="mx-6 mb-5 flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-muted">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
            </svg>
            <span className="truncate text-sm text-muted">{msg.fileName}</span>
          </div>
        )}
      </div>

      {/* Previous replies */}
      {msg.replies.length > 0 && (
        <div className="mt-6 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            Réponses envoyées ({msg.replies.length})
          </p>
          {msg.replies.map((reply) => (
            <div
              key={reply.id}
              className="rounded-2xl border border-primary-soft bg-primary-soft/20 px-5 py-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-primary-dark">Vous</span>
                <span className="text-[11px] text-muted/60">{formatFull(reply.createdAt)}</span>
              </div>
              <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-relaxed text-ink/75">
                {reply.body}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Reply form */}
      <div className="mt-6">
        <ReplyForm messageId={msg.id} contactName={msg.name} />
      </div>
    </div>
  );
}
