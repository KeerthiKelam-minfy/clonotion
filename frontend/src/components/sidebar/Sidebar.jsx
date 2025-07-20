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
  const [collapsed, setCollapsed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const { userName, pages, setPages, loading } = useUserPages();

  const toggleCollapse = () => {
    setCollapsed((prev) => !prev);
    setDropdownOpen(false);
  };

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
      className={`relative bg-white border-r transition-all duration-300 h-screen ${
        collapsed ? "w-16" : ""
      }`}
      style={{ width: collapsed ? 64 : 240 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b relative">
        {!collapsed && (
          <UserDropdown
            userName={userName}
            dropdownOpen={dropdownOpen}
            setDropdownOpen={setDropdownOpen}
            handleLogout={handleLogout}
          />
        )}

        <button
          onClick={toggleCollapse}
          className="p-2 hover:bg-gray-100 rounded ml-2"
        >
          {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
      </div>
      <div className="editor-wrapper overflow-y-auto h-screen p-4">
      <SidebarNav
        collapsed={collapsed}
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
