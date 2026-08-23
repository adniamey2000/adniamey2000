import { NextResponse } from "next/server";
import { ApiClient, BibleClient } from "@youversion/platform-core";
import { dayOfYear } from "@/lib/verses";

export const dynamic = "force-dynamic";

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

function usfmToBibleApiRef(usfm: string): string {
  const parts = usfm.split(".");
  const bookCode = parts[0];
  const chapter = parts[1];
  const verse = parts[2] || "";
  const bookName = BOOK_MAP[bookCode] || bookCode;
  return verse ? `${bookName}+${chapter}:${verse}` : `${bookName}+${chapter}`;
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
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|fr`;
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    const data = await res.json();
    const translated = data?.responseData?.translatedText;
    if (!translated || translated === text) return null;
    return translated.trim();
  } catch {
    return null;
  }
}

async function fetchFromBibleApi(ref: string, translation: string): Promise<{ text: string; reference: string } | null> {
  try {
    const res = await fetch(
      `https://bible-api.com/${ref}?translation=${translation}`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return null;
    const json = await res.json();
    const text = json?.text?.trim();
    const reference = json?.reference?.trim();
    if (!text) return null;
    return { text, reference: reference || ref.replace(/\./g, " ") };
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

    const bibleApiRef = usfmToBibleApiRef(passageId);

    if (lang === "fr") {
      const en = await fetchFromBibleApi(bibleApiRef, "web");
      if (!en) return emptyResponse();

      const translated = await translateToFrench(en.text);
      const translatedRef = await translateToFrench(en.reference);

      return NextResponse.json({
        text: translated || en.text,
        reference: translatedRef || en.reference,
        date: new Date().toISOString().slice(0, 10),
        source: "youversion",
      });
    }

    const en = await fetchFromBibleApi(bibleApiRef, "web");
    if (!en) return emptyResponse();

    return NextResponse.json({
      text: en.text,
      reference: en.reference,
      date: new Date().toISOString().slice(0, 10),
      source: "youversion",
    });
  } catch {
    return emptyResponse();
  }
}
