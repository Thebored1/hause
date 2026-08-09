import { defaultStyle } from "./style";

// ============================================================
// The block manifest — the single source of truth for what a
// block is, what props it takes and what its defaults are.
//
// The editor reads it for defaults; the HTTP API serves it so
// an AI agent can discover the whole block vocabulary without
// being told. Anything added here is immediately available to
// both, which is what keeps the UI and agents in step.
// ============================================================

export type PropKind =
  | "string" | "text" | "html" | "number" | "boolean" | "enum"
  | "color" | "style" | "numberArray" | "list";

/** Field definition for one entry of a `list` prop. */
export interface ItemFieldSpec {
  kind: "string" | "text" | "number";
  default: unknown;
  description: string;
}

export interface PropSpec {
  kind: PropKind;
  default: unknown;
  description: string;
  options?: (string | number)[];
  min?: number;
  max?: number;
  /** For kind "list": the shape of each entry. */
  itemFields?: Record<string, ItemFieldSpec>;
}

export interface BlockSpec {
  name: string;
  description: string;
  /** Accepts child blocks dropped into it. */
  canvas?: boolean;
  /** Label shown in the layer tree. */
  displayName?: string;
  /** Structural node an agent should never author directly. */
  internal?: boolean;
  /** Fixed slot names, or derived from props (e.g. Columns count). */
  slots?: (props: Record<string, unknown>) => string[];
  props: Record<string, PropSpec>;
}

const styleProp: PropSpec = {
  kind: "style",
  default: defaultStyle,
  description:
    "Shared style object: pt/pb/pl/pr (padding px), mt/mb (margin px), bg (CSS colour), color (text colour), align (left|center|right), radius (px), maxWidth (px, 0 = full width).",
};

