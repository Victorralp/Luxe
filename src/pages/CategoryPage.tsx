import { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProductGrid from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { GridIcon, ListIcon, SlidersHorizontal, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CategoryBreadcrumb from "@/components/category/CategoryBreadcrumb";
import CategoryHeader from "@/components/category/CategoryHeader";

// Sample product data
const womenProducts = [
  {
    id: "w1",
    name: "Silk Wrap Dress",
    price: 189,
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      "https://images.unsplash.com/photo-1551489628-9f3208fccf73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
    ],
    colors: ["#D6CAC1", "#383838", "#7D5151"],
    category: "Dresses",
    isNew: true,
  },
  {
    id: "w2",
    name: "Cashmere Turtleneck",
    price: 165,
    images: [
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
    ],
    colors: ["#E6E6E6", "#222222", "#BE8C63"],
    category: "Knitwear",
  },
  {
    id: "w3",
    name: "Tailored Silk Blouse",
    price: 125,
    images: [
      "https://images.unsplash.com/photo-1551489628-5e2337c36434?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      "https://images.unsplash.com/photo-1551489628-a8a92883fed3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
    ],
    colors: ["#F8EFE6", "#D4B59E", "#212121"],
    category: "Tops",
    isNew: true,
  },
  {
    id: "w4",
    name: "Linen Wide-Leg Pants",
    price: 140,
    images: [
      "https://images.unsplash.com/photo-1509319117193-57bab727e09d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=986&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80"
    ],
    colors: ["#EAEAEA", "#B1A79F", "#545454"],
    category: "Bottoms",
  },
  {
    id: "w5",
    name: "Cotton Knit Sweater",
    price: 175,
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
      "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1179&q=80"
    ],
    colors: ["#EAEAEA", "#B1A79F", "#545454"],
    category: "Knitwear",
    isBestSeller: true,
  },
  {
    id: "w6",
    name: "Structured Wool Blazer",
    price: 275,
    originalPrice: 350,
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1336&q=80",
      "https://images.unsplash.com/photo-1591047139756-37a32d8fb586?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1336&q=80"
    ],
    colors: ["#3D3D3D", "#6B5D4D"],
    category: "Outerwear",
    isBestSeller: true,
  },
  {
    id: "w7",
    name: "Fine Wool Coat",
    price: 425,
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      "https://images.unsplash.com/photo-1551489603-9f3208fccf73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
    ],
    colors: ["#AEABA8", "#3A2D2F"],
    category: "Outerwear",
  },
  {
    id: "w8",
    name: "Linen Summer Dress",
    price: 165,
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80"
    ],
    colors: ["#F5F5DC", "#FFD4B8", "#A9C5AC"],
    category: "Dresses",
  },
];

const menProducts = [
  {
    id: "m1",
    name: "Classic Fit Suit",
    price: 599,
    images: [
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80"
    ],
    colors: ["#000000", "#1B1B1B"],
    category: "Suits",
    isNew: true,
  },
  // Add more men's products...
];

const accessoriesProducts = [
  {
    id: "a1",
    name: "Leather Wallet",
    price: 89,
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
    ],
    colors: ["#8B4513", "#000000"],
    category: "Accessories",
    isNew: true,
  },
  // Add more accessories...
];

