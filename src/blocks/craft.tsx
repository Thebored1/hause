"use client";

import React, { useRef, useState } from "react";
import { useNode, useEditor, Element, type Node, type NodeTree } from "@craftjs/core";
import {
  Type, Heading1, Image as ImageIcon, MousePointerClick, Columns as ColumnsIcon,
  Square, Minus, MoveVertical, GripVertical, Copy, Trash2, ChevronUp, ChevronDown,
} from "lucide-react";
import {
  SectionView, CardView, RowView, IconView, HeadingView, TextView, ButtonView, ImageView, ColumnsView,
  SpacerView, DividerView, type IconName,
} from "./views";
import { defaultStyle, type BlockStyle } from "./style";
import { defaultsFor, BLOCK_SCHEMA } from "./manifest";
import { InlineText, RichText } from "@/editor/inline";
import {
  Group, NumberSlider, Segmented, TextInput, ColorControl, StyleControls, Row as FieldRow, MediaControl,
} from "@/editor/controls";

// ============================================================
// Craft.js block components.
//
// Each block = a presentational view (shared with the published
// page) + editor behaviour: selection chrome, a drag handle,
// and on-canvas inline editing.
// ============================================================

const randomId = () => Math.random().toString(36).slice(2, 9);

/** Deep-clone a node subtree with fresh ids — the canonical Craft.js duplicate. */
function useDuplicate() {
  const { query, actions } = useEditor();
  return (id: string) => {
    const tree = query.node(id).toNodeTree();
    const nodes: Record<string, Node> = {};

    const clone = (nodeId: string, newParent?: string): string => {
      const node = tree.nodes[nodeId];
      const newId = randomId();
      const childIds = node.data.nodes.map((c: string) => clone(c, newId));
      const linked = Object.entries(node.data.linkedNodes ?? {}).reduce<Record<string, string>>(
        (acc, [key, childId]) => {
          acc[key] = clone(childId as string, newId);
          return acc;
        },
        {},
      );
      const draft = {
        ...node,
        id: newId,
        data: {
          ...node.data,
          nodes: childIds,
          linkedNodes: linked,
          parent: newParent ?? node.data.parent,
        },
      } as Node;
      nodes[newId] = query.parseFreshNode(draft).toNode();
      return newId;
    };

    const rootNodeId = clone(tree.rootNodeId);
    const parent = query.node(id).get().data.parent;
    if (!parent) return;
    const siblings = query.node(parent).get().data.nodes;
    actions.addNodeTree({ rootNodeId, nodes } as NodeTree, parent, siblings.indexOf(id) + 1);
  };
}

/* ---------------- selection chrome ---------------- */

function BlockShell({
  children,
  label,
  as = "div",
}: {
  children: React.ReactNode;
  label: string;
  as?: "div" | "section";
}) {
  const {
    connectors: { connect, drag },
    id,
    selected,
    hovered,
  } = useNode((node) => ({
    selected: node.events.selected,
    hovered: node.events.hovered,
  }));
  const { actions, query, isRoot } = useEditor((_, q) => ({
    isRoot: q.node(id).get()?.data?.parent === null,
  }));
  const duplicate = useDuplicate();
  const ref = useRef<HTMLDivElement>(null);

  const parent = query.node(id).get()?.data?.parent;
  const siblings = parent ? query.node(parent).get().data.nodes : [];
  const index = siblings.indexOf(id);

  const moveTo = (target: number) => {
    if (!parent || target < 0 || target >= siblings.length) return;
    // Craft removes the node before re-inserting, so moving down needs +1.
    actions.move(id, parent, target > index ? target + 1 : target);
  };

  const Tag = as;

  return (
    <Tag
      ref={(r: HTMLDivElement | null) => {
        if (r) connect(r);
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = r;
      }}
      style={{
        position: "relative",
        outline: selected
          ? "2px solid #4f46e5"
          : hovered
            ? "1px solid rgb(79 70 229 / 0.4)"
            : "none",
        outlineOffset: -1,
      }}
    >
      {selected && !isRoot && (
        <div
          contentEditable={false}
          className="absolute -top-9 left-0 z-30 flex items-center gap-0.5 rounded-lg bg-neutral-900 px-1 py-1 text-white shadow-lg"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <span
            ref={(r) => {
              if (r) drag(r);
            }}
            title="Drag to move"
            className="flex h-6 cursor-grab items-center gap-1 rounded px-1.5 text-[11px] font-medium text-white/80 hover:bg-white/15 active:cursor-grabbing"
          >
            <GripVertical size={12} />
            {label}
          </span>
          <span className="mx-0.5 h-4 w-px bg-white/20" />
          <ChromeBtn title="Move up" onClick={() => moveTo(index - 1)}>
            <ChevronUp size={13} />
          </ChromeBtn>
          <ChromeBtn title="Move down" onClick={() => moveTo(index + 1)}>
            <ChevronDown size={13} />
          </ChromeBtn>
          <ChromeBtn title="Duplicate" onClick={() => duplicate(id)}>
            <Copy size={12} />
          </ChromeBtn>
          <ChromeBtn title="Delete" onClick={() => actions.delete(id)}>
            <Trash2 size={12} />
          </ChromeBtn>
        </div>
      )}
      {children}
    </Tag>
  );
}

