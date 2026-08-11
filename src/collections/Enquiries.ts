import type { CollectionConfig } from "payload";
import { APIError } from "payload";
import { clientIp, hit } from "../lib/rate-limit";
import { enquiryRecipient } from "../lib/email";

/** Submissions allowed per address per window. */
const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;

/**
 * Contact form submissions.
 *
 * Anyone may create one (the public form posts here); only signed-in
 * staff can read, edit or delete them. Fields are read-only in the
 * admin so a submission is never silently altered after the fact —
 * only its status and internal notes can change.
 */
export const Enquiries: CollectionConfig = {
  slug: "enquiries",
  labels: { singular: "Enquiry", plural: "Enquiries" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "status", "createdAt"],
    group: "Enquiries",
  },
  hooks: {
    beforeValidate: [
      ({ req, operation }) => {
        // Public HTTP creates only. Staff adding an enquiry by hand, any
        // update, and server-side local-API calls (seed scripts, imports) all
        // go through untouched. The local check is `payloadAPI`, not the
        // absence of headers: Payload gives local calls a headers object too,
        // so keying on that silently rate-limited trusted server code.
        if (operation !== "create" || req.user || req.payloadAPI === "local") return;

        const { ok, retryAfter } = hit(`enquiry:${clientIp(req.headers)}`, LIMIT, WINDOW_MS);
        if (!ok) {
          throw new APIError(
            `Too many enquiries from this address. Try again in ${retryAfter} seconds.`,
            429,
          );
        }
      },
    ],
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation !== "create") return;

        const to = enquiryRecipient();
        if (!to) return; // nothing configured; the row is still saved

        const field = (key: string) => {
          const value = (doc as Record<string, unknown>)[key];
          return value ? String(value) : "";
        };
        const lines = [
          ["Name", field("name")],
          ["Email", field("email")],
          ["Phone", field("phone")],
          ["Location", field("location")],
          ["Project type", field("projectType")],
          ["Budget", field("budget")],
          ["Message", field("message")],
        ].filter(([, v]) => v);

        try {
          await req.payload.sendEmail({
            to,
            replyTo: field("email") || undefined,
            subject: `New enquiry — ${field("name") || "website"}`,
            text: lines.map(([k, v]) => `${k}: ${v}`).join("\n"),
          });
        } catch (error) {
          // Never fail the submission over a mail problem: the visitor has
          // already been told it worked, and the enquiry is safely stored.
          req.payload.logger.error(
            { err: error },
            "Enquiry saved but the notification email failed to send",
          );
        }
      },
    ],
  },
  access: {
    create: () => true, // the public contact form
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      type: "row",
      fields: [
        { name: "name", type: "text", required: true, admin: { readOnly: true, width: "50%" } },
        { name: "email", type: "email", required: true, admin: { readOnly: true, width: "50%" } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "phone", type: "text", admin: { readOnly: true, width: "50%" } },
        { name: "location", type: "text", admin: { readOnly: true, width: "50%" } },
      ],
    },
    { name: "projectType", type: "text", admin: { readOnly: true } },
    { name: "message", type: "textarea", admin: { readOnly: true } },
    {
      name: "source",
      type: "text",
      admin: { readOnly: true, description: "Which page or component the enquiry came from." },
    },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "Contacted", value: "contacted" },
        { label: "Quoted", value: "quoted" },
        { label: "Won", value: "won" },
        { label: "Closed", value: "closed" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "notes",
      type: "textarea",
      admin: { position: "sidebar", description: "Internal only — never shown to the client." },
    },
  ],
};
