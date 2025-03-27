import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabase/config';

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      console.log("User authenticated, fetching cart items for:", user.id);
      fetchCartItems();
    } else {
      console.log("No user logged in, clearing cart");
      setCartItems([]);
      setLoading(false);
    }
  }, [user]);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      // Fetch cart items first
      const { data: cartData, error: cartError } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id);

      if (cartError) throw cartError;
      
      console.log("Cart items retrieved from Supabase:", cartData);
      
      if (!cartData || cartData.length === 0) {
        setCartItems([]);
        setError(null);
        setLoading(false);
        return;
      }

      // Extract product IDs from cart items
      const productIds = cartData.map(item => item.product_id);
      
      // Fetch products for those IDs
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('id, name, price, image_url')
        .in('id', productIds);
      
      if (productsError) throw productsError;
      
      console.log("Products for cart items:", productsData);
      
      // Create a map of product data by ID for efficient lookup
      const productsMap = {};
      productsData.forEach(product => {
        productsMap[product.id] = product;
      });
      
      // Combine cart items with their corresponding product data
      const enrichedCartItems = cartData.map(cartItem => ({
        ...cartItem,
        products: productsMap[cartItem.product_id] || null
      }));
      
      setCartItems(enrichedCartItems);
      setError(null);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setError(error.message);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      if (!user) {
        console.error("Cannot add to cart: No user is logged in");
        setError("Please log in to add items to your cart");
        return;
      }
      
      console.log("Adding to cart - Product ID:", productId, "Quantity:", quantity, "User ID:", user.id);
      setLoading(true);
      
      // Check if item already exists in cart
      const existingItem = cartItems.find(
        (item) => item.product_id === productId
      );

      if (existingItem) {
        console.log("Item already exists in cart, updating quantity:", existingItem);
        // Update quantity
        const { data, error } = await supabase
          .from('cart_items')
          .update({ quantity: existingItem.quantity + quantity })
          .eq('id', existingItem.id)
          .select()
          .single();

        if (error) {
          console.error("Error updating cart item:", error);
          throw error;
        }
        
        console.log("Cart item updated successfully:", data);
        
        // Keep the products data when updating the item
        data.products = existingItem.products;
        
        setCartItems((prev) =>
          prev.map((item) =>
            item.id === existingItem.id ? data : item
          )
        );
      } else {
        console.log("New item, adding to cart");
        
        // Let's verify the cart_items table exists first
        const { count, error: tableError } = await supabase
          .from('cart_items')
          .select('*', { count: 'exact', head: true });
          
        if (tableError) {
          console.error("Error checking cart_items table:", tableError);
        } else {
          console.log("cart_items table exists, count query result:", count);
        }
        
        // Add new item
        const newItem = {
          user_id: user.id,
          product_id: productId,
          quantity: quantity,
        };
        
        console.log("Inserting new cart item:", newItem);
        
        const { data, error } = await supabase
          .from('cart_items')
          .insert([newItem])
          .select()
          .single();

        if (error) {
          console.error("Error inserting cart item:", error);
          throw error;
        }
        
        console.log("New cart item inserted successfully:", data);
        
        // Fetch the product data for this new cart item
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('id, name, price, image_url')
          .eq('id', productId)
          .single();
          
        if (productError) {
          console.error("Error fetching product data:", productError);
          throw productError;
        }
        
        console.log("Product data retrieved:", productData);
        
        // Add the product data to the cart item
        data.products = productData;
        
        setCartItems((prev) => [...prev, data]);
      }
      setError(null);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (cartItemId, quantity) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', cartItemId)
        .select()
        .single();

      if (error) throw error;
      
      // Find the existing item to preserve its product data
      const existingItem = cartItems.find(item => item.id === cartItemId);
      if (existingItem) {
        data.products = existingItem.products;
      }
      
      setCartItems((prev) =>
        prev.map((item) => (item.id === cartItemId ? data : item))
      );
      setError(null);
    } catch (error) {
      console.error('Error updating quantity:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', cartItemId);

      if (error) throw error;
      setCartItems((prev) =>
        prev.filter((item) => item.id !== cartItemId)
      );
      setError(null);
    } catch (error) {
      console.error('Error removing from cart:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;
      setCartItems([]);
      setError(null);
    } catch (error) {
      console.error('Error clearing cart:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + (item.products?.price || 0) * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        error,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
}; 