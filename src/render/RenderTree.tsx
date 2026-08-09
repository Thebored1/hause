import type { ReactNode } from "react";
import {
  SectionView, CardView, RowView, IconView, HeadingView, TextView, ButtonView, ImageView, ColumnsView,
  SpacerView, DividerView,
} from "@/blocks/views";

// ============================================================
// Server-side renderer for saved editor JSON.
//
// Walks the serialized node tree and renders the same views the
// canvas uses — so the published page ships no editor code at
// all, yet cannot look different from what was designed.
// ============================================================

interface SerializedNode {
  type: string | { resolvedName: string };
  props?: Record<string, unknown>;
  nodes?: string[];
  linkedNodes?: Record<string, string>;
  hidden?: boolean;
}

type SerializedNodes = Record<string, SerializedNode>;

/* eslint-disable @typescript-eslint/no-explicit-any */
const VIEWS: Record<string, (p: any) => ReactNode> = {
  Section: SectionView,
  Card: CardView,
  Icon: IconView,
  Row: RowView,
  Heading: HeadingView,
  Text: TextView,
  Button: ButtonView,
  ImageBlock: ImageView,
  Columns: ColumnsView,
  Spacer: SpacerView,
  Divider: DividerView,
  // Columns' per-column drop zones are structural only.
  ColumnDrop: ({ children }: { children?: ReactNode }) => <>{children}</>,
};

function nodeName(node: SerializedNode): string {
  return typeof node.type === "string" ? node.type : node.type?.resolvedName;
}

function renderNode(id: string, nodes: SerializedNodes): ReactNode {
  const node = nodes[id];
  if (!node || node.hidden) return null;

  const View = VIEWS[nodeName(node)];
  if (!View) return null;

  const children = (node.nodes ?? []).map((childId) => renderNode(childId, nodes));

  const slots: Record<string, ReactNode> = {};
  for (const [key, childId] of Object.entries(node.linkedNodes ?? {})) {
    slots[key] = renderNode(childId, nodes);
  }

  return (
    <View key={id} {...(node.props ?? {})} slots={slots}>
      {children.length > 0 ? children : null}
    </View>
  );
}

export function RenderTree({ data }: { data: string }) {
  let nodes: SerializedNodes;
  try {
    nodes = JSON.parse(data) as SerializedNodes;
  } catch {
    return null;
  }

  const rootId = nodes.ROOT ? "ROOT" : Object.keys(nodes)[0];
  if (!rootId) return null;

  return <>{renderNode(rootId, nodes)}</>;
}
