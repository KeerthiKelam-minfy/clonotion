import { useRef, useState, useEffect } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiHome,
  FiStar,
  FiFileText,
  FiSearch,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function Sidebar() {
  const sidebarRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [width, setWidth] = useState(240);
  const [collapsed, setCollapsed] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserName(docSnap.data().name);
        }
      }
    };

    fetchUserName();
  }, []);

  const toggleCollapse = () => setCollapsed(!collapsed);

  return (
    <div
      ref={sidebarRef}
      className={`relative bg-white border-r transition-all duration-300 h-screen ${
        collapsed ? "w-16" : ""
      }`}
      style={{ width: collapsed ? 64 : width }}
    >
      {/* Brand section + collapse toggle */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        {!collapsed && (
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">
              {userName ? `${userName}’s` : "..."}
            </span>
            <span className="text-lg font-semibold">Clonotion</span>
          </div>
        )}

        <button
          onClick={toggleCollapse}
          className="p-2 hover:bg-gray-100 rounded"
        >
          {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
      </div>

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
        <button className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100">
          <FiFileText />
          {!collapsed && <span>My Pages</span>}
        </button>
      </nav>
    </div>
  );
}

export default Sidebar;
