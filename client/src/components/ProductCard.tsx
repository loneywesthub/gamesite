import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Check } from "lucide-react";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  showAddToCart: boolean;
  onAddToCart: (productId: number) => void;
  isAddingToCart?: boolean;
}

export default function ProductCard({ 
  product, 
  showAddToCart, 
  onAddToCart, 
  isAddingToCart = false 
}: ProductCardProps) {
  const discountPercentage = product.originalPrice 
    ? Math.round(((parseFloat(product.originalPrice) - parseFloat(product.price)) / parseFloat(product.originalPrice)) * 100)
    : 0;

  const rating = product.rating ? parseFloat(product.rating) : 0;

  return (
    <Card className="bg-gray-800 rounded-2xl overflow-hidden card-hover border-gray-700">
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {discountPercentage > 0 && (
          <Badge className="absolute top-4 right-4 bg-red-500 text-white">
            -{discountPercentage}%
          </Badge>
        )}
        {product.isHot && (
          <Badge className="absolute top-4 left-4 bg-yellow-500 text-purple-900">
            Hot
          </Badge>
        )}
      </div>
      <CardContent className="p-6">
        <h4 className="text-xl font-bold text-yellow-400 mb-2">{product.name}</h4>
        <p className="text-gray-400 mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-white">${product.price}</span>
            {product.originalPrice && (
              <span className="text-gray-500 line-through ml-2">
                ${product.originalPrice}
              </span>
            )}
          </div>
          
          {rating > 0 && (
            <div className="flex items-center text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(rating) ? "fill-current" : "stroke-current"
                  }`}
                />
              ))}
              <span className="text-gray-400 ml-2 text-sm">
                ({product.reviewCount || 0})
              </span>
            </div>
          )}
        </div>

        {showAddToCart && (
          <Button
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-purple-900 py-3 rounded-xl font-semibold transition-colors disabled:opacity-50"
            onClick={() => onAddToCart(product.id)}
            disabled={isAddingToCart || !product.inStock}
          >
            {isAddingToCart ? (
              <div className="flex items-center">
                <div className="animate-spin w-4 h-4 border-2 border-purple-900 border-t-transparent rounded-full mr-2" />
                Adding...
              </div>
            ) : product.inStock ? (
              <div className="flex items-center">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </div>
            ) : (
              "Out of Stock"
            )}
          </Button>
        )}

        {!showAddToCart && (
          <Button
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-purple-900 py-3 rounded-xl font-semibold transition-colors"
            onClick={() => window.location.href = "/api/login"}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Sign In to Purchase
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
