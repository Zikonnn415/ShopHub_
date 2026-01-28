import React, { useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart, incrementQuantity, decrementQuantity } from '@/redux/cartSlice';
import { Trash2, ShoppingBag, Plus, Minus, ArrowLeft, CreditCard, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const CartItem = React.memo(({ item, onRemove, onIncrement, onDecrement }) => (
  <div
    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
  >
    <div className="flex items-center gap-4">
      <img
        src={item.image}
        alt={item.title}
        className="w-24 h-24 object-contain rounded bg-gray-50"
        loading="lazy"
      />
      <div className="flex-grow">
        <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2">{item.title}</h3>
        <p className="text-sm text-gray-500 mb-2 capitalize">{item.category}</p>
        <p className="text-xl font-bold text-orange-600">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex flex-col items-end gap-3">
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
          <button 
            onClick={() => onDecrement(item.id)}
            className="text-gray-600 hover:text-orange-600 transition"
            disabled={item.quantity === 1}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="font-semibold w-8 text-center">{item.quantity}</span>
          <button 
            onClick={() => onIncrement(item.id)}
            className="text-gray-600 hover:text-orange-600 transition"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={() => onRemove(item.id)}
          className="text-red-500 hover:text-red-700 transition-colors flex items-center gap-1"
        >
          <Trash2 className="w-4 h-4" />
          <span className="text-sm">Remove</span>
        </button>
      </div>
    </div>
    <div className="mt-4 pt-4 border-t flex justify-between items-center">
      <span className="text-gray-600">Item Total:</span>
      <span className="font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</span>
    </div>
  </div>
));

CartItem.displayName = 'CartItem';
const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const { subtotal, shipping, tax, total } = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 50 ? 0 : 5.99;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax - discount;
    return { subtotal, shipping, tax, total };
  }, [cartItems, discount]);

  const handleRemove = useCallback((id) => {
    dispatch(removeFromCart(id));
    toast.success('Item removed from cart');
  }, [dispatch]);

  const handleClearCart = useCallback(() => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
      toast.success('Cart cleared');
    }
  }, [dispatch]);

  const handleIncrement = useCallback((id) => {
    dispatch(incrementQuantity(id));
  }, [dispatch]);

  const handleDecrement = useCallback((id) => {
    dispatch(decrementQuantity(id));
  }, [dispatch]);

  const handleApplyPromo = useCallback(() => {
    if (promoCode.toLowerCase() === 'save10') {
      setDiscount(subtotal * 0.1);
      toast.success('Promo code applied! 10% off');
    } else if (promoCode.toLowerCase() === 'save20') {
      setDiscount(subtotal * 0.2);
      toast.success('Promo code applied! 20% off');
    } else {
      toast.error('Invalid promo code');
    }
  }, [promoCode, subtotal]);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to get started!</p>
          <Link
            to="/"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors inline-block"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-orange-600">Home</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">Shopping Cart</span>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Shopping Cart ({cartItems.length} items)</h1>
          <Link to="/productlist" className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold">
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={handleRemove}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
              />
            ))}

            <div className="flex justify-between items-center">
              <button
                onClick={handleClearCart}
                className="text-red-500 hover:text-red-700 font-semibold text-sm flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" />
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
              
              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Promo Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg transition font-medium"
                  >
                    Apply
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">Try: SAVE10 or SAVE20</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-green-600 font-semibold" : ""}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-gray-500">Free shipping on orders over $50</p>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t pt-3 flex justify-between text-xl font-bold text-gray-800">
                  <span>Total</span>
                  <span className="text-orange-600">${total.toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors mb-3 flex items-center justify-center gap-2">
                <CreditCard className="w-5 h-5" />
                Proceed to Checkout
              </button>
              
              <Link
                to="/productlist"
                className="block text-center text-orange-600 hover:text-orange-700 font-semibold text-sm"
              >
                Continue Shopping
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <span className="text-green-600">✓</span>
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <span className="text-green-600">✓</span>
                  <span>Free Returns</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-green-600">✓</span>
                  <span>Money Back Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
