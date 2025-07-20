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
  );
}
