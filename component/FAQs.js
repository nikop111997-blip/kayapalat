import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQS } from '@/lib/data';

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section id="faq" className="py-24 ">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-[#1a1a1a] mb-4">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300">
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-center font-bold text-[#1a1a1a]"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                {faq.question}
                {openFaq === i ? <ChevronUp className="w-5 h-5 text-[#ff6a3d]" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </button>
              <div className={`px-6 overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}