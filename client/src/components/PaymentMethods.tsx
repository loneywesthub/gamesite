import { CreditCard, Bitcoin, University, Shield, Lock, ShieldX } from "lucide-react";
import { SiVisa, SiMastercard, SiAmericanexpress, SiBitcoin, SiEthereum } from "react-icons/si";

export default function PaymentMethods() {
  return (
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-4">
            Secure Royal Payment Options
          </h3>
          <p className="text-gray-400 text-lg">
            Multiple payment methods for your convenience and security
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Credit Cards */}
          <div className="bg-gray-900 rounded-2xl p-8 text-center border border-purple-700">
            <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <CreditCard className="h-8 w-8 text-white" />
            </div>
            <h4 className="text-xl font-bold text-white mb-4">Credit & Debit Cards</h4>
            <p className="text-gray-400 mb-6">Visa, Mastercard, American Express, Discover</p>
            <div className="flex justify-center space-x-4">
              <SiVisa className="text-3xl text-blue-600" />
              <SiMastercard className="text-3xl text-red-600" />
              <SiAmericanexpress className="text-3xl text-blue-800" />
            </div>
          </div>

          {/* Cryptocurrency */}
          <div className="bg-gray-900 rounded-2xl p-8 text-center border border-purple-700">
            <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bitcoin className="h-8 w-8 text-purple-900" />
            </div>
            <h4 className="text-xl font-bold text-white mb-4">Cryptocurrency</h4>
            <p className="text-gray-400 mb-6">Bitcoin, Ethereum, Litecoin, and more</p>
            <div className="flex justify-center space-x-4">
              <SiBitcoin className="text-3xl text-orange-500" />
              <SiEthereum className="text-3xl text-gray-400" />
              <div className="text-3xl text-yellow-500">⟡</div>
            </div>
          </div>

          {/* Bank Transfer */}
          <div className="bg-gray-900 rounded-2xl p-8 text-center border border-purple-700">
            <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <University className="h-8 w-8 text-white" />
            </div>
            <h4 className="text-xl font-bold text-white mb-4">Bank Transfer</h4>
            <p className="text-gray-400 mb-6">Direct bank transfer and wire payments</p>
            <div className="flex justify-center space-x-4">
              <div className="text-3xl text-green-500">🏦</div>
              <div className="text-3xl text-blue-500">💳</div>
            </div>
          </div>
        </div>

        {/* Security Features */}
        <div className="mt-16 bg-gray-900 rounded-2xl p-8 max-w-4xl mx-auto">
          <h4 className="text-2xl font-bold text-center text-yellow-400 mb-8">
            Your Security is Our Priority
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h5 className="font-bold text-white mb-2">SSL Encryption</h5>
              <p className="text-gray-400">256-bit SSL encryption protects all transactions</p>
            </div>
            <div className="text-center">
              <Lock className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h5 className="font-bold text-white mb-2">PCI Compliant</h5>
              <p className="text-gray-400">Fully PCI DSS compliant payment processing</p>
            </div>
            <div className="text-center">
              <ShieldX className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h5 className="font-bold text-white mb-2">Fraud Protection</h5>
              <p className="text-gray-400">Advanced fraud detection and prevention</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
