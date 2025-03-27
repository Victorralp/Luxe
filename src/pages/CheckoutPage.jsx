import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { FlutterwavePayment } from '../components/FlutterwavePayment';

export default function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    email: user?.email || '',
    name: user?.user_metadata?.full_name || '',
    phone: '',
    address: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentSuccess = async (transactionId) => {
    try {
      // Save order details to database or process further
      console.log('Payment successful', transactionId);
      
      // Clear cart
      clearCart();
      
      // Redirect to success page
      navigate('/order-success');
    } catch (err) {
      console.error('Error processing payment:', err);
      setError('Error processing payment');
    }
  };

  const handlePaymentError = (errorMessage) => {
    console.error('Payment error:', errorMessage);
    setError(errorMessage);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Please sign in to checkout
          </h2>
          <Link
            to="/login"
            className="text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h2>
          <Link
            to="/products"
            className="text-indigo-600 hover:text-indigo-500"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Order Summary
          </h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {item.products.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ${(item.products.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between">
                <p className="text-base font-medium text-gray-900">
                  Subtotal
                </p>
                <p className="text-base font-medium text-gray-900">
                  ${getCartTotal().toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-sm text-gray-500">Shipping</p>
                <p className="text-sm text-gray-500">Free</p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-sm text-gray-500">Tax (10%)</p>
                <p className="text-sm text-gray-500">
                  ${(getCartTotal() * 0.1).toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between mt-4 border-t border-gray-200 pt-4">
                <p className="text-lg font-medium text-gray-900">
                  Total
                </p>
                <p className="text-lg font-medium text-gray-900">
                  ${(getCartTotal() * 1.1).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Information Form */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Customer Information
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={customerInfo.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={customerInfo.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={customerInfo.phone}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Delivery Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={customerInfo.address}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          {/* Payment Section */}
          {customerInfo.email && customerInfo.name && customerInfo.phone && customerInfo.address && (
            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Payment
              </h2>
              <FlutterwavePayment
                amount={getCartTotal() * 1.1}
                email={customerInfo.email}
                name={customerInfo.name}
                phone={customerInfo.phone}
                reference={`order-${Date.now()}`}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 