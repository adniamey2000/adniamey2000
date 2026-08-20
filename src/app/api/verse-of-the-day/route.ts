import { NextResponse } from "next/server";
import { ApiClient, BibleClient } from "@youversion/platform-core";
import { dayOfYear } from "@/lib/verses";

export const dynamic = "force-dynamic";

const BIBLE_IDS: Record<string, number> = {
  fr: Number(process.env.YVP_BIBLE_ID_FR ?? "1160"),
  en: Number(process.env.YVP_BIBLE_ID_EN ?? "59"),
};

export async function GET(req: Request) {
  const key = process.env.YVP_APP_KEY ?? process.env.YOUVERSION_API_KEY ?? "";
  if (!key) {
    return NextResponse.json(
      { text: null, reference: null, date: new Date().toISOString().slice(0, 10), source: null },
      { status: 500 }
    );
  }

  const lang = new URL(req.url).searchParams.get("lang") ?? "fr";
  const bibleId = BIBLE_IDS[lang] ?? BIBLE_IDS.fr;

  try {
    const apiClient = new ApiClient({ appKey: key });
    const bibleClient = new BibleClient(apiClient);

    const votd = await bibleClient.getVOTD(dayOfYear());
    if (!votd?.passage_id) {
      return NextResponse.json({
        text: null,
        reference: null,
        date: new Date().toISOString().slice(0, 10),
        source: null,
      });
    }

    const passage = await bibleClient.getPassage(
      bibleId,
      votd.passage_id,
      "text",
      undefined,
      undefined,
      false
    );

    const text = passage?.content
      ?.replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim();

    if (!text) {
      return NextResponse.json({
        text: null,
        reference: null,
        date: new Date().toISOString().slice(0, 10),
        source: null,
      });
    }

    return NextResponse.json({
      text,
      reference: passage.reference || votd.passage_id.replace(/_/g, " "),
      date: new Date().toISOString().slice(0, 10),
      source: "youversion",
    });
  } catch {
    return NextResponse.json({
      text: null,
      reference: null,
      date: new Date().toISOString().slice(0, 10),
      source: null,
    });
  }
}
