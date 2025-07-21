import { BubbleMenu } from "@tiptap/react/menus";
// import { useState, useEffect } from "react";
// import { v4 as uuidv4 } from "uuid";

const BubbleMenuComponent = ({ editor }) => {
  // const [commentInput, setCommentInput] = useState("");
  // const [activeCommentId, setActiveCommentId] = useState(null);

  if (!editor) return null;

  // const addComment = () => {
  //   const id = uuidv4();
  //   setActiveCommentId(id);
  //   editor.chain().focus().setComment(id).run();
  // };

  // const saveCommentText = () => {
  //   if (activeCommentId && commentInput.trim()) {
  //     setCommentsMap((prev) => ({
  //       ...prev,
  //       [activeCommentId]: commentInput.trim(),
  //     }));
  //     setCommentInput("");
  //     setActiveCommentId(null);
  //   }
  // };

  // const removeComment = () => {
  //   editor.chain().focus().unsetComment().run();
  //   setActiveCommentId(null);
  //   setCommentInput("");
  // };

  //   // Optional: detect selection update and auto-show comment input
  //   useEffect(() => {
  //   const handler = ({ editor }) => {
  //     const marks = editor.getAttributes("comment");
  //     const commentId = marks.commentId || null;

  //     if (commentId && commentsMap[commentId]) {
  //       setCommentInput(commentsMap[commentId]);
  //       setActiveCommentId(commentId);
  //     } else {
  //       setActiveCommentId(null);
  //       setCommentInput("");
  //     }
  //   };

  //   editor.on("selectionUpdate", handler);

  //   return () => {
  //     editor.off("selectionUpdate", handler);
  //   };
  // }, [editor, commentsMap]);

  return (
    <div>
      <BubbleMenu editor={editor} options={{ placement: "bottom", offset: 8 }}>     
        <div className="no-editor-shield flex gap-1 bg-white border border-amber-500 rounded px-2 py-1 [&>button]:border-none [&>button]:px-2 [&>button]:py-1 [&>button]:rounded [&>button]:hover:bg-yellow-50 [&>button]:cursor-pointer">
          <button onClick={() => editor.chain().focus().toggleBold().run()}>
            <b>B</b>
          </button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()}>
            <i>I</i>
          </button>
          <button onClick={() => editor.chain().focus().toggleStrike().run()}>
            <s>S</s>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <u>U</u>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            className={editor.isActive("code") ? "is-active" : ""}
          >
            Code
          </button>
          {[1, 2, 3].map((level) => (
            <button
              key={level}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level }).run()
              }
              className={
                editor.isActive("heading", { level }) ? "is-active" : ""
              }
            >
              H{level}
            </button>
          ))}
          {/* <button onClick={addComment}> Add Comment</button>
          <button onClick={removeComment}> Remove</button> */}
        </div>
      </BubbleMenu>

      {/* Comment Input UI
      {activeCommentId && (
        <div className="mt-2 p-2 bg-yellow-50 border rounded shadow max-w-xs">
          <input
            type="text"
            className="w-full border px-2 py-1 text-sm rounded"
            placeholder="Write your comment..."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            autoFocus
          />
          <div className="flex justify-end space-x-2 mt-2">
            <button
              className="text-sm bg-gray-200 px-2 py-1 rounded"
              onClick={() => {
                setActiveCommentId(null);
                setCommentInput("");
              }}
            >
              Cancel
            </button>
            <button
              className="text-sm bg-blue-500 text-white px-2 py-1 rounded disabled:opacity-50"
              onClick={saveCommentText}
              disabled={!commentInput.trim()}
            >
              Save
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default BubbleMenuComponent;
