import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin, unauthorized } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  const departments = await prisma.department.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json({ departments });
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

  const department = await prisma.department.create({
    data: {
      nameFr: body.nameFr || "",
      nameEn: body.nameEn || "",
      descFr: body.descFr || "",
      descEn: body.descEn || "",
      imageUrl: body.imageUrl || null,
    },
  });

  revalidatePath("/", "layout");
  return NextResponse.json({ department });
}
