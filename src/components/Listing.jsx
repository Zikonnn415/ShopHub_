import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/redux/cartSlice';
import toast from 'react-hot-toast';
import { ShoppingCart } from 'lucide-react';

const Listing = ({ productData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.user.email);

  const handleAddToCart = () => {
    if (!userEmail) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }
    
    dispatch(addToCart(productData));
    toast.success('Added to cart!');
  };

  const handleProductClick = () => {
    if (!userEmail) {
      toast.error('Please login to view product details');
      navigate('/login');
      return;
    }
    navigate(`/product/${productData.id}`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden w-[280px] m-4 hover:shadow-xl hover:scale-[1.03] transition-all duration-300 relative">
      {/* Category Tag */}
      <p className="absolute top-0 left-0 bg-orange-100 text-orange-700 text-xs font-semibold px-2 py-1 rounded-br-md rounded-tl-md z-10">
        {productData.category}
      </p>

      {/* Product Image */}
      <div 
        className="flex items-center justify-center h-[200px] bg-gray-50 cursor-pointer"
        onClick={handleProductClick}
      >
        <img
          src={productData.image}
          alt={productData.title}
          className="max-h-[180px] object-contain"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col justify-between h-[150px]">
        <p 
          className="text-sm font-medium text-gray-800 line-clamp-2 cursor-pointer hover:text-orange-600 transition-colors"
          onClick={handleProductClick}
        >
          {productData.title}
        </p>

        <div className="flex items-center justify-between mt-3">
          <p className="text-lg font-bold text-orange-600">
            $ {productData.price}
          </p>
          <button
            className="bg-orange-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-orange-600 transition-colors flex items-center space-x-1"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-3 h-3" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Listing;