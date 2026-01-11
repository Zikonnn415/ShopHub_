import React from 'react'
import { Target, Users, Award, Heart } from 'lucide-react'

const About = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">About ShopHub</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Your trusted partner for quality products and exceptional shopping experiences
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Founded with a vision to revolutionize online shopping, ShopHub has grown from a small startup 
              to a trusted e-commerce platform serving thousands of customers worldwide.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We believe in providing not just products, but experiences. Every item in our catalog is 
              carefully curated to ensure quality, value, and customer satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality First</h3>
              <p className="text-gray-600">
                We never compromise on the quality of our products and services.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Customer Centric</h3>
              <p className="text-gray-600">
                Our customers are at the heart of everything we do.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in every aspect of our business.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Passion</h3>
              <p className="text-gray-600">
                We're passionate about delivering the best shopping experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold text-orange-600 mb-2">10K+</p>
              <p className="text-gray-600 text-lg">Happy Customers</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-orange-600 mb-2">5K+</p>
              <p className="text-gray-600 text-lg">Products</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-orange-600 mb-2">99%</p>
              <p className="text-gray-600 text-lg">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About