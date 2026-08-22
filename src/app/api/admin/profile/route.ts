import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function PATCH(request: Request) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  let body: { name?: string; email?: string; imageUrl?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const updates: Record<string, string> = {};

  if (body.name !== undefined) updates.name = body.name.trim();
  if (body.imageUrl !== undefined) updates.imageUrl = body.imageUrl;

  if (body.email !== undefined) {
    const email = body.email.trim().toLowerCase();
    if (!email) {
      return NextResponse.json({ error: "Email requis" }, { status: 400 });
    }
    const existing = await prisma.user.findFirst({
      where: { email, NOT: { id: session.user.id } },
    });
    if (existing) {
      return NextResponse.json({ error: "Cet email est déjà utilisé" }, { status: 409 });
    }
    updates.email = email;
  }

  await prisma.user.update({ where: { id: session.user.id }, data: updates });

  return NextResponse.json({ ok: true });
}