function ChromeBtn({
  title,
  onClick,
  children,
}: {
  title: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="flex h-6 w-6 items-center justify-center rounded text-white/70 hover:bg-white/15 hover:text-white"
    >
      {children}
    </button>
  );
}

/** Convenience hook for a block's own props. */
function useBlockProps<T>() {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({ props: node.data.props as T }));
  const set = (patch: Partial<T>) =>
    setProp((p: Record<string, unknown>) => Object.assign(p, patch));
  const setStyle = (patch: Partial<BlockStyle>) =>
    setProp((p: { style?: BlockStyle }) => {
      p.style = { ...defaultStyle, ...(p.style ?? {}), ...patch };
    });
  return { props, set, setStyle };
}

/* ---------------- Section (canvas container) ---------------- */

interface SectionBlockProps {
  style?: BlockStyle;
  minHeight?: number;
  heightVh?: number;
  valign?: "top" | "center" | "bottom" | "between";
  bgImage?: string;
  overlay?: number;
  scrim?: "none" | "bottom" | "left" | "both";
  scrimStrength?: number;
  children?: React.ReactNode;
}

export function Section({ children, ...props }: SectionBlockProps) {
  const {
    connectors: { connect },
  } = useNode();
  return (
    <div ref={(r) => { if (r) connect(r); }}>
      <SectionView {...props}>
        {children ?? <div className="nb-empty-slot" />}
      </SectionView>
    </div>
  );
}

function SectionSettings() {
  const { props, set, setStyle } = useBlockProps<SectionBlockProps>();
  return (
    <>
      <Group title="Size & position">
        <NumberSlider
          label="Full-screen height"
          value={props.heightVh ?? 0}
          max={100}
          suffix="vh"
          onChange={(v) => set({ heightVh: v })}
        />
        <NumberSlider
          label="Min height"
          value={props.minHeight ?? 0}
          max={900}
          step={10}
          onChange={(v) => set({ minHeight: v })}
        />
        <Segmented
          label="Vertical placement"
          value={props.valign ?? "top"}
          onChange={(v) => set({ valign: v })}
          options={[
            { label: "Top", value: "top" as const },
            { label: "Middle", value: "center" as const },
            { label: "Bottom", value: "bottom" as const },
            { label: "Split", value: "between" as const, title: "First child at top, last at bottom" },
          ]}
        />
      </Group>

      <Group title="Background">
        <MediaControl label="Background image" value={props.bgImage ?? ""} onChange={(v) => set({ bgImage: v })} />
        <Segmented
          label="Gradient scrim"
          value={props.scrim ?? "none"}
          onChange={(v) => set({ scrim: v })}
          options={[
            { label: "None", value: "none" as const },
            { label: "Bottom", value: "bottom" as const },
            { label: "Left", value: "left" as const },
            { label: "Both", value: "both" as const },
          ]}
        />
        <NumberSlider
          label="Scrim strength"
          value={props.scrimStrength ?? 75}
          max={100}
          suffix="%"
          onChange={(v) => set({ scrimStrength: v })}
        />
        <NumberSlider
          label="Flat overlay"
          value={props.overlay ?? 0}
          max={90}
          suffix="%"
          onChange={(v) => set({ overlay: v })}
        />
      </Group>
      <StyleControls value={props.style} onChange={setStyle} />
    </>
  );
}

