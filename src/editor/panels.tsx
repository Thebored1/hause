"use client";

import React, { useState } from "react";
import { useEditor } from "@craftjs/core";
import { ChevronRight, Settings2 } from "lucide-react";
import { BLOCK_LIST } from "@/blocks/craft";

// ============================================================
// Editor panels shared by any host that mounts the canvas:
// the block inserter, the layer tree and the inspector.
// ============================================================

export function PanelTab({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-1 items-center justify-center gap-1.5 py-2.5 text-[12px] font-semibold transition-colors ${
        active
          ? "border-b-2 border-neutral-900 text-neutral-900"
          : "border-b-2 border-transparent text-neutral-500 hover:text-neutral-800"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}

/** Drag-to-canvas block palette. */
export function Inserter() {
  const { connectors } = useEditor();
  return (
    <div className="p-3">
      <p className="mb-2 px-1 text-[11px] text-neutral-400">Drag onto the canvas</p>
      <div className="grid grid-cols-2 gap-2">
        {BLOCK_LIST.map((b) => (
          <div
            key={b.name}
            ref={(r) => {
              if (r) connectors.create(r, b.make());
            }}
            className="flex cursor-grab flex-col items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-2 py-3 text-[12px] font-medium text-neutral-700 transition-colors hover:border-indigo-400 hover:bg-indigo-50/50 hover:text-indigo-700 active:cursor-grabbing"
          >
            <span className="text-neutral-400">{b.icon}</span>
            {b.name}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Document outline — click to select, mirrors the block tree. */
export function LayerTree() {
  const { rootId } = useEditor((state) => ({
    rootId: Object.keys(state.nodes).find((id) => !state.nodes[id].data.parent),
  }));
  if (!rootId) return null;
  return (
    <div className="p-2">
      <LayerNode id={rootId} depth={0} />
    </div>
  );
}

function LayerNode({ id, depth }: { id: string; depth: number }) {
  const { actions, name, childIds, linkedIds, selected } = useEditor((state) => {
    const node = state.nodes[id];
    return {
      name: node?.data.custom?.displayName || node?.data.displayName || node?.data.name,
      childIds: node?.data.nodes ?? [],
      linkedIds: Object.values(node?.data.linkedNodes ?? {}) as string[],
      selected: state.events.selected?.has(id),
    };
  });
  const [open, setOpen] = useState(true);
  const kids = [...childIds, ...linkedIds];

  return (
    <div>
      <div
        onClick={() => actions.selectNode(id)}
        style={{ paddingLeft: depth * 12 + 6 }}
        className={`flex cursor-pointer items-center gap-1 rounded-md py-1.5 pr-2 text-[12px] transition-colors ${
          selected ? "bg-indigo-50 font-semibold text-indigo-700" : "text-neutral-600 hover:bg-neutral-100"
        }`}
      >
        {kids.length > 0 ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpen((o) => !o);
            }}
            className="text-neutral-400"
          >
            <ChevronRight size={12} className={open ? "rotate-90" : ""} />
          </button>
        ) : (
          <span className="w-3" />
        )}
        {name ?? "Block"}
      </div>
      {open && kids.map((k) => <LayerNode key={k} id={k} depth={depth + 1} />)}
    </div>
  );
}

/** Contextual settings for the selected block. */
export function Inspector() {
  const { name, settings, isRoot } = useEditor((state) => {
    const id = Array.from(state.events.selected ?? [])[0] as string | undefined;
    if (!id || !state.nodes[id]) return {};
    const node = state.nodes[id];
    return {
      name: node.data.custom?.displayName || node.data.displayName || node.data.name,
      settings: node.related?.settings as React.ElementType | undefined,
      isRoot: node.data.parent === null,
    };
  });

  if (!settings) {
    return (
      <div className="p-6 text-center">
        <Settings2 size={22} className="mx-auto mb-2 text-neutral-300" />
        <p className="text-[13px] font-medium text-neutral-600">Nothing selected</p>
        <p className="mt-1 text-[12px] leading-relaxed text-neutral-400">
          Click a block on the canvas to edit its settings, or drag a new one in from the left.
        </p>
      </div>
    );
  }

  const Settings = settings;
  return (
    <div>
      <div className="border-b border-neutral-200 px-4 py-3">
        <div className="text-[13px] font-semibold">{name}</div>
        <div className="text-[11px] text-neutral-400">{isRoot ? "Page root" : "Block settings"}</div>
      </div>
      <Settings />
    </div>
  );
}
