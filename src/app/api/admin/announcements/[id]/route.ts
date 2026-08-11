import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin, unauthorized } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  const { id } = await params;
  const announcement = await prisma.announcement.findUnique({
    where: { id: Number(id) },
  });
  if (!announcement) {
    return NextResponse.json({ error: "Annonce introuvable" }, { status: 404 });
  }

  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const updated = await prisma.announcement.update({
    where: { id: announcement.id },
    data: {
      titleFr: body.titleFr ?? announcement.titleFr,
      titleEn: body.titleEn ?? announcement.titleEn,
      contentFr: body.contentFr ?? announcement.contentFr,
      contentEn: body.contentEn ?? announcement.contentEn,
      date: body.date ? new Date(body.date) : announcement.date,
      isPublished:
        body.isPublished === "true" || body.isPublished === "on"
          ? true
          : body.isPublished === "false"
            ? false
            : announcement.isPublished,
    },
  });

  revalidatePath("/", "layout");
  return NextResponse.json({ announcement: updated });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  const { id } = await params;
  await prisma.announcement.deleteMany({ where: { id: Number(id) } });

  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
