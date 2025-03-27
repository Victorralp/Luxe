import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

// Use the same mock data from Products.jsx
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

export default function ProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Simulate API load
    const timer = setTimeout(() => {
      const foundProduct = MOCK_PRODUCTS.find(p => p.id === Number(productId));
      
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        console.error(`Product with ID ${productId} not found`);
      }
      
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [productId]);

  const handleAddToCart = () => {
    // Simulate adding to cart
    setMessage(`Added ${quantity} ${product.name} to cart!`);
    
    // Clear message after 3 seconds
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center flex-col">
          <h2 className="text-2xl font-bold mb-4 text-white">Product not found</h2>
          <button
            onClick={() => navigate('/products')}
            className="bg-white text-black px-5 py-2 rounded hover:bg-gray-200 transition-colors"
          >
            Return to Products
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Product Image */}
          <div className="md:w-1/2">
            <div className="rounded-lg overflow-hidden bg-gray-900 border border-gray-800">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-auto object-cover"
                />
              ) : (
                <div className="h-96 flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Product Details */}
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold text-white">{product.name}</h1>
            <p className="text-2xl font-bold mt-2 text-white">${product.price}</p>
            
            <div className="mt-6">
              <p className="text-gray-300">{product.description}</p>
            </div>
            
            <div className="mt-8">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-300">
                Quantity
              </label>
              <div className="mt-2 flex rounded-md">
                <input
                  type="number"
                  id="quantity"
                  className="w-20 rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-white focus:ring-white"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                />
              </div>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="mt-8 w-full bg-white text-black py-3 px-4 rounded-md hover:bg-gray-200 transition-colors font-medium"
            >
              Add to Cart
            </button>
            
            {message && (
              <div className="mt-6 p-4 bg-green-900 text-green-200 rounded-md border border-green-700">
                {message}
              </div>
            )}
            
            <div className="mt-10 border-t border-gray-800 pt-8">
              <h2 className="text-xl font-medium text-white">Product Details</h2>
              <div className="mt-6 grid grid-cols-1 gap-y-4 text-sm">
                <div className="grid grid-cols-2">
                  <div className="font-medium text-gray-400">Category</div>
                  <div className="text-white">{product.category}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="font-medium text-gray-400">SKU</div>
                  <div className="text-white">SKU-{product.id.toString().padStart(4, '0')}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="font-medium text-gray-400">Material</div>
                  <div className="text-white">Premium</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 