import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  ShoppingCart, Heart, Share2, Star, Truck, Shield, 
  RotateCcw, Check, Minus, Plus, ChevronLeft, ChevronRight,
  Package, Award, Clock
} from 'lucide-react';
import { addToCart } from '@/redux/cartSlice';
import toast from 'react-hot-toast';
import axios from 'axios';
import supabase from '../../supaBaseClient';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.user.email);
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (!userEmail) {
      toast.error('Please login to view product details');
      navigate('/login');
      return;
    }
    fetchProductDetails();
  }, [id, userEmail]);

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      // Check if it's a FakeStore API product
      if (!id.startsWith('supabase-')) {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
      } else {
        // Fetch from Supabase
        const supabaseId = id.replace('supabase-', '');
        const { data, error } = await supabase
          .from('product_list')
          .select('*')
          .eq('ID', supabaseId)
          .single();
        
        if (error) throw error;
        
        setProduct({
          id: `supabase-${data.ID}`,
          title: data.Product_Name,
          description: data.Product_description,
          price: parseFloat(data.Price),
          category: data.Color || 'custom',
          image: 'https://via.placeholder.com/500',
          rating: { rate: 4.5, count: 120 }
        });
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product details');
      navigate('/productlist');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
    toast.success(`Added ${quantity} item(s) to cart!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `Check out ${product.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h2>
          <button 
            onClick={() => navigate('/productlist')}
            className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const images = product.image ? [product.image, product.image, product.image] : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center text-sm text-gray-600">
            <button onClick={() => navigate('/')} className="hover:text-orange-600">Home</button>
            <ChevronRight className="w-4 h-4 mx-2" />
            <button onClick={() => navigate('/productlist')} className="hover:text-orange-600">Products</button>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-800 capitalize">{product.category}</span>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-400 truncate max-w-xs">{product.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-white rounded-2xl shadow-lg p-8 flex items-center justify-center h-[500px] relative overflow-hidden group">
              <img
                src={images[selectedImage]}
                alt={product.title}
                className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
              {product.rating?.rate >= 4.5 && (
                <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  Bestseller
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="flex gap-4">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`bg-white rounded-lg p-4 flex items-center justify-center h-24 w-24 border-2 transition-all ${
                      selectedImage === idx ? 'border-orange-500 shadow-md' : 'border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    <img src={img} alt={`${product.title} ${idx + 1}`} className="max-h-full max-w-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category Badge */}
            <div className="flex items-center gap-2">
              <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold capitalize">
                {product.category}
              </span>
              {product.rating && (
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{product.rating.rate}</span>
                  <span className="text-gray-500">({product.rating.count} reviews)</span>
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {product.title}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold text-orange-600">${product.price}</span>
              <span className="text-xl text-gray-400 line-through">${(product.price * 1.3).toFixed(2)}</span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                23% OFF
              </span>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 text-green-600">
              <Check className="w-5 h-5" />
              <span className="font-semibold">In Stock - Ready to Ship</span>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-300 rounded-lg">
                  <button
                    onClick={decrementQuantity}
                    className="p-3 hover:bg-gray-100 transition"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="px-6 py-3 font-semibold text-lg">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="p-3 hover:bg-gray-100 transition"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <span className="text-sm text-gray-500">Only 12 items left</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
              >
                Buy Now
              </button>
            </div>

            {/* Secondary Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`flex-1 border-2 py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                  isWishlisted 
                    ? 'border-red-500 text-red-500 bg-red-50' 
                    : 'border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500' : ''}`} />
                {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
              </button>
              <button
                onClick={handleShare}
                className="border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold flex items-center gap-2 hover:border-orange-500 hover:text-orange-500 transition-all"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Truck className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-xs font-semibold text-gray-700">Free Delivery</p>
                <p className="text-xs text-gray-500">On orders over $50</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                  <RotateCcw className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-xs font-semibold text-gray-700">Easy Returns</p>
                <p className="text-xs text-gray-500">30-day return policy</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-xs font-semibold text-gray-700">Secure Payment</p>
                <p className="text-xs text-gray-500">100% protected</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Tab Headers */}
          <div className="flex gap-8 border-b mb-6">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-4 px-2 font-semibold transition-all ${
                activeTab === 'description'
                  ? 'text-orange-600 border-b-2 border-orange-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('specifications')}
              className={`pb-4 px-2 font-semibold transition-all ${
                activeTab === 'specifications'
                  ? 'text-orange-600 border-b-2 border-orange-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 px-2 font-semibold transition-all ${
                activeTab === 'reviews'
                  ? 'text-orange-600 border-b-2 border-orange-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Reviews ({product.rating?.count || 0})
            </button>
          </div>

          {/* Tab Content */}
          <div className="prose max-w-none">
            {activeTab === 'description' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">Product Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description || 'No description available for this product.'}
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Premium Quality</p>
                      <p className="text-sm text-gray-600">Made with high-quality materials</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Durable Design</p>
                      <p className="text-sm text-gray-600">Built to last for years</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Fast Shipping</p>
                      <p className="text-sm text-gray-600">Delivered within 3-5 business days</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Warranty Included</p>
                      <p className="text-sm text-gray-600">1-year manufacturer warranty</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between py-3 border-b">
                    <span className="font-semibold text-gray-700">Category:</span>
                    <span className="text-gray-600 capitalize">{product.category}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b">
                    <span className="font-semibold text-gray-700">Brand:</span>
                    <span className="text-gray-600">ShopHub</span>
                  </div>
                  <div className="flex justify-between py-3 border-b">
                    <span className="font-semibold text-gray-700">SKU:</span>
                    <span className="text-gray-600">{product.id}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b">
                    <span className="font-semibold text-gray-700">Availability:</span>
                    <span className="text-green-600 font-semibold">In Stock</span>
                  </div>
                  <div className="flex justify-between py-3 border-b">
                    <span className="font-semibold text-gray-700">Weight:</span>
                    <span className="text-gray-600">1.2 kg</span>
                  </div>
                  <div className="flex justify-between py-3 border-b">
                    <span className="font-semibold text-gray-700">Dimensions:</span>
                    <span className="text-gray-600">25 x 15 x 10 cm</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">Customer Reviews</h3>
                  <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition">
                    Write a Review
                  </button>
                </div>

                {/* Rating Summary */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-gray-900">{product.rating?.rate || 4.5}</div>
                      <div className="flex items-center justify-center gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{product.rating?.count || 0} reviews</p>
                    </div>
                    <div className="flex-1 space-y-2">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star} className="flex items-center gap-3">
                          <span className="text-sm font-medium text-gray-700 w-8">{star} ★</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-yellow-400 h-2 rounded-full" 
                              style={{ width: `${star === 5 ? 70 : star === 4 ? 20 : 10}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 w-12">{star === 5 ? 70 : star === 4 ? 20 : 10}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sample Reviews */}
                <div className="space-y-4">
                  {[1, 2].map((review) => (
                    <div key={review} className="border-b pb-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">John Doe</span>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                            <Clock className="w-4 h-4" />
                            2 days ago
                          </p>
                        </div>
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">
                          Verified Purchase
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        Great product! Exactly as described. Fast shipping and excellent quality. 
                        Would definitely recommend to others. Very satisfied with my purchase.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