Section.craft = {
  displayName: "Section",
  props: defaultsFor("Section"),
  related: { settings: SectionSettings },
};

/* ---------------- Row (flex, canvas) ---------------- */

interface RowBlockProps {
  style?: BlockStyle;
  gap?: number;
  wrap?: boolean;
  justify?: "start" | "center" | "end" | "between";
  vAlign?: "start" | "center" | "end" | "stretch";
  children?: React.ReactNode;
}

export function Row({ children, ...props }: RowBlockProps) {
  const {
    connectors: { connect },
  } = useNode();
  return (
    <div ref={(r) => { if (r) connect(r); }}>
      <RowView {...props}>{children ?? <div className="nb-empty-slot" />}</RowView>
    </div>
  );
}

function RowSettings() {
  const { props, set, setStyle } = useBlockProps<RowBlockProps>();
  return (
    <>
      <Group title="Row">
        <NumberSlider label="Gap" value={props.gap ?? 16} max={80} onChange={(v) => set({ gap: v })} />
        <Segmented
          label="Distribute"
          value={props.justify ?? "start"}
          onChange={(v) => set({ justify: v })}
          options={[
            { label: "Start", value: "start" as const },
            { label: "Centre", value: "center" as const },
            { label: "End", value: "end" as const },
            { label: "Space", value: "between" as const },
          ]}
        />
        <Segmented
          label="Align"
          value={props.vAlign ?? "center"}
          onChange={(v) => set({ vAlign: v })}
          options={[
            { label: "Top", value: "start" as const },
            { label: "Middle", value: "center" as const },
            { label: "Bottom", value: "end" as const },
            { label: "Fill", value: "stretch" as const },
          ]}
        />
        <FieldRow label="Wrapping">
          <label className="flex items-center gap-2 text-[13px] text-neutral-700">
            <input
              type="checkbox"
              checked={props.wrap !== false}
              onChange={(e) => set({ wrap: e.target.checked })}
              className="h-4 w-4 accent-indigo-600"
            />
            Wrap onto the next line
          </label>
        </FieldRow>
      </Group>
      <StyleControls value={props.style} onChange={setStyle} />
    </>
  );
}

Row.craft = {
  displayName: "Row",
  props: defaultsFor("Row"),
  related: { settings: RowSettings },
};

/* ---------------- Icon ---------------- */

interface IconBlockProps {
  style?: BlockStyle;
  name?: IconName;
  size?: number;
  strokeWidth?: number;
  color?: string;
}

export function Icon(props: IconBlockProps) {
  return (
    <BlockShell label="Icon">
      <IconView {...props} />
    </BlockShell>
  );
}

