import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BubbleMenuComponent from "./BubbleMenu";
import { useEffect, useRef } from "react";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCaret from "@tiptap/extension-collaboration-caret";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const TiptapEditor = ({
  onEditorContentSave,
  initialContent,
  ydoc,
  provider,
  room,
}) => {
  const colors = [
    "#958DF1",
    "#F98181",
    "#FBBC88",
    "#FAF594",
    "#70CFF8",
    "#94FADB",
    "#B9F18D",
    "#C3E2C2",
    "#EAECCC",
    "#AFC8AD",
    "#EEC759",
    "#9BB8CD",
    "#FF90BC",
    "#FFC0D9",
    "#DC8686",
    "#7ED7C1",
    "#F3EEEA",
    "#89B9AD",
    "#D0BFFF",
    "#FFF8C9",
    "#CBFFA9",
    "#9BABB8",
    "#E3F4F4",
  ];

  const getRandomElement = (list) =>
    list[Math.floor(Math.random() * list.length)];

  const getRandomColor = () => getRandomElement(colors);

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) return;

      let name = user.displayName || user.email || "Anonymous";

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.name) {
            name = userData.name;
          }
        }
      } catch (err) {
        console.error("Failed to fetch user from Firestore", err);
      }

      setCurrentUser({
        name,
        color: getRandomColor(),
      });
    };

    fetchUserData();
  }, []);

  const [status, setStatus] = useState("connecting");
  const [currentUser, setCurrentUser] = useState(null);

  const extensions = [
    StarterKit,
    Collaboration.extend().configure({
      document: ydoc,
    }),
    CollaborationCaret.extend().configure({
      provider,
    }),
  ];

  const debounceTimer = useRef(null);

  const editor = useEditor({
    enableContentCheck: true,
    onContentError: ({ disableCollaboration }) => {
      disableCollaboration();
    },
    onCreate: ({ editor: currentEditor }) => {
      provider.on("synced", () => {
        if (currentEditor.isEmpty) {
          currentEditor.commands.setContent(defaultContent);
        }
      });
    },
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


  useEffect(() => {
    if (editor && currentUser) {
      editor.chain().focus().updateUser(currentUser).run();
    }
  }, [editor, currentUser]);

  // fixes the bug of abnormal behaviour of the pages content.
  useEffect(() => {
    if (editor && initialContent !== editor.getHTML()) {
      editor.commands.setContent(initialContent, false); // false = don't add to history
    }
  }, [editor, initialContent]);

  if (!editor) {
    return null;
  }

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

      <div
        className="collab-status-group"
        data-state={status === "connected" ? "online" : "offline"}
      >
        

        {/* Just show name + color without editing */}
        {currentUser && (
          <div
            style={{
              backgroundColor: currentUser.color,
              padding: "4px 8px",
              borderRadius: "4px",
              color: "white",
              marginLeft: "8px",
            }}
          >
            👤 {currentUser.name}
          </div>
        )}
      </div>

      {/* <button onClick={handleEditorContent}>Save</button> */}
    </div>
  );
};

export default TiptapEditor;
