import { Crown } from "lucide-react";
import { SiFacebook, SiX, SiInstagram, SiDiscord } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="gaming-gradient py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-yellow-500 p-2 rounded-lg">
                <Crown className="h-6 w-6 text-purple-900" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-yellow-400">The Gaming Palace</h1>
                <p className="text-sm text-gray-300">Level Up Your Gaming Experience</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Your premier destination for the finest gaming products. We're committed to providing 
              royal treatment to every gamer with premium products, fast delivery, and exceptional service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-purple-700 hover:bg-purple-600 p-3 rounded-lg transition-colors">
                <SiFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-purple-700 hover:bg-purple-600 p-3 rounded-lg transition-colors">
                <SiX className="h-5 w-5" />
              </a>
              <a href="#" className="bg-purple-700 hover:bg-purple-600 p-3 rounded-lg transition-colors">
                <SiInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-purple-700 hover:bg-purple-600 p-3 rounded-lg transition-colors">
                <SiDiscord className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold text-yellow-400 mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">PS5 Games</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">Gaming Electronics</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">Gaming PCs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">Entertainment Systems</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">Order Tracking</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-xl font-bold text-yellow-400 mb-6">Customer Service</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">48h Warranty</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-purple-700 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 The Gaming Palace. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
}
