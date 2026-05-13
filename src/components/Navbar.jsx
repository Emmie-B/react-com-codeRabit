import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  // const { user, logout } = useAuth();

//   const [user, setUser] = React.useState(null);
  const { signup, login , user, logout } = useAuth();

 

  return (
    <nav className="w-full border-b bg-white pr-10 pl-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-10 py-10 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-red-500 tracking-tight"
        >
          ShopHub
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-black transition font-medium"
          >
            Home
          </Link>

          <Link
            to="/checkout"
            className="text-gray-700 hover:text-black transition font-medium"
          >
            Cart
          </Link>
        </div>

        {/* Auth Section */}
        <div>
          {!user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/auth"
                className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
              >
                Login
              </Link>

              <Link
                to="/auth"
                className="px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition"
              >
                Signup
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700">
                Hello, {user.username}
              </span>

              <button
                onClick={ () => logout()}
                className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;