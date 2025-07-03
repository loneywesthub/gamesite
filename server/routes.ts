import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertProductSchema, insertCartItemSchema, insertReviewSchema } from "@shared/schema";
import { z } from "zod";

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('STRIPE_SECRET_KEY not found. Payment functionality will not work.');
}

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-05-28.basil",
}) : null;

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Product routes
  app.get("/api/products", async (req, res) => {
    try {
      const { category, search } = req.query;
      let products;

      if (search) {
        products = await storage.searchProducts(search as string);
      } else if (category && category !== 'all') {
        products = await storage.getProductsByCategory(category as string);
      } else {
        products = await storage.getAllProducts();
      }

      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      const product = await storage.getProduct(productId);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Cart routes (protected)
  app.get("/api/cart", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const cartItems = await storage.getCartItems(userId);
      res.json(cartItems);
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ message: "Failed to fetch cart" });
    }
  });

  app.post("/api/cart", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const itemData = insertCartItemSchema.parse({
        ...req.body,
        userId,
      });

      const cartItem = await storage.addToCart(itemData);
      res.json(cartItem);
    } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).json({ message: "Failed to add to cart" });
    }
  });

  app.put("/api/cart/:id", isAuthenticated, async (req, res) => {
    try {
      const itemId = parseInt(req.params.id);
      const { quantity } = req.body;

      if (quantity <= 0) {
        await storage.removeFromCart(itemId);
        return res.json({ message: "Item removed from cart" });
      }

      const updatedItem = await storage.updateCartItem(itemId, quantity);
      res.json(updatedItem);
    } catch (error) {
      console.error("Error updating cart item:", error);
      res.status(500).json({ message: "Failed to update cart item" });
    }
  });

  app.delete("/api/cart/:id", isAuthenticated, async (req, res) => {
    try {
      const itemId = parseInt(req.params.id);
      await storage.removeFromCart(itemId);
      res.json({ message: "Item removed from cart" });
    } catch (error) {
      console.error("Error removing cart item:", error);
      res.status(500).json({ message: "Failed to remove cart item" });
    }
  });

  // Order routes (protected)
  app.get("/api/orders", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const orders = await storage.getOrders(userId);
      res.json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  // Review routes
  app.get("/api/products/:id/reviews", async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      const reviews = await storage.getProductReviews(productId);
      res.json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  app.post("/api/products/:id/reviews", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const productId = parseInt(req.params.id);
      
      const reviewData = insertReviewSchema.parse({
        ...req.body,
        userId,
        productId,
      });

      const review = await storage.createReview(reviewData);
      res.json(review);
    } catch (error) {
      console.error("Error creating review:", error);
      res.status(500).json({ message: "Failed to create review" });
    }
  });

  // Payment routes (protected)
  app.post("/api/create-payment-intent", isAuthenticated, async (req: any, res) => {
    if (!stripe) {
      return res.status(500).json({ message: "Payment processing not configured" });
    }

    try {
      const { amount } = req.body;
      const userId = req.user.claims.sub;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "usd",
        metadata: {
          userId,
        },
      });

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({ message: "Error creating payment intent: " + error.message });
    }
  });

  // Initialize products if none exist
  app.post("/api/admin/init-products", async (req, res) => {
    try {
      const existingProducts = await storage.getAllProducts();
      
      if (existingProducts.length === 0) {
        const sampleProducts = [
          // PS5 Games
          {
            name: "Spider-Man 2 - PS5",
            description: "The latest Spider-Man adventure with dual protagonists",
            price: "45.00",
            originalPrice: "69.99",
            category: "games",
            imageUrl: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
            rating: "5.0",
            reviewCount: 1247,
            inStock: true,
            isHot: true,
          },
          {
            name: "God of War Ragnarök - PS5",
            description: "Epic Norse mythology adventure continues",
            price: "42.00",
            originalPrice: "64.99",
            category: "games",
            imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
            rating: "5.0",
            reviewCount: 892,
            inStock: true,
            isHot: false,
          },
          {
            name: "Horizon Forbidden West - PS5",
            description: "Post-apocalyptic open world adventure",
            price: "38.00",
            originalPrice: "59.99",
            category: "games",
            imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
            rating: "4.8",
            reviewCount: 734,
            inStock: true,
            isHot: false,
          },
          {
            name: "Call of Duty: Modern Warfare III - PS5",
            description: "Latest COD with enhanced graphics and multiplayer",
            price: "49.00",
            originalPrice: "74.99",
            category: "games",
            imageUrl: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
            rating: "4.6",
            reviewCount: 567,
            inStock: true,
            isHot: true,
          },
          {
            name: "Gran Turismo 7 - PS5",
            description: "Ultimate racing simulation experience",
            price: "35.00",
            originalPrice: "54.99",
            category: "games",
            imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
            rating: "4.7",
            reviewCount: 423,
            inStock: true,
            isHot: false,
          },
          // PS4 Games
          {
            name: "The Last of Us Part II - PS4",
            description: "Post-apocalyptic survival masterpiece",
            price: "25.00",
            originalPrice: "39.99",
            category: "games",
            imageUrl: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
            rating: "4.9",
            reviewCount: 892,
            inStock: true,
            isHot: false,
          },
          {
            name: "Ghost of Tsushima Director's Cut - PS4",
            description: "Samurai adventure in feudal Japan",
            price: "32.00",
            originalPrice: "49.99",
            category: "games",
            imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
            rating: "4.8",
            reviewCount: 634,
            inStock: true,
            isHot: false,
          },
          {
            name: "Bloodborne Game of the Year - PS4",
            description: "Gothic horror action RPG",
            price: "22.00",
            originalPrice: "34.99",
            category: "games",
            imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
            rating: "4.7",
            reviewCount: 445,
            inStock: true,
            isHot: false,
          },
          // PS Vita Games
          {
            name: "Persona 4 Golden - PS Vita",
            description: "JRPG masterpiece with social simulation",
            price: "18.00",
            originalPrice: "29.99",
            category: "games",
            imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
            rating: "4.9",
            reviewCount: 312,
            inStock: true,
            isHot: false,
          },
          {
            name: "Uncharted: Golden Abyss - PS Vita",
            description: "Portable adventure with Nathan Drake",
            price: "15.00",
            originalPrice: "24.99",
            category: "games",
            imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
            rating: "4.5",
            reviewCount: 198,
            inStock: true,
            isHot: false,
          },
          // Game Disks/Accessories
          {
            name: "PlayStation 5 DualSense Controller",
            description: "Wireless controller with haptic feedback",
            price: "45.00",
            originalPrice: "69.99",
            category: "game-accessories",
            imageUrl: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
            rating: "4.8",
            reviewCount: 567,
            inStock: true,
            isHot: false,
          },
          {
            name: "SteelSeries Gaming Headset",
            description: "7.1 surround sound gaming headset",
            price: "85.00",
            originalPrice: "129.99",
            category: "game-accessories",
            imageUrl: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
            rating: "4.6",
            reviewCount: 423,
            inStock: true,
            isHot: false,
          },
          {
            name: "Razer Gaming Mouse Pad XL",
            description: "Extra large RGB gaming mouse pad",
            price: "28.00",
            originalPrice: "42.99",
            category: "game-accessories",
            imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
            rating: "4.4",
            reviewCount: 234,
            inStock: true,
            isHot: false,
          },
          // Gaming PCs
          {
            name: "Royal Gaming PC - RTX 4080",
            description: "Intel i9, RTX 4080, 32GB RAM, 2TB NVMe SSD",
            price: "2599.00",
            originalPrice: "3999.00",
            category: "pcs",
            imageUrl: "https://pixabay.com/get/gd9c02d26b4e527e72c84a07501724dde95a061ccb83d7096926fd60020431ecee408a5e9245619bc3f6e956d2ddc3105a9d471c0d32989d590bdd3bcaa6f60dc_1280.jpg",
            rating: "5.0",
            reviewCount: 156,
            inStock: true,
            isHot: true,
          },
          {
            name: "Alienware Aurora R15",
            description: "RTX 4070, Intel i7-13700KF, 16GB RAM, 1TB SSD",
            price: "1899.00",
            originalPrice: "2899.00",
            category: "pcs",
            imageUrl: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
            rating: "4.8",
            reviewCount: 234,
            inStock: true,
            isHot: false,
          },
          {
            name: "ASUS ROG Strix Gaming PC",
            description: "RTX 4060 Ti, AMD Ryzen 7, 16GB RAM, 1TB NVMe",
            price: "1299.00",
            originalPrice: "1999.00",
            category: "pcs",
            imageUrl: "https://images.unsplash.com/photo-1625842268584-8f3296236761?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
            rating: "4.7",
            reviewCount: 189,
            inStock: true,
            isHot: false,
          },
          {
            name: "Origin PC Gaming Beast",
            description: "RTX 4090, Intel i9-13900K, 64GB RAM, 4TB SSD",
            price: "4299.00",
            originalPrice: "6599.00",
            category: "pcs",
            imageUrl: "https://images.unsplash.com/photo-1540829917886-91ab031b1764?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
            rating: "5.0",
            reviewCount: 67,
            inStock: true,
            isHot: false,
          },
          // Apple Laptops
          {
            name: "MacBook Pro 16\" M3 Pro",
            description: "M3 Pro chip, 18GB RAM, 512GB SSD, Space Black",
            price: "1999.00",
            originalPrice: "2499.00",
            category: "laptops",
            imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
            rating: "4.9",
            reviewCount: 423,
            inStock: true,
            isHot: true,
          },
          {
            name: "MacBook Air 15\" M3",
            description: "M3 chip, 16GB RAM, 512GB SSD, Midnight",
            price: "1399.00",
            originalPrice: "1699.00",
            category: "laptops",
            imageUrl: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
            rating: "4.8",
            reviewCount: 567,
            inStock: true,
            isHot: false,
          },
          {
            name: "MacBook Pro 14\" M3 Max",
            description: "M3 Max chip, 36GB RAM, 1TB SSD, Silver",
            price: "3199.00",
            originalPrice: "3999.00",
            category: "laptops",
            imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
            rating: "5.0",
            reviewCount: 189,
            inStock: true,
            isHot: false,
          },
          // Alienware Laptops
          {
            name: "Alienware m18 R1",
            description: "RTX 4090, Intel i9-13980HX, 32GB RAM, 1TB SSD",
            price: "3499.00",
            originalPrice: "4999.00",
            category: "laptops",
            imageUrl: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
            rating: "4.8",
            reviewCount: 134,
            inStock: true,
            isHot: false,
          },
          {
            name: "Alienware x17 R2",
            description: "RTX 4080, Intel i7-13700HX, 16GB RAM, 512GB SSD",
            price: "2299.00",
            originalPrice: "3499.00",
            category: "laptops",
            imageUrl: "https://images.unsplash.com/photo-1525373612132-b3e820b57ba8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
            rating: "4.7",
            reviewCount: 98,
            inStock: true,
            isHot: false,
          },
          {
            name: "Alienware m16 R1",
            description: "RTX 4070, AMD Ryzen 9, 16GB RAM, 1TB SSD",
            price: "1899.00",
            originalPrice: "2799.00",
            category: "laptops",
            imageUrl: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
            rating: "4.6",
            reviewCount: 156,
            inStock: true,
            isHot: false,
          },
          // Electronics
          {
            name: "PlayStation 5 Console + Controller",
            description: "Latest PS5 with additional DualSense controller",
            price: "649.00",
            originalPrice: "999.00",
            category: "electronics",
            imageUrl: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
            rating: "5.0",
            reviewCount: 392,
            inStock: true,
            isHot: true,
          },
          {
            name: "27\" 4K Gaming Monitor",
            description: "144Hz refresh rate, G-Sync compatible, HDR support",
            price: "549.00",
            originalPrice: "845.00",
            category: "electronics",
            imageUrl: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
            rating: "4.5",
            reviewCount: 74,
            inStock: true,
            isHot: false,
          },
          {
            name: "Meta Quest 3 VR Headset",
            description: "Latest VR technology with hand tracking and 4K display",
            price: "429.00",
            originalPrice: "660.00",
            category: "electronics",
            imageUrl: "https://pixabay.com/get/g64c988f65c080a5492029b2d9d6de774ea82e34d3035737acdfae16d6465687d1857864fda4a97f4f5c303f728d9417bbfed8f1bfe82aec851d6baf9f385ada5_1280.jpg",
            rating: "4.5",
            reviewCount: 267,
            inStock: true,
            isHot: false,
          },
          // Entertainment
          {
            name: "4K Entertainment Center",
            description: "Complete home theater with 65\" 4K display and surround sound",
            price: "1899.00",
            originalPrice: "2920.00",
            category: "entertainment",
            imageUrl: "https://pixabay.com/get/g7ce0bff3f26a0a16ee45f0b328ce6c31da410b51d999c9baf37901f8da4041cbafd3c45e56b4f8d9f11524a069fa6f0b51ef227e144d871811b897e4d53401ad_1280.jpg",
            rating: "5.0",
            reviewCount: 203,
            inStock: true,
            isHot: false,
          },
          {
            name: "Royal Gaming Throne Chair",
            description: "Ergonomic design with premium leather and RGB lighting",
            price: "799.00",
            originalPrice: "1229.00",
            category: "entertainment",
            imageUrl: "https://images.unsplash.com/photo-1541558869434-2840d308329a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
            rating: "5.0",
            reviewCount: 145,
            inStock: true,
            isHot: false,
          },
        ];

        for (const product of sampleProducts) {
          await storage.createProduct(product);
        }
      }

      res.json({ message: "Products initialized" });
    } catch (error) {
      console.error("Error initializing products:", error);
      res.status(500).json({ message: "Failed to initialize products" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
