"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown, ChevronUp, Plus, Trash2, Upload } from "lucide-react";
import { COLOR_SWATCHES, defaultStyle, type BlockStyle } from "@/blocks/style";

// ============================================================
// Reusable inspector controls (right sidebar).
// Deliberately plain + dense, in the spirit of a real block
// editor sidebar: numeric sliders, colour swatches, segmented
// toggles — not a wall of text inputs.
// ============================================================

export function Group({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-neutral-200">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-3 text-[13px] font-semibold text-neutral-800 hover:bg-neutral-50"
      >
        {title}
        <ChevronDown
          size={14}
          className={`text-neutral-400 transition-transform ${open ? "" : "-rotate-90"}`}
        />
      </button>
      {open && <div className="space-y-3 px-4 pb-4">{children}</div>}
    </div>
  );
}

export function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <div className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-neutral-500">
        {label}
      </div>
      {children}
    </div>
  );
}

export function NumberSlider({
  label,
  value,
  onChange,
  min = 0,
  max = 200,
  step = 1,
  suffix = "px",
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-wide text-neutral-500">
          {label}
        </span>
        <span className="text-[11px] tabular-nums text-neutral-500">
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-indigo-600"
      />
    </div>
  );
}

export function TextInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <Row label={label}>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-neutral-300 px-2.5 py-1.5 text-[13px] outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
      />
    </Row>
  );
}

