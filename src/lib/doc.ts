import {
  BLOCK_SCHEMA, defaultsFor, slotsFor, isCanvas, displayNameFor,
} from "@/blocks/manifest";
import { defaultStyle } from "@/blocks/style";

// ============================================================
// Document compiler.
//
// Agents (and the API) work in a simple, obvious tree:
//
//   { type, props, children[], slots{ name: children[] } }
//
// The editor needs Craft.js's flat node graph with ids, parent
// pointers and linkedNodes. Compiling between the two means an
// agent never hand-writes node ids or structural wrappers, and
// anything it produces is valid by construction.
// ============================================================

export interface DocNode {
  type: string;
  props?: Record<string, unknown>;
  children?: DocNode[];
  slots?: Record<string, DocNode[]>;
}

export interface CraftNode {
  type: { resolvedName: string };
  isCanvas: boolean;
  props: Record<string, unknown>;
  displayName: string;
  custom: Record<string, unknown>;
  parent?: string | null;
  hidden: boolean;
  nodes: string[];
  linkedNodes: Record<string, string>;
}

export type CraftNodes = Record<string, CraftNode>;

export interface CompileResult {
  nodes: CraftNodes;
  errors: string[];
  warnings: string[];
}

const newId = () => Math.random().toString(36).slice(2, 12);

/* ---------------- html sanitising ---------------- */

const ALLOWED_TAGS = new Set([
  "p", "br", "strong", "b", "em", "i", "u", "s", "code", "a",
  "ul", "ol", "li", "h2", "h3", "blockquote", "span",
]);

/**
 * Conservative allowlist scrub for rich-text HTML.
 *
 * Content can originate from an agent, and an agent can be
 * influenced by whatever it read, so treat its HTML as untrusted:
 * drop scripts, inline event handlers and javascript: URLs before
 * anything reaches dangerouslySetInnerHTML.
 */
