import { unlink } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin, unauthorized } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  const { id } = await params;
  const image = await prisma.galleryImage.findUnique({
    where: { id: Number(id) },
  });
  if (!image) {
    return NextResponse.json({ error: "Image introuvable" }, { status: 404 });
  }

  await prisma.galleryImage.delete({ where: { id: image.id } });

  const filePath = path.join(process.cwd(), "public", image.url.replace(/^\//, ""));
  try {
    await unlink(filePath);
  } catch {
    // Le fichier peut déjà avoir été supprimé ou être hors du dossier public.
  }

  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
