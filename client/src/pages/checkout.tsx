import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { Link } from "wouter";
import type { CartItemWithProduct } from "@/lib/types";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  console.warn('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = import.meta.env.VITE_STRIPE_PUBLIC_KEY ? 
  loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY) : null;

const CheckoutForm = ({ total }: { total: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) {
      setIsProcessing(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin,
      },
    });

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Payment Successful",
        description: "Thank you for your purchase!",
      });
      // Clear cart after successful payment
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    }
    setIsProcessing(false);
  };

  return (
    <Card className="bg-gray-800 border-purple-700">
      <CardHeader>
        <CardTitle className="text-yellow-400">Payment Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <PaymentElement className="text-white" />
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total:</span>
              <span className="text-yellow-400">${total.toFixed(2)}</span>
            </div>
          </div>
          <Button 
            type="submit" 
            disabled={!stripe || isProcessing}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-purple-900 font-bold py-3"
          >
            {isProcessing ? "Processing..." : `Pay $${total.toFixed(2)}`}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

function CheckoutContent() {
  const [clientSecret, setClientSecret] = useState("");
  const { toast } = useToast();

  const { data: cartItems = [], isLoading } = useQuery({
    queryKey: ["/api/cart"],
  });

  const total = (cartItems || []).reduce((sum: number, item: CartItemWithProduct) => {
    return sum + (parseFloat(item.product.price) * item.quantity);
  }, 0);

  useEffect(() => {
    if (total > 0) {
      // Create PaymentIntent when cart has items
      apiRequest("POST", "/api/create-payment-intent", { amount: total })
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret);
        })
        .catch((error) => {
          toast({
            title: "Error",
            description: "Failed to initialize payment",
            variant: "destructive",
          });
        });
    }
  }, [total, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Header onCategoryClick={() => {}} />
        <div className="container mx-auto px-4 py-16">
          <Card className="bg-gray-800 border-purple-700 max-w-md mx-auto">
            <CardContent className="pt-6 text-center">
              <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-gray-500" />
              <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
              <p className="text-gray-400 mb-6">Add some items to your cart before checking out.</p>
              <Link href="/">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-purple-900">
                  Continue Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header onCategoryClick={() => {}} />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="text-yellow-400 hover:text-yellow-300">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Shop
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card className="bg-gray-800 border-purple-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cartItems.map((item: CartItemWithProduct) => (
                  <div key={item.id} className="flex items-center space-x-4 pb-4 border-b border-gray-700">
                    <img 
                      src={item.product.imageUrl} 
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.product.name}</h4>
                      <p className="text-gray-400">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${(parseFloat(item.product.price) * item.quantity).toFixed(2)}</p>
                      {item.product.originalPrice && (
                        <p className="text-sm text-gray-500 line-through">
                          ${(parseFloat(item.product.originalPrice) * item.quantity).toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                
                <div className="pt-4 border-t border-gray-600">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-yellow-400">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          {stripePromise && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm total={total} />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Checkout() {
  return <CheckoutContent />;
}
