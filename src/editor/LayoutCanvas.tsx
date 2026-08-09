"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useField } from "@payloadcms/ui";
import { Editor, Frame, Element, useEditor } from "@craftjs/core";
import { Undo2, Redo2, Plus, Layers as LayersIcon } from "lucide-react";
import { resolver, Section, Heading, Text } from "@/blocks/craft";
import { Inserter, LayerTree, Inspector, PanelTab } from "@/editor/panels";
import "./canvas.css";

// ============================================================
// The block canvas, mounted as the admin UI for the Pages
// `layout` JSON field.
//
// It writes into Payload's form state via useField, so Payload's
// own Save/Publish, drafts, versions and document locking all
// apply — this component owns no persistence of its own.
//
// Autosave is off on the Pages collection precisely because this
// writes on every keystroke; with autosave on, each character
// would become a network write and a version entry.
// ============================================================

type Nodes = Record<string, unknown>;

export function LayoutCanvas({ path }: { path?: string }) {
  const { value, setValue, formInitializing } = useField<Nodes | undefined>({ path });

  // Craft owns the tree once mounted, so initial data is captured
  // exactly once. Two things matter here:
  //
  //  - Wait for form state to finish loading. Mounting early would
  //    capture an empty value, render the blank starter page, and
  //    then push that over a real layout — silent data loss.
  //  - Never re-feed `value` afterwards; that would reset the
  //    editor mid-edit and fight the user's caret.
  const initialRef = useRef<string | undefined>(undefined);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready || formInitializing) return;
    initialRef.current =
      value && Object.keys(value).length ? JSON.stringify(value) : undefined;
    setReady(true);
  }, [ready, formInitializing, value]);

  // Debounced so a burst of typing becomes one form-state write.
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const push = useCallback(
    (json: string) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        try {
          setValue(JSON.parse(json) as Nodes);
        } catch {
          /* a malformed serialize is not worth destroying form state over */
        }
      }, 400);
    },
    [setValue],
  );

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  if (!ready) {
    return (
      <div className="nb-canvas-root" style={{ display: "grid", placeItems: "center" }}>
        <span style={{ fontSize: 13, opacity: 0.5 }}>Loading canvas…</span>
      </div>
    );
  }

  return (
    <div className="nb-canvas-root">
      <Editor resolver={resolver} onNodesChange={(query) => push(query.serialize())}>
        <CanvasBody initial={initialRef.current} />
      </Editor>
    </div>
  );
}

function CanvasBody({ initial }: { initial?: string }) {
  const { actions, canUndo, canRedo } = useEditor((_, q) => ({
    canUndo: q.history.canUndo(),
    canRedo: q.history.canRedo(),
  }));
  const [tab, setTab] = useState<"insert" | "layers">("insert");

  return (
    <>
      <div className="flex h-11 shrink-0 items-center gap-1 border-b border-black/10 bg-white px-2">
        <button
          type="button"
          title="Undo"
          disabled={!canUndo}
          onClick={() => actions.history.undo()}
          className="flex h-7 w-7 items-center justify-center rounded text-neutral-600 hover:bg-neutral-100 disabled:opacity-30"
        >
          <Undo2 size={15} />
        </button>
        <button
          type="button"
          title="Redo"
          disabled={!canRedo}
          onClick={() => actions.history.redo()}
          className="flex h-7 w-7 items-center justify-center rounded text-neutral-600 hover:bg-neutral-100 disabled:opacity-30"
        >
          <Redo2 size={15} />
        </button>
        <span className="ml-2 text-[12px] text-neutral-500">
          Changes save with the document — use Payload&apos;s Save button.
        </span>
      </div>

      <div className="flex min-h-0 flex-1">
        <aside className="flex w-56 shrink-0 flex-col border-r border-black/10 bg-white">
          <div className="flex border-b border-black/10">
            <PanelTab active={tab === "insert"} onClick={() => setTab("insert")} icon={<Plus size={13} />}>
              Blocks
            </PanelTab>
            <PanelTab active={tab === "layers"} onClick={() => setTab("layers")} icon={<LayersIcon size={13} />}>
              Layers
            </PanelTab>
          </div>
          <div className="nb-scroll min-h-0 flex-1 overflow-y-auto">
            {tab === "insert" ? <Inserter /> : <LayerTree />}
          </div>
        </aside>

        <main
          className="nb-scroll min-h-0 flex-1 overflow-y-auto bg-neutral-100 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) actions.selectNode();
          }}
        >
          <div className="mx-auto bg-white shadow-sm ring-1 ring-black/5">
            <Frame data={initial}>
              <Element is={Section} canvas>
                <Heading text="A new page" level={1} size={52} />
                <Text html="<p>Drag blocks in from the left, or type / to insert one.</p>" />
              </Element>
            </Frame>
          </div>
        </main>

        <aside className="nb-scroll w-64 shrink-0 overflow-y-auto border-l border-black/10 bg-white">
          <Inspector />
        </aside>
      </div>
    </>
  );
}
