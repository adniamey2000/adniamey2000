import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function PATCH(request: Request) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  let body: { currentPassword?: string; newPassword?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const current = body.currentPassword ?? "";
  const newPw = body.newPassword ?? "";

  if (!current || !newPw) {
    return NextResponse.json({ error: "Les deux mots de passe sont requis" }, { status: 400 });
  }
  if (newPw.length < 6) {
    return NextResponse.json({ error: "Le nouveau mot de passe doit faire au moins 6 caractères" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) return unauthorized();

  const valid = await bcrypt.compare(current, user.password);
  if (!valid) {
    return NextResponse.json({ error: "Mot de passe actuel incorrect" }, { status: 401 });
  }

  const hashed = await bcrypt.hash(newPw, 12);
  await prisma.user.update({ where: { id: user.id }, data: { password: hashed } });

  return NextResponse.json({ ok: true });
}
