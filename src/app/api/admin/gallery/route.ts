import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin, unauthorized } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  const form = await request.formData();
  const file = form.get("file");
  const captionFr = String(form.get("captionFr") ?? "");
  const captionEn = String(form.get("captionEn") ?? "");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Aucun fichier envoyé" }, { status: 400 });
  }
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json(
      { error: "Format d'image non pris en charge (JPG, PNG, WEBP ou GIF uniquement)" },
      { status: 400 }
    );
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "Image trop volumineuse (maximum 10 Mo)" },
      { status: 400 }
    );
  }

  const ext = path.extname(file.name).toLowerCase() || ".jpg";
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads", "gallery");
  await mkdir(dir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, safeName), buffer);

  const image = await prisma.galleryImage.create({
    data: {
      url: `/uploads/gallery/${safeName}`,
      captionFr,
      captionEn,
    },
  });

  revalidatePath("/", "layout");
  return NextResponse.json({ image });
}
