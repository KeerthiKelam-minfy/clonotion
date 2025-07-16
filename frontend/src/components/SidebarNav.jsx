import { Link } from "react-router-dom";
import { FiHome, FiStar, FiSearch, FiFileText, FiPlus } from "react-icons/fi";
import SidebarPageItem from "./SidebarPageItem";

export default function SidebarNav({
  collapsed,
  loading,
  pages,
  handleCreatePage,
  handleDeletePage,
}) {
  return (      
    <nav className="space-y-1 mt-2">
      <Link
        to="/dashboard"
        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
      >
        <FiHome />
        {!collapsed && <span>Home</span>}
      </Link>

      <button className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100">
        <FiSearch />
        {!collapsed && <span>Search</span>}
      </button>

      <button className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100">
        <FiStar />
        {!collapsed && <span>Favorites</span>}
      </button>

      {/* My Pages header */}
      <div className="flex items-center justify-between pr-4">
        <button className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100">
          <FiFileText />
          {!collapsed && <span>My Pages</span>}
        </button>
        {!collapsed && (
          <button
            onClick={handleCreatePage}
            className="p-1 hover:bg-gray-200 rounded"
            title="New Page"
          >
            <FiPlus />
          </button>
        )}
      </div>

      {loading && !collapsed && (
        <p className="text-gray-500 px-4 py-2 text-sm">Loading...</p>
      )}

      {pages.map((page) => (
        <SidebarPageItem
          key={page.id}
          page={page}
          onDelete={() => handleDeletePage(page.id)}
          collapsed={collapsed}
        />
      ))}
    </nav>
  );
}
