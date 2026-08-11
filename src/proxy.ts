import { NextResponse, type NextRequest } from "next/server";

/**
 * Nonce-based Content-Security-Policy for the public site.
 *
 * A nonce is minted per request, so a page carrying one cannot be statically
 * rendered. That used to mean scoping this carefully — but every page is now
 * served from the CMS through one `force-dynamic` catch-all, so the whole site
 * is server-rendered anyway and the policy costs nothing.
 *
 * `/admin` and `/api` are excluded on purpose: the admin is Payload's own
 * application, behind a login, and a strict policy there risks breaking the
 * editor for no gain against stored XSS, which is a public-site concern.
 *
 * Why style-src still allows 'unsafe-inline'
 * ------------------------------------------
 * A nonce cannot authorise a `style="…"` attribute, only a <style> element,
 * and the block views set inline style attributes throughout — that is how the
 * canvas expresses colour, spacing and layout. Dropping 'unsafe-inline' would
 * blank the design. Script execution is what stored XSS needs, and script-src
 * is strict.
 *
 * This is defence in depth. The rich-text sanitiser is the primary control.
 */
export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV === "development";

  const csp = [
    "default-src 'self'",
    // 'strict-dynamic' lets Next's bootstrap load the rest of its chunks, so
    // the bundle graph does not have to be enumerated here.
    // React uses eval in development to rebuild server stacks in the browser.
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' blob: data:",
    "font-src 'self'",
    "connect-src 'self'" + (isDev ? " ws: wss:" : ""),
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    ...(isDev ? [] : ["upgrade-insecure-requests"]),
  ].join("; ");

  // Next reads the nonce back out of this request header and stamps it onto
  // the framework and page scripts it emits.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: [
    /*
     * The whole public site. Excluded:
     * - admin, api (see the note above)
     * - _next/static, _next/image, favicon.ico (static assets)
     * Prefetches are skipped: they fetch data, not a document to protect.
     */
    {
      source: "/((?!admin|api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
