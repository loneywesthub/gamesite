export interface CartItemWithProduct {
  id: number;
  userId: string;
  productId: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: {
    id: number;
    name: string;
    description: string;
    price: string;
    originalPrice: string | null;
    category: string;
    imageUrl: string;
    rating: string | null;
    reviewCount: number | null;
    inStock: boolean | null;
    isHot: boolean | null;
    createdAt: string;
    updatedAt: string;
  };
}

export interface CustomerReview {
  name: string;
  rating: number;
  comment: string;
  isVerified: boolean;
  avatar: string;
}
