import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: { token?: string; lang?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const token = String(body.token ?? "");
  const lang = String(body.lang ?? "");
  if (!token || (lang !== "fr" && lang !== "en")) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const subscriber = await prisma.newsletterSubscriber.findFirst({
    where: { confirmToken: token },
  });

  if (!subscriber) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  await prisma.newsletterSubscriber.update({
    where: { id: subscriber.id },
    data: { lang, confirmToken: null },
  });

  return NextResponse.json({ ok: true });
}
