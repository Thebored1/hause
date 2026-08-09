import type { CSSProperties } from "react";

// ============================================================
// Shared block style model.
//
// Values are concrete numbers/colors rather than utility class
// names, so every control can be a real slider or colour picker
// (and nothing depends on a CSS scanner seeing the class).
// The exact same function styles the editor canvas and the
// published page, so they cannot drift.
// ============================================================

export interface BlockStyle {
  pt?: number;
  pb?: number;
  pl?: number;
  pr?: number;
  mt?: number;
  mb?: number;
  bg?: string;
  color?: string;
  align?: "left" | "center" | "right";
  radius?: number;
  maxWidth?: number;
}

export const defaultStyle: BlockStyle = {
  pt: 16,
  pb: 16,
  pl: 24,
  pr: 24,
  mt: 0,
  mb: 0,
  bg: "",
  color: "",
  align: "left",
  radius: 0,
  maxWidth: 0,
};

/** Outer wrapper: spacing, background, alignment. */
export function styleToCss(s?: BlockStyle): CSSProperties {
  const v = { ...defaultStyle, ...(s ?? {}) };
  const css: CSSProperties = {
    paddingTop: v.pt,
    paddingBottom: v.pb,
    paddingLeft: v.pl,
    paddingRight: v.pr,
    marginTop: v.mt,
    marginBottom: v.mb,
    textAlign: v.align,
  };
  if (v.bg) css.background = v.bg;
  if (v.color) css.color = v.color;
  if (v.radius) css.borderRadius = v.radius;
  return css;
}

/**
 * Inner wrapper: optional max content width.
 *
 * Sections centre their content column. Text blocks must not —
 * a paragraph capped at 620px should stay flush left unless it
 * is actually centre-aligned, otherwise constraining the measure
 * silently indents the copy.
 */
export function innerCss(s?: BlockStyle, opts: { center?: boolean } = {}): CSSProperties {
  const v = { ...defaultStyle, ...(s ?? {}) };
  if (!v.maxWidth) return {};

  const center = opts.center ?? true;
  if (!center) return { maxWidth: v.maxWidth };

  return {
    maxWidth: v.maxWidth,
    marginLeft: v.align === "right" ? "auto" : center ? "auto" : undefined,
    marginRight: v.align === "left" ? undefined : "auto",
  };
}

/** Max width that follows the block's own alignment. */
export function measureCss(s?: BlockStyle): CSSProperties {
  const v = { ...defaultStyle, ...(s ?? {}) };
  if (!v.maxWidth) return {};
  if (v.align === "center") return { maxWidth: v.maxWidth, marginLeft: "auto", marginRight: "auto" };
  if (v.align === "right") return { maxWidth: v.maxWidth, marginLeft: "auto" };
  return { maxWidth: v.maxWidth };
}

export const SPACING_PRESETS = [0, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128];

export const COLOR_SWATCHES = [
  { name: "None", value: "" },
  { name: "White", value: "#ffffff" },
  { name: "Paper", value: "#f7f6f3" },
  { name: "Sand", value: "#eae4d9" },
  { name: "Slate", value: "#1f2430" },
  { name: "Ink", value: "#0b0d11" },
  { name: "Indigo", value: "#4f46e5" },
  { name: "Sky", value: "#0ea5e9" },
  { name: "Emerald", value: "#10b981" },
  { name: "Amber", value: "#f59e0b" },
  { name: "Rose", value: "#f43f5e" },
];
