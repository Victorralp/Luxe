import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { ProductProvider } from "./contexts/ProductContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import ProductsPage from "./pages/ProductsPage";
import Products from "./pages/Products";
import CartPage from "./pages/CartPage";
import CartDebugPage from "./pages/CartDebugPage";
import CheckoutPage from "./pages/CheckoutPage";
import AccountPage from "./pages/AccountPage";
import OrdersPage from "./pages/OrdersPage";
import BestsellersPage from "./pages/BestsellersPage";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ForgotPassword from "./components/auth/ForgotPassword";
import OrderSuccessPage from "./pages/OrderSuccessPage.tsx";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import ProductManager from "./pages/admin/ProductManager";
import AdminSettingsPage from "./pages/AdminSettingsPage";
import AdminAccess from "./AdminAccess";

const queryClient = new QueryClient();

const App = () => {
  // Loading state to show initial animations
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading resources
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Initial loading screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="text-3xl font-display font-semibold mb-4">LUXE</div>
          <div className="w-16 h-1 bg-foreground/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-foreground rounded-full animate-pulse"
              style={{ animation: "pulse 1.5s ease-in-out infinite" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-right" closeButton />
        <BrowserRouter>
          <AuthProvider>
            <CartProvider>
              <ProductProvider>
                <Routes>
                  <Route path="/" element={<Index />} />
                  {/* Category Routes */}
                  <Route path="/category/:category" element={<CategoryPage />} />
                  <Route path="/category/:category/:filter" element={<CategoryPage />} />
                  <Route path="/product/:productId" element={<ProductPage />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/cart-debug" element={<CartDebugPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/account" element={<AccountPage />} />
                  <Route path="/orders" element={<OrdersPage />} />
                  <Route path="/orders/:orderId" element={<OrdersPage />} />
                  <Route path="/bestsellers" element={<BestsellersPage />} />
                  
                  {/* Authentication Routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/order-success" element={<OrderSuccessPage />} />
                  
                  {/* Admin Routes */}
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/products" element={<AdminProducts />} />
                  <Route path="/admin/product-manager" element={<ProductManager />} />
                  <Route path="/admin/settings" element={<AdminSettingsPage />} />
                  <Route path="/admin-access" element={<AdminAccess />} />
                  
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </ProductProvider>
            </CartProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
