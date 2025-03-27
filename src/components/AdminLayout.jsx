import React, { useState, useEffect } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Icons
const DashboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
  </svg>
);

const ProductsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
  </svg>
);

const OrdersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
  </svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
  </svg>
);

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414a1 1 0 00-.293-.707L11.414 2.414A1 1 0 0010.707 2H4a1 1 0 00-1 1zm0 2.5V15h12V6.707L10.707 2.5H4a1 1 0 00-1 1z" clipRule="evenodd" />
    <path d="M11 14a1 1 0 100-2H9a1 1 0 100 2h2z" />
  </svg>
);

const StoreIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
  </svg>
);

export default function AdminLayout({ children }) {
  const { user, signOut } = useAuth() || {};
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [keysPressed, setKeysPressed] = useState({
    shift: false,
    alt: false,
    a: false
  });
  
  // Check if user is already authorized via localStorage
  useEffect(() => {
    const adminAuth = localStorage.getItem('luxe_admin_auth');
    if (adminAuth === 'true') {
      setIsAuthorized(true);
    }
  }, []);
  
  // Set up key listeners for the secret shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Update keys pressed
      if (e.key === 'Shift') {
        setKeysPressed(prev => ({ ...prev, shift: true }));
      } else if (e.key === 'Alt') {
        setKeysPressed(prev => ({ ...prev, alt: true }));
      } else if (e.key === 'a' || e.key === 'A') {
        setKeysPressed(prev => ({ ...prev, a: true }));
      }
      
      // Check if all keys are pressed for the secret combination
      if (e.shiftKey && e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault(); // Prevent default browser behavior
        setIsAuthorized(true);
        localStorage.setItem('luxe_admin_auth', 'true');
      }
    };
    
    const handleKeyUp = (e) => {
      // Reset keys on key up
      if (e.key === 'Shift') {
        setKeysPressed(prev => ({ ...prev, shift: false }));
      } else if (e.key === 'Alt') {
        setKeysPressed(prev => ({ ...prev, alt: false }));
      } else if (e.key === 'a' || e.key === 'A') {
        setKeysPressed(prev => ({ ...prev, a: false }));
      }
    };
    
    // Add event listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Protected route check - redirect if not admin
  if (!isAuthorized && (!user || user.role !== 'admin')) {
    // If not authorized, show the restricted access page with secret hint
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Admin Access</h2>
              <p className="text-gray-400">This area is restricted.</p>
            </div>
            
            <div className="flex flex-col gap-4">
              <Link
                to="/login"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 text-center"
              >
                Login as Admin
              </Link>
              <Link
                to="/"
                className="w-full text-gray-400 py-2 text-center hover:text-white"
              >
                Return to Store
              </Link>
              <div 
                className="text-xs text-gray-500 text-center mt-4 cursor-default"
                onClick={() => {
                  setIsAuthorized(true);
                  localStorage.setItem('luxe_admin_auth', 'true');
                }}
              >
                <span className="opacity-70">Hint: Use Alt+Shift+A to access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: DashboardIcon },
    { name: 'Products', href: '/admin/products', icon: ProductsIcon },
    { name: 'Product Manager', href: '/admin/product-manager', icon: ProductsIcon },
    { name: 'Orders', href: '/admin/orders', icon: OrdersIcon },
    { name: 'Users', href: '/admin/users', icon: UsersIcon },
    { name: 'Settings', href: '/admin/settings', icon: SettingsIcon },
  ];

  const handleLogout = () => {
    // Clear admin authorization
    localStorage.removeItem('luxe_admin_auth');
    setIsAuthorized(false);
    // Also sign out if user is logged in
    if (user && signOut) {
      signOut();
    }
  };

  const secondaryNavigation = [
    { name: 'View Store', href: '/', icon: StoreIcon },
    { name: 'Logout', href: '#', icon: LogoutIcon, onClick: handleLogout },
  ];

  return (
    <div className="h-screen flex overflow-hidden bg-gray-900">
      {/* Mobile sidebar */}
      <div 
        className={`fixed inset-0 flex z-40 md:hidden ${sidebarOpen ? 'block' : 'hidden'}`}
        aria-hidden="true"
      >
        <div 
          className="fixed inset-0 bg-gray-800 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        ></div>
        <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-900">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-shrink-0 flex items-center px-4">
            <Link to="/admin" className="text-2xl font-bold text-white">LUXE Admin</Link>
          </div>
          <div className="mt-5 flex-1 h-0 overflow-y-auto">
            <nav className="px-2 space-y-1">
              {renderNavigation(navigation, location.pathname)}
              <div className="pt-6 mt-6 border-t border-gray-800">
                {renderNavigation(secondaryNavigation, location.pathname)}
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1">
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900 border-b border-gray-800">
              <Link to="/admin" className="text-xl font-bold text-white">LUXE Admin</Link>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-4 py-4 bg-gray-900 space-y-1">
                {renderNavigation(navigation, location.pathname)}
                <div className="pt-6 mt-6 border-t border-gray-800">
                  {renderNavigation(secondaryNavigation, location.pathname)}
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-gray-900 border-b border-gray-800">
          <button
            type="button"
            className="px-4 md:hidden text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <h1 className="text-lg font-medium text-white">
                {navigation.find(item => item.href === location.pathname)?.name || 'Admin Panel'}
              </h1>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <div className="text-sm text-gray-300">
                {user ? user.email : 'Secret Access'}
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1 relative overflow-y-auto focus:outline-none bg-black">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function renderNavigation(items, currentPath) {
  return items.map((item) => {
    const isActive = item.href === currentPath;
    return (
      <Link
        key={item.name}
        to={item.href}
        onClick={item.onClick}
        className={`${
          isActive
            ? 'bg-gray-800 text-white'
            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
        } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
      >
        <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} aria-hidden="true" />
        {item.name}
      </Link>
    );
  });
} 