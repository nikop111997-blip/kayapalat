import React from 'react';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/data';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-[#1a1a1a] mb-4">Real Life Results</h2>
          <p className="text-gray-500">Join thousands of high performers transforming their lives.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-gray-50 p-8 rounded-lg border border-gray-100">
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-5 h-5 fill-[#ffd700] text-[#ffd700]" />)}
              </div>
              <p className="text-gray-700 italic mb-8 relative">
                <Quote className="absolute -top-4 -left-2 w-8 h-8 text-gray-200 -z-10 transform rotate-180" />
                "{t.text}"
              </p>
              <div className="flex items-center gap-4 border-t border-gray-200 pt-6">
                <div className="w-10 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center text-white font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#1a1a1a]">{t.name}</h4>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}