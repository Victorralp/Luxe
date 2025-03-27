import { Link } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  description?: string;
  is_bestseller?: boolean;
  category?: string;
  created_at?: string;
  updated_at?: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/products/${product.id}`} className="group">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        <img
          src={product.image_url}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">
        ${product.price}
      </p>
      {product.description && (
        <p className="mt-2 text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>
      )}
      {product.category && (
        <p className="mt-2 text-sm text-indigo-600">
          {product.category}
        </p>
      )}
    </Link>
  );
}
