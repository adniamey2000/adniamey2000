import { NextResponse } from "next/server";
import { dayOfYear, getDailyVerse, youVersionApiKey, type Verse } from "@/lib/verses";

export const dynamic = "force-dynamic";

function extractText(refs: string[], key: string): Promise<string | null> {
  const bibleId = process.env.YVP_LSG_BIBLE_ID ?? "1160";
  return fetch(`https://api.youversion.com/v1/bibles/${bibleId}/passages/${refs.join(",")}`, {
    headers: { "X-YVP-App-Key": key, Accept: "application/json" },
    next: { revalidate: 86400 },
  })
    .then((res) => (res.ok ? res.json() : null))
    .then((json) => {
      if (!json) return null;
      const source = json.data ?? json;
      const passage = source.passage ?? source;
      const candidates = [
        passage.html,
        passage.text,
        passage.content,
        source.html,
        source.text,
        source.content,
      ];
      for (const c of candidates) {
        if (typeof c === "string" && c.trim()) {
          return c.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
        }
      }
      return null;
    })
    .catch(() => null);
}

async function fetchYouVersion(): Promise<Verse | null> {
  const key = youVersionApiKey();
  if (!key) return null;

  try {
    const res = await fetch(`https://api.youversion.com/v1/verse_of_the_days/${dayOfYear()}`, {
      headers: { "X-YVP-App-Key": key, Accept: "application/json" },
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;

    const json = await res.json();
    const arr = Array.isArray(json) ? json : Array.isArray(json?.data) ? json.data : null;
    const first = arr?.[0];
    if (!first) return null;

    const refs = Array.isArray(first?.usfm)
      ? (first.usfm as string[])
      : typeof first?.passage_id === "string"
        ? [first.passage_id]
        : null;
    if (!refs || refs.length === 0) return null;

    const text = await extractText(refs, key);
    if (!text) return null;

    return {
      text,
      reference: refs.join(" ; ").replace(/_/g, " "),
    };
  } catch {
    return null;
  }
}

async function fetchOurManna(): Promise<Verse | null> {
  try {
    const res = await fetch("https://beta.ourmanna.com/api/v1/get?format=json&order=daily", {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;

    const json = await res.json();
    const text = json?.verse?.details?.text;
    const reference = json?.verse?.details?.reference;
    if (typeof text !== "string" || !text.trim() || typeof reference !== "string") {
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
  let verse = fromYouVersion ?? fromOurManna ?? getDailyVerse();
  const source = fromYouVersion ? "youversion" : fromOurManna ? "ourmanna" : "lsg";

  if (lang === "fr" && source !== "lsg") {
    verse = await translateToFrench(verse);
  }

  return NextResponse.json({
    ...verse,
    date: new Date().toISOString().slice(0, 10),
    source,
  });
}
