import { NextResponse, type NextRequest } from "next/server";

/**
 * Nonce-based Content-Security-Policy for the routes that render stored content.
 *
 * Why only some routes
 * --------------------
 * A nonce has to be minted per request, so a page carrying one cannot be
 * statically rendered — Next bakes static HTML at build time, when there is no
 * request to mint from. Applying this everywhere would turn the whole site
 * dynamic and give up static generation.
 *
 * The routes that render untrusted content — the CMS pages and the blog — are
 * already `force-dynamic`, so scoping the policy to them costs nothing. The
 * remaining pages are hand-written copy with no stored content in them; they
 * keep the baseline headers from next.config.ts and stay static.
 *
 * `/admin` is excluded on purpose: it is Payload's own application, it is
 * behind a login, and a strict policy there risks breaking the editor for no
 * gain against stored XSS.
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
    // The dynamic, content-rendering routes only — see the note above.
    // Prefetches are skipped: they fetch data, not a document to protect.
    {
      source: "/",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
    {
      source: "/cms/:path*",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
    {
      source: "/blog/:path*",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
