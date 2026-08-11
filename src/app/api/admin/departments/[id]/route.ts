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
  const department = await prisma.department.findUnique({
    where: { id: Number(id) },
  });
  if (!department) {
    return NextResponse.json({ error: "Département introuvable" }, { status: 404 });
  }

  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const updated = await prisma.department.update({
    where: { id: department.id },
    data: {
      nameFr: body.nameFr ?? department.nameFr,
      nameEn: body.nameEn ?? department.nameEn,
      descFr: body.descFr ?? department.descFr,
      descEn: body.descEn ?? department.descEn,
      imageUrl: body.imageUrl ?? department.imageUrl,
    },
  });

  revalidatePath("/", "layout");
  return NextResponse.json({ department: updated });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  const { id } = await params;
  await prisma.department.deleteMany({ where: { id: Number(id) } });

  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