function IconSettings() {
  const { props, set, setStyle } = useBlockProps<IconBlockProps>();
  const names = (BLOCK_SCHEMA.Icon.props.name.options ?? []) as string[];
  return (
    <>
      <Group title="Icon">
        <FieldRow label="Glyph">
          <select
            value={props.name ?? "sparkles"}
            onChange={(e) => set({ name: e.target.value as IconName })}
            className="w-full rounded-md border border-neutral-300 px-2.5 py-1.5 text-[13px] outline-none focus:border-indigo-500"
          >
            {names.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </FieldRow>
        <NumberSlider label="Size" value={props.size ?? 22} min={12} max={96} onChange={(v) => set({ size: v })} />
        <NumberSlider label="Stroke" value={props.strokeWidth ?? 1.5} min={0.5} max={3} step={0.1} suffix="" onChange={(v) => set({ strokeWidth: v })} />
        <ColorControl label="Colour" value={props.color ?? ""} onChange={(v) => set({ color: v })} />
      </Group>
      <StyleControls value={props.style} onChange={setStyle} />
    </>
  );
}

Icon.craft = {
  displayName: "Icon",
  props: defaultsFor("Icon"),
  related: { settings: IconSettings },
};

/* ---------------- Card (canvas container) ---------------- */

interface CardBlockProps {
  style?: BlockStyle;
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
  children?: React.ReactNode;
}

export function Card({ children, ...props }: CardBlockProps) {
  const {
    connectors: { connect },
  } = useNode();
  return (
    <div ref={(r) => { if (r) connect(r); }} className="h-full">
      <CardView {...props}>{children ?? <div className="nb-empty-slot" />}</CardView>
    </div>
  );
}

function CardSettings() {
  const { props, set, setStyle } = useBlockProps<CardBlockProps>();
  return (
    <>
      <Group title="Card">
        <ColorControl label="Background" value={props.bg ?? ""} onChange={(v) => set({ bg: v })} />
        <ColorControl label="Border" value={props.borderColor ?? ""} onChange={(v) => set({ borderColor: v })} />
        <NumberSlider label="Border width" value={props.borderWidth ?? 1} max={6} onChange={(v) => set({ borderWidth: v })} />
        <NumberSlider label="Corner radius" value={props.radius ?? 14} max={999} onChange={(v) => set({ radius: v })} />
        <NumberSlider label="Inner padding" value={props.padding ?? 24} max={80} onChange={(v) => set({ padding: v })} />
        <NumberSlider label="Padding — horizontal" value={props.paddingX ?? 0} max={80} onChange={(v) => set({ paddingX: v })} />
        <NumberSlider label="Padding — vertical" value={props.paddingY ?? 0} max={80} onChange={(v) => set({ paddingY: v })} />
        <Segmented
          label="Shadow"
          value={props.shadow ?? "none"}
          onChange={(v) => set({ shadow: v })}
          options={[
            { label: "None", value: "none" as const },
            { label: "S", value: "sm" as const },
            { label: "M", value: "md" as const },
            { label: "L", value: "lg" as const },
          ]}
        />
        <Segmented
          label="On hover"
          value={props.hover ?? "none"}
          onChange={(v) => set({ hover: v })}
          options={[
            { label: "None", value: "none" as const },
            { label: "Lift", value: "lift" as const },
            { label: "Border", value: "border" as const },
            { label: "Shadow", value: "shadow" as const },
          ]}
        />
        <FieldRow label="Height">
          <label className="flex items-center gap-2 text-[13px] text-neutral-700">
            <input
              type="checkbox"
              checked={props.fullHeight !== false}
              onChange={(e) => set({ fullHeight: e.target.checked })}
              className="h-4 w-4 accent-indigo-600"
            />
            Match the tallest card in the row
          </label>
        </FieldRow>
      </Group>
      <StyleControls value={props.style} onChange={setStyle} />
    </>
  );
}

Card.craft = {
  displayName: "Card",
  props: defaultsFor("Card"),
  related: { settings: CardSettings },
};

/** The drop target inside each column. */
export function ColumnDrop({ children }: { children?: React.ReactNode }) {
  const {
    connectors: { connect },
  } = useNode();
  return (
    <div ref={(r) => { if (r) connect(r); }} style={{ minHeight: 40 }}>
      {children ?? <div className="nb-empty-slot" />}
    </div>
  );
}
ColumnDrop.craft = { displayName: "Column", rules: { canDrag: () => false } };

/* ---------------- Heading ---------------- */

interface HeadingBlockProps {
  style?: BlockStyle;
  text?: string;
  level?: 1 | 2 | 3 | 4;
  size?: number;
  weight?: number;
  tracking?: number;
  lineHeight?: number;
  transform?: "none" | "uppercase" | "lowercase" | "capitalize";
  maxWidth?: number;
}

export function Heading(props: HeadingBlockProps) {
  const { set } = useBlockProps<HeadingBlockProps>();
  return (
    <BlockShell label="Heading">
      <HeadingView
        {...props}
        slotText={
          <InlineText
            value={props.text ?? ""}
            placeholder="Heading"
            onChange={(v) => set({ text: v })}
          />
        }
      />
    </BlockShell>
  );
}

function HeadingSettings() {
  const { props, set, setStyle } = useBlockProps<HeadingBlockProps>();
  return (
    <>
      <Group title="Heading">
        <Segmented
          label="Level"
          value={props.level ?? 2}
          onChange={(v) => set({ level: v })}
          options={[
            { label: "H1", value: 1 as const },
            { label: "H2", value: 2 as const },
            { label: "H3", value: 3 as const },
            { label: "H4", value: 4 as const },
          ]}
        />
        <NumberSlider
          label="Font size"
          value={props.size ?? 38}
          min={12}
          max={120}
          onChange={(v) => set({ size: v })}
        />
        <NumberSlider
          label="Weight"
          value={props.weight ?? 600}
          min={300}
          max={900}
          step={100}
          suffix=""
          onChange={(v) => set({ weight: v })}
        />
        <NumberSlider
          label="Letter spacing"
          value={props.tracking ?? -0.02}
          min={-0.1}
          max={0.4}
          step={0.005}
          suffix="em"
          onChange={(v) => set({ tracking: v })}
        />
        <NumberSlider
          label="Line height"
          value={props.lineHeight ?? 1.15}
          min={0.85}
          max={2.2}
          step={0.01}
          suffix=""
          onChange={(v) => set({ lineHeight: v })}
        />
        <Segmented
          label="Casing"
          value={props.transform ?? "none"}
          onChange={(v) => set({ transform: v })}
          options={[
            { label: "Aa", value: "none" as const, title: "As typed" },
            { label: "AA", value: "uppercase" as const, title: "Uppercase" },
            { label: "aa", value: "lowercase" as const, title: "Lowercase" },
          ]}
        />
        <NumberSlider
          label="Max line length"
          value={props.maxWidth ?? 0}
          max={1200}
          step={20}
          onChange={(v) => set({ maxWidth: v })}
        />
      </Group>
      <StyleControls value={props.style} onChange={setStyle} />
    </>
  );
}

Heading.craft = {
  displayName: "Heading",
  props: defaultsFor("Heading"),
  related: { settings: HeadingSettings },
};

/* ---------------- Text (rich) ---------------- */

interface TextBlockProps {
  style?: BlockStyle;
  html?: string;
  size?: number;
  tracking?: number;
  lineHeight?: number;
  transform?: "none" | "uppercase" | "lowercase" | "capitalize";
  weight?: number;
}

export function Text(props: TextBlockProps) {
  const { set } = useBlockProps<TextBlockProps>();
  const { id } = useNode();
  const { actions, query } = useEditor();
  const [slash, setSlash] = useState<string | null>(null);

  const insertAfter = (factory: () => React.ReactElement) => {
    const parent = query.node(id).get().data.parent;
    if (!parent) return;
    const siblings = query.node(parent).get().data.nodes;
    const tree = query.parseReactElement(factory()).toNodeTree();
    actions.addNodeTree(tree, parent, siblings.indexOf(id) + 1);
    set({ html: "<p></p>" });
    setSlash(null);
  };

  return (
    <BlockShell label="Text">
      <div style={{ position: "relative" }}>
        <TextView
          {...props}
          slotContent={
            <RichText
              html={props.html ?? ""}
              onChange={(v) => set({ html: v })}
              onSlashQuery={setSlash}
            />
          }
        />
        {slash !== null && (
          <SlashMenu query={slash} onPick={insertAfter} onClose={() => setSlash(null)} />
        )}
      </div>
    </BlockShell>
  );
}

function SlashMenu({
  query,
  onPick,
  onClose,
}: {
  query: string;
  onPick: (factory: () => React.ReactElement) => void;
  onClose: () => void;
}) {
  const items = BLOCK_LIST.filter((b) =>
    b.name.toLowerCase().includes(query.trim().toLowerCase()),
  );
  if (items.length === 0) return null;
  return (
    <div
      contentEditable={false}
      className="absolute left-0 top-full z-40 mt-1 w-60 overflow-hidden rounded-xl border border-neutral-200 bg-white py-1 shadow-2xl"
    >
      <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
        Insert block
      </div>
      {items.map((b) => (
        <button
          key={b.name}
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            onPick(b.make);
          }}
          className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-[13px] text-neutral-700 hover:bg-indigo-50"
        >
          <span className="text-neutral-400">{b.icon}</span>
          {b.name}
        </button>
      ))}
      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault();
          onClose();
        }}
        className="mt-1 w-full border-t border-neutral-100 px-3 py-1.5 text-left text-[11px] text-neutral-400 hover:bg-neutral-50"
      >
        Dismiss
      </button>
    </div>
  );
}

