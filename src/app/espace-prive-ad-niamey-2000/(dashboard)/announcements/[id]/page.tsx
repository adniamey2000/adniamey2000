import { notFound } from "next/navigation";
import AnnouncementForm from "@/components/admin/AnnouncementForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EditAnnouncementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const announcement = await prisma.announcement.findUnique({
    where: { id: Number(id) },
  });
  if (!announcement) notFound();

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
        Modifier l&apos;annonce
      </h1>
      <p className="mt-1 text-sm text-muted">
        {announcement.titleFr || announcement.titleEn}
      </p>
      <div className="mt-8">
        <AnnouncementForm
          announcement={{
            ...announcement,
            date: announcement.date.toISOString(),
          }}
        />
      </div>
    </div>
  );
}
