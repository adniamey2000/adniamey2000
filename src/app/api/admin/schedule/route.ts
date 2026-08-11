import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin, unauthorized } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  const items = await prisma.scheduleItem.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json({ items });
}

export async function PUT(request: Request) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  let body: { items?: { dayFr: string; dayEn: string; time: string; nameFr: string; nameEn: string }[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const items = body.items ?? [];
  await prisma.$transaction(async (tx) => {
    await tx.scheduleItem.deleteMany();
    await tx.scheduleItem.createMany({
      data: items.map((item, i) => ({
        dayFr: item.dayFr || "",
        dayEn: item.dayEn || "",
        time: item.time || "",
        nameFr: item.nameFr || "",
        nameEn: item.nameEn || "",
        sortOrder: i,
      })),
    });
  });

  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
