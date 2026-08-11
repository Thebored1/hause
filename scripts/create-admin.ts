// Creates the first admin user.
//
//   ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='...' npx payload run scripts/create-admin.ts
//
// Worth doing immediately after the first deploy. Until a user exists, the
// endpoint that creates one is open to anyone who finds it; Payload closes it
// as soon as there is an account.
//
// The credentials come from the environment rather than being written here,
// so a real password never lands in the repository. Refuses to overwrite an
// existing account - changing a password is a job for the admin UI, not a
// script that might be re-run by accident.

import { getPayload } from "payload";
import config from "../src/payload.config";

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

if (!email || !password) {
  console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD.");
  process.exit(1);
}

const payload = await getPayload({ config });

const existing = await payload.find({
  collection: "users",
  where: { email: { equals: email } },
  limit: 1,
  depth: 0,
});

if (existing.docs.length) {
  console.log(`${email} already exists (id ${existing.docs[0].id}) — nothing to do.`);
  process.exit(0);
}

const user = await payload.create({
  collection: "users",
  data: { email, password } as never,
});

const { totalDocs } = await payload.count({ collection: "users" });
console.log(`created ${user.email} (id ${user.id}) — ${totalDocs} user(s) total`);
process.exit(0);