export const BLOCK_SCHEMA: Record<string, BlockSpec> = {
  Section: {
    name: "Section",
    description:
      "A full-width band of the page and the main layout container. Drop other blocks inside it. Use one Section per visual section of the page.",
    canvas: true,
    props: {
      style: { ...styleProp, default: { ...defaultStyle, pt: 64, pb: 64, pl: 24, pr: 24, maxWidth: 1100 } },
      minHeight: { kind: "number", default: 0, description: "Minimum height in px (0 = auto).", min: 0, max: 1200 },
      heightVh: {
        kind: "number",
        default: 0,
        description: "Minimum height as a percentage of the viewport (0 = off). Use 100 for a full-screen band.",
        min: 0,
        max: 100,
      },
      valign: {
        kind: "enum",
        default: "top",
        options: ["top", "center", "bottom", "between"],
        description: "Vertical placement of the content when the section is taller than its contents. \"between\" pins the first child to the top and the last to the bottom.",
      },
      bgImage: { kind: "string", default: "", description: "Background image URL." },
      overlay: { kind: "number", default: 40, description: "Flat dark overlay over the background image, 0-90%.", min: 0, max: 90 },
      scrim: {
        kind: "enum",
        default: "none",
        options: ["none", "bottom", "left", "both"],
        description: "Gradient wash over the background image to keep text readable: from the bottom, from the left, or both.",
      },
      scrimStrength: { kind: "number", default: 75, description: "How dark the scrim gets, 0-100%.", min: 0, max: 100 },
    },
  },

  Card: {
    name: "Card",
    description:
      "A bordered, padded container for one item in a grid — a service, a feature, a location. Drop anything inside it (image, heading, text, button). Put one Card in each Columns slot to build a card grid.",
    canvas: true,
    props: {
      bg: { kind: "color", default: "#ffffff", description: "Card background." },
      borderColor: { kind: "color", default: "rgba(0,0,0,0.1)", description: "Border colour (empty for no border)." },
      borderWidth: { kind: "number", default: 1, description: "Border thickness in px.", min: 0, max: 6 },
      radius: { kind: "number", default: 14, description: "Corner radius in px. Use 999 for a pill.", min: 0, max: 999 },
      padding: { kind: "number", default: 24, description: "Inner padding in px, all sides.", min: 0, max: 80 },
      paddingX: { kind: "number", default: 0, description: "Horizontal padding override (0 = use padding).", min: 0, max: 80 },
      paddingY: { kind: "number", default: 0, description: "Vertical padding override (0 = use padding).", min: 0, max: 80 },
      shadow: {
        kind: "enum",
        default: "none",
        options: ["none", "sm", "md", "lg"],
        description: "Drop shadow depth.",
      },
      hover: {
        kind: "enum",
        default: "none",
        options: ["none", "lift", "border", "shadow"],
        description: "Effect on mouse-over: raise slightly, brighten the border, or deepen the shadow.",
      },
      fullHeight: {
        kind: "boolean",
        default: true,
        description: "Stretch to match the tallest card in the row.",
      },
      style: { ...styleProp, default: { ...defaultStyle, pt: 0, pb: 0, pl: 0, pr: 0 } },
    },
  },

  Row: {
    name: "Row",
    description:
      "Lays children out in a line, each sized to its own content. Use this for button pairs, chip rows and inline lists. Columns is a grid and forces equal tracks; Row does not.",
    canvas: true,
    props: {
      gap: { kind: "number", default: 16, description: "Space between items in px.", min: 0, max: 80 },
      wrap: { kind: "boolean", default: true, description: "Allow items to wrap onto the next line." },
      justify: {
        kind: "enum",
        default: "start",
        options: ["start", "center", "end", "between"],
        description: "Horizontal distribution of the items.",
      },
      vAlign: {
        kind: "enum",
        default: "center",
        options: ["start", "center", "end", "stretch"],
        description: "Vertical alignment of the items against each other.",
      },
      style: { ...styleProp, default: { ...defaultStyle, pt: 0, pb: 0, pl: 0, pr: 0 } },
    },
  },

  Icon: {
    name: "Icon",
    description:
      "A single line icon, typically at the top of a card. Pick one of the named icons below.",
    props: {
      name: {
        kind: "enum",
        default: "sparkles",
        options: [
          "house", "building", "globe", "sparkles", "zap", "layers", "box", "package",
          "ruler", "sofa", "lamp", "paint", "wrench", "hammer", "shield", "award",
          "compass", "star", "heart", "target", "check", "boxes", "pencil-ruler",
        ],
        description: "Which icon to show.",
      },
      size: { kind: "number", default: 22, description: "Icon size in px.", min: 12, max: 96 },
      strokeWidth: { kind: "number", default: 1.5, description: "Line thickness.", min: 0.5, max: 3 },
      color: { kind: "color", default: "", description: "Icon colour (empty inherits the text colour)." },
      style: { ...styleProp, default: { ...defaultStyle, pt: 0, pb: 0, pl: 0, pr: 0 } },
    },
  },

  ColumnDrop: {
    name: "ColumnDrop",
    description: "Internal drop zone for one column. Created automatically — author Columns slots instead.",
    canvas: true,
    displayName: "Column",
    internal: true,
    props: {},
  },

  Heading: {
    name: "Heading",
    description: "A section or page title. Use level 1 once per page, then 2 and 3 for hierarchy.",
    props: {
      style: { ...styleProp, default: { ...defaultStyle, pt: 8, pb: 8 } },
      text: { kind: "text", default: "A compelling headline", description: "Heading text (plain text, no HTML)." },
      level: { kind: "enum", default: 2, options: [1, 2, 3, 4], description: "Semantic heading level." },
      size: { kind: "number", default: 38, description: "Font size in px.", min: 12, max: 120 },
      weight: { kind: "number", default: 600, description: "Font weight (300-900).", min: 300, max: 900 },
      tracking: {
        kind: "number",
        default: -0.02,
        description: "Letter spacing in em. Negative tightens large display text (e.g. -0.035); positive opens up small caps (e.g. 0.22).",
        min: -0.1,
        max: 0.4,
      },
      lineHeight: { kind: "number", default: 1.15, description: "Line height as a multiple of the font size.", min: 0.85, max: 2.2 },
      transform: {
        kind: "enum",
        default: "none",
        options: ["none", "uppercase", "lowercase", "capitalize"],
        description: "Letter casing.",
      },
      maxWidth: { kind: "number", default: 0, description: "Maximum line length in px (0 = full width).", min: 0, max: 1200 },
    },
  },

  Text: {
    name: "Text",
    description: "A rich-text paragraph block. The body is HTML.",
    props: {
      style: { ...styleProp, default: { ...defaultStyle, pt: 8, pb: 8 } },
      html: {
        kind: "html",
        default: "<p>Write something worth reading.</p>",
        description:
          "Rich text as HTML. Allowed: p, h2, h3, ul, ol, li, strong, em, u, s, a[href], code, blockquote, br. Wrap every paragraph in <p>.",
      },
      size: { kind: "number", default: 17, description: "Font size in px.", min: 11, max: 40 },
      tracking: { kind: "number", default: 0, description: "Letter spacing in em.", min: -0.05, max: 0.4 },
      lineHeight: { kind: "number", default: 1.7, description: "Line height as a multiple of the font size.", min: 1, max: 2.4 },
      transform: {
        kind: "enum",
        default: "none",
        options: ["none", "uppercase", "lowercase", "capitalize"],
        description: "Letter casing.",
      },
      weight: { kind: "number", default: 400, description: "Font weight (300-900).", min: 300, max: 900 },
    },
  },

  ImageBlock: {
    name: "ImageBlock",
    description: "A single image with an optional caption.",
    props: {
      style: { ...styleProp, default: { ...defaultStyle, pt: 8, pb: 8 } },
      src: { kind: "string", default: "", description: "Image URL (absolute https, or a path under /public)." },
      alt: { kind: "string", default: "", description: "Alt text. Always set this for accessibility." },
      radius: { kind: "number", default: 12, description: "Corner radius in px.", min: 0, max: 80 },
      height: { kind: "number", default: 0, description: "Fixed height in px (0 = natural aspect ratio).", min: 0, max: 900 },
      fit: { kind: "enum", default: "cover", options: ["cover", "contain"], description: "How the image fills its box." },
      caption: { kind: "string", default: "", description: "Optional caption under the image." },
    },
  },

  Button: {
    name: "Button",
    description: "A call-to-action link styled as a button.",
    props: {
      style: { ...styleProp, default: { ...defaultStyle, pt: 8, pb: 8 } },
      label: { kind: "text", default: "Get started", description: "Button label." },
      href: { kind: "string", default: "#", description: "Destination URL or path (e.g. /contact)." },
      bgColor: { kind: "color", default: "#4f46e5", description: "Button colour." },
      textColor: { kind: "color", default: "#ffffff", description: "Label colour." },
      radius: { kind: "number", default: 999, description: "Corner radius (999 = pill).", min: 0, max: 999 },
      size: { kind: "enum", default: "md", options: ["sm", "md", "lg"], description: "Button size." },
      variant: {
        kind: "enum",
        default: "solid",
        options: ["solid", "outline", "glass", "link"],
        description: "Fill style. \"glass\" is translucent + blurred for use over photographs; \"link\" is plain text with no background.",
      },
      icon: {
        kind: "enum",
        default: "none",
        options: ["none", "arrow-right", "arrow-up-right"],
        description: "Optional icon after the label.",
      },
      tracking: { kind: "number", default: 0, description: "Letter spacing in em.", min: -0.05, max: 0.4 },
      transform: {
        kind: "enum",
        default: "none",
        options: ["none", "uppercase", "lowercase", "capitalize"],
        description: "Letter casing for the label.",
      },
    },
  },

  Columns: {
    name: "Columns",
    description:
      "A responsive column layout. Put child blocks in the slots named col-0, col-1, … one per column.",
    slots: (props) => {
      const n = Math.max(1, Math.min(6, Number(props.count ?? 2)));
      return Array.from({ length: n }, (_, i) => `col-${i}`);
    },
    props: {
      style: { ...styleProp, default: { ...defaultStyle, pt: 8, pb: 8 } },
      count: { kind: "number", default: 2, description: "Number of columns (1-6). Determines the slot names.", min: 1, max: 6 },
      gap: { kind: "number", default: 24, description: "Gap between columns in px.", min: 0, max: 120 },
      widths: {
        kind: "numberArray",
        default: [1, 1],
        description: "Relative column widths in fr units, one entry per column, e.g. [2,1] for a 2:1 split.",
      },
    },
  },

  Spacer: {
    name: "Spacer",
    description: "Vertical empty space between blocks.",
    props: {
      height: { kind: "number", default: 48, description: "Height in px.", min: 0, max: 400 },
    },
  },

  Divider: {
    name: "Divider",
    description: "A horizontal rule.",
    props: {
      style: { ...styleProp, default: { ...defaultStyle, pt: 8, pb: 8 } },
      thickness: { kind: "number", default: 1, description: "Line thickness in px.", min: 1, max: 12 },
      lineColor: { kind: "color", default: "", description: "Line colour (empty = subtle default)." },
      width: { kind: "number", default: 100, description: "Line width as a percentage.", min: 10, max: 100 },
    },
  },
};

/* ---------------- helpers ---------------- */

export function defaultsFor(type: string): Record<string, unknown> {
  const spec = BLOCK_SCHEMA[type];
  if (!spec) return {};
  const out: Record<string, unknown> = {};
  for (const [key, p] of Object.entries(spec.props)) {
    out[key] = structuredCloneSafe(p.default);
  }
  return out;
}

export function slotsFor(type: string, props: Record<string, unknown>): string[] {
  const spec = BLOCK_SCHEMA[type];
  if (!spec?.slots) return [];
  return spec.slots({ ...defaultsFor(type), ...props });
}

export function isCanvas(type: string): boolean {
  return Boolean(BLOCK_SCHEMA[type]?.canvas);
}

export function displayNameFor(type: string): string {
  return BLOCK_SCHEMA[type]?.displayName ?? type;
}

/** Block types an agent (or the inserter) may author. */
export function authorableBlocks(): BlockSpec[] {
  return Object.values(BLOCK_SCHEMA).filter((b) => !b.internal);
}

function structuredCloneSafe<T>(v: T): T {
  return v && typeof v === "object" ? (JSON.parse(JSON.stringify(v)) as T) : v;
}
