import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BubbleMenuComponent from "./BubbleMenu";
import { useEffect, useRef } from "react";
// import CollaborationCaret from '@tiptap/extension-collaboration-caret';
// import Collaboration from '@tiptap/extension-collaboration'

/* 
1. Setup tiptap editor -> done
2. Attach Yjs text to tiptap editor
3. 
*/

const TiptapEditor = ({ onEditorContentSave, initialContent }) => {
  const extensions = [
    StarterKit,
    // Collaboration.configure({
    //   document: ydoc,
    // }),
    // CollaborationCaret.configure({
    //   provider
    // })
  ];

  const debounceTimer = useRef(null);

  const editor = useEditor({
    extensions,
    onUpdate: ({ editor }) => {
      clearTimeout(debounceTimer.current);

      // Debounce auto-save
      debounceTimer.current = setTimeout(() => {
        const html = editor.getHTML();
        onEditorContentSave(html);
      }, 1500);
    },
  });

  // fixes the bug of abnormal behaviour of the pages content.
  useEffect(() => {
    if (editor && initialContent !== editor.getHTML()) {
      editor.commands.setContent(initialContent, false); // false = don't add to history
    }
  }, [editor, initialContent]);

  if (!editor) {
    return null;
  }

  // const handleEditorContent = () => {
  //   const html = editor.getHTML();
  //   // console.log(html);
  //   onEditorContentSave(html);
  // };

  // const handleEditorDidMount = (editor, TiptapEditor) => {

  // }

  return (
    <div className="editor-shield">
      <div>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          <strong>B</strong>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          <em>Italic</em>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "is-active" : ""}
        >
          <u>UnderLine</u>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          <s>Strike</s>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive("code") ? "is-active" : ""}
        >
          Code
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? "is-active" : ""}
        >
          Paragraph
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
        >
          H1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
        >
          H2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }
        >
          H3
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive("heading", { level: 4 }) ? "is-active" : ""
          }
        >
          H4
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={
            editor.isActive("heading", { level: 5 }) ? "is-active" : ""
          }
        >
          H5
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={
            editor.isActive("heading", { level: 6 }) ? "is-active" : ""
          }
        >
          H6
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          Bullet list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          Ordered list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "is-active" : ""}
        >
          Code block
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
        >
          Blockquote
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          Horizontal rule
        </button>
      </div>
      <div>
        {editor && <BubbleMenuComponent editor={editor} />}
        
        <EditorContent editor={editor} />
      </div>
      {/* <button onClick={handleEditorContent}>Save</button> */}
    </div>
  );
};

export default TiptapEditor;
