import { NextResponse } from "next/server";
import { ApiClient, BibleClient } from "@youversion/platform-core";
import { dayOfYear } from "@/lib/verses";

export const dynamic = "force-dynamic";

function usfmToBibleApiRef(usfm: string): string {
  const BOOK_MAP: Record<string, string> = {
    GEN: "Genesis", EXO: "Exodus", LEV: "Leviticus", NUM: "Numbers",
    DEU: "Deuteronomy", JOS: "Joshua", JDG: "Judges", RUT: "Ruth",
    "1SA": "1 Samuel", "2SA": "2 Samuel", "1KI": "1 Kings", "2KI": "2 Kings",
    "1CH": "1 Chronicles", "2CH": "2 Chronicles", EZR: "Ezra", NEH: "Nehemiah",
    EST: "Esther", JOB: "Job", PSA: "Psalms", PRO: "Proverbs",
    ECC: "Ecclesiastes", SNG: "Song of Solomon", ISA: "Isaiah", JER: "Jeremiah",
    LAM: "Lamentations", EZK: "Ezekiel", DAN: "Daniel", HOS: "Hosea",
    JOL: "Joel", AMO: "Amos", OBA: "Obadiah", JON: "Jonah", MIC: "Micah",
    NAM: "Nahum", HAB: "Habakkuk", ZEP: "Zephaniah", HAG: "Haggai",
    ZEC: "Zechariah", MAL: "Malachi", MAT: "Matthew", MRK: "Mark",
    LUK: "Luke", JHN: "John", ACT: "Acts", ROM: "Romans", "1CO": "1 Corinthians",
    "2CO": "2 Corinthians", GAL: "Galatians", EPH: "Ephesians", PHP: "Philippians",
    COL: "Colossians", "1TH": "1 Thessalonians", "2TH": "2 Thessalonians",
    "1TI": "1 Timothy", "2TI": "2 Timothy", TIT: "Titus", PHM: "Philemon",
    HEB: "Hebrews", JAS: "James", "1PE": "1 Peter", "2PE": "2 Peter",
    "1JN": "1 John", "2JN": "2 John", "3JN": "3 John", JUD: "Jude", REV: "Revelation",
  };

  const parts = usfm.split(".");
  const bookCode = parts[0];
  const chapter = parts[1];
  const verse = parts[2] || "";
  const bookName = BOOK_MAP[bookCode] || bookCode;
  return verse ? `${bookName}+${chapter}:${verse}` : `${bookName}+${chapter}`;
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
    let passageId: string | null = null;

    if (key) {
      try {
        const apiClient = new ApiClient({ appKey: key });
        const bibleClient = new BibleClient(apiClient);
        const votd = await bibleClient.getVOTD(dayOfYear());
        if (votd?.passage_id) passageId = votd.passage_id;
      } catch {}
    }

    if (!passageId) {
      return NextResponse.json({
        text: null,
        reference: null,
        date: new Date().toISOString().slice(0, 10),
        source: null,
      });
    }

    const bibleApiRef = usfmToBibleApiRef(passageId);
    const translation = lang === "fr" ? "kjv" : "web";

    const res = await fetch(
      `https://bible-api.com/${bibleApiRef}?translation=${translation}`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) {
      return NextResponse.json({
        text: null,
        reference: null,
        date: new Date().toISOString().slice(0, 10),
        source: null,
      });
    }

    const json = await res.json();
    const text = json?.text?.trim();
    const reference = json?.reference?.trim();
    if (!text) {
      return NextResponse.json({
        text: null,
        reference: null,
        date: new Date().toISOString().slice(0, 10),
        source: null,
      });
    }

    if (lang === "fr") {
      const translated = await translateToFrench(text);
      const translatedRef = reference ? await translateToFrench(reference) : null;
      return NextResponse.json({
        text: translated || text,
        reference: translatedRef || reference || passageId.replace(/\./g, " "),
        date: new Date().toISOString().slice(0, 10),
        source: "youversion",
      });
    }

    return NextResponse.json({
      text,
      reference: reference || passageId.replace(/\./g, " "),
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
