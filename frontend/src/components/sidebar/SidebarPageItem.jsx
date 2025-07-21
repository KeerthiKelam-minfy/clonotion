import { useState } from "react";
import { FiFileText, FiMoreVertical, FiTrash2 } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

function SidebarPageItem({ page, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { title, setTitle } = useDocumentTitle(page.id);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = location.pathname === `/document/${page.id}`

  return (
    <div className={`group relative flex justify-between pr-2 rounded ${
      isActive ? "bg-orange-700 text-white" : "hover:bg-orange-600"
    }`}>
    
        <button
          // onDoubleClick={() => setEditing(true)}
          // onClick={() => navigate(`/document/${page.id}`)}
          onClick={() => {
            window.location.href = `/document/${page.id}`;
          }}
          className="flex items-center gap-2 px-4 py-2 w-full text-left cursor-pointer"
        >
          <span className="truncate flex items-center gap-1"> <FiFileText />{title} </span>
        </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="opacity-0 group-hover:opacity-100 px-2 hover:bg-orange-300 rounded cursor-pointer"
          >
            <FiMoreVertical />
          </button>
          {menuOpen && (
            <div className="absolute top-10 right-2 text-amber-800 bg-orange-200 border border-amber-700 rounded shadow z-50">
              <button
                onClick={onDelete}
                className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-orange-700 hover:text-white cursor-pointer w-full"
              >
                <FiTrash2 />
                Delete
              </button>
            </div>
          )}
  
      
    </div>
  );
}

export default SidebarPageItem;
