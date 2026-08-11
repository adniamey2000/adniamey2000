import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin, unauthorized } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  const announcements = await prisma.announcement.findMany({
    orderBy: [{ date: "desc" }, { createdAt: "desc" }],
  });
  return NextResponse.json({ announcements });
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

  const announcement = await prisma.announcement.create({
    data: {
      titleFr: body.titleFr || "",
      titleEn: body.titleEn || "",
      contentFr: body.contentFr || "",
      contentEn: body.contentEn || "",
      date: new Date(body.date || new Date().toISOString()),
      isPublished: body.isPublished === "true" || body.isPublished === "on",
    },
  });

  revalidatePath("/", "layout");
  return NextResponse.json({ announcement });
}