export function Segmented<T extends string | number>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { label: ReactNode; value: T; title?: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <Row label={label}>
      <div className="flex overflow-hidden rounded-md border border-neutral-300">
        {options.map((o, i) => (
          <button
            key={String(o.value)}
            type="button"
            title={o.title}
            onClick={() => onChange(o.value)}
            className={`flex-1 px-2 py-1.5 text-[12px] font-medium transition-colors ${
              i > 0 ? "border-l border-neutral-300" : ""
            } ${
              value === o.value
                ? "bg-indigo-600 text-white"
                : "bg-white text-neutral-600 hover:bg-neutral-50"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </Row>
  );
}

export function ColorControl({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Row label={label}>
      <div className="flex flex-wrap items-center gap-1.5">
        {COLOR_SWATCHES.map((c) => {
          const active = (value || "") === c.value;
          return (
            <button
              key={c.name}
              type="button"
              title={c.name}
              onClick={() => onChange(c.value)}
              className={`h-6 w-6 rounded-full border transition-transform ${
                active ? "scale-110 ring-2 ring-indigo-500 ring-offset-1" : "border-neutral-300"
              }`}
              style={{
                background: c.value || "transparent",
                backgroundImage: c.value
                  ? undefined
                  : "linear-gradient(45deg,#ddd 25%,transparent 25%,transparent 75%,#ddd 75%),linear-gradient(45deg,#ddd 25%,transparent 25%,transparent 75%,#ddd 75%)",
                backgroundSize: c.value ? undefined : "6px 6px",
                backgroundPosition: c.value ? undefined : "0 0,3px 3px",
              }}
            />
          );
        })}
        <input
          type="color"
          value={value || "#ffffff"}
          onChange={(e) => onChange(e.target.value)}
          className="h-6 w-8 cursor-pointer rounded border border-neutral-300 bg-white p-0"
          title="Custom colour"
        />
      </div>
    </Row>
  );
}

/** Image field: upload a file or paste a URL. */
export function MediaControl({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Uploads into Payload's Media collection, so images land in the
  // same library the rest of the admin uses (and get resized).
  const upload = async (file: File) => {
    setBusy(true);
    setError(null);
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("_payload", JSON.stringify({ alt: file.name }));
      const res = await fetch("/api/media", { method: "POST", body, credentials: "include" });
      const data = await res.json();
      const url = data?.doc?.url ?? data?.url;
      if (!res.ok || !url) setError(data?.errors?.[0]?.message ?? "Upload failed");
      else onChange(url);
    } catch {
      setError("Upload failed");
    }
    setBusy(false);
  };

  return (
    <Row label={label}>
      {value ? (
        <div className="mb-2 flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="h-12 w-16 rounded border border-neutral-200 object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="rounded p-1.5 text-neutral-400 hover:bg-red-50 hover:text-red-600"
            title="Remove"
          >
            <Trash2 size={13} />
          </button>
        </div>
      ) : null}

      <label className="mb-1.5 flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-dashed border-neutral-300 py-2 text-[12px] font-medium text-neutral-600 hover:border-indigo-400 hover:text-indigo-600">
        <Upload size={13} />
        {busy ? "Uploading…" : "Upload image"}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          disabled={busy}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) upload(f);
            e.target.value = "";
          }}
        />
      </label>

      <input
        type="text"
        value={value}
        placeholder="…or paste an image URL"
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-neutral-300 px-2.5 py-1.5 text-[12px] outline-none focus:border-indigo-500"
      />
      {error && <p className="mt-1 text-[11px] text-red-600">{error}</p>}
    </Row>
  );
}

/** Repeatable rows for a `list` prop (chips, stats, …). */
export function ListControl({
  label,
  value,
  fields,
  onChange,
}: {
  label: string;
  value: Record<string, unknown>[];
  fields: Record<string, { default: unknown; description?: string }>;
  onChange: (next: Record<string, unknown>[]) => void;
}) {
  const items = Array.isArray(value) ? value : [];
  const keys = Object.keys(fields);

  const update = (i: number, key: string, v: string) => {
    const next = items.map((it, j) => (j === i ? { ...it, [key]: v } : it));
    onChange(next);
  };
  const move = (from: number, to: number) => {
    if (to < 0 || to >= items.length) return;
    const next = [...items];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  };

  return (
    <Row label={label}>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="rounded-lg border border-neutral-200 p-2">
            {keys.map((key) => (
              <input
                key={key}
                value={String(item[key] ?? "")}
                placeholder={fields[key].description ?? key}
                onChange={(e) => update(i, key, e.target.value)}
                className="mb-1 w-full rounded-md border border-neutral-300 px-2 py-1 text-[12px] outline-none focus:border-indigo-500"
              />
            ))}
            <div className="flex items-center justify-end gap-0.5">
              <button type="button" onClick={() => move(i, i - 1)} disabled={i === 0} title="Move up" className="rounded p-1 text-neutral-400 hover:bg-neutral-100 disabled:opacity-25">
                <ChevronUp size={12} />
              </button>
              <button type="button" onClick={() => move(i, i + 1)} disabled={i === items.length - 1} title="Move down" className="rounded p-1 text-neutral-400 hover:bg-neutral-100 disabled:opacity-25">
                <ChevronDown size={12} />
              </button>
              <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))} title="Remove" className="rounded p-1 text-neutral-400 hover:bg-red-50 hover:text-red-600">
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            onChange([...items, Object.fromEntries(keys.map((k) => [k, fields[k].default]))])
          }
          className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-neutral-300 py-1.5 text-[12px] font-medium text-neutral-600 hover:border-indigo-400 hover:text-indigo-600"
        >
          <Plus size={12} /> Add
        </button>
      </div>
    </Row>
  );
}

/* ---------------- shared style block ---------------- */

export function StyleControls({
  value,
  onChange,
}: {
  value?: BlockStyle;
  onChange: (patch: Partial<BlockStyle>) => void;
}) {
  const s = { ...defaultStyle, ...(value ?? {}) };
  return (
    <>
      <Group title="Layout">
        <Segmented
          label="Align"
          value={s.align ?? "left"}
          onChange={(v) => onChange({ align: v })}
          options={[
            { label: "Left", value: "left" as const },
            { label: "Center", value: "center" as const },
            { label: "Right", value: "right" as const },
          ]}
        />
        <NumberSlider
          label="Max content width"
          value={s.maxWidth ?? 0}
          min={0}
          max={1600}
          step={20}
          onChange={(v) => onChange({ maxWidth: v })}
        />
      </Group>

      <Group title="Spacing">
        <NumberSlider label="Padding top" value={s.pt ?? 0} max={200} onChange={(v) => onChange({ pt: v })} />
        <NumberSlider label="Padding bottom" value={s.pb ?? 0} max={200} onChange={(v) => onChange({ pb: v })} />
        <NumberSlider label="Padding left" value={s.pl ?? 0} max={200} onChange={(v) => onChange({ pl: v })} />
        <NumberSlider label="Padding right" value={s.pr ?? 0} max={200} onChange={(v) => onChange({ pr: v })} />
        <NumberSlider label="Margin top" value={s.mt ?? 0} min={-100} max={200} onChange={(v) => onChange({ mt: v })} />
        <NumberSlider label="Margin bottom" value={s.mb ?? 0} min={-100} max={200} onChange={(v) => onChange({ mb: v })} />
      </Group>

      <Group title="Colour">
        <ColorControl label="Background" value={s.bg ?? ""} onChange={(v) => onChange({ bg: v })} />
        <ColorControl label="Text" value={s.color ?? ""} onChange={(v) => onChange({ color: v })} />
        <NumberSlider
          label="Corner radius"
          value={s.radius ?? 0}
          max={80}
          onChange={(v) => onChange({ radius: v })}
        />
      </Group>
    </>
  );
}
