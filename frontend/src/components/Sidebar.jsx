import { useRef, useState, useEffect } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
  FiChevronUp,
  FiHome,
  FiStar,
  FiFileText, 
  FiLogOut,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

function Sidebar() {
  const sidebarRef = useRef(null);
  const [width, setWidth] = useState(240);
  const [collapsed, setCollapsed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

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

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
    setDropdownOpen(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  // Click-away handler
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
      style={{ width: collapsed ? 64 : width }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b relative">
        {!collapsed && (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex flex-col text-left focus:outline-none"
            >
              <span className="text-sm text-gray-500">
                {userName ? `${userName}’s` : "..."}
              </span>
              <span className="text-lg font-semibold flex items-center gap-1">
                Clonotion {dropdownOpen ? <FiChevronUp /> : <FiChevronDown />}
              </span>
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 top-12 w-40 bg-white border rounded shadow z-50">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100"
                >
                  <FiLogOut />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        <button
          onClick={toggleCollapse}
          className="p-2 hover:bg-gray-100 rounded ml-2"
        >
          {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
      </div>

      {/* Nav */}
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
