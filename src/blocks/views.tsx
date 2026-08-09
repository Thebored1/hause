import {
  ArrowRight, ArrowUpRight,
  House, Building2, Globe, Sparkles, Zap, Layers, Box, Package, Ruler, Sofa, Lamp,
  PaintRoller, Wrench, Hammer, ShieldCheck, Award, Compass, Star, Heart, Target,
  Check, Boxes, PencilRuler,
} from "lucide-react";
import type { ReactNode } from "react";
import { styleToCss, innerCss, measureCss, type BlockStyle } from "./style";

// ============================================================
// Pure presentational block views.
//
// These are server-safe (no hooks, no "use client"): the public
// page renders them directly, and the editor wraps them with
// Craft.js behaviour. One source of truth for appearance, so
// the canvas and the published page can never drift apart.
// ============================================================

export interface BaseViewProps {
  style?: BlockStyle;
  children?: ReactNode;
  slots?: Record<string, ReactNode>;
}

/* ---------------- Section / Container ---------------- */

export interface SectionProps extends BaseViewProps {
  minHeight?: number;
  heightVh?: number;
  valign?: "top" | "center" | "bottom" | "between";
  bgImage?: string;
  overlay?: number;
  scrim?: "none" | "bottom" | "left" | "both";
  scrimStrength?: number;
}

const JUSTIFY: Record<string, string> = {
  top: "flex-start",
  center: "center",
  bottom: "flex-end",
  between: "space-between",
};

export function SectionView({
  style, minHeight, heightVh, valign = "top", bgImage, overlay, scrim = "none",
  scrimStrength = 75, children,
}: SectionProps) {
  const hasBg = Boolean(bgImage);
  const s = Math.max(0, Math.min(100, scrimStrength)) / 100;
  const stretch = valign !== "top";

  return (
    <section
      style={{
        ...styleToCss(style),
        position: "relative",
        minHeight: heightVh ? `${heightVh}vh` : minHeight || undefined,
        // The section is always a column so the content wrapper can
        // grow; the wrapper itself distributes the children.
        ...(stretch ? { display: "flex", flexDirection: "column" } : {}),
        ...(hasBg
          ? { backgroundImage: `url("${bgImage}")`, backgroundSize: "cover", backgroundPosition: "center" }
          : {}),
      }}
    >
      {hasBg && overlay ? (
        <div style={{ position: "absolute", inset: 0, background: "#000", opacity: overlay / 100, pointerEvents: "none" }} />
      ) : null}

      {/* Gradient scrims — keep copy legible over a photograph. */}
      {hasBg && (scrim === "left" || scrim === "both") && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: `linear-gradient(to right, rgba(0,0,0,${s}) 0%, rgba(0,0,0,${s * 0.5}) 45%, rgba(0,0,0,0) 100%)`,
          }}
        />
      )}
      {hasBg && (scrim === "bottom" || scrim === "both") && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: `linear-gradient(to top, rgba(0,0,0,${s}) 0%, rgba(0,0,0,${s * 0.25}) 45%, rgba(0,0,0,${s * 0.4}) 100%)`,
          }}
        />
      )}

      <div
        style={{
          position: "relative",
          width: "100%",
          ...innerCss(style),
          // Grow to fill the band and lay the children out vertically,
          // so "middle"/"bottom"/"split" actually move them.
          ...(stretch
            ? { flex: 1, display: "flex", flexDirection: "column", justifyContent: JUSTIFY[valign] }
            : {}),
        }}
      >
        {children}
      </div>
    </section>
  );
}

/* ---------------- Card ---------------- */

export interface CardProps extends BaseViewProps {
  bg?: string;
  borderColor?: string;
  borderWidth?: number;
  radius?: number;
  padding?: number;
  paddingX?: number;
  paddingY?: number;
  shadow?: "none" | "sm" | "md" | "lg";
  hover?: "none" | "lift" | "border" | "shadow";
  fullHeight?: boolean;
}

const SHADOW: Record<string, string> = {
  none: "none",
  sm: "0 1px 2px rgb(0 0 0 / 0.06)",
  md: "0 4px 12px rgb(0 0 0 / 0.08)",
  lg: "0 12px 32px rgb(0 0 0 / 0.14)",
};

