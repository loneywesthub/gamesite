import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Crown, Menu, ShoppingCart, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "wouter";

interface HeaderProps {
  cartItemCount?: number;
  onCartClick?: () => void;
  onCategoryClick?: (category: string) => void;
}

export default function Header({ cartItemCount = 0, onCartClick, onCategoryClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const navigation = [
    { name: "Games", category: "games" },
    { name: "Electronics", category: "electronics" },
    { name: "PCs", category: "pcs" },
    { name: "Laptops", category: "laptops" },
    { name: "Entertainment", category: "entertainment" },
  ];

  return (
    <header className="gaming-gradient shadow-2xl sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="bg-yellow-500 p-2 rounded-lg">
                <Crown className="h-6 w-6 text-purple-900" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-yellow-400">The Gaming Palace</h1>
                <p className="text-xs text-gray-300">Level Up Your Gaming Experience</p>
              </div>
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden bg-purple-700 hover:bg-purple-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => onCategoryClick?.(item.category)}
                className="hover:text-yellow-400 transition-colors"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Cart & User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-purple-700 hover:bg-purple-600 p-3 rounded-lg transition-colors relative"
                  onClick={onCartClick}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-yellow-500 text-purple-900 text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                      {cartItemCount}
                    </span>
                  )}
                </Button>
              </div>
            )}

            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-yellow-400" />
                  <span className="text-sm">
                    {user?.firstName || user?.email?.split('@')[0] || 'User'}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-gray-700 hover:bg-gray-600"
                  onClick={() => window.location.href = "/api/logout"}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button
                className="bg-yellow-500 hover:bg-yellow-600 text-purple-900 px-6 py-3 rounded-lg font-semibold transition-colors"
                onClick={() => window.location.href = "/api/login"}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => onCategoryClick?.(item.category)}
                className="block py-2 hover:text-yellow-400 transition-colors text-left w-full"
              >
                {item.name}
              </button>
            ))}
            <div className="flex items-center space-x-4 pt-4">
              {isAuthenticated && (
                <Button
                  variant="ghost"
                  className="bg-purple-700 p-3 rounded-lg flex-1"
                  onClick={onCartClick}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart ({cartItemCount})
                </Button>
              )}
              {isAuthenticated ? (
                <Button
                  variant="ghost"
                  className="bg-gray-700 p-3 rounded-lg flex-1 font-semibold"
                  onClick={() => window.location.href = "/api/logout"}
                >
                  Sign Out
                </Button>
              ) : (
                <Button
                  className="bg-yellow-500 text-purple-900 p-3 rounded-lg flex-1 font-semibold"
                  onClick={() => window.location.href = "/api/login"}
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