function TextSettings() {
  const { props, set, setStyle } = useBlockProps<TextBlockProps>();
  return (
    <>
      <Group title="Text">
        <NumberSlider
          label="Font size"
          value={props.size ?? 17}
          min={11}
          max={40}
          onChange={(v) => set({ size: v })}
        />
        <NumberSlider
          label="Weight"
          value={props.weight ?? 400}
          min={300}
          max={900}
          step={100}
          suffix=""
          onChange={(v) => set({ weight: v })}
        />
        <NumberSlider
          label="Letter spacing"
          value={props.tracking ?? 0}
          min={-0.05}
          max={0.4}
          step={0.005}
          suffix="em"
          onChange={(v) => set({ tracking: v })}
        />
        <NumberSlider
          label="Line height"
          value={props.lineHeight ?? 1.7}
          min={1}
          max={2.4}
          step={0.05}
          suffix=""
          onChange={(v) => set({ lineHeight: v })}
        />
        <Segmented
          label="Casing"
          value={props.transform ?? "none"}
          onChange={(v) => set({ transform: v })}
          options={[
            { label: "Aa", value: "none" as const, title: "As typed" },
            { label: "AA", value: "uppercase" as const, title: "Uppercase" },
            { label: "aa", value: "lowercase" as const, title: "Lowercase" },
          ]}
        />
      </Group>
      <StyleControls value={props.style} onChange={setStyle} />
    </>
  );
}

