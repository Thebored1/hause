import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: { read: () => true },
  upload: { staticDir: "public/uploads", mimeTypes: ["image/*"] },
  fields: [{ name: "alt", type: "text" }],
};
