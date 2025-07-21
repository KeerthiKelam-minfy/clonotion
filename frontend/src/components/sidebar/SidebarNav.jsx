import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiSearch, FiFileText, FiPlus } from "react-icons/fi";
import SidebarPageItem from "./SidebarPageItem";

export default function SidebarNav({
  loading,
  pages,
  handleCreatePage,
  handleDeletePage,
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const filteredPages = searchQuery
    ? pages.filter((page) =>
        page.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : pages;

  return (
    <nav className="space-y-1 mt-2">
      <Link
        to="/dashboard"
        className={`flex items-center gap-2 px-4 py-2 rounded ${
          location.pathname === '/dashboard' 
          ? "bg-orange-700 text-white" : "hover:bg-orange-600"
        }`}
      >
        <FiHome />
        <span>Home</span>
      </Link>

      <button
        className="flex items-center gap-2 px-4 py-2 w-full hover:bg-orange-600 rounded cursor-pointer"
        onClick={() => setSearchOpen(!searchOpen)}
      >
        <FiSearch />
        <span>Search</span>
      </button>

      {searchOpen && (
        <div className="px-4">
          <input
            type="text"
            placeholder="Search titles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mt-2 mb-1 w-full px-3 py-1 border border-amber-800 rounded text-sm text-amber-950"
          />
        </div>
      )}

      <div className="flex items-center justify-between pr-4 w-full">
        <button className="flex items-center gap-2 px-4 py-2 w-full text-sm bg-orange-200 rounded-l">
          <span>My Pages</span>
        </button>

        <button
          onClick={handleCreatePage}
          className="py-2.5 px-2 bg-orange-200 hover:bg-orange-600 rounded-r cursor-pointer"
          title="New Page"
        >
          <FiPlus />
        </button>
      </div>

      {loading && <p className="text-gray-500 px-4 py-2 text-sm">Loading...</p>}

      {filteredPages.map((page) => (
        <SidebarPageItem
          key={page.id}
          page={page}
          onDelete={() => handleDeletePage(page.id)}
        />
      ))}
    </nav>
  );
}