Text.craft = {
  displayName: "Text",
  props: defaultsFor("Text"),
  related: { settings: TextSettings },
};

/* ---------------- Button ---------------- */

interface ButtonBlockProps {
  style?: BlockStyle;
  label?: string;
  href?: string;
  bgColor?: string;
  textColor?: string;
  radius?: number;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline" | "glass" | "link";
  icon?: "none" | "arrow-right" | "arrow-up-right";
  tracking?: number;
  transform?: "none" | "uppercase" | "lowercase" | "capitalize";
}

export function Button(props: ButtonBlockProps) {
  const { set } = useBlockProps<ButtonBlockProps>();
  return (
    <BlockShell label="Button">
      <ButtonView
        {...props}
        slotLabel={
          <InlineText
            value={props.label ?? ""}
            placeholder="Button"
            onChange={(v) => set({ label: v })}
          />
        }
      />
    </BlockShell>
  );
}

function ButtonSettings() {
  const { props, set, setStyle } = useBlockProps<ButtonBlockProps>();
  return (
    <>
      <Group title="Button">
        <TextInput label="Link" value={props.href ?? ""} placeholder="/contact" onChange={(v) => set({ href: v })} />
        <Segmented
          label="Variant"
          value={props.variant ?? "solid"}
          onChange={(v) => set({ variant: v })}
          options={[
            { label: "Solid", value: "solid" as const },
            { label: "Outline", value: "outline" as const },
            { label: "Glass", value: "glass" as const, title: "Translucent blurred fill for use over photos" },
            { label: "Link", value: "link" as const, title: "Plain text link with no background" },
          ]}
        />
        <Segmented
          label="Icon"
          value={props.icon ?? "none"}
          onChange={(v) => set({ icon: v })}
          options={[
            { label: "None", value: "none" as const },
            { label: "→", value: "arrow-right" as const },
            { label: "↗", value: "arrow-up-right" as const },
          ]}
        />
        <Segmented
          label="Size"
          value={props.size ?? "md"}
          onChange={(v) => set({ size: v })}
          options={[
            { label: "S", value: "sm" as const },
            { label: "M", value: "md" as const },
            { label: "L", value: "lg" as const },
          ]}
        />
        <ColorControl label="Button colour" value={props.bgColor ?? ""} onChange={(v) => set({ bgColor: v })} />
        <ColorControl label="Label colour" value={props.textColor ?? ""} onChange={(v) => set({ textColor: v })} />
        <NumberSlider label="Radius" value={props.radius ?? 999} max={999} onChange={(v) => set({ radius: v })} />
        <NumberSlider
          label="Letter spacing"
          value={props.tracking ?? 0}
          min={-0.05}
          max={0.4}
          step={0.005}
          suffix="em"
          onChange={(v) => set({ tracking: v })}
        />
        <Segmented
          label="Casing"
          value={props.transform ?? "none"}
          onChange={(v) => set({ transform: v })}
          options={[
            { label: "Aa", value: "none" as const, title: "As typed" },
            { label: "AA", value: "uppercase" as const, title: "Uppercase" },
            { label: "aa", value: "lowercase" as const, title: "Lowercase" },
          ]}
        />
      </Group>
      <StyleControls value={props.style} onChange={setStyle} />
    </>
  );
}

