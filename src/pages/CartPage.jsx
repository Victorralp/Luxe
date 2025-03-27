import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import ProtectedRoute from '../components/auth/ProtectedRoute';

export default function CartPage() {
  const {
    cartItems,
    loading,
    error,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
  } = useCart();
  const { user } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Please sign in to view your cart
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
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Shopping Cart
      </h1>

      <div className="mt-8">
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li key={item.id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={item.products.image_url}
                    alt={item.products.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <Link to={`/products/${item.product_id}`}>
                          {item.products.name}
                        </Link>
                      </h3>
                      <p className="ml-4">${item.products.price}</p>
                    </div>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <label htmlFor="quantity" className="text-gray-700">
                        Quantity
                      </label>
                      <select
                        id="quantity"
                        name="quantity"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, Number(e.target.value))
                        }
                        className="rounded-md border-gray-300 text-base font-medium text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex">
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
          <h2 className="text-lg font-medium text-gray-900">
            Order summary
          </h2>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">Subtotal</p>
              <p className="text-sm font-medium text-gray-900">
                ${getCartTotal().toFixed(2)}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">Shipping</p>
              <p className="text-sm font-medium text-gray-900">Free</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">Tax</p>
              <p className="text-sm font-medium text-gray-900">
                ${(getCartTotal() * 0.1).toFixed(2)}
              </p>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between">
                <p className="text-base font-medium text-gray-900">
                  Order total
                </p>
                <p className="text-base font-medium text-gray-900">
                  ${(getCartTotal() * 1.1).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={clearCart}
              className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 