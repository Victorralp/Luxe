import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase/config';
import AdminLayout from '../../components/AdminLayout';
import ProductForm from '../../components/admin/ProductForm';

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('created_at');
  const [sortDirection, setSortDirection] = useState('desc');
  
  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, [sortField, sortDirection]);
  
  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('products')
        .select('*')
        .order(sortField, { ascending: sortDirection === 'asc' });
      
      const { data, error } = await query;
      
      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle direction if clicking the same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New field, default to desc
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  const handleAddNew = () => {
    setSelectedProduct(null);
    setShowForm(true);
  };
  
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };
  
  const handleDelete = async (product) => {
    if (!confirm(`Are you sure you want to delete "${product.name}"?`)) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', product.id);
        
      if (error) throw error;
      
      // Update local state
      setProducts(products.filter(p => p.id !== product.id));
    } catch (err) {
      console.error('Error deleting product:', err);
      alert(`Failed to delete product: ${err.message}`);
    }
  };
  
  const handleFormSuccess = (product) => {
    if (selectedProduct) {
      // Update in list
      setProducts(products.map(p => 
        p.id === product.id ? product : p
      ));
    } else {
      // Add to list
      setProducts([product, ...products]);
    }
    
    setShowForm(false);
  };
  
  const handleFormCancel = () => {
    setShowForm(false);
  };
  
  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Split view - form and list
  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-900 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">
              {showForm 
                ? selectedProduct 
                  ? `Edit Product: ${selectedProduct.name}` 
                  : 'Add New Product'
                : 'Product Management'
              }
            </h1>
            
            {!showForm && (
              <button
                onClick={handleAddNew}
                className="bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add New Product
              </button>
            )}
          </div>
          
          {error && (
            <div className="bg-red-900 border border-red-800 text-red-200 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}
          
          {showForm ? (
            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
              <ProductForm 
                product={selectedProduct} 
                onSuccess={handleFormSuccess} 
                onCancel={handleFormCancel}
              />
            </div>
          ) : (
            <>
              {/* Search and filter */}
              <div className="bg-gray-800 rounded-lg shadow-lg p-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label htmlFor="search" className="sr-only">Search</label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="search"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Search products by name, description, or category"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Products table */}
              <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                {loading ? (
                  <div className="p-6 text-center text-gray-400">
                    Loading products...
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="p-6 text-center text-gray-400">
                    {searchTerm 
                      ? 'No products found matching your search.' 
                      : 'No products available. Add your first product!'}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full table-fixed border-collapse">
                      <thead>
                        <tr className="bg-gray-700 text-left">
                          <th className="px-6 py-3 w-16 text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Image
                          </th>
                          <th 
                            className="px-6 py-3 text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                            onClick={() => handleSort('name')}
                          >
                            <div className="flex items-center">
                              <span>Name</span>
                              {sortField === 'name' && (
                                <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  {sortDirection === 'asc' ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                  ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  )}
                                </svg>
                              )}
                            </div>
                          </th>
                          <th 
                            className="px-6 py-3 text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                            onClick={() => handleSort('category')}
                          >
                            <div className="flex items-center">
                              <span>Category</span>
                              {sortField === 'category' && (
                                <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  {sortDirection === 'asc' ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                  ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  )}
                                </svg>
                              )}
                            </div>
                          </th>
                          <th 
                            className="px-6 py-3 text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                            onClick={() => handleSort('price')}
                          >
                            <div className="flex items-center">
                              <span>Price</span>
                              {sortField === 'price' && (
                                <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  {sortDirection === 'asc' ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                  ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  )}
                                </svg>
                              )}
                            </div>
                          </th>
                          <th 
                            className="px-6 py-3 text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                            onClick={() => handleSort('stock')}
                          >
                            <div className="flex items-center">
                              <span>Stock</span>
                              {sortField === 'stock' && (
                                <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  {sortDirection === 'asc' ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                  ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  )}
                                </svg>
                              )}
                            </div>
                          </th>
                          <th className="px-6 py-3 w-24 text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Featured
                          </th>
                          <th className="px-6 py-3 w-32 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {filteredProducts.map((product) => (
                          <tr key={product.id} className="hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap">
                              {product.image_url ? (
                                <img 
                                  src={product.image_url} 
                                  alt={product.name} 
                                  className="h-10 w-10 object-cover rounded-md"
                                />
                              ) : (
                                <div className="h-10 w-10 bg-gray-600 rounded-md flex items-center justify-center">
                                  <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-white">{product.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-900 text-indigo-200">
                                {product.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              ${product.price.toFixed(2)}
                              {product.discount_percent > 0 && (
                                <span className="ml-1 text-xs text-red-400">
                                  -{product.discount_percent}%
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {product.stock}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {product.featured ? (
                                <span className="text-green-500">Yes</span>
                              ) : (
                                <span className="text-gray-500">No</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => handleEdit(product)}
                                className="text-indigo-400 hover:text-indigo-300 mr-3"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(product)}
                                className="text-red-400 hover:text-red-300"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
} 