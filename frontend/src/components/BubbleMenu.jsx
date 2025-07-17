import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";

const BubbleMenuComponent = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div>
      <BubbleMenu editor={editor} options={{ placement: "bottom", offset: 8 }}>
        <div className="bubble-menu">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
            type="button"
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
            type="button"
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
            type="button"
          >
            Strike
          </button>
        </div>
      </BubbleMenu>
    </div>
  );
};

export default BubbleMenuComponent;
