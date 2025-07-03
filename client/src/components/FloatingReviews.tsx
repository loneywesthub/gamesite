import React, { useState, useEffect } from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { CustomerReview } from '@/lib/types';

const reviews: CustomerReview[] = [
  {
    name: "Alex Chen",
    rating: 5,
    comment: "Amazing gaming setup! The RTX 4080 PC runs everything at max settings. Fast shipping and excellent customer service.",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&h=32&q=80"
  },
  {
    name: "Sarah Johnson",
    rating: 5,
    comment: "Spider-Man 2 on PS5 is incredible! Graphics are mind-blowing. Received in perfect condition.",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&h=32&q=80"
  },
  {
    name: "Mike Rodriguez",
    rating: 5,
    comment: "MacBook Pro M3 Pro is a beast for game development. 35% off was an incredible deal!",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&h=32&q=80"
  },
  {
    name: "Emily Davis",
    rating: 5,
    comment: "Alienware laptop exceeded expectations. Perfect for streaming and gaming. Same-day delivery was amazing!",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&h=32&q=80"
  },
  {
    name: "Jordan Kim",
    rating: 5,
    comment: "God of War Ragnarök is absolutely stunning! Best price I found anywhere online.",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&h=32&q=80"
  },
  {
    name: "Lisa Wang",
    rating: 5,
    comment: "The gaming chair is so comfortable! RGB lighting adds the perfect ambiance to my setup.",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&h=32&q=80"
  },
  {
    name: "David Thompson",
    rating: 5,
    comment: "PS5 DualSense controller feels amazing! Haptic feedback is game-changing.",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&h=32&q=80"
  },
  {
    name: "Jessica Martinez",
    rating: 5,
    comment: "4K monitor is crystal clear! Perfect for both gaming and work. Great customer support.",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&h=32&q=80"
  },
  {
    name: "Ryan Park",
    rating: 5,
    comment: "Meta Quest 3 VR is incredible! Hand tracking works flawlessly. Best VR experience ever.",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&h=32&q=80"
  },
  {
    name: "Amanda Lee",
    rating: 5,
    comment: "Entertainment center transformed my living room! 65\" 4K display is massive and beautiful.",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&h=32&q=80"
  },
  {
    name: "Carlos Gonzalez",
    rating: 5,
    comment: "Horizon Forbidden West looks amazing! Combat system is so smooth on PS5.",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&h=32&q=80"
  },
  {
    name: "Rachel Brown",
    rating: 5,
    comment: "Gaming headset sound quality is phenomenal! Comfortable for long gaming sessions.",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&h=32&q=80"
  },
  {
    name: "Kevin Liu",
    rating: 5,
    comment: "ASUS ROG PC performance is outstanding! Runs all latest games at ultra settings.",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&h=32&q=80"
  },
  {
    name: "Sophia Taylor",
    rating: 5,
    comment: "MacBook Air M3 is perfect for creative work! Battery life is incredible, sleek design.",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&h=32&q=80"
  },
  {
    name: "Marcus Wilson",
    rating: 5,
    comment: "Call of Duty MW3 graphics are insane! Multiplayer runs perfectly smooth.",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&h=32&q=80"
  },
  {
    name: "Nicole Zhang",
    rating: 5,
    comment: "Razer mouse pad feels premium! RGB lighting syncs perfectly with my setup.",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&h=32&q=80"
  },
  {
    name: "Tyler Adams",
    rating: 5,
    comment: "Origin PC is a monster! RTX 4090 handles everything I throw at it.",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&h=32&q=80"
  },
  {
    name: "Hannah White",
    rating: 5,
    comment: "The Last of Us Part II still gives me chills! Emotional storytelling at its finest.",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&h=32&q=80"
  },
  {
    name: "Brandon Scott",
    rating: 5,
    comment: "Ghost of Tsushima Director's Cut is breathtaking! Art direction is phenomenal.",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&h=32&q=80"
  },
  {
    name: "Olivia Green",
    rating: 5,
    comment: "Persona 4 Golden on Vita is a masterpiece! Perfect for portable gaming.",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&h=32&q=80"
  },
  {
    name: "Justin Clark",
    rating: 5,
    comment: "Uncharted Golden Abyss brings console quality to handheld! Amazing adventure.",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&h=32&q=80"
  },
  {
    name: "Maya Patel",
    rating: 5,
    comment: "Bloodborne GOTY edition is challenging but rewarding! Gothic atmosphere is perfect.",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&h=32&q=80"
  },
  {
    name: "Connor Davis",
    rating: 5,
    comment: "Gran Turismo 7 racing feels so realistic! Best driving simulator ever made.",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&h=32&q=80"
  },
  {
    name: "Zoe Miller",
    rating: 5,
    comment: "Alienware m18 laptop is a powerhouse! Perfect for streaming and content creation.",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&h=32&q=80"
  },
  {
    name: "Ethan Rodriguez",
    rating: 5,
    comment: "MacBook Pro M3 Max handles video editing like a dream! Professional quality performance.",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&h=32&q=80"
  },
  {
    name: "Grace Chen",
    rating: 5,
    comment: "Alienware x17 cooling system is excellent! Stays quiet even under heavy load.",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&h=32&q=80"
  },
  {
    name: "Noah Johnson",
    rating: 5,
    comment: "Alienware m16 has the perfect balance of power and portability! Great build quality.",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&h=32&q=80"
  },
  {
    name: "Ava Wilson",
    rating: 5,
    comment: "PlayStation 5 console + extra controller was exactly what I needed! Fast delivery.",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&h=32&q=80"
  },
  {
    name: "Logan Martinez",
    rating: 5,
    comment: "Gaming Palace has the best prices! 35% off deal saved me hundreds of dollars.",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&h=32&q=80"
  },
  {
    name: "Chloe Anderson",
    rating: 5,
    comment: "Same-day shipping is incredible! Received my gaming setup the same day I ordered.",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&h=32&q=80"
  },
  {
    name: "Mason Lee",
    rating: 5,
    comment: "48-hour warranty gave me peace of mind! Professional installation service too.",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&h=32&q=80"
  }
];

