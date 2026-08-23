import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin, unauthorized } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  const settings = await prisma.siteSetting.findMany();
  return NextResponse.json({ settings });
}

export async function PUT(request: Request) {
  const session = await requireAdmin();
  if (!session) return unauthorized();

  let body: {
    addressFr?: string;
    addressEn?: string;
    phoneFr?: string;
    phoneEn?: string;
    emailFr?: string;
    emailEn?: string;
    themeYearFr?: string;
    themeYearEn?: string;
    themeTextFr?: string;
    themeTextEn?: string;
    verseYearFr?: string;
    verseYearEn?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const values = {
    address: { valueFr: body.addressFr ?? "", valueEn: body.addressEn ?? "" },
    phone: { valueFr: body.phoneFr ?? "", valueEn: body.phoneEn ?? "" },
    email: { valueFr: body.emailFr ?? "", valueEn: body.emailEn ?? "" },
    themeYear: { valueFr: body.themeYearFr ?? "", valueEn: body.themeYearEn ?? "" },
    themeText: { valueFr: body.themeTextFr ?? "", valueEn: body.themeTextEn ?? "" },
    verseYear: { valueFr: body.verseYearFr ?? "", valueEn: body.verseYearEn ?? "" },
  };

  await prisma.$transaction(
    Object.entries(values).map(([key, value]) =>
      prisma.siteSetting.upsert({
        where: { key },
        create: { key, ...value },
        update: value,
      })
    )
  );

  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
