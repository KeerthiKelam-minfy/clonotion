// components/TitleEditor.js
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function TitleEditor({ docId, initialTitle }) {
  const [title, setTitle] = useState(initialTitle || "Untitled Page");
  const [editing, setEditing] = useState(false);

  const saveTitle = async () => {
    setEditing(false);
    if (title.trim()) {
      await updateDoc(doc(db, "documents", docId), {
        title: title.trim(),
      });
    }
  };

  if (editing) {
    return (
      <input
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={saveTitle}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            saveTitle();
          }
        }}
        className="text-2xl font-semibold mb-4 border-b focus:outline-none w-full"
      />
    );
  }

  return (
    <h1
      className="text-2xl font-semibold mb-4 cursor-pointer"
      onClick={() => setEditing(true)}
    >
      {title}
    </h1>
  );
}
