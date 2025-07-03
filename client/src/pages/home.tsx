import { useState, useEffect } from "react";
import Header from "@/components/Header";
import CustomerReviews from "@/components/CustomerReviews";
import PaymentMethods from "@/components/PaymentMethods";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ShoppingCart from "@/components/ShoppingCart";
import FloatingReviews from "@/components/FloatingReviews";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Crown, Search, Forward, ShieldHalf } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { Product } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["/api/products", { category: selectedCategory, search: searchQuery }],
    queryFn: () => {
      const params = new URLSearchParams();
      if (selectedCategory !== "all") params.append("category", selectedCategory);
      if (searchQuery) params.append("search", searchQuery);
      return fetch(`/api/products?${params.toString()}`).then(res => res.json());
    },
  });

  const { data: cartItems = [] } = useQuery({
    queryKey: ["/api/cart"],
  });

  const addToCartMutation = useMutation({
    mutationFn: (data: { productId: number; quantity: number }) =>
      apiRequest("POST", "/api/cart", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Added to Cart",
        description: "Item successfully added to your cart!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    },
  });

  // Initialize products on first load
  useEffect(() => {
    const initializeProducts = async () => {
      try {
        await apiRequest("POST", "/api/admin/init-products", {});
        queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      } catch (error) {
        console.error("Failed to initialize products:", error);
      }
    };

    if (products.length === 0 && !isLoading) {
      initializeProducts();
    }
  }, [products.length, isLoading, queryClient]);

  const handleAddToCart = (productId: number) => {
    addToCartMutation.mutate({ productId, quantity: 1 });
  };

  const categories = [
    { id: "all", label: "All Products" },
    { id: "games", label: "Games" },
    { id: "electronics", label: "Electronics" },
    { id: "pcs", label: "Gaming PCs" },
    { id: "laptops", label: "Laptops" },
    { id: "entertainment", label: "Entertainment" },
    { id: "game-accessories", label: "Accessories" },
  ];

  const cartItemCount = cartItems.reduce((total: number, item: any) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header 
        cartItemCount={cartItemCount} 
        onCartClick={() => setIsCartOpen(true)}
        onCategoryClick={(category) => setSelectedCategory(category)}
      />
      
      {/* Hero Section */}
      <section className="gaming-gradient py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">
              Welcome to Your Gaming Kingdom
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Discover the ultimate collection of games, electronics, and entertainment systems. 
              Rule your gaming experience with royal treatment.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Input 
                  type="text" 
                  placeholder="Search for games, electronics, and more..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/10 backdrop-blur-sm border border-purple-500 rounded-2xl py-4 px-6 pr-16 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                />
                <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-500 hover:bg-yellow-600 text-purple-900 p-3 rounded-xl transition-colors">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Special Offer Banner */}
            <div className="bg-yellow-500 text-purple-900 rounded-2xl p-6 pulse-glow">
              <div className="flex items-center justify-center space-x-3">
                <Crown className="h-6 w-6" />
                <span className="text-xl font-bold">Royal Sale: 35% OFF + Same Day Shipping + 48h Warranty</span>
                <Crown className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Catalog */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-4">Royal Gaming Collection</h3>
            <p className="text-gray-400 text-lg">Curated selection of premium gaming products fit for royalty</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "secondary"}
                className={selectedCategory === category.id 
                  ? "bg-yellow-500 text-purple-900 hover:bg-yellow-600" 
                  : "bg-purple-700 hover:bg-purple-600"
                }
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
              </Button>
            ))}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-2xl p-6 animate-pulse">
                  <div className="bg-gray-700 h-48 rounded-lg mb-4"></div>
                  <div className="bg-gray-700 h-6 rounded mb-2"></div>
                  <div className="bg-gray-700 h-4 rounded mb-4"></div>
                  <div className="bg-gray-700 h-10 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product: Product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  showAddToCart={true}
                  onAddToCart={handleAddToCart}
                  isAddingToCart={addToCartMutation.isPending}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <CustomerReviews />
      <PaymentMethods />
      
      {/* Royal Guarantee */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="bg-yellow-500 text-purple-900 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex items-center justify-center space-x-3">
                <Forward className="h-8 w-8" />
                <span className="text-xl font-bold">Same Day Shipping</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <ShieldHalf className="h-8 w-8" />
                <span className="text-xl font-bold">48-Hour Warranty</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Crown className="h-8 w-8" />
                <span className="text-xl font-bold">Royal Treatment Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Shopping Cart */}
      <ShoppingCart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
      />

      {/* Floating Cart Button */}
      <div className="fixed right-4 bottom-4 z-50">
        <Button 
          className="bg-yellow-500 hover:bg-yellow-600 text-purple-900 p-4 rounded-full shadow-2xl pulse-glow transition-colors relative"
          onClick={() => setIsCartOpen(true)}
        >
          <ShoppingCart className="h-6 w-6" />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center font-bold">
              {cartItemCount}
            </span>
          )}
        </Button>
      </div>
      
      <FloatingReviews isVisible={!isCartOpen} />
    </div>
  );
}
