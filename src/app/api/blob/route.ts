import { get } from "@vercel/blob";
import { type NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const pathname = request.nextUrl.searchParams.get("pathname");
  if (!pathname) {
    return NextResponse.json({ error: "Missing pathname" }, { status: 400 });
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN || process.env.adniamey2000_BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "Token manquant" }, { status: 500 });
  }

  try {
    const result = await get(pathname, {
      access: "private",
      token,
    });
    if (result === null) {
      return new NextResponse("Not found", { status: 404 });
    }

    return new NextResponse(result.stream, {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Type": result.blob.contentType ?? "application/octet-stream",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err) {
    console.error("Blob get error:", err);
    return new NextResponse("Blob error", { status: 500 });
  }
}