// Generate random timestamps for reviews (from 5 minutes to 6 hours ago)
const generateTimestamp = (index: number) => {
  const minutesAgo = Math.floor(Math.random() * 360) + 5; // 5 minutes to 6 hours
  const date = new Date(Date.now() - minutesAgo * 60 * 1000);
  
  if (minutesAgo < 60) {
    return `${minutesAgo} minutes ago`;
  } else {
    const hoursAgo = Math.floor(minutesAgo / 60);
    return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
  }
};

interface FloatingReviewsProps {
  isVisible: boolean;
}

export default function FloatingReviews({ isVisible }: FloatingReviewsProps) {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
        setIsAnimating(false);
      }, 300);
    }, 4000); // Change review every 4 seconds

    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  const currentReview = reviews[currentReviewIndex];

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm">
      <div
        className={`bg-gray-800 border border-purple-700 rounded-lg p-4 shadow-xl transition-all duration-300 ${
          isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="flex items-start gap-3">
          <img
            src={currentReview.avatar}
            alt={currentReview.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-white font-semibold text-sm">{currentReview.name}</h4>
              {currentReview.isVerified && (
                <CheckCircle className="h-4 w-4 text-green-500" />
              )}
            </div>
            
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < currentReview.rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-400'
                  }`}
                />
              ))}
            </div>
            
            <p className="text-gray-300 text-xs leading-relaxed mb-2">
              "{currentReview.comment}"
            </p>
            
            <p className="text-gray-500 text-xs">
              {generateTimestamp(currentReviewIndex)}
            </p>
          </div>
        </div>
        
        <div className="mt-3 pt-2 border-t border-gray-700">
          <p className="text-purple-400 text-xs font-medium">
            ⭐ Verified Purchase at The Gaming Palace
          </p>
        </div>
      </div>
    </div>
  );
}