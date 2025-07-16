import { useState } from "react";
import { FiFileText, FiMoreVertical, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

function SidebarPageItem({ page, onDelete, collapsed }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(page.title || "Untitled Page");
  const navigate = useNavigate();

  const handleSave = async () => {
    setEditing(false);
    const docRef = doc(db, "documents", page.id);
    await updateDoc(docRef, { title });
  };

  return (
    <div className="group relative flex items-center justify-between pr-2 hover:bg-gray-100">
      {editing ? (
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
          }}
          className="ml-4 py-1 text-sm border-b focus:outline-none w-full"
        />
      ) : (
        <button
          onDoubleClick={() => setEditing(true)}
          onClick={() => navigate(`/document/${page.id}`)}
          className="flex items-center gap-2 px-4 py-2 w-full text-left"
        >
          <FiFileText />
          {!collapsed && <span className="truncate">{title}</span>}
        </button>
      )}

      {!collapsed && (
        <>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded"
          >
            <FiMoreVertical />
          </button>
          {menuOpen && (
            <div className="absolute right-2 top-10 bg-white border rounded shadow z-50">
              <button
                onClick={onDelete}
                className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 w-full"
              >
                <FiTrash2 />
                Delete
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default SidebarPageItem;