import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, User, LogOut, Package, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import supabase from "../../supaBaseClient";
import { logoutData } from "@/redux/userSlice";
import { clearCart } from "@/redux/cartSlice";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const userEmail = useSelector((state) => state.user.email);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      dispatch(logoutData());
      dispatch(clearCart());
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
      console.error("Logout error:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/productlist?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setShowSearch(false);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Package className="w-8 h-8 text-orange-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              ShopHub
            </span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center bg-gray-700 rounded-full px-4 py-2 w-96">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none text-white placeholder-gray-400 w-full"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="ml-2 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>

          {/* Navigation Links */}
          <ul className="hidden md:flex items-center space-x-6">
            <li>
              <Link to="/" className="hover:text-orange-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/productlist" className="hover:text-orange-400 transition-colors">
                Products
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-orange-400 transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-orange-400 transition-colors">
                Contact
              </Link>
            </li>
          </ul>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link to="/cart" className="relative hover:text-orange-400 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {userEmail ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 hover:text-orange-400 transition-colors"
                >
                  <User className="w-6 h-6" />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-xl py-2">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-full transition-colors font-semibold"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
