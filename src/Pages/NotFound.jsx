import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center px-6">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-orange-600 mb-4">404</h1>
          <div className="w-32 h-1 bg-orange-600 mx-auto mb-8"></div>
        </div>
        
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg transition font-semibold"
          >
            <Home className="w-5 h-5" />
            Go to Homepage
          </Link>
          
          <Link
            to="/productlist"
            className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-800 px-6 py-3 rounded-lg transition font-semibold border border-gray-300"
          >
            <Search className="w-5 h-5" />
            Browse Products
          </Link>
        </div>

        <div className="mt-12">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="mt-16 opacity-20">
          <svg className="w-64 h-64 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
