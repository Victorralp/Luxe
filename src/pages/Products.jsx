import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase/config';
import Layout from '../components/Layout';

// Mock data for testing
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Elegant Silk Dress',
    price: 149.99,
    description: 'A beautiful silk dress perfect for special occasions.',
    image_url: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'Clothing'
  },
  {
    id: 2,
    name: 'Designer Leather Handbag',
    price: 299.99,
    description: 'Premium leather handbag with gold-plated hardware.',
    image_url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'Bags'
  },
  {
    id: 3,
    name: 'Sapphire Pendant Necklace',
    price: 499.99,
    description: '18k gold necklace with a genuine sapphire pendant.',
    image_url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'Jewelry'
  },
  {
    id: 4,
    name: 'Cashmere Sweater',
    price: 129.99,
    description: 'Soft and luxurious 100% cashmere sweater.',
    image_url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'Clothing'
  },
  {
    id: 5,
    name: 'Italian Leather Shoes',
    price: 239.99,
    description: 'Handcrafted Italian leather shoes with a classic design.',
    image_url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'Shoes'
  },
  {
    id: 6,
    name: 'Diamond Stud Earrings',
    price: 599.99,
    description: 'Classic diamond stud earrings set in white gold.',
    image_url: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'Jewelry'
  }
];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Comment out the Supabase fetch for now and use mock data
    // fetchProducts();
    
    // Simulate API load
    const timer = setTimeout(() => {
      setProducts(MOCK_PRODUCTS);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  async function fetchProducts() {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('products')
        .select('*');
      
      if (error) throw error;
      
      console.log("Products retrieved:", data);
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8 text-white">All Products</h1>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        ) : error ? (
          <div className="text-red-400 text-center py-12">{error}</div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="border border-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:border-gray-700 transition-all">
                <div className="aspect-w-1 aspect-h-1 w-full bg-gray-900">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="h-80 w-full object-cover"
                    />
                  ) : (
                    <div className="h-80 flex items-center justify-center bg-gray-800">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-medium text-white text-lg">{product.name}</h3>
                  <p className="text-xl font-bold mt-2 text-white">${product.price}</p>
                  <p className="text-sm text-gray-400 mt-3 line-clamp-2 h-12">
                    {product.description || "No description available"}
                  </p>
                  <div className="mt-6">
                    <Link
                      to={`/product/${product.id}`}
                      className="inline-block w-full py-3 px-4 bg-white text-black text-center font-medium rounded-md hover:bg-gray-200 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
} 