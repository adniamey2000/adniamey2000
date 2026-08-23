import { NextResponse } from "next/server";
import { ApiClient, BibleClient } from "@youversion/platform-core";
import { dayOfYear } from "@/lib/verses";

export const dynamic = "force-dynamic";

const VERSION_FR = 1588; // Louis Segond 1910
const VERSION_EN = 3034; // BSB (Berean Standard Bible, license-free)

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function emptyResponse() {
  return NextResponse.json({
    text: null,
    reference: null,
    date: new Date().toISOString().slice(0, 10),
    source: null,
  });
}

async function translateToFrench(text: string): Promise<string | null> {
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=fr&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data) || !Array.isArray(data[0])) return null;
    return data[0]
      .map((seg: unknown[]) => (Array.isArray(seg) ? seg[0] : ""))
      .join("")
      .trim() || null;
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  const lang = new URL(req.url).searchParams.get("lang") ?? "fr";
  const key = process.env.YVP_APP_KEY ?? process.env.YOUVERSION_API_KEY ?? "";

  try {
    if (!key) return emptyResponse();

    const apiClient = new ApiClient({ appKey: key });
    const bibleClient = new BibleClient(apiClient);

    let passageId: string | null = null;
    try {
      const votd = await bibleClient.getVOTD(dayOfYear());
      if (votd?.passage_id) passageId = votd.passage_id;
    } catch {}

    if (!passageId) return emptyResponse();

    const versionId = lang === "fr" ? VERSION_FR : VERSION_EN;

    try {
      const passage = await bibleClient.getPassage(versionId, passageId, "text");
      const text = stripHtml(passage.content);
      const reference = passage.reference?.trim();
      if (text) {
        return NextResponse.json({
          text,
          reference: reference || passageId.replace(/\./g, " "),
          date: new Date().toISOString().slice(0, 10),
          source: "youversion",
        });
      }
    } catch {}

    if (lang === "fr") {
      try {
        const passage = await bibleClient.getPassage(VERSION_EN, passageId, "text");
        const englishText = stripHtml(passage.content);
        const englishRef = passage.reference?.trim();
        if (englishText) {
          const translated = await translateToFrench(englishText);
          return NextResponse.json({
            text: translated || englishText,
            reference: englishRef || passageId.replace(/\./g, " "),
            date: new Date().toISOString().slice(0, 10),
            source: "youversion",
          });
        }
      } catch {}
    }

    return emptyResponse();
  } catch {
    return emptyResponse();
  }
}
