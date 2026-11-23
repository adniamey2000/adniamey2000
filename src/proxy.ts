import { NextResponse, type NextRequest } from "next/server";

/**
 * Expose la langue du segment [lang] au root layout via un header interne.
 * Le root layout ne reçoit pas les params des segments dynamiques enfants,
 * donc on lit ce header pour poser le bon attribut `lang` sur <html>.
 */
export function proxy(request: NextRequest) {
  const first = request.nextUrl.pathname.split("/")[1];
  const lang = first === "en" ? "en" : "fr";

  const response = NextResponse.next();
  response.headers.set("x-ad-lang", lang);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.jpg|robots.txt|sitemap.xml|fonts|images|api).*)"],
};
