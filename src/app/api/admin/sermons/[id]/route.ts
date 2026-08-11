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
  const sermon = await prisma.sermon.findUnique({ where: { id: Number(id) } });
  if (!sermon) {
    return NextResponse.json({ error: "Sermon introuvable" }, { status: 404 });
  }

  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const updated = await prisma.sermon.update({
    where: { id: sermon.id },
    data: {
      titleFr: body.titleFr ?? sermon.titleFr,
      titleEn: body.titleEn ?? sermon.titleEn,
      videoUrl: body.videoUrl ?? sermon.videoUrl,
      date: body.date ? new Date(body.date) : sermon.date,
      speaker: body.speaker ?? sermon.speaker,
      summaryFr: body.summaryFr ?? sermon.summaryFr,
      summaryEn: body.summaryEn ?? sermon.summaryEn,
    },
  });

  revalidatePath("/", "layout");
  return NextResponse.json({ sermon: updated });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  const { id } = await params;
  await prisma.sermon.deleteMany({ where: { id: Number(id) } });

  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
