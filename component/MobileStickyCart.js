import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { BUNDLES } from '@/lib/data';

export default function MobileStickyCart({ isScrolled, openCartWithBundle }) {
  return (
    <div className={`md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40 transition-transform duration-300 ${isScrolled ? 'translate-y-0' : 'translate-y-full'}`}>
      <button
        onClick={() => openCartWithBundle(BUNDLES[0])}
        className="w-full bg-[#1a1a1a] text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2 shadow-lg"
      >
        Buy Now - ₹1499 <ShoppingCart className="w-4 h-4" />
      </button>
    </div>
  );
}