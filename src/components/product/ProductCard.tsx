
import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, ShoppingBag, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    images: string[];
    colors: string[];
    category: string;
    isNew?: boolean;
    isBestSeller?: boolean;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [hoveredImage, setHoveredImage] = useState(0);
  const [isWishlist, setIsWishlist] = useState(false);
  
  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlist(!isWishlist);
    toast(isWishlist ? "Removed from wishlist" : "Added to wishlist", {
      description: product.name,
      action: {
        label: "View",
        onClick: () => console.log("View wishlist clicked"),
      },
    });
  };

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast("Added to cart", {
      description: product.name,
      action: {
        label: "View Cart",
        onClick: () => console.log("View cart clicked"),
      },
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="group product-card animate-fade-in">
      {/* Image wrapper */}
      <div className="relative overflow-hidden aspect-[3/4] rounded-md mb-3">
        <Link 
          to={`/product/${product.id}`} 
          className="block w-full h-full"
          onMouseEnter={() => product.images.length > 1 && setHoveredImage(1)}
          onMouseLeave={() => setHoveredImage(0)}
        >
          <img
            src={product.images[hoveredImage]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Labels */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <span className="px-2 py-1 text-xs font-medium bg-gold/90 text-black rounded-sm">
                New
              </span>
            )}
            {product.isBestSeller && (
              <span className="px-2 py-1 text-xs font-medium bg-background/90 backdrop-blur-sm text-foreground rounded-sm">
                Best Seller
              </span>
            )}
            {product.originalPrice && (
              <span className="px-2 py-1 text-xs font-medium bg-destructive/90 text-destructive-foreground rounded-sm">
                Sale
              </span>
            )}
          </div>

          {/* Wishlist button */}
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80"
            onClick={toggleWishlist}
            aria-label={isWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`h-4 w-4 ${isWishlist ? 'fill-destructive text-destructive' : ''}`} />
          </Button>

          {/* Quick shop actions */}
          <div className="absolute bottom-0 left-0 w-full p-2 flex gap-2 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <Button 
              variant="secondary"
              size="sm"
              className="flex-1 bg-background/80 backdrop-blur-sm text-foreground text-xs h-9 rounded-md" 
              asChild
            >
              <Link to={`/product/${product.id}`}>
                <Eye className="h-4 w-4 mr-1" />
                Quick View
              </Link>
            </Button>
            <Button 
              variant="default"
              size="sm"
              className="flex-1 bg-foreground/90 text-background text-xs h-9 rounded-md" 
              onClick={addToCart}
            >
              <ShoppingBag className="h-4 w-4 mr-1" />
              Add to Cart
            </Button>
          </div>
        </Link>
      </div>

      {/* Product info */}
      <div className="px-1">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-medium text-base line-clamp-1 hover:text-foreground/80 transition-colors">{product.name}</h3>
          <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
          <div className="flex items-center gap-2">
            <span className="font-medium">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </Link>

        {/* Color variants */}
        {product.colors.length > 0 && (
          <div className="flex gap-1 mt-2">
            {product.colors.map((color, index) => (
              <button
                key={index}
                className="w-4 h-4 rounded-full border border-border overflow-hidden"
                style={{ backgroundColor: color }}
                aria-label={`Color option ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
