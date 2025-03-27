import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase/config';

const ProductContext = createContext({});

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    sortBy: 'newest',
    search: '',
  });

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      console.log('Fetching products with filters:', filters);
      
      // Start building the query
      let query = supabase
        .from('products')
        .select('*');

      // Apply category filter
      if (filters.category) {
        query = query.eq('category', filters.category);
      }

      // Apply price range filter
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number);
        if (min !== undefined && max !== undefined) {
          query = query.gte('price', min).lte('price', max);
        } else if (min !== undefined) {
          query = query.gte('price', min);
        }
      }

      // Apply search filter
      if (filters.search) {
        query = query.ilike('name', `%${filters.search}%`);
      }

      // Apply sorting
      if (filters.sortBy === 'price-asc') {
        query = query.order('price', { ascending: true });
      } else if (filters.sortBy === 'price-desc') {
        query = query.order('price', { ascending: false });
      } else {
        // Default to newest
        query = query.order('created_at', { ascending: false });
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      console.log('Products fetched:', data);
      setProducts(data || []);
      setError(null);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(error.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const getProductById = async (id) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      throw error;
    }
  };

  const getProductsByCategory = async (category) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  };

  const searchProducts = async (query) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .ilike('name', `%${query}%`);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        filters,
        fetchProducts,
        getProductById,
        getProductsByCategory,
        searchProducts,
        updateFilters,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductContext);
}; 