import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { emailAdapter } from "./lib/email";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Posts } from "./collections/Posts";
import { Enquiries } from "./collections/Enquiries";
import { SiteSettings } from "./globals/SiteSettings";
import { extraSeoFields } from "./fields/seo";
import { pageUrl } from "./lib/site-url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const DATABASE_URI = process.env.DATABASE_URI || "file:./payload.db";
const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

/**
 * A known fallback secret is fine locally and dangerous in
 * production — it would sign real session tokens with a value that
 * is public in this repo. Fail loudly instead.
 */
function payloadSecret(): string {
  const secret = process.env.PAYLOAD_SECRET;
  if (secret) return secret;
  if (process.env.NODE_ENV === "production") {
    throw new Error("PAYLOAD_SECRET must be set in production.");
  }
  return "dev-only-insecure-secret";
}

/**
 * SQLite locally, Postgres in the cloud — chosen from the connection
 * string so the same code runs in both. Vercel's filesystem is
 * read-only and ephemeral, so a file-backed database cannot be used
 * there; set DATABASE_URI to a postgres:// URL when deploying.
 */
const db = DATABASE_URI.startsWith("postgres")
  ? postgresAdapter({
      pool: {
        connectionString: DATABASE_URI,
        // Serverless runs many short-lived instances and each opens its own
        // pool, so the default of 10 per instance exhausts a Supabase pooler
        // quickly. When that happens Payload cannot initialise and every
        // route 404s — it does not look like a database problem at all.
        //
        // Not 1, though: Payload holds a connection open for a transaction
        // while issuing other queries, so a single-connection pool deadlocks
        // until the connect timeout fires. Measured, not guessed — at max 1 a
        // query running alongside a transaction never returns.
        max: 5,
        idleTimeoutMillis: 10_000,
        connectionTimeoutMillis: 10_000,
      },
      // Postgres is managed by the committed migrations, so never let the
      // dev-mode schema push run against it. Push introspects the whole
      // remote schema and can stop for an interactive prompt, which over a
      // pooled connection looks exactly like a hang — the CLI sits there
      // forever and nothing is written.
      push: false,
    })
  : sqliteAdapter({ client: { url: DATABASE_URI } });

/**
 * Uploads go to Vercel Blob when a token is present, otherwise to
 * public/uploads on disk. Same reason: nothing written to the
 * filesystem survives on Vercel.
 */
const plugins = [
  seoPlugin({
    // Posts get the same treatment as pages: a blog post shared without a
    // title and image of its own is the most-shared kind of page there is.
    collections: ["pages", "posts"],
    tabbedUI: true,
    uploadsCollection: "media",
    fields: ({ defaultFields }) => [...defaultFields, ...extraSeoFields],
    generateTitle: ({ doc }: { doc?: { title?: string } }) => doc?.title ?? "",
    generateURL: ({ doc }: { doc?: { slug?: string } }) => pageUrl(doc?.slug ?? ""),
  }),
  ...(BLOB_TOKEN
    ? [vercelBlobStorage({ enabled: true, collections: { media: true }, token: BLOB_TOKEN })]
    : []),
];

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    // Puts the state of the site above the collection grid instead of leaving
    // it a list of names. The accompanying stylesheet is imported in
    // (payload)/layout.tsx — there is no `css` option on this config.
    components: { beforeDashboard: ["/admin/BeforeDashboard#default"] },
    meta: { titleSuffix: " — Hause Interiors" },
  },
  collections: [Pages, Posts, Enquiries, Media, Users],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  // Resend or SMTP when credentials are present; otherwise Payload logs to
  // the console, which is fine locally and silent in production.
  email: emailAdapter(),
  secret: payloadSecret(),
  db,
  plugins,
  sharp,
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
});
