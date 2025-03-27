import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminAccess() {
  const navigate = useNavigate();
  
  const grantAdminAccess = () => {
    // Grant admin access
    localStorage.setItem('luxe_admin_auth', 'true');
    // Navigate to admin dashboard
    navigate('/admin');
  };
  
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Admin Access</h2>
            <p className="text-gray-400">Click the button below to access admin area.</p>
          </div>
          
          <button
            onClick={grantAdminAccess}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 text-center"
          >
            Grant Admin Access
          </button>
        </div>
      </div>
    </div>
  );
} 