import Listing from '@/components/Listing'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ShoppingBag, TrendingUp, Shield, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'

const Home = () => {
  const [productFetch, setProductFetch] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchdata = async () => {
    try {
      setLoading(true)
      const response = await axios.get('https://fakestoreapi.com/products')
      setProductFetch(response.data)
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
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to ShopHub</h1>
          <p className="text-xl mb-8">Discover amazing products at unbeatable prices</p>

          <Link
            to="/productlist"
            className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Free Shipping</h3>
              <p className="text-sm text-gray-600">On orders over $50</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Secure Payment</h3>
              <p className="text-sm text-gray-600">100% secure transactions</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Best Prices</h3>
              <p className="text-sm text-gray-600">Competitive pricing</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Quality Products</h3>
              <p className="text-sm text-gray-600">Curated selection</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className='font-bold text-3xl text-gray-800'>
              <span className="text-orange-600">Flash Sale:</span> Grab Fast
            </h2>
            <Link to="/productlist" className="text-orange-600 hover:text-orange-700 font-semibold">
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
          ) : (
            <div className='flex flex-wrap justify-center'>
              {productFetch.slice(0, 8).map((item) => (
                <div key={item.id}>
                  <Listing productData={item} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-lg mb-8">Join thousands of happy customers today!</p>
          <Link
            to="/register"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-colors inline-block"
          >
            Create Account
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home;