export function sanitizeHtml(input: string): string {
  let out = String(input ?? "");
  out = out.replace(/<\s*(script|style|iframe|object|embed|form)[\s\S]*?<\s*\/\s*\1\s*>/gi, "");
  out = out.replace(/<\s*(script|style|iframe|object|embed|form)\b[^>]*\/?>/gi, "");
  // Strip disallowed tags but keep their inner text.
  out = out.replace(/<\/?([a-zA-Z0-9-]+)([^>]*)>/g, (match, tag: string, attrs: string) => {
    if (!ALLOWED_TAGS.has(tag.toLowerCase())) return "";
    const cleaned = attrs
      .replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
      .replace(/\s(href|src)\s*=\s*("|')?\s*javascript:[^"'\s>]*("|')?/gi, "")
      .replace(/\sstyle\s*=\s*("[^"]*"|'[^']*')/gi, "");
    return match.startsWith("</") ? `</${tag}>` : `<${tag}${cleaned}>`;
  });
  return out;
}

/* ---------------- prop coercion ---------------- */

function coerceProps(
  type: string,
  raw: Record<string, unknown>,
  warnings: string[],
): Record<string, unknown> {
  const spec = BLOCK_SCHEMA[type];
  const out = defaultsFor(type);
  if (!spec) return { ...out, ...raw };

  for (const [key, value] of Object.entries(raw ?? {})) {
    const p = spec.props[key];
    if (!p) {
      warnings.push(`${type}: ignored unknown prop "${key}"`);
      continue;
    }
    switch (p.kind) {
      case "number": {
        let n = Number(value);
        if (Number.isNaN(n)) {
          warnings.push(`${type}.${key}: "${String(value)}" is not a number — using default`);
          break;
        }
        if (p.min !== undefined) n = Math.max(p.min, n);
        if (p.max !== undefined) n = Math.min(p.max, n);
        out[key] = n;
        break;
      }
      case "enum": {
        const allowed = p.options ?? [];
        const match = allowed.find((o) => String(o) === String(value));
        if (match === undefined) {
          warnings.push(
            `${type}.${key}: "${String(value)}" is not one of ${allowed.join(", ")} — using default`,
          );
          break;
        }
        out[key] = match;
        break;
      }
      case "html":
        out[key] = sanitizeHtml(String(value ?? ""));
        break;
      case "style":
        out[key] = { ...defaultStyle, ...(typeof value === "object" && value ? value : {}) };
        break;
      case "numberArray":
        out[key] = Array.isArray(value) ? value.map((v) => Number(v) || 1) : p.default;
        break;
      case "list": {
        if (!Array.isArray(value)) {
          warnings.push(`${type}.${key}: expected an array of objects — using default`);
          break;
        }
        const fields = p.itemFields ?? {};
        out[key] = value.map((entry) => {
          const src = (entry && typeof entry === "object" ? entry : {}) as Record<string, unknown>;
          const item: Record<string, unknown> = {};
          for (const [fieldName, spec] of Object.entries(fields)) {
            const raw = src[fieldName];
            if (raw === undefined) {
              item[fieldName] = spec.default;
            } else if (spec.kind === "number") {
              const n = Number(raw);
              item[fieldName] = Number.isNaN(n) ? spec.default : n;
            } else {
              item[fieldName] = String(raw);
            }
          }
          for (const extra of Object.keys(src)) {
            if (!fields[extra]) warnings.push(`${type}.${key}: ignored unknown field "${extra}"`);
          }
          return item;
        });
        break;
      }
      case "boolean":
        out[key] = Boolean(value);
        break;
      default:
        out[key] = String(value ?? "");
    }
  }
  return out;
}

/* ---------------- compile ---------------- */

/** Simple document tree -> Craft.js serialized nodes. */
export function compile(input: DocNode | DocNode[]): CompileResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const nodes: CraftNodes = {};

  // A bare list of blocks is wrapped in a Section so the root is always a canvas.
  let root: DocNode = Array.isArray(input)
    ? { type: "Section", children: input }
    : input;

  if (!root || typeof root !== "object" || !root.type) {
    return { nodes: {}, errors: ["Document must be an object with a \"type\", or an array of blocks."], warnings };
  }
  if (!isCanvas(root.type)) {
    warnings.push(`Root "${root.type}" cannot hold children — wrapped it in a Section.`);
    root = { type: "Section", children: [root] };
  }

  const build = (doc: DocNode, id: string, parent: string | null): void => {
    const spec = BLOCK_SCHEMA[doc.type];
    if (!spec) {
      errors.push(`Unknown block type "${doc.type}". Known types: ${Object.keys(BLOCK_SCHEMA).filter((t) => !BLOCK_SCHEMA[t].internal).join(", ")}`);
      return;
    }
    if (spec.internal && parent !== null) {
      errors.push(`"${doc.type}" is structural and cannot be authored directly.`);
      return;
    }

    const props = coerceProps(doc.type, doc.props ?? {}, warnings);

    const node: CraftNode = {
      type: { resolvedName: doc.type },
      isCanvas: isCanvas(doc.type),
      props,
      displayName: displayNameFor(doc.type),
      custom: {},
      hidden: false,
      nodes: [],
      linkedNodes: {},
    };
    if (parent !== null) node.parent = parent;
    nodes[id] = node;

    // Children (only canvases can hold them).
    const children = doc.children ?? [];
    if (children.length > 0 && !node.isCanvas) {
      warnings.push(`${doc.type} cannot contain children — ${children.length} dropped. Use slots or a Section.`);
    } else {
      for (const child of children) {
        const childId = newId();
        build(child, childId, id);
        if (nodes[childId]) node.nodes.push(childId);
      }
    }

    // Slots: create the structural canvas node per slot automatically.
    const slotNames = slotsFor(doc.type, props);
    for (const slotName of slotNames) {
      const slotId = newId();
      nodes[slotId] = {
        type: { resolvedName: "ColumnDrop" },
        isCanvas: true,
        props: {},
        displayName: displayNameFor("ColumnDrop"),
        custom: {},
        parent: id,
        hidden: false,
        nodes: [],
        linkedNodes: {},
      };
      node.linkedNodes[slotName] = slotId;

      for (const child of doc.slots?.[slotName] ?? []) {
        const childId = newId();
        build(child, childId, slotId);
        if (nodes[childId]) nodes[slotId].nodes.push(childId);
      }
    }

    for (const provided of Object.keys(doc.slots ?? {})) {
      if (!slotNames.includes(provided)) {
        warnings.push(
          `${doc.type}: slot "${provided}" does not exist${slotNames.length ? ` (available: ${slotNames.join(", ")})` : ""} — dropped.`,
        );
      }
    }
  };

  build(root, "ROOT", null);
  return { nodes, errors, warnings };
}

/* ---------------- decompile ---------------- */

/** Craft.js serialized nodes -> simple document tree. */
export function decompile(nodes: CraftNodes): DocNode | null {
  const rootId = nodes.ROOT ? "ROOT" : Object.keys(nodes).find((id) => !nodes[id].parent);
  if (!rootId || !nodes[rootId]) return null;

  const walk = (id: string): DocNode | null => {
    const node = nodes[id];
    if (!node) return null;
    const type = typeof node.type === "string" ? node.type : node.type?.resolvedName;
    if (!type) return null;

    const doc: DocNode = { type, props: node.props ?? {} };

    const children = (node.nodes ?? []).map(walk).filter(Boolean) as DocNode[];
    if (children.length) doc.children = children;

    const slotEntries = Object.entries(node.linkedNodes ?? {});
    if (slotEntries.length) {
      doc.slots = {};
      for (const [slotName, slotId] of slotEntries) {
        // Unwrap the structural ColumnDrop so agents see plain arrays.
        const slotNode = nodes[slotId];
        const inner = (slotNode?.nodes ?? []).map(walk).filter(Boolean) as DocNode[];
        doc.slots[slotName] = inner;
      }
    }
    return doc;
  };

  return walk(rootId);
}

/** Convenience: validate without persisting. */
export function validate(input: DocNode | DocNode[]): { ok: boolean; errors: string[]; warnings: string[] } {
  const { errors, warnings } = compile(input);
  return { ok: errors.length === 0, errors, warnings };
}
