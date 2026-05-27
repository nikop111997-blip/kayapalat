import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { BUNDLES } from '@/lib/data';

export default function Pricing({ openCartWithBundle }) {
  return (
    <section id="bundles" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#003460] font-bold text-sm tracking-widest uppercase">Pricing</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1a1a1a] mt-2 mb-4">Choose your commitment.</h2>
          <p className="text-gray-500 text-lg">Invest in your discipline today. Ships free anywhere in India.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {BUNDLES.map((bundle) => (
            <div
              key={bundle.id}
              className={`relative bg-white rounded-lg p-8 md:p-10 border-2 transition-all cursor-pointer ${bundle.popular ? 'border-[#003460] shadow-2xl shadow-[#003460]/10 transform md:-translate-y-4' : 'border-gray-100 shadow-lg hover:border-gray-300'}`}
              onClick={() => openCartWithBundle(bundle)}
            >
              {bundle.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#003460] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-[#1a1a1a] mb-1">{bundle.name}</h3>
                  <p className="text-gray-500 text-sm">{bundle.desc}</p>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-[#1a1a1a]">₹{bundle.price}</span>
                  <span className="text-lg text-gray-400 line-through">₹{bundle.originalPrice}</span>
                </div>
                {bundle.savings && <p className="text-green-600 font-bold text-sm mt-2">{bundle.savings}</p>}
              </div>

              <ul className="space-y-4 mb-8">
                {['Premium Hardcover Binding', 'Undated 90-Day Layout', 'Daily & Weekly Reviews', 'Free Shipping in India'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2 className="w-5 h-5 text-[#003460]" /> {feature}
                  </li>
                ))}
                {bundle.popular && (
                  <li className="flex items-center gap-3 text-sm font-bold text-[#1a1a1a]">
                    <CheckCircle2 className="w-5 h-5 text-[#003460]" /> Full Year Supply (4 Books)
                  </li>
                )}
              </ul>

              <button
                className={`w-full py-4 rounded-md font-bold transition-colors ${bundle.popular ? 'bg-[#003460] hover:bg-[#003460] text-white shadow-lg shadow-[#003460]/30' : 'bg-[#1a1a1a] hover:bg-black text-white'}`}
              >
                Select {bundle.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}