import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin, unauthorized } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { notifyNewSermon } from "@/lib/notify";

export async function GET() {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  const sermons = await prisma.sermon.findMany({
    orderBy: { date: "desc" },
  });
  return NextResponse.json({ sermons });
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

  const sermon = await prisma.sermon.create({
    data: {
      titleFr: body.titleFr || "",
      titleEn: body.titleEn || "",
      videoUrl: body.videoUrl || "",
      date: new Date(body.date || new Date().toISOString()),
      speaker: body.speaker || "",
      summaryFr: body.summaryFr || "",
      summaryEn: body.summaryEn || "",
    },
  });

  revalidatePath("/", "layout");

  notifyNewSermon(sermon).catch((err) =>
    console.error("Sermon notification error:", err)
  );

  return NextResponse.json({ sermon });
}
