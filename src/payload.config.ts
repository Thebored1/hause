import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Posts } from "./collections/Posts";
import { Enquiries } from "./collections/Enquiries";

const dirname = path.dirname(fileURLToPath(import.meta.url));

function payloadSecret(): string {
  const secret = process.env.PAYLOAD_SECRET;
  if (secret) return secret;
  if (process.env.NODE_ENV === "production") throw new Error("PAYLOAD_SECRET must be set in production.");
  return "dev-only-insecure-secret";
}

export default buildConfig({
  admin: { user: Users.slug, importMap: { baseDir: path.resolve(dirname) } },
  collections: [Pages, Posts, Enquiries, Media, Users],
  editor: lexicalEditor(),
  secret: payloadSecret(),
  db: sqliteAdapter({ client: { url: process.env.DATABASE_URI || "file:./payload.db" } }),
  sharp,
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
});
