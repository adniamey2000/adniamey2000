import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function timeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "à l'instant";
  if (mins < 60) return `il y a ${mins} min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `il y a ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `il y a ${days}j`;
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short" }).format(date);
}

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  const unread = messages.filter((m) => !m.read).length;

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-ink">Messages</h1>
          <p className="mt-1 text-sm text-muted">
            {unread > 0 ? (
              <>
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-dark px-1.5 text-[11px] font-bold text-white">
                  {unread}
                </span>
                {" "}non lu{unread > 1 ? "s" : ""}
              </>
            ) : (
              <>{messages.length} message{messages.length !== 1 ? "s" : ""}</>
            )}
          </p>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-3 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-400">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 7l-10 6L2 7" />
            </svg>
          </div>
          <p className="text-sm text-muted">Aucun message pour le moment.</p>
        </div>
      ) : (
        <div className="mt-6 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {messages.map((msg) => (
            <Link
              key={msg.id}
              href={`/espace-prive-ad-niamey-2000/messages/${msg.id}`}
              className={`flex gap-4 px-5 py-4 transition hover:bg-slate-50/80 ${
                !msg.read ? "bg-primary-soft/20" : ""
              }`}
            >
              {/* Avatar */}
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${
                !msg.read ? "bg-primary-dark" : "bg-slate-300"
              }`}>
                {msg.name.charAt(0).toUpperCase()}
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <span className={`text-sm ${!msg.read ? "font-bold text-ink" : "font-medium text-ink/80"}`}>
                      {msg.name}
                    </span>
                    {msg.subject && (
                      <span className="ml-2 text-sm text-muted">
                        — {msg.subject}
                      </span>
                    )}
                  </div>
                  <span className="shrink-0 text-[11px] text-muted">
                    {timeAgo(msg.createdAt)}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted/60">{msg.email}</p>
                <p className="mt-1 line-clamp-1 text-sm text-muted">
                  {msg.message}
                </p>
              </div>

              {/* Unread dot */}
              {!msg.read && (
                <div className="mt-2 shrink-0">
                  <div className="h-2.5 w-2.5 rounded-full bg-primary-dark" />
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
