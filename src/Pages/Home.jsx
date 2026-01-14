import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ShoppingBag, TrendingUp, Shield, Truck, Percent, Gift, Star, ArrowRight, Sparkles, Zap } from 'lucide-react'

// Enhanced Listing Component with navigation and animations
const Listing = ({ productData, navigate }) => (
  <div 
    className="bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-2"
    onClick={() => navigate(`/product/${productData.id}`)}
  >
    <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6 overflow-hidden relative">
      <img 
        src={productData.image} 
        alt={productData.title}
        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
    <div className="p-4">
      <p className="text-xs text-gray-500 uppercase mb-1 font-medium">{productData.category}</p>
      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 h-12 group-hover:text-orange-600 transition-colors">{productData.title}</h3>
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-orange-600">${productData.price}</span>
        <div className="flex items-center text-sm text-gray-600">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
          <span>{productData.rating?.rate || 4.5}</span>
        </div>
      </div>
    </div>
  </div>
)

const Home = () => {
  const [productFetch, setProductFetch] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // News items with proper color classes (fixed dynamic class issue)
  const newsItems = [
    { icon: Percent, title: 'New Arrivals', desc: 'Fresh products added weekly. Check out our latest collection!', bgColor: 'bg-orange-100', iconColor: 'text-orange-600' },
    { icon: Star, title: 'Member Benefits', desc: 'Join our loyalty program and earn points with every purchase!', bgColor: 'bg-green-100', iconColor: 'text-green-600' },
    { icon: Truck, title: 'Free Express Delivery', desc: 'Orders over $100 get free express shipping this month!', bgColor: 'bg-blue-100', iconColor: 'text-blue-600' }
  ]

  const fetchdata = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://fakestoreapi.com/products')
      const data = await response.json()
      setProductFetch(data)
    } catch (err) {
      console.log("Error fetching products:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchdata()
  }, [])

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section with animations */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-rose-600 text-white">
        <div className="absolute inset-0 bg-black opacity-5"></div>
        <div className="absolute -left-20 top-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -right-20 bottom-0 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight animate-slide-up">
              Welcome to ShopHub
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Discover amazing products at unbeatable prices
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Link 
                to="/productlist" 
                className="bg-white text-orange-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Shop Now
              </Link>
              <Link 
                to="/productlist" 
                className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all font-semibold border-2 border-white/30 hover:border-white/50"
              >
                Browse Deals
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/90">
              <span className="flex items-center gap-2">
                <Truck className="w-4 h-4" />
                Free Returns
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                24/7 Support
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                Secure Payments
              </span>
            </div>
          </div>
        </div>
      </section>


      {/* Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-3 tracking-tight leading-tight">
                Top Picks{' '}
                <span className="relative inline-block">
                  <span className="text-orange-600 relative z-10">for You</span>
                  <span className="absolute bottom-0 left-0 w-full h-3 bg-orange-100 -z-0 opacity-60"></span>
                </span>
              </h2>
              <p className="text-lg text-gray-600 font-medium tracking-wide">Handpicked products curated just for you</p>
            </div>
            <Link 
              to="/productlist" 
              className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-2 group px-4 py-2 rounded-lg hover:bg-orange-50 transition-all"
            >
              View All 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-32">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-orange-600"></div>
                <ShoppingBag className="w-6 h-6 text-orange-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {productFetch.slice(0, 12).map((item, idx) => (
                <div key={item.id} style={{ animationDelay: `${idx * 0.05}s` }} className="animate-fade-in">
                  <Listing productData={item} navigate={navigate} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-orange-600 uppercase tracking-widest">Latest Updates</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
              Special{' '}
              <span className="relative inline-block">
                <span className="text-orange-600 relative z-10">Offers</span>
                <span className="absolute bottom-0 left-0 w-full h-3 bg-orange-100 -z-0 opacity-60"></span>
              </span>
              {' '}& News
            </h2>
            <p className="text-lg text-gray-600 font-medium tracking-wide max-w-2xl mx-auto leading-relaxed">
              Stay updated with our latest promotions and exciting news
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Mega Sale Card with animations */}
            <div className="lg:col-span-2 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-3xl p-10 text-white relative overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-black opacity-10 rounded-full blur-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Gift className="w-6 h-6 animate-bounce" />
                  <span className="text-sm font-semibold bg-white/20 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/30">
                    Upcoming Sale
                  </span>
                </div>
                
                <h3 className="text-4xl md:text-5xl font-bold mb-4">Black Friday Mega Sale</h3>
                <p className="text-lg mb-6 text-white/90 max-w-xl">
                  Get ready for our biggest sale of the year! Up to 70% off on all categories. Don't miss out on these incredible deals.
                </p>
                
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-4 rounded-xl text-center hover:bg-white/30 transition-all transform hover:scale-105 border border-white/20">
                    <p className="text-xs text-white/80 mb-1 uppercase tracking-wide">Starts in</p>
                    <p className="text-3xl font-bold">15</p>
                    <p className="text-xs text-white/70">Days</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-4 rounded-xl text-center hover:bg-white/30 transition-all transform hover:scale-105 border border-white/20">
                    <p className="text-xs text-white/80 mb-1 uppercase tracking-wide">Discount</p>
                    <p className="text-3xl font-bold">70%</p>
                    <p className="text-xs text-white/70">OFF</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-4 rounded-xl text-center hover:bg-white/30 transition-all transform hover:scale-105 border border-white/20">
                    <p className="text-xs text-white/80 mb-1 uppercase tracking-wide">Categories</p>
                    <p className="text-3xl font-bold">All</p>
                    <p className="text-xs text-white/70">Items</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => navigate('/productlist')}
                  className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all flex items-center gap-2 shadow-lg transform hover:scale-105 hover:shadow-xl"
                >
                  <Sparkles className="w-5 h-5" />
                  Set Reminder
                </button>
              </div>
            </div>

            {/* News Cards with fixed color classes */}
            <div className="space-y-6">
              {newsItems.map((news, idx) => (
                <div 
                  key={idx} 
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 hover:bg-white hover:shadow-xl transition-all duration-300 group cursor-pointer transform hover:-translate-y-2 border border-gray-100"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`${news.bgColor} w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm`}>
                      <news.icon className={`w-7 h-7 ${news.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-2 text-lg group-hover:text-orange-600 transition-colors">{news.title}</h4>
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">{news.desc}</p>
                      <Link 
                        to="/productlist" 
                        className="text-orange-600 text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all hover:text-orange-700"
                      >
                        Learn More 
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-purple-600/10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 opacity-5 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of happy customers and discover amazing deals today!
          </p>
          <Link
            to="/register"
            className="bg-orange-600 hover:bg-orange-700 text-white px-12 py-4 rounded-full font-semibold transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl inline-block text-lg"
          >
            Create Account
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home