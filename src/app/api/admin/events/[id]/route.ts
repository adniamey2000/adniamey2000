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
  const event = await prisma.churchEvent.findUnique({
    where: { id: Number(id) },
  });
  if (!event) {
    return NextResponse.json({ error: "Événement introuvable" }, { status: 404 });
  }

  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const updated = await prisma.churchEvent.update({
    where: { id: event.id },
    data: {
      titleFr: body.titleFr ?? event.titleFr,
      titleEn: body.titleEn ?? event.titleEn,
      date: body.date ? new Date(body.date) : event.date,
      time: body.time ?? event.time,
      place: body.place ?? event.place,
      summaryFr: body.summaryFr ?? event.summaryFr,
      summaryEn: body.summaryEn ?? event.summaryEn,
      imageUrl: body.imageUrl ?? event.imageUrl,
    },
  });

  revalidatePath("/", "layout");
  return NextResponse.json({ event: updated });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  const { id } = await params;
  await prisma.churchEvent.deleteMany({ where: { id: Number(id) } });

  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