export function CardView({
  style, bg, borderColor, borderWidth = 1, radius = 14, padding = 24, paddingX, paddingY,
  shadow = "none", hover = "none", fullHeight = true, children,
}: CardProps) {
  // Hover needs a stylesheet rule, so the variant is a class and
  // the static appearance stays inline like every other block.
  const hoverClass = hover && hover !== "none" ? ` nb-card--${hover}` : "";
  return (
    <div style={styleToCss(style)} className={fullHeight ? "h-full" : undefined}>
      <div
        className={`nb-card${hoverClass}`}
        style={{
          background: bg || undefined,
          border: borderColor && borderWidth ? `${borderWidth}px solid ${borderColor}` : undefined,
          borderRadius: radius,
          // x/y overrides let a Card be a pill (6px 14px) as well as a panel
          padding: `${paddingY || padding}px ${paddingX || padding}px`,
          boxShadow: SHADOW[shadow] ?? SHADOW.none,
          height: fullHeight ? "100%" : undefined,
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ---------------- Row (flex) ---------------- */

export interface RowProps extends BaseViewProps {
  gap?: number;
  wrap?: boolean;
  justify?: "start" | "center" | "end" | "between";
  vAlign?: "start" | "center" | "end" | "stretch";
}

const JUSTIFY_MAP: Record<string, string> = {
  start: "flex-start", center: "center", end: "flex-end", between: "space-between",
};
const ALIGN_MAP: Record<string, string> = {
  start: "flex-start", center: "center", end: "flex-end", stretch: "stretch",
};

/**
 * Lays children out in a line, each sized to its own content —
 * the difference from Columns, which is a grid and forces every
 * child into an equal (or fractional) track. Use this for button
 * pairs, chip rows and inline lists.
 */
export function RowView({
  style, gap = 16, wrap = true, justify = "start", vAlign = "center", children,
}: RowProps) {
  return (
    <div style={styleToCss(style)}>
      <div
        style={{
          ...measureCss(style),
          display: "flex",
          flexWrap: wrap ? "wrap" : "nowrap",
          gap,
          justifyContent: JUSTIFY_MAP[justify] ?? "flex-start",
          alignItems: ALIGN_MAP[vAlign] ?? "center",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ---------------- Icon ---------------- */

export const ICONS = {
  house: House, building: Building2, globe: Globe, sparkles: Sparkles, zap: Zap,
  layers: Layers, box: Box, package: Package, ruler: Ruler, sofa: Sofa, lamp: Lamp,
  paint: PaintRoller, wrench: Wrench, hammer: Hammer, shield: ShieldCheck,
  award: Award, compass: Compass, star: Star, heart: Heart, target: Target,
  check: Check, boxes: Boxes, "pencil-ruler": PencilRuler,
} as const;

export type IconName = keyof typeof ICONS;

export interface IconProps extends BaseViewProps {
  name?: IconName;
  size?: number;
  strokeWidth?: number;
  color?: string;
}

export function IconView({ style, name = "sparkles", size = 22, strokeWidth = 1.5, color }: IconProps) {
  const Glyph = ICONS[name] ?? Sparkles;
  return (
    <div style={{ ...styleToCss(style), color: color || undefined }}>
      <Glyph size={size} strokeWidth={strokeWidth} />
    </div>
  );
}

/* ---------------- Heading ---------------- */

export interface HeadingProps extends BaseViewProps {
  text?: string;
  level?: 1 | 2 | 3 | 4;
  size?: number;
  weight?: number;
  tracking?: number;
  lineHeight?: number;
  transform?: "none" | "uppercase" | "lowercase" | "capitalize";
  maxWidth?: number;
  /** Editor-only: replaces the text with an inline-editable node. */
  slotText?: ReactNode;
}

const HEADING_DEFAULT_SIZE: Record<number, number> = { 1: 52, 2: 38, 3: 28, 4: 22 };

export function HeadingView({
  style, text, level = 2, size, weight, tracking, lineHeight, transform, maxWidth, slotText,
}: HeadingProps) {
  const Tag = (`h${level}` as unknown) as "h2";
  return (
    <div style={styleToCss(style)}>
      <div style={measureCss(style)}>
        <Tag
          style={{
            fontSize: size || HEADING_DEFAULT_SIZE[level] || 38,
            fontWeight: weight ?? 600,
            lineHeight: lineHeight ?? 1.15,
            letterSpacing: `${tracking ?? -0.02}em`,
            textTransform: transform && transform !== "none" ? transform : undefined,
            maxWidth: maxWidth || undefined,
            margin: 0,
          }}
        >
          {slotText ?? text ?? ""}
        </Tag>
      </div>
    </div>
  );
}

/* ---------------- Rich text ---------------- */

export interface TextProps extends BaseViewProps {
  html?: string;
  size?: number;
  tracking?: number;
  lineHeight?: number;
  transform?: "none" | "uppercase" | "lowercase" | "capitalize";
  weight?: number;
  /** Editor-only: replaces static HTML with the live rich-text editor. */
  slotContent?: ReactNode;
}

export function TextView({
  style, html, size, tracking, lineHeight, transform, weight, slotContent,
}: TextProps) {
  return (
    <div style={styleToCss(style)}>
      <div
        style={{
          ...measureCss(style),
          fontSize: size || 17,
          lineHeight: lineHeight ?? 1.7,
          letterSpacing: tracking ? `${tracking}em` : undefined,
          textTransform: transform && transform !== "none" ? transform : undefined,
          fontWeight: weight ?? undefined,
        }}
      >
        {slotContent ?? (
          <div className="nb-rt" dangerouslySetInnerHTML={{ __html: html ?? "" }} />
        )}
      </div>
    </div>
  );
}

/* ---------------- Button ---------------- */

export interface ButtonProps extends BaseViewProps {
  label?: string;
  href?: string;
  bgColor?: string;
  textColor?: string;
  radius?: number;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline" | "glass" | "link";
  tracking?: number;
  transform?: "none" | "uppercase" | "lowercase" | "capitalize";
  icon?: "none" | "arrow-right" | "arrow-up-right";
  /** Editor-only: replaces the label with an inline-editable node. */
  slotLabel?: ReactNode;
}

const BTN_PAD: Record<string, string> = {
  sm: "8px 16px",
  md: "12px 24px",
  lg: "16px 34px",
};
const BTN_FS: Record<string, number> = { sm: 13, md: 15, lg: 17 };

export function ButtonView({
  style,
  label,
  href,
  bgColor,
  textColor,
  radius,
  size = "md",
  variant = "solid",
  icon = "none",
  tracking,
  transform,
  slotLabel,
}: ButtonProps) {
  const solid = variant === "solid";
  const glass = variant === "glass";
  const link = variant === "link";
  const Icon = icon === "arrow-right" ? ArrowRight : icon === "arrow-up-right" ? ArrowUpRight : null;

  return (
    <div style={styleToCss(style)}>
      <div style={measureCss(style)}>
        <a
          href={href || "#"}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: link ? 0 : BTN_PAD[size],
            fontSize: BTN_FS[size],
            fontWeight: glass ? 500 : 600,
            borderRadius: radius ?? 999,
            textDecoration: "none",
            background: solid ? bgColor || "#4f46e5" : glass ? "rgba(255,255,255,0.06)" : "transparent",
            letterSpacing: tracking ? `${tracking}em` : undefined,
            textTransform: transform && transform !== "none" ? transform : undefined,
            color: solid ? textColor || "#ffffff" : textColor || bgColor || "#4f46e5",
            border: solid || link ? "none" : `1.5px solid ${glass ? "rgba(255,255,255,0.45)" : bgColor || "#4f46e5"}`,
            backdropFilter: glass ? "blur(8px)" : undefined,
          }}
        >
          {slotLabel ?? label ?? "Button"}
          {Icon && <Icon size={BTN_FS[size] + 2} />}
        </a>
      </div>
    </div>
  );
}

/* ---------------- Image ---------------- */

export interface ImageProps extends BaseViewProps {
  src?: string;
  alt?: string;
  radius?: number;
  height?: number;
  fit?: "cover" | "contain";
  caption?: string;
}

export function ImageView({ style, src, alt, radius, height, fit = "cover", caption }: ImageProps) {
  return (
    <div style={styleToCss(style)}>
      <figure style={{ margin: 0, ...measureCss(style) }}>
        {src ? (
          // Arbitrary user-supplied URLs — a plain <img> avoids loader constraints.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt ?? ""}
            loading="lazy"
            style={{
              display: "block",
              width: "100%",
              height: height || "auto",
              objectFit: fit,
              borderRadius: radius ?? 12,
            }}
          />
        ) : (
          <div
            style={{
              height: height || 240,
              borderRadius: radius ?? 12,
              background: "rgb(0 0 0 / 0.06)",
              display: "grid",
              placeItems: "center",
              color: "rgb(0 0 0 / 0.35)",
              fontSize: 13,
            }}
          >
            No image selected
          </div>
        )}
        {caption ? (
          <figcaption style={{ fontSize: 13, opacity: 0.6, marginTop: 8, textAlign: "center" }}>
            {caption}
          </figcaption>
        ) : null}
      </figure>
    </div>
  );
}

/* ---------------- Columns ---------------- */

export interface ColumnsProps extends BaseViewProps {
  count?: number;
  gap?: number;
  widths?: number[];
  stackOnMobile?: boolean;
}

export function ColumnsView({ style, count = 2, gap = 24, widths, slots }: ColumnsProps) {
  const n = Math.max(1, Math.min(6, count));
  const template =
    widths && widths.length === n
      ? widths.map((w) => `${w}fr`).join(" ")
      : `repeat(${n}, 1fr)`;

  return (
    <div style={styleToCss(style)}>
      <div style={measureCss(style)}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: template,
            gap,
            alignItems: "start",
          }}
        >
          {Array.from({ length: n }).map((_, i) => (
            <div key={i}>{slots?.[`col-${i}`] ?? null}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Spacer / Divider ---------------- */

export function SpacerView({ height }: { height?: number }) {
  return <div style={{ height: height ?? 48 }} />;
}

export interface DividerProps extends BaseViewProps {
  thickness?: number;
  lineColor?: string;
  width?: number;
}

export function DividerView({ style, thickness, lineColor, width }: DividerProps) {
  return (
    <div style={styleToCss(style)}>
      <hr
        style={{
          border: "none",
          borderTop: `${thickness ?? 1}px solid ${lineColor || "rgb(0 0 0 / 0.15)"}`,
          width: width ? `${width}%` : "100%",
          margin:
            (style?.align ?? "left") === "center"
              ? "0 auto"
              : (style?.align ?? "left") === "right"
                ? "0 0 0 auto"
                : 0,
        }}
      />
    </div>
  );
}
