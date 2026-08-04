import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { User, LogOut, PlusCircle, ShoppingBag, ChevronDown } from "lucide-react";
import { logoutUser } from "../../features/auth/authThunks";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { accessToken, user } = useSelector((state) => state.auth);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setDropdownOpen(false);
    await dispatch(logoutUser());
    navigate("/auth");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Name */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent tracking-tight hover:opacity-90 transition-opacity">
            OLX
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-4">
          <Link
            to="/products"
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-xl transition-all"
          >
            <ShoppingBag className="w-4 h-4 text-indigo-600" />
            <span>Products</span>
          </Link>

          <Link
            to="/products/sell"
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 rounded-xl shadow-md shadow-indigo-500/20 transition-all duration-200"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Sell</span>
          </Link>

          {/* User Section / Dropdown */}
          <div className="relative ml-2" ref={dropdownRef}>
            {accessToken ? (
              <div
                onMouseEnter={() => setDropdownOpen(true)}
                className="relative"
              >
                <button
                  type="button"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 p-1.5 pl-3 pr-2.5 rounded-full border border-gray-200 hover:border-indigo-300 hover:bg-gray-50 transition-all focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
                    {user?.username ? user.username.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
                  </div>
                  <span className="text-sm font-semibold text-gray-700 max-w-[100px] truncate hidden sm:inline">
                    {user?.username || "Account"}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div
                    onMouseLeave={() => setDropdownOpen(false)}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200"
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs text-gray-400 font-medium">Signed in as</p>
                      <p className="text-sm font-bold text-gray-800 truncate">
                        {user?.email || user?.username || "User"}
                      </p>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-200 hover:border-indigo-500 hover:text-indigo-600 rounded-xl transition-all"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
