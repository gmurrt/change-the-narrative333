'use client';

import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { Button } from '@/components/ui/button';

export default function TiptapEditor({
  value = '',
  onChange,
}: {
  value?: string;
  onChange?: (html: string) => void;
}) {
  const [showPreview, setShowPreview] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Image.configure({ inline: false }),
      Link.configure({ openOnClick: false }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          'w-full min-h-[300px] px-4 py-2 focus:outline-none text-base leading-relaxed prose-headings:font-bold prose-headings:my-2 list-disc list-inside [&_a]:text-blue-600 [&_a:hover]:underline [&_ul]:list-disc [&_ol]:list-decimal [&_li]:ml-5 break-words',
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  const uploadImage = async (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      editor?.chain().focus().setImage({ src: base64 }).run();
    };
    reader.readAsDataURL(file);
  };

  if (!editor) return null;

  return (
    <div className="border rounded-lg bg-white shadow-sm p-4 space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 border-b pb-3">
        <EditorButton
          label="B"
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
        />
        <EditorButton
          label="I"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
        />
        <EditorButton
          label="H1"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          active={editor.isActive('heading', { level: 1 })}
        />
        <EditorButton
          label="H2"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          active={editor.isActive('heading', { level: 2 })}
        />
        <EditorButton
          label="• List"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
        />
        <EditorButton
          label="1. List"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
        />
        <EditorButton
          label="🔗 Link"
          onClick={() => {
            const url = prompt('Enter URL:');
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
        />
        <label className="text-sm px-3 py-1.5 border rounded-md bg-muted text-muted-foreground hover:bg-gray-100 cursor-pointer">
          📷 Image
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) uploadImage(e.target.files[0]);
            }}
          />
        </label>
        <Button
          type="button"
          variant="secondary"
          className="ml-auto"
          onClick={() => setShowPreview((prev) => !prev)}
        >
          {showPreview ? 'Back to Edit' : 'Preview'}
        </Button>
      </div>

      {/* Editor or Preview */}
      {showPreview ? (
        <div className="h-[500px] overflow-y-auto overflow-x-hidden border rounded-md p-4 bg-gray-50">
          <div className="prose prose-lg max-w-none w-full break-words">
            <div dangerouslySetInnerHTML={{ __html: editor.getHTML() }} />
          </div>
        </div>
      ) : (
        <div className="h-[500px] w-full overflow-y-auto border rounded-md">
          <EditorContent editor={editor} />
        </div>
      )}
    </div>
  );
}

function EditorButton({
  label,
  onClick,
  active,
}: {
  label: string;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-sm px-3 py-1.5 rounded-md border transition ${
        active
          ? 'bg-black text-white border-black'
          : 'bg-muted text-muted-foreground hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  );
}
