import { useState } from "react";
import { Link } from "react-router-dom";
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

  const filteredPages = searchQuery
    ? pages.filter((page) =>
        page.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : pages;

  return (
    <nav className="space-y-1 mt-2">
      <Link
        to="/dashboard"
        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
      >
        <FiHome />
        <span>Home</span>
      </Link>

      <button
        className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100"
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
            className="mt-2 mb-1 w-full px-3 py-1 border rounded text-sm"
          />
        </div>
      )}

      <div className="flex items-center justify-between pr-4">
        <button className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100">
          <FiFileText />
          <span>My Pages</span>
        </button>

        <button
          onClick={handleCreatePage}
          className="p-1 hover:bg-gray-200 rounded"
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
