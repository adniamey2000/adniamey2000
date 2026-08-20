import { NextResponse } from "next/server";
import { ApiClient, BibleClient } from "@youversion/platform-core";
import { dayOfYear, type Verse } from "@/lib/verses";

export const dynamic = "force-dynamic";

const FRENCH_BIBLE_ID = Number(process.env.YVP_FRENCH_BIBLE_ID ?? "1160");

async function fetchYouVersion(): Promise<Verse | null> {
  const key = process.env.YVP_APP_KEY ?? process.env.YOUVERSION_API_KEY ?? "";
  if (!key) return null;

  try {
    const apiClient = new ApiClient({ appKey: key });
    const bibleClient = new BibleClient(apiClient);

    const votd = await bibleClient.getVOTD(dayOfYear());
    const passage = await bibleClient.getPassage(
      FRENCH_BIBLE_ID,
      votd.passage_id,
      "text",
      undefined,
      undefined,
      false
    );
    if (!passage?.content) return null;

    const text = passage.content
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim();
    if (!text) return null;

    return {
      text,
      reference: passage.reference || votd.passage_id.replace(/_/g, " "),
    };
  } catch {
    return null;
  }
}

async function fetchOurManna(): Promise<Verse | null> {
  try {
    const res = await fetch(
      "https://beta.ourmanna.com/api/v1/get?format=json&order=daily",
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return null;

    const json = await res.json();
    const text = json?.verse?.details?.text;
    const reference = json?.verse?.details?.reference;
    if (
      typeof text !== "string" ||
      !text.trim() ||
      typeof reference !== "string"
    ) {
      return null;
    }

    return { text: text.trim(), reference: reference.trim() };
  } catch {
    return null;
  }
}

async function translateText(text: string): Promise<string | null> {
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=fr&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data) || !Array.isArray(data[0])) return null;
    const translated = data[0]
      .map((seg: unknown[]) => (Array.isArray(seg) ? seg[0] : ""))
      .join("")
      .trim();
    return translated || null;
  } catch {
    return null;
  }
}

async function translateToFrench(verse: Verse): Promise<Verse> {
  const [text, reference] = await Promise.all([
    translateText(verse.text),
    translateText(verse.reference),
  ]);
  if (!text) return verse;
  return { text, reference: reference ?? verse.reference };
}

export async function GET(req: Request) {
  const lang = new URL(req.url).searchParams.get("lang") ?? "fr";

  const fromYouVersion = await fetchYouVersion();
  const fromOurManna = fromYouVersion ? null : await fetchOurManna();
  let verse = fromYouVersion ?? fromOurManna ?? null;
  const source = fromYouVersion ? "youversion" : fromOurManna ? "ourmanna" : null;

  if (!verse) {
    return NextResponse.json({
      text: null,
      reference: null,
      date: new Date().toISOString().slice(0, 10),
      source: null,
    });
  }

  if (lang === "fr" && source === "ourmanna") {
    verse = await translateToFrench(verse);
  }

  return NextResponse.json({
    ...verse,
    date: new Date().toISOString().slice(0, 10),
    source,
  });
}
