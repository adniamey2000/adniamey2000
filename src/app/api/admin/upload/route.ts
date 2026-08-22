import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin";

const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  const form = await request.formData();
  const file = form.get("file");

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

  const ext = file.name.split(".").pop() || "jpg";
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const blob = await put(`uploads/${safeName}`, file, {
    access: "private",
    contentType: file.type,
    storeId: process.env.adniamey2000_STORE_ID,
  });

  return NextResponse.json({ url: `/api/blob?pathname=${encodeURIComponent(blob.pathname)}` });
}
