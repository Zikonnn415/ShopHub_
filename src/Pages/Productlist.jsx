import React, { useEffect, useState } from "react";
import { Filter, Grid, List, SlidersHorizontal, Search, Plus, Trash2, Edit } from "lucide-react";
import supabase from "../../supaBaseClient";
import AddProducts from "../Pages/AddProducts";
import axios from "axios";
import Listing from "@/components/Listing";
import { useSearchParams } from "react-router-dom";

const Productlist = () => {
  const [searchParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || "");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  // Fetch Supabase products
  const fetchSupabaseData = async () => {
    try {
      const { data, error } = await supabase.from("product_list").select("*").order("ID");
      if (error) {

        return [];
      }
      return data.map(item => ({
        id: `supabase-${item.ID}`,
        title: item.Product_Name,
        description: item.Product_description,
        price: parseFloat(item.Price),
        category: item.Color || "custom",
        image: "https://via.placeholder.com/300",
        source: "supabase"
      }));
    } catch (error) {
      setErrmessage(error.message);
      return [];
    }
  };

  // Fetch FakeStore API products
  const fetchFakeStoreData = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      return response.data;
    } catch (err) {
      console.log("Error fetching FakeStore products:", err);
      return [];
    }
  };

  // Fetch all products
  const fetchAllProducts = async () => {
    setLoading(true);
    const [supabaseData, fakeStoreData] = await Promise.all([
      fetchSupabaseData(),
      fetchFakeStoreData()
    ]);
    
    const combined = [...fakeStoreData, ...supabaseData];
    setAllProducts(combined);
    setFilteredProducts(combined);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...allProducts];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price range filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-az":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-za":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, sortBy, priceRange, allProducts]);

  const categories = ["all", ...new Set(allProducts.map(p => p.category))];

  const handleProductAdded = () => {
    fetchAllProducts();
    setShowAddForm(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">All Products</h1>
              <p className="text-gray-500 mt-1">{filteredProducts.length} products found</p>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2.5 rounded-lg transition font-semibold"
            >
              <Plus className="w-5 h-5" />
              Add Product
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5" />
                Filters
              </h3>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="text-orange-600 focus:ring-orange-500"
                      />
                      <span className="text-sm text-gray-600 capitalize">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">Price Range</h4>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Reset Filters */}
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSortBy("default");
                  setPriceRange([0, 1000]);
                }}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg transition font-medium"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Products Section */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="default">Sort by: Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name-az">Name: A to Z</option>
                  <option value="name-za">Name: Z to A</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${viewMode === "grid" ? "bg-orange-100 text-orange-600" : "bg-gray-100 text-gray-600"}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${viewMode === "list" ? "bg-orange-100 text-orange-600" : "bg-gray-100 text-gray-600"}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Add Product Form Modal */}
            {showAddForm && (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Add New Product</h2>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                <AddProducts onProductAdded={handleProductAdded} />
              </div>
            )}

            {/* Products Grid/List */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-gray-500 text-lg">No products found</p>
              </div>
            ) : (
              <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
                {filteredProducts.map((product) => (
                  <Listing key={product.id} productData={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productlist;