Button.craft = {
  displayName: "Button",
  props: defaultsFor("Button"),
  related: { settings: ButtonSettings },
};

/* ---------------- Image ---------------- */

interface ImageBlockProps {
  style?: BlockStyle;
  src?: string;
  alt?: string;
  radius?: number;
  height?: number;
  fit?: "cover" | "contain";
  caption?: string;
}

export function ImageBlock(props: ImageBlockProps) {
  return (
    <BlockShell label="Image">
      <ImageView {...props} />
    </BlockShell>
  );
}

function ImageSettings() {
  const { props, set, setStyle } = useBlockProps<ImageBlockProps>();
  return (
    <>
      <Group title="Image">
        <MediaControl label="Image" value={props.src ?? ""} onChange={(v) => set({ src: v })} />
        <TextInput label="Alt text" value={props.alt ?? ""} onChange={(v) => set({ alt: v })} />
        <TextInput label="Caption" value={props.caption ?? ""} onChange={(v) => set({ caption: v })} />
        <NumberSlider label="Height" value={props.height ?? 0} max={900} step={10} onChange={(v) => set({ height: v })} />
        <Segmented
          label="Fit"
          value={props.fit ?? "cover"}
          onChange={(v) => set({ fit: v })}
          options={[
            { label: "Cover", value: "cover" as const },
            { label: "Contain", value: "contain" as const },
          ]}
        />
        <NumberSlider label="Radius" value={props.radius ?? 12} max={80} onChange={(v) => set({ radius: v })} />
      </Group>
      <StyleControls value={props.style} onChange={setStyle} />
    </>
  );
}

ImageBlock.craft = {
  displayName: "Image",
  props: defaultsFor("ImageBlock"),
  related: { settings: ImageSettings },
};

/* ---------------- Columns ---------------- */

interface ColumnsBlockProps {
  style?: BlockStyle;
  count?: number;
  gap?: number;
  widths?: number[];
}

export function Columns({ count = 2, gap = 24, widths, style }: ColumnsBlockProps) {
  const n = Math.max(1, Math.min(6, count));
  const slots: Record<string, React.ReactNode> = {};
  for (let i = 0; i < n; i++) {
    slots[`col-${i}`] = <Element id={`col-${i}`} is={ColumnDrop} canvas />;
  }
  return (
    <BlockShell label="Columns">
      <ColumnsView count={n} gap={gap} widths={widths} style={style} slots={slots} />
    </BlockShell>
  );
}

