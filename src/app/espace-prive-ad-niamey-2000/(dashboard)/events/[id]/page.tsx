import { notFound } from "next/navigation";
import EventForm from "@/components/admin/EventForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await prisma.churchEvent.findUnique({ where: { id: Number(id) } });
  if (!event) notFound();

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
        Modifier l&apos;événement
      </h1>
      <p className="mt-1 text-sm text-muted">{event.titleFr}</p>
      <div className="mt-8">
        <EventForm
          event={{
            ...event,
            date: event.date.toISOString(),
          }}
        />
      </div>
    </div>
  );
}
