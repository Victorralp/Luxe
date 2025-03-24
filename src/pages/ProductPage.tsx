
import { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Share, ShoppingBag, Star, Truck, RotateCw, Check, ChevronRight } from "lucide-react";
import ProductGrid from "@/components/product/ProductGrid";
import CategoryBreadcrumb from "@/components/category/CategoryBreadcrumb";

// Sample data - in a real app, this would come from an API
const product = {
  id: "w1",
  name: "Silk Wrap Dress",
  description: "Elevate your wardrobe with our signature silk wrap dress. Crafted from 100% mulberry silk, this elegant piece drapes beautifully and features a flattering wrap design that accentuates your silhouette. Perfect for both formal occasions and casual-elegant settings.",
  price: 189,
  originalPrice: 249,
  images: [
    "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    "https://images.unsplash.com/photo-1551489628-9f3208fccf73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1335&q=80",
    "https://images.unsplash.com/photo-1539781010210-8931bcd6599c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
  ],
  colors: [
    { name: "Ivory", value: "#F8F4E3" },
    { name: "Black", value: "#212121" },
    { name: "Mauve", value: "#D6CAC1" }
  ],
  sizes: ["XS", "S", "M", "L", "XL"],
  features: [
    "100% Mulberry Silk",
    "Adjustable wrap design",
    "Side pockets",
    "Lined bodice",
    "Dry clean only"
  ],
  stock: 5,
  rating: 4.8,
  reviews: 124,
  category: "Dresses",
  tags: ["silk", "wrap", "elegant", "formal", "dress"],
  isNew: true,
  sku: "WD-SLK-001",
  shippingTime: "2-4 business days"
};

const relatedProducts = [
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
];

const reviews = [
  {
    id: 1,
    name: "Emma L.",
    rating: 5,
    date: "October 15, 2023",
    comment: "Absolutely love this dress! The silk quality is exceptional, and it drapes beautifully. I've received so many compliments wearing it to an evening event.",
    avatar: "https://i.pravatar.cc/150?img=32"
  },
  {
    id: 2,
    name: "Sarah J.",
    rating: 4,
    date: "September 28, 2023",
    comment: "Great dress, excellent quality. Taking one star off because it wrinkles easily, but that's the nature of silk.",
    avatar: "https://i.pravatar.cc/150?img=47"
  },
  {
    id: 3,
    name: "Laura T.",
    rating: 5,
    date: "August 12, 2023",
    comment: "Perfect fit and stunning color. The wrap style is very flattering and adjustable for different body types.",
    avatar: "https://i.pravatar.cc/150?img=23"
  }
];

