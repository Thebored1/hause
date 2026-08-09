"use client";

import { useEffect, useRef } from "react";
import { useEditor as useTiptap, EditorContent } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Bold, Italic, Underline, Link2, Strikethrough, Code } from "lucide-react";

// ============================================================
// Inline (on-canvas) editing primitives.
// Text is typed directly where it appears — no sidebar round
// trip — which is the core of the block-editor feel.
// ============================================================

/**
 * A contentEditable that does not fight React: the DOM owns the
 * text while focused, and we only push external values back in
 * when the field is not being typed into (otherwise the caret
 * jumps to the start on every keystroke).
 */
export function InlineText({
  value,
  onChange,
  placeholder,
  className,
  style,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (document.activeElement === el) return;
    if (el.textContent !== value) el.textContent = value;
  }, [value]);

  return (
    <span
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      spellCheck
      data-placeholder={placeholder}
      className={className}
      style={{ outline: "none", display: "inline-block", minWidth: 4, ...style }}
      onInput={(e) => onChange((e.target as HTMLSpanElement).textContent ?? "")}
      onKeyDown={(e) => {
        // Keep headings/labels single-line.
        if (e.key === "Enter") e.preventDefault();
        e.stopPropagation();
      }}
      onPaste={(e) => {
        e.preventDefault();
        const text = e.clipboardData.getData("text/plain");
        document.execCommand("insertText", false, text);
      }}
    />
  );
}

/* ---------------- rich text ---------------- */

function BubbleButton({
  active,
  onClick,
  title,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`flex h-7 w-7 items-center justify-center rounded transition-colors ${
        active ? "bg-white text-neutral-900" : "text-white/70 hover:bg-white/15 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

export function RichText({
  html,
  onChange,
  onSlashQuery,
  placeholder = "Type / to insert a block…",
}: {
  html: string;
  onChange: (html: string) => void;
  onSlashQuery?: (query: string | null) => void;
  placeholder?: string;
}) {
  const editor = useTiptap({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: { openOnClick: false, autolink: true },
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: html || "<p></p>",
    editorProps: { attributes: { class: "nb-rt" } },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
      // Slash command: fires while the block contains only "/query".
      if (onSlashQuery) {
        const text = editor.getText();
        onSlashQuery(text.startsWith("/") ? text.slice(1) : null);
      }
    },
  });

  // Pull in external changes (undo/redo, prop resets) without stomping the caret.
  useEffect(() => {
    if (!editor) return;
    if (editor.isFocused) return;
    const current = editor.getHTML();
    if (html && html !== current) editor.commands.setContent(html, { emitUpdate: false });
  }, [html, editor]);

  if (!editor) return <div className="nb-rt" dangerouslySetInnerHTML={{ __html: html }} />;

  return (
    <>
      <BubbleMenu
        editor={editor}
        className="flex items-center gap-0.5 rounded-lg bg-neutral-900 p-1 shadow-xl ring-1 ring-black/20"
      >
        <BubbleButton
          title="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold size={13} />
        </BubbleButton>
        <BubbleButton
          title="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic size={13} />
        </BubbleButton>
        <BubbleButton
          title="Underline"
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <Underline size={13} />
        </BubbleButton>
        <BubbleButton
          title="Strikethrough"
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough size={13} />
        </BubbleButton>
        <BubbleButton
          title="Inline code"
          active={editor.isActive("code")}
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          <Code size={13} />
        </BubbleButton>
        <BubbleButton
          title="Link"
          active={editor.isActive("link")}
          onClick={() => {
            const prev = editor.getAttributes("link").href as string | undefined;
            const url = window.prompt("Link URL", prev ?? "https://");
            if (url === null) return;
            if (url === "") {
              editor.chain().focus().extendMarkRange("link").unsetLink().run();
              return;
            }
            editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
          }}
        >
          <Link2 size={13} />
        </BubbleButton>
      </BubbleMenu>
      <EditorContent editor={editor} />
    </>
  );
}
