import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="overflow-hidden">
      <div>
        <h1 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
          Messages de contact
        </h1>
        <p className="mt-1 text-sm text-muted">
          {unreadCount > 0
            ? `${unreadCount} non lu${unreadCount > 1 ? "s" : ""} · ${messages.length} au total`
            : `${messages.length} message${messages.length > 1 ? "s" : ""} au total`}
        </p>
      </div>

      <div className="mt-8 space-y-3">
        {messages.length === 0 && (
          <div className="rounded-2xl border border-dashed border-primary-soft bg-white p-10 text-center text-sm text-muted">
            Aucun message pour le moment.
          </div>
        )}

        {messages.map((msg) => (
          <Link
            key={msg.id}
            href={`/espace-prive-ad-niamey-2000/messages/${msg.id}`}
            className={`flex items-center gap-3 overflow-hidden rounded-xl border px-4 py-3 transition hover:shadow-sm ${
              msg.read
                ? "border-slate-200 bg-white"
                : "border-primary bg-primary-soft/30"
            }`}
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate text-sm font-semibold text-ink">{msg.name}</span>
                {!msg.read && (
                  <span className="shrink-0 rounded-full bg-primary-dark px-2 py-0.5 text-[10px] font-bold text-white">
                    ●
                  </span>
                )}
                {msg.subject && (
                  <span className="truncate text-xs text-muted">— {msg.subject}</span>
                )}
              </div>
              <p className="mt-0.5 truncate text-xs text-muted/60">
                {msg.email}
              </p>
            </div>
            <p className="shrink-0 text-[11px] text-muted">
              {formatDate(msg.createdAt)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
