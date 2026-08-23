import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return new NextResponse("Lien invalide.", { status: 400 });
  }

  const subscriber = await prisma.newsletterSubscriber.findFirst({
    where: { confirmToken: token },
  });

  if (!subscriber) {
    return new NextResponse("Lien invalide ou déjà utilisé.", { status: 400 });
  }

  await prisma.newsletterSubscriber.update({
    where: { id: subscriber.id },
    data: { confirmed: true },
  });

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://adniamey2000.vercel.app";

  return NextResponse.redirect(
    new URL(`${siteUrl}/newsletter-choice?token=${token}`)
  );
}
