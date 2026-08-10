import type { Block } from "payload";
import { sanitizeHtml } from "@/lib/doc";

/**
 * Walks a Craft node graph and scrubs every rich-text `html` prop.
 *
 * Canvas content can be written over the REST API — by an editor or by an
 * agent acting on something it read — so it is untrusted input.
 */
function scrubCanvas(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(scrubCanvas);
  if (!value || typeof value !== "object") return value;

  const out: Record<string, unknown> = {};
  for (const [key, v] of Object.entries(value as Record<string, unknown>)) {
    if (key === "html" && typeof v === "string") out[key] = sanitizeHtml(v);
    else out[key] = scrubCanvas(v);
  }
  return out;
}

/**
 * A free-form region edited on the block canvas.
 *
 * Use this where a page needs layout that no existing component
 * covers. Sections built from the site's own components (e.g.
 * ServicesGrid) should stay as their own blocks — they render the
 * real design and cannot drift from it.
 */
export const CanvasBlock: Block = {
  slug: "canvas",
  labels: { singular: "Canvas region", plural: "Canvas regions" },
  fields: [
    {
      name: "content",
      type: "json",
      label: "Layout",
      hooks: { beforeChange: [({ value }) => scrubCanvas(value)] },
      admin: {
        components: {
          // Replaces Payload's JSON editor with the drag-and-drop canvas.
          Field: "/editor/LayoutCanvas#LayoutCanvas",
        },
      },
    },
  ],
};
