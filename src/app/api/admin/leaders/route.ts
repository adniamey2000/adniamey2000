import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin, unauthorized } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  const leaders = await prisma.leader.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json({ leaders });
}

export async function PUT(request: Request) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  let body: {
    leaders?: {
      name: string;
      titleFr: string;
      titleEn: string;
      bioFr?: string;
      bioEn?: string;
      imageUrl?: string | null;
    }[];
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const leaders = body.leaders ?? [];
  await prisma.$transaction(async (tx) => {
    await tx.leader.deleteMany();
    await tx.leader.createMany({
      data: leaders.map((leader, i) => ({
        name: leader.name || "",
        titleFr: leader.titleFr || "",
        titleEn: leader.titleEn || "",
        bioFr: leader.bioFr || "",
        bioEn: leader.bioEn || "",
        imageUrl: leader.imageUrl || null,
        sortOrder: i,
      })),
    });
  });

  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