function ColumnsSettings() {
  const { props, set, setStyle } = useBlockProps<ColumnsBlockProps>();
  const n = props.count ?? 2;
  const widths = props.widths ?? Array.from({ length: n }, () => 1);
  return (
    <>
      <Group title="Columns">
        <Segmented
          label="Count"
          value={n}
          onChange={(v) => set({ count: v, widths: Array.from({ length: v }, () => 1) })}
          options={[
            { label: "1", value: 1 },
            { label: "2", value: 2 },
            { label: "3", value: 3 },
            { label: "4", value: 4 },
            { label: "5", value: 5 },
            { label: "6", value: 6 },
          ]}
        />
        <NumberSlider label="Gap" value={props.gap ?? 24} max={120} onChange={(v) => set({ gap: v })} />
        <FieldRow label="Column widths">
          <div className="space-y-2">
            {Array.from({ length: n }).map((_, i) => (
              <NumberSlider
                key={i}
                label={`Column ${i + 1}`}
                value={widths[i] ?? 1}
                min={1}
                max={6}
                suffix="fr"
                onChange={(v) => {
                  const next = [...widths];
                  next[i] = v;
                  set({ widths: next });
                }}
              />
            ))}
          </div>
        </FieldRow>
      </Group>
      <StyleControls value={props.style} onChange={setStyle} />
    </>
  );
}

Columns.craft = {
  displayName: "Columns",
  props: defaultsFor("Columns"),
  related: { settings: ColumnsSettings },
};

/* ---------------- Spacer / Divider ---------------- */

export function Spacer({ height }: { height?: number }) {
  return (
    <BlockShell label="Spacer">
      <SpacerView height={height} />
    </BlockShell>
  );
}
function SpacerSettings() {
  const { props, set } = useBlockProps<{ height?: number }>();
  return (
    <Group title="Spacer">
      <NumberSlider label="Height" value={props.height ?? 48} max={400} onChange={(v) => set({ height: v })} />
    </Group>
  );
}
Spacer.craft = { displayName: "Spacer", props: defaultsFor("Spacer"), related: { settings: SpacerSettings } };

interface DividerBlockProps {
  style?: BlockStyle;
  thickness?: number;
  lineColor?: string;
  width?: number;
}

export function Divider(props: DividerBlockProps) {
  return (
    <BlockShell label="Divider">
      <DividerView {...props} />
    </BlockShell>
  );
}
function DividerSettings() {
  const { props, set, setStyle } = useBlockProps<DividerBlockProps>();
  return (
    <>
      <Group title="Divider">
        <NumberSlider label="Thickness" value={props.thickness ?? 1} min={1} max={12} onChange={(v) => set({ thickness: v })} />
        <NumberSlider label="Width" value={props.width ?? 100} min={10} max={100} suffix="%" onChange={(v) => set({ width: v })} />
        <ColorControl label="Colour" value={props.lineColor ?? ""} onChange={(v) => set({ lineColor: v })} />
      </Group>
      <StyleControls value={props.style} onChange={setStyle} />
    </>
  );
}
Divider.craft = {
  displayName: "Divider",
  props: defaultsFor("Divider"),
  related: { settings: DividerSettings },
};

/* ---------------- registry ---------------- */

export const resolver = {
  Row,
  Icon,
  Card,
  Section,
  ColumnDrop,
  Heading,
  Text,
  Button,
  ImageBlock,
  Columns,
  Spacer,
  Divider,
};

export interface BlockDef {
  name: string;
  icon: React.ReactNode;
  make: () => React.ReactElement;
}

export const BLOCK_LIST: BlockDef[] = [
  { name: "Heading", icon: <Heading1 size={15} />, make: () => <Heading /> },
  { name: "Text", icon: <Type size={15} />, make: () => <Text /> },
  { name: "Image", icon: <ImageIcon size={15} />, make: () => <ImageBlock /> },
  { name: "Button", icon: <MousePointerClick size={15} />, make: () => <Button /> },
  {
    name: "Columns",
    icon: <ColumnsIcon size={15} />,
    make: () => <Columns />,
  },
  {
    name: "Section",
    icon: <Square size={15} />,
    make: () => <Element is={Section} canvas />,
  },
  { name: "Spacer", icon: <MoveVertical size={15} />, make: () => <Spacer /> },
  { name: "Divider", icon: <Minus size={15} />, make: () => <Divider /> },
];
