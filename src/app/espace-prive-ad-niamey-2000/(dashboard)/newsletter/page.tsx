import DeleteButton from "@/components/admin/DeleteButton";
import NewsletterComposer from "@/components/admin/NewsletterComposer";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminNewsletterPage() {
  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { createdAt: "desc" },
  });

  const confirmedCount = subscribers.filter((s) => s.confirmed).length;

  return (
    <div>
      <div>
        <h1 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
          Newsletter
        </h1>
        <p className="mt-1 text-sm text-muted">
          {confirmedCount} abonné{confirmedCount > 1 ? "s" : ""} confirmé{confirmedCount > 1 ? "s" : ""} · {subscribers.length} inscription{subscribers.length > 1 ? "s" : ""} au total.
        </p>
      </div>

      <div className="mt-8">
        {subscribers.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-primary-soft bg-white p-10 text-center text-sm text-muted">
            Aucun abonné pour le moment.
          </div>
        ) : (
          <div className="space-y-3">
            {subscribers.map((sub) => (
              <div
                key={sub.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-primary-soft bg-white p-5 shadow-sm"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-serif text-base font-bold text-ink">{sub.email}</p>
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${sub.confirmed ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                      {sub.confirmed ? "Confirmé" : "En attente"}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted">
                    Inscrit le {new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeStyle: "short" }).format(sub.createdAt)}
                  </p>
                </div>
                <DeleteButton url={`/api/admin/newsletter/${sub.id}`} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-10">
        <NewsletterComposer subscriberCount={confirmedCount} />
      </div>
    </div>
  );
}
