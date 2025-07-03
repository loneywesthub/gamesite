import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import type { CartItemWithProduct } from "@/lib/types";

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItemWithProduct[];
}

export default function ShoppingCart({ isOpen, onClose, cartItems = [] }: ShoppingCartProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateCartMutation = useMutation({
    mutationFn: ({ id, quantity }: { id: number; quantity: number }) =>
      apiRequest("PUT", `/api/cart/${id}`, { quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update cart item",
        variant: "destructive",
      });
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/cart/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Item Removed",
        description: "Item removed from cart",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove item",
        variant: "destructive",
      });
    },
  });

  const updateQuantity = (id: number, currentQuantity: number, delta: number) => {
    const newQuantity = currentQuantity + delta;
    if (newQuantity <= 0) {
      removeItemMutation.mutate(id);
    } else {
      updateCartMutation.mutate({ id, quantity: newQuantity });
    }
  };

  const total = (cartItems || []).reduce((sum, item) => {
    return sum + (parseFloat(item.product.price) * item.quantity);
  }, 0);

  const totalItems = (cartItems || []).reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="bg-gray-900 border-purple-700 text-white w-full sm:max-w-lg">
        <SheetHeader className="border-b border-gray-700 pb-4">
          <SheetTitle className="text-yellow-400 flex items-center">
            <ShoppingBag className="h-5 w-5 mr-2" />
            Shopping Cart
            {totalItems > 0 && (
              <Badge className="ml-2 bg-yellow-500 text-purple-900">
                {totalItems}
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {!cartItems || cartItems.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-center">
              <div>
                <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-gray-500" />
                <p className="text-lg font-semibold mb-2">Your cart is empty</p>
                <p className="text-gray-400 mb-4">Add some royal gaming gear to get started!</p>
                <Button 
                  className="bg-yellow-500 hover:bg-yellow-600 text-purple-900"
                  onClick={onClose}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto py-4">
                <div className="space-y-4">
                  {(cartItems || []).map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm truncate">{item.product.name}</h4>
                        <p className="text-yellow-400 font-bold">${item.product.price}</p>
                        {item.product.originalPrice && (
                          <p className="text-gray-500 line-through text-sm">
                            ${item.product.originalPrice}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 border-gray-600"
                          onClick={() => updateQuantity(item.id, item.quantity, -1)}
                          disabled={updateCartMutation.isPending}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-semibold w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 border-gray-600"
                          onClick={() => updateQuantity(item.id, item.quantity, 1)}
                          disabled={updateCartMutation.isPending}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
                          onClick={() => removeItemMutation.mutate(item.id)}
                          disabled={removeItemMutation.isPending}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cart Summary */}
              <div className="border-t border-gray-700 pt-4 space-y-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-yellow-400">${total.toFixed(2)}</span>
                </div>
                
                <Link href="/checkout">
                  <Button 
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-purple-900 font-bold py-3"
                    onClick={onClose}
                  >
                    Proceed to Checkout
                  </Button>
                </Link>
                
                <Button 
                  variant="outline" 
                  className="w-full border-gray-600 hover:bg-gray-800"
                  onClick={onClose}
                >
                  Continue Shopping
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
