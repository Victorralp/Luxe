import React from 'react';
import { Link } from 'react-router-dom';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <header className="bg-black shadow-md sticky top-0 z-10 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-white">LUXE</Link>
            </div>
            <nav className="flex space-x-10">
              <Link to="/" className="text-sm font-medium text-white hover:text-gray-300 transition-colors">
                Home
              </Link>
              <Link to="/products" className="text-sm font-medium text-white hover:text-gray-300 transition-colors">
                Products
              </Link>
              <Link to="/cart" className="text-sm font-medium text-white hover:text-gray-300 transition-colors">
                Cart
              </Link>
              <Link to="/login" className="text-sm font-medium text-white hover:text-gray-300 transition-colors">
                Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-black py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-medium text-white">LUXE</h3>
              <p className="mt-2 text-sm text-gray-400">
                Luxury shopping at your fingertips
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">Shop</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link to="/products" className="text-sm text-gray-400 hover:text-white transition-colors">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link to="/bestsellers" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Bestsellers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">Account</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link to="/login" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800">
            <p className="text-sm text-gray-400 text-center">
              &copy; {new Date().getFullYear()} LUXE. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 