import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin, unauthorized } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { notifyNewEvent } from "@/lib/notify";

export async function GET() {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  const events = await prisma.churchEvent.findMany({
    orderBy: { date: "asc" },
  });
  return NextResponse.json({ events });
}

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const event = await prisma.churchEvent.create({
    data: {
      titleFr: body.titleFr || "",
      titleEn: body.titleEn || "",
      date: new Date(body.date || new Date().toISOString()),
      time: body.time || "",
      place: body.place || "",
      summaryFr: body.summaryFr || "",
      summaryEn: body.summaryEn || "",
      imageUrl: body.imageUrl || null,
    },
  });

  revalidatePath("/", "layout");

  notifyNewEvent(event).catch((err) =>
    console.error("Event notification error:", err)
  );

  return NextResponse.json({ event });
}
