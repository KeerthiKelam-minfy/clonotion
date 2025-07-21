import { FiChevronDown, FiChevronUp, FiLogOut } from "react-icons/fi";

export default function UserDropdown({
  userName,
  dropdownOpen,
  setDropdownOpen,
  handleLogout,
}) {
  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="flex flex-col text-left "
      >
        <span className="text-sm text-amber-900">
          {userName ? `${userName}’s` : "..."}
        </span>
        <span className="text-lg font-semibold flex items-center gap-1 cursor-pointer">
          Clonotion {dropdownOpen ? <FiChevronUp /> : <FiChevronDown />}
        </span>
      </button>

      {dropdownOpen && (
        <div className="absolute left-0 top-12 w-40 text-amber-900 bg-white border border-amber-900 rounded shadow z-50">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-1.5 text-sm hover:bg-amber-700 hover:text-white cursor-pointer"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
