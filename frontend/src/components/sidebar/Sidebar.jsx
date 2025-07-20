import { useRef, useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import useUserPages from "../../hooks/useUserPages";
import { handleCreatePage, handleDeletePage } from "../../utils/pageActions";
import UserDropdown from "./UserDropdown";
import SidebarNav from "./SidebarNav";

function Sidebar() {
  const sidebarRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const { userName, pages, setPages, loading } = useUserPages();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  // Click-away handler for dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={sidebarRef}
      className="relative bg-white border-r transition-all duration-300 h-screen w-60"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
          <UserDropdown
            userName={userName}
            dropdownOpen={dropdownOpen}
            setDropdownOpen={setDropdownOpen}
            handleLogout={handleLogout}
          />
      </div>

      <div className="editor-wrapper overflow-y-auto h-screen p-4">
      <SidebarNav
        loading={loading}
        pages={pages}
        handleCreatePage={() => handleCreatePage(setPages, navigate)}
        handleDeletePage={(pageId) => handleDeletePage(pageId, setPages)}
      />
    </div>
    </div>
  );
}

export default Sidebar;