const CategoryPage = () => {
  const { category, filter } = useParams();
  const [gridView, setGridView] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  // Get products based on category
  const getProducts = () => {
    switch (category) {
      case "women":
        return womenProducts;
      case "men":
        return menProducts;
      case "accessories":
        return accessoriesProducts;
      default:
        return [];
    }
  };

  // Get category title and description
  const getCategoryInfo = () => {
    switch (category) {
      case "women":
        return {
          title: "Women's Collection",
          description: "Discover our handpicked selection of premium women's apparel, crafted with exceptional quality and timeless design.",
          image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        };
      case "men":
        return {
          title: "Men's Collection",
          description: "Explore our curated selection of men's fashion, featuring classic styles and contemporary designs.",
          image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80"
        };
      case "accessories":
        return {
          title: "Accessories Collection",
          description: "Complete your look with our selection of premium accessories, from leather goods to jewelry.",
          image: "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
        };
      default:
        return {
          title: "Collection",
          description: "Browse our collection of premium fashion items.",
          image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        };
    }
  };

  const products = getProducts();
  const categoryInfo = getCategoryInfo();
  
  const categories = [
    { id: "all", name: "All Categories", count: products.length },
    { id: "dresses", name: "Dresses", count: products.filter(p => p.category === "Dresses").length },
    { id: "tops", name: "Tops", count: products.filter(p => p.category === "Tops").length },
    { id: "knitwear", name: "Knitwear", count: products.filter(p => p.category === "Knitwear").length },
    { id: "bottoms", name: "Bottoms", count: products.filter(p => p.category === "Bottoms").length },
    { id: "outerwear", name: "Outerwear", count: products.filter(p => p.category === "Outerwear").length },
  ];
  
  const sizes = [
    { id: "xs", label: "XS" },
    { id: "s", label: "S" },
    { id: "m", label: "M" },
    { id: "l", label: "L" },
    { id: "xl", label: "XL" },
  ];

  // Get breadcrumb items
  const getBreadcrumbItems = () => {
    const items = [
      { label: "Home", href: "/" },
      { label: category.charAt(0).toUpperCase() + category.slice(1), href: `/category/${category}` },
    ];
    if (filter) {
      items.push({ label: filter.charAt(0).toUpperCase() + filter.slice(1), href: `/category/${category}/${filter}`, active: true });
    }
    return items;
  };
  
  return (
    <Layout>
      {/* Category Header */}
      <CategoryHeader 
        title={categoryInfo.title}
        description={categoryInfo.description}
        image={categoryInfo.image}
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <CategoryBreadcrumb items={getBreadcrumbItems()} />
        
        {/* Filters and Sort */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 my-6">
          <div className="flex items-center gap-2">
            <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>Filters</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[350px] overflow-y-auto">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Filters</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 px-2 text-muted-foreground"
                      onClick={() => { 
                        // Reset filters logic here
                      }}
                    >
                      Reset
                    </Button>
                  </div>
                  
                  {/* Price Range */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium mb-3">Price Range</h4>
                    <Slider
                      defaultValue={[0, 500]}
                      max={500}
                      step={10}
                      value={priceRange}
                      onValueChange={(value) => setPriceRange(value)}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                  
                  {/* Categories */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium mb-3">Categories</h4>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center gap-2">
                          <Checkbox id={`category-${category.id}`} />
                          <label
                            htmlFor={`category-${category.id}`}
                            className="text-sm flex items-center justify-between w-full"
                          >
                            <span>{category.name}</span>
                            <span className="text-muted-foreground">({category.count})</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Sizes */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium mb-3">Sizes</h4>
                    <div className="flex flex-wrap gap-2">
                      {sizes.map((size) => (
                        <Button
                          key={size.id}
                          variant="outline"
                          size="sm"
                          className="h-8 px-3 rounded-full"
                        >
                          {size.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Colors */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium mb-3">Colors</h4>
                    <div className="flex flex-wrap gap-2">
                      {['#000000', '#FFFFFF', '#C9B18C', '#A9C5AC', '#D4B59E', '#7D5151', '#6B5D4D'].map((color) => (
                        <button
                          key={color}
                          className="w-8 h-8 rounded-full border border-border overflow-hidden"
                          style={{ backgroundColor: color }}
                          aria-label={`Color ${color}`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mt-4"
                    onClick={() => setFiltersOpen(false)}
                  >
                    Apply Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            
            <div className="hidden md:flex border divide-x rounded-md overflow-hidden">
              <Button
                variant="ghost"
                size="sm"
                className={`h-9 rounded-none px-3 ${gridView ? 'bg-muted' : ''}`}
                onClick={() => setGridView(true)}
              >
                <GridIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`h-9 rounded-none px-3 ${!gridView ? 'bg-muted' : ''}`}
                onClick={() => setGridView(false)}
              >
                <ListIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <select 
              className="h-9 w-full md:w-auto rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              defaultValue="featured"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
        
        {/* Active Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Card className="bg-muted/50 border-0">
            <CardContent className="flex items-center gap-2 p-2 text-sm">
              <span>Price: $0 - $500</span>
              <Button variant="ghost" size="icon" className="h-5 w-5">
                <X className="h-3 w-3" />
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Product Grid */}
        <div className="py-4">
          <ProductGrid
            products={products}
            columns={gridView ? 4 : 2}
          />
        </div>
        
        {/* Load More */}
        <div className="flex justify-center mt-10">
          <Button variant="outline" className="px-8">
            Load More
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