const ProductPage = () => {
  const { productId } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0].value);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]); // Default to medium
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };
  
  const handleAddToCart = () => {
    console.log("Added to cart:", {
      product,
      color: selectedColor,
      size: selectedSize,
      quantity
    });
    // Add to cart logic here
  };
  
  const toggleWishlist = () => {
    setIsWishlist(!isWishlist);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <CategoryBreadcrumb 
          items={[
            { label: "Home", href: "/" },
            { label: "Women", href: "/category/women" },
            { label: "Dresses", href: "/category/women/dresses" },
            { label: product.name, href: `/product/${product.id}`, active: true },
          ]}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-[3/4] overflow-hidden rounded-lg bg-muted">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`aspect-square rounded-md overflow-hidden border-2 ${
                    selectedImage === index ? 'border-foreground' : 'border-transparent'
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} - View ${index + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Details */}
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium px-2 py-1 bg-gold/10 text-gold-dark rounded-sm">
                  {product.isNew ? 'New Arrival' : 'Best Seller'}
                </span>
                <span className="text-sm text-muted-foreground">
                  SKU: {product.sku}
                </span>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-display font-medium mb-2">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) 
                          ? 'text-gold fill-gold' 
                          : i < product.rating 
                            ? 'text-gold fill-gold/50' 
                            : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>
              
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-2xl font-medium">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-sm font-medium px-2 py-1 bg-destructive/10 text-destructive rounded-sm">
                    Save {Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </span>
                )}
              </div>
              
              <p className="text-muted-foreground mb-6">
                {product.description}
              </p>
              
              <div className="space-y-6 mb-6">
                {/* Color Selection */}
                <div>
                  <h3 className="text-sm font-medium mb-3">
                    Color: <span className="text-muted-foreground font-normal">
                      {product.colors.find(c => c.value === selectedColor)?.name}
                    </span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.value}
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          selectedColor === color.value
                            ? 'ring-2 ring-foreground ring-offset-2'
                            : 'ring-1 ring-border'
                        }`}
                        style={{ backgroundColor: color.value }}
                        onClick={() => setSelectedColor(color.value)}
                        aria-label={`Select color: ${color.name}`}
                      >
                        {selectedColor === color.value && (
                          <Check className="h-4 w-4 text-white drop-shadow-sm" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Size Selection */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium">
                      Size: <span className="text-muted-foreground font-normal">{selectedSize}</span>
                    </h3>
                    <button className="text-sm text-muted-foreground underline underline-offset-4">
                      Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        className={`h-10 min-w-[40px] px-3 rounded-md border ${
                          selectedSize === size
                            ? 'bg-foreground text-background border-foreground'
                            : 'bg-background text-foreground border-border hover:border-foreground'
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Quantity */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Quantity</h3>
                  <div className="flex items-center">
                    <button
                      className="h-10 w-10 flex items-center justify-center border border-r-0 rounded-l-md"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                      className="h-10 w-14 border-y text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                      className="h-10 w-10 flex items-center justify-center border border-l-0 rounded-r-md"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                    
                    <div className="ml-4">
                      <span className="text-sm text-muted-foreground">
                        Only <span className="text-destructive font-medium">{product.stock}</span> left in stock
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Button 
                  className="flex-1 h-12 bg-foreground text-background hover:bg-foreground/90"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 h-12"
                  onClick={toggleWishlist}
                >
                  <Heart className={`mr-2 h-5 w-5 ${isWishlist ? 'fill-destructive text-destructive' : ''}`} />
                  {isWishlist ? 'Added to Wishlist' : 'Add to Wishlist'}
                </Button>
              </div>
              
              {/* Shipping Information */}
              <div className="space-y-3 border-t border-b py-4 mb-6">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Free Shipping</p>
                    <p className="text-xs text-muted-foreground">
                      Estimated delivery: {product.shippingTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCw className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Free Returns</p>
                    <p className="text-xs text-muted-foreground">
                      Within 30 days for unworn items
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Share */}
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <Share className="h-4 w-4" />
                </Button>
                <span className="text-sm">Share this product</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Details, Features, and Reviews */}
        <div className="mt-12">
          <Tabs defaultValue="details">
            <TabsList className="w-full sm:w-auto border-b rounded-none justify-start">
              <TabsTrigger value="details" className="rounded-none">Details</TabsTrigger>
              <TabsTrigger value="features" className="rounded-none">Features</TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-none">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="pt-6">
              <div className="max-w-3xl space-y-4">
                <p>Our signature silk wrap dress is the epitome of elegance and versatility. Crafted from 100% mulberry silk, this luxurious piece features a classic wrap design that flatters all body types.</p>
                <p>The adjustable waist tie creates a customizable fit, while the flowing skirt moves beautifully with every step. Side pockets add practicality without compromising on style, and the lined bodice ensures comfort and opacity.</p>
                <p>This timeless piece transitions effortlessly from day to night - pair with flats for a sophisticated daytime look, or dress up with heels and statement jewelry for evening events.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <div>
                    <h4 className="font-medium mb-2">Product Care</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>Dry clean only</li>
                      <li>Cool iron if needed</li>
                      <li>Do not bleach</li>
                      <li>Store on padded hanger</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Composition</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>Main: 100% Mulberry Silk</li>
                      <li>Lining: 100% Polyester</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="features" className="pt-6">
              <div className="max-w-3xl">
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-foreground mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="pt-6">
              <div className="max-w-3xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-medium">{product.rating}</span>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating) 
                              ? 'text-gold fill-gold' 
                              : i < product.rating 
                                ? 'text-gold fill-gold/50' 
                                : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Based on {product.reviews} reviews
                    </span>
                  </div>
                  <Button>Write a Review</Button>
                </div>
                
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <Card key={review.id} className="bg-muted/30">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <img 
                            src={review.avatar} 
                            alt={review.name}
                            className="h-10 w-10 rounded-full"
                          />
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                              <div>
                                <h4 className="font-medium">{review.name}</h4>
                                <div className="flex items-center gap-2 mt-1 mb-2">
                                  <div className="flex">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-4 w-4 ${
                                          i < review.rating 
                                            ? 'text-gold fill-gold' 
                                            : 'text-muted-foreground'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-xs text-muted-foreground">
                                    {review.date}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <p className="text-sm">{review.comment}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <Button variant="outline" className="w-full">
                    Load More Reviews
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related Products */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-medium">You May Also Like</h2>
            <Button variant="ghost" className="hidden sm:flex items-center">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <ProductGrid products={relatedProducts} columns={4} />
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
