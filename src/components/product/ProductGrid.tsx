
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  colors: string[];
  category: string;
  isNew?: boolean;
  isBestSeller?: boolean;
}

interface ProductGridProps {
  title?: string;
  subtitle?: string;
  products: Product[];
  isLoading?: boolean;
  columns?: 2 | 3 | 4;
}

const ProductGrid = ({ 
  title, 
  subtitle,
  products, 
  isLoading = false,
  columns = 4
}: ProductGridProps) => {
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const columnsClass = columns === 2 
    ? "grid-cols-1 sm:grid-cols-2" 
    : columns === 3
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  // Staggered animation for the products grid
  useEffect(() => {
    if (!isLoading && products.length > 0) {
      const timeout = setTimeout(() => {
        setVisibleProducts(products);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [isLoading, products]);

  return (
    <div className="w-full">
      {/* Optional title and subtitle */}
      {(title || subtitle) && (
        <div className="text-center mb-8">
          {title && <h2 className="text-2xl md:text-3xl font-display font-medium mb-2">{title}</h2>}
          {subtitle && <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
        </div>
      )}

      {/* Products grid */}
      <div className={`grid ${columnsClass} gap-x-4 gap-y-8`}>
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="product-card animate-pulse">
                <Skeleton className="aspect-[3/4] w-full rounded-md mb-3" />
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            ))
          : visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
};

export default ProductGrid;
