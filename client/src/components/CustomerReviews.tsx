import { Star } from "lucide-react";
import type { CustomerReview } from "@/lib/types";

export default function CustomerReviews() {
  const reviews: CustomerReview[] = [
    {
      name: "Marcus Chen",
      rating: 5,
      comment: "Absolutely amazing service! Got my PS5 bundle same day and everything was perfectly packaged. The Gaming Palace truly lives up to its royal reputation!",
      isVerified: true,
      avatar: "M"
    },
    {
      name: "Sarah Rodriguez", 
      rating: 5,
      comment: "The gaming PC I ordered exceeded all expectations. Top-tier components, amazing RGB setup, and runs every game flawlessly. Worth every penny!",
      isVerified: true,
      avatar: "S"
    },
    {
      name: "Alex Thompson",
      rating: 5,
      comment: "Customer service is incredible! Had an issue with my order and they resolved it immediately. The 48-hour warranty gave me complete peace of mind.",
      isVerified: true,
      avatar: "A"
    },
    {
      name: "Emily Chen",
      rating: 5,
      comment: "Fast shipping and great prices! The 35% discount saved me hundreds on my gaming setup. Crypto payment was seamless too!",
      isVerified: true,
      avatar: "E"
    },
    {
      name: "David Kim",
      rating: 5,
      comment: "Outstanding quality! My Meta Quest 3 arrived in perfect condition. Same-day shipping is a game changer for urgent gaming needs.",
      isVerified: true,
      avatar: "D"
    },
    {
      name: "Jessica Wright",
      rating: 5,
      comment: "The 4K entertainment center transformed my living room into a gaming paradise. Installation guide was super helpful!",
      isVerified: true,
      avatar: "J"
    },
    {
      name: "Michael Torres",
      rating: 5,
      comment: "Best gaming store online! Bank transfer was secure and easy. The warranty service is exceptional - truly royal treatment!",
      isVerified: true,
      avatar: "M"
    },
    {
      name: "Amanda Foster",
      rating: 5,
      comment: "Incredible gaming peripherals set! RGB lighting is stunning and the mechanical keyboard feels amazing. Worth every dollar!",
      isVerified: true,
      avatar: "A"
    },
    {
      name: "Ryan Martinez",
      rating: 5,
      comment: "The gaming chair is pure luxury! Ergonomic design keeps me comfortable during long gaming sessions. Highly recommend!",
      isVerified: true,
      avatar: "R"
    },
    {
      name: "Sophie Anderson",
      rating: 5,
      comment: "PS5 console bundle was exactly what I needed! Extra controller included and everything works perfectly. Fast delivery too!",
      isVerified: true,
      avatar: "S"
    },
    {
      name: "Jake Wilson",
      rating: 5,
      comment: "Gaming monitor quality is incredible! 144Hz refresh rate makes every game buttery smooth. Color accuracy is spot on!",
      isVerified: true,
      avatar: "J"
    },
    {
      name: "Lisa Thompson",
      rating: 5,
      comment: "Customer support helped me choose the perfect gaming PC. Build quality is amazing and performance exceeds expectations!",
      isVerified: true,
      avatar: "L"
    },
    {
      name: "Carlos Rodriguez",
      rating: 5,
      comment: "Crypto payment option made purchasing so convenient! Fast confirmation and same-day shipping. The Gaming Palace rocks!",
      isVerified: true,
      avatar: "C"
    },
    {
      name: "Maya Patel",
      rating: 5,
      comment: "Electronics bundle deal was fantastic! Everything arrived perfectly packaged with clear setup instructions. Great value!",
      isVerified: true,
      avatar: "M"
    },
    {
      name: "Connor Davis",
      rating: 5,
      comment: "RTX 4080 gaming PC is a beast! Runs every game at max settings flawlessly. Build quality and cable management are top-tier!",
      isVerified: true,
      avatar: "C"
    },
    {
      name: "Rachel Green",
      rating: 5,
      comment: "Home entertainment system setup was seamless! 65-inch 4K display with surround sound creates an amazing experience!",
      isVerified: true,
      avatar: "R"
    },
    {
      name: "Brandon Lee",
      rating: 5,
      comment: "Bank-to-bank transfer was secure and straightforward. Product quality exceeded expectations with royal packaging!",
      isVerified: true,
      avatar: "B"
    },
    {
      name: "Nicole Johnson",
      rating: 5,
      comment: "VR headset quality is incredible! Hand tracking works perfectly and 4K display is crystal clear. Gaming has never been better!",
      isVerified: true,
      avatar: "N"
    },
    {
      name: "Tyler Brown",
      rating: 5,
      comment: "Gaming accessories bundle was perfect for my setup! Everything matches and quality is premium. Fast shipping was a bonus!",
      isVerified: true,
      avatar: "T"
    },
    {
      name: "Samantha Clark",
      rating: 5,
      comment: "The 48-hour warranty gave me confidence in my purchase. When I had questions, support was quick and professional!",
      isVerified: true,
      avatar: "S"
    },
    {
      name: "Jordan White",
      rating: 5,
      comment: "Credit card payment was secure and processing was instant! Gaming PC arrived next day in perfect condition!",
      isVerified: true,
      avatar: "J"
    },
    {
      name: "Ashley Miller",
      rating: 5,
      comment: "Premium gaming peripherals exceeded expectations! Build quality is solid and RGB customization options are endless!",
      isVerified: true,
      avatar: "A"
    },
    {
      name: "Kevin Garcia",
      rating: 5,
      comment: "Entertainment center installation was smooth! Picture quality is amazing and sound system creates immersive gaming!",
      isVerified: true,
      avatar: "K"
    },
    {
      name: "Megan Taylor",
      rating: 5,
      comment: "Shopping experience was royal from start to finish! Product quality, shipping speed, and customer service are all exceptional!",
      isVerified: true,
      avatar: "M"
    },
    {
      name: "Austin Moore",
      rating: 5,
      comment: "Gaming throne chair is incredibly comfortable! Perfect for long gaming sessions and the RGB lighting adds great ambiance!",
      isVerified: true,
      avatar: "A"
    },
    {
      name: "Victoria Adams",
      rating: 5,
      comment: "PS5 games bundle was an amazing deal! All titles are premium AAA games and saved me hundreds compared to buying separately!",
      isVerified: true,
      avatar: "V"
    },
    {
      name: "Nathan Cooper",
      rating: 5,
      comment: "The Gaming Palace delivers on every promise! Quality products, fast shipping, secure payments, and royal customer service!",
      isVerified: true,
      avatar: "N"
    },
    {
      name: "Isabella Santos",
      rating: 5,
      comment: "Gaming monitor's 4K resolution and G-Sync compatibility make every game look stunning! Color accuracy is professional-grade!",
      isVerified: true,
      avatar: "I"
    },
    {
      name: "Ethan Murphy",
      rating: 5,
      comment: "Same-day shipping saved my gaming tournament! Product arrived perfectly packaged and setup was effortless. Highly recommend!",
      isVerified: true,
      avatar: "E"
    },
    {
      name: "Grace Liu",
      rating: 5,
      comment: "Multiple payment options made purchasing easy! Bank transfer was secure and customer service kept me updated throughout!",
      isVerified: true,
      avatar: "G"
    },
    {
      name: "Lucas Rivera",
      rating: 5,
      comment: "Gaming PC build quality is exceptional! Cable management, component selection, and performance testing all exceeded expectations!",
      isVerified: true,
      avatar: "L"
    },
    {
      name: "Chloe Bennett",
      rating: 5,
      comment: "Royal treatment from The Gaming Palace! Premium packaging, fast delivery, and excellent warranty support. Gaming royalty indeed!",
      isVerified: true,
      avatar: "C"
    }
  ];

  const stats = {
    totalCustomers: "15,000+",
    totalReviews: "31",
    averageRating: "4.9",
    deliveryTime: "24h"
  };

  // Show random 3 reviews for display
  const displayReviews = reviews.sort(() => 0.5 - Math.random()).slice(0, 3);

  return (
    <section className="py-16 gaming-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-4">
            What Our Royal Customers Say
          </h3>
          <p className="text-gray-300 text-lg">
            Join thousands of satisfied gamers who trust The Gaming Palace
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {displayReviews.map((review, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500"
            >
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating ? "fill-current" : "stroke-current"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-300 mb-4">{review.comment}</p>
              <div className="flex items-center">
                <div className="bg-yellow-500 w-10 h-10 rounded-full flex items-center justify-center text-purple-900 font-bold mr-3">
                  {review.avatar}
                </div>
                <div>
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-sm text-gray-400">
                    {review.isVerified ? "Verified Purchase" : "Customer"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Customer Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-400 mb-2">
              {stats.totalCustomers}
            </div>
            <p className="text-gray-300">Happy Customers</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-400 mb-2">
              {stats.totalReviews}
            </div>
            <p className="text-gray-300">5-Star Reviews</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-400 mb-2">
              {stats.averageRating}
            </div>
            <p className="text-gray-300">Average Rating</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-400 mb-2">
              {stats.deliveryTime}
            </div>
            <p className="text-gray-300">Delivery Time</p>
          </div>
        </div>
      </div>
    </section>
  );
}
