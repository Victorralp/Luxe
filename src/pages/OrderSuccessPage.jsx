import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function OrderSuccessPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home if user navigates directly to this page
    const hasOrderCompleted = sessionStorage.getItem('orderCompleted');
    if (!hasOrderCompleted && !new URLSearchParams(window.location.search).get('reference')) {
      navigate('/');
    }

    // Clear the flag from session storage
    return () => {
      sessionStorage.removeItem('orderCompleted');
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <svg
          className="mx-auto h-24 w-24 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Order Successful!
        </h2>
        <p className="mt-2 text-lg text-gray-600">
          Thank you for your purchase. Your order has been successfully placed.
        </p>
        <p className="mt-1 text-sm text-gray-500">
          A confirmation email has been sent to your email address.
        </p>
        <div className="mt-8 space-y-4">
          <Link
            to="/profile"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            View your orders
          </Link>
          <Link
            to="/"
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
} 