import { del } from "@vercel/blob";
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

  // Extract pathname from /api/blob?pathname=...
  try {
    const url = new URL(image.url, "http://localhost");
    const pathname = url.searchParams.get("pathname");
    if (pathname) {
      await del(pathname);
    }
  } catch {
    // Blob may already be deleted
  }

  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
