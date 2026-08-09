import type { Block } from "payload";

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
      admin: {
        components: {
          // Replaces Payload's JSON editor with the drag-and-drop canvas.
          Field: "/editor/LayoutCanvas#LayoutCanvas",
        },
      },
    },
  ],
};
