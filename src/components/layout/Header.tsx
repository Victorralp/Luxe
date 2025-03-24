
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Search, ShoppingBag, Moon, Sun, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "../theme/ModeToggle";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Track scroll position to change header style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { name: "New Arrivals", path: "/category/new-arrivals" },
    { name: "Women", path: "/category/women" },
    { name: "Men", path: "/category/men" },
    { name: "Accessories", path: "/category/accessories" },
    { name: "Sale", path: "/category/sale" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-background/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="text-2xl font-display font-semibold tracking-tight">
            LUXE
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {categories.map((category) => (
              <DropdownMenu key={category.name}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-sm flex items-center gap-1 h-9">
                    {category.name}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-48">
                  <DropdownMenuItem>
                    <Link to={`${category.path}/best-sellers`} className="w-full">Best Sellers</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to={`${category.path}/featured`} className="w-full">Featured</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to={`${category.path}/all`} className="w-full">View All</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSearch}
              className="rounded-full"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>

            <ModeToggle />

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full relative"
              aria-label="Cart"
              asChild
            >
              <Link to="/cart">
                <ShoppingBag className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-gold text-black">
                  3
                </Badge>
              </Link>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="absolute inset-x-0 top-16 md:top-20 bg-background/95 backdrop-blur-md p-4 shadow-md animate-fade-in">
          <div className="container mx-auto flex items-center">
            <Input 
              type="search" 
              placeholder="Search products..." 
              className="flex-1"
              autoFocus
            />
            <Button variant="ghost" size="icon" onClick={toggleSearch} className="ml-2">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-background z-30 overflow-y-auto animate-fade-in">
          <div className="container p-4">
            <nav className="flex flex-col space-y-4 py-4">
              {categories.map((category) => (
                <div key={category.name} className="border-b pb-2">
                  <div className="font-medium py-2">{category.name}</div>
                  <div className="pl-4 flex flex-col space-y-2">
                    <Link 
                      to={`${category.path}/best-sellers`}
                      className="text-sm py-1 text-foreground/80"
                      onClick={toggleMobileMenu}
                    >
                      Best Sellers
                    </Link>
                    <Link 
                      to={`${category.path}/featured`}
                      className="text-sm py-1 text-foreground/80"
                      onClick={toggleMobileMenu}
                    >
                      Featured
                    </Link>
                    <Link 
                      to={`${category.path}/all`}
                      className="text-sm py-1 text-foreground/80"
                      onClick={toggleMobileMenu}
                    >
                      View All
                    </Link>
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
