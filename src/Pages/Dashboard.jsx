import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  User, ShieldCheck, LogOut, Package, Settings, ShoppingCart, 
  TrendingUp, Heart, Clock, Home, Mail, Phone, Edit2, 
  CreditCard, MapPin, Calendar, Activity
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import supabase from "../../supaBaseClient";
import toast from "react-hot-toast";
import { logoutData } from "@/redux/userSlice";
import { clearCart } from "@/redux/cartSlice";

const Dashboard = () => {
  const { email, role } = useSelector((state) => state.user);
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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

  const totalCartValue = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-50 to-orange-100">
      {/* Dashboard Header */}
      <header className="bg-white shadow-sm border-b border-orange-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">
                {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 bg-orange-600 text-white px-5 py-2.5 rounded-lg shadow-md hover:bg-orange-700 transition-all hover:shadow-lg"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="bg-white/20 backdrop-blur-sm p-5 rounded-full border-2 border-white/30">
                <User className="w-12 h-12" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2">Welcome back! 👋</h2>
                <p className="text-orange-100 text-lg">{email}</p>
                <div className="flex items-center gap-2 mt-3">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="font-semibold bg-white/20 px-3 py-1 rounded-full text-sm">
                    {role || 'User'}
                  </span>
                </div>
              </div>
            </div>
            <div className="hidden md:block text-right">
              <div className="text-5xl font-bold">{currentTime.toLocaleTimeString()}</div>
              <p className="text-orange-100 mt-2">Current Time</p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Cart Items</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{totalCartItems}</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-full">
                <ShoppingCart className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">Items in your cart</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Cart Value</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">${totalCartValue.toFixed(2)}</p>
              </div>
              <div className="bg-green-100 p-4 rounded-full">
                <CreditCard className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">Total cart value</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Wishlist</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">0</p>
              </div>
              <div className="bg-purple-100 p-4 rounded-full">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">Saved items</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Orders</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">0</p>
              </div>
              <div className="bg-orange-100 p-4 rounded-full">
                <Package className="w-8 h-8 text-orange-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">Total orders</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Link to="/" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition group">
                <div className="bg-orange-100 p-3 rounded-full w-fit mb-3 group-hover:bg-orange-200 transition">
                  <Home className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-800">Home</h4>
                <p className="text-xs text-gray-500 mt-1">Back to homepage</p>
              </Link>

              <Link to="/cart" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition group">
                <div className="bg-blue-100 p-3 rounded-full w-fit mb-3 group-hover:bg-blue-200 transition">
                  <ShoppingCart className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-800">My Cart</h4>
                <p className="text-xs text-gray-500 mt-1">{totalCartItems} items</p>
              </Link>

              <Link to="/productlist" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition group">
                <div className="bg-green-100 p-3 rounded-full w-fit mb-3 group-hover:bg-green-200 transition">
                  <Package className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-800">Products</h4>
                <p className="text-xs text-gray-500 mt-1">Browse catalog</p>
              </Link>

              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition group cursor-pointer">
                <div className="bg-purple-100 p-3 rounded-full w-fit mb-3 group-hover:bg-purple-200 transition">
                  <Heart className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-800">Wishlist</h4>
                <p className="text-xs text-gray-500 mt-1">Saved items</p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition group cursor-pointer">
                <div className="bg-yellow-100 p-3 rounded-full w-fit mb-3 group-hover:bg-yellow-200 transition">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <h4 className="font-semibold text-gray-800">Order History</h4>
                <p className="text-xs text-gray-500 mt-1">Track orders</p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition group cursor-pointer">
                <div className="bg-gray-100 p-3 rounded-full w-fit mb-3 group-hover:bg-gray-200 transition">
                  <Settings className="w-6 h-6 text-gray-600" />
                </div>
                <h4 className="font-semibold text-gray-800">Settings</h4>
                <p className="text-xs text-gray-500 mt-1">Account settings</p>
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Account Info</h3>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium text-gray-800 break-all">{email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Role</p>
                    <p className="text-sm font-medium text-gray-800">{role || 'User'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Member Since</p>
                    <p className="text-sm font-medium text-gray-800">
                      {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Activity className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Status</p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-green-600">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Active
                    </span>
                  </div>
                </div>
              </div>

              <button className="w-full mt-6 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-lg transition font-medium">
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-md p-6 mt-6">
              <h4 className="font-semibold text-gray-800 mb-4">Recent Activity</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="text-gray-600">Logged in successfully</p>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <p className="text-gray-600">Viewed dashboard</p>
                </div>
                {totalCartItems > 0 && (
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <p className="text-gray-600">{totalCartItems} items in cart</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
