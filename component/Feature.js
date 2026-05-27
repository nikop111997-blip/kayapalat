import React from 'react';
import { Target, CheckCircle2, TrendingUp, Zap } from 'lucide-react';

export default function Features() {
  const featuresList = [
    { icon: Target, title: "Clarity", desc: "Define what matters and stay focused on your true north." },
    { icon: CheckCircle2, title: "Discipline", desc: "Track your habits and stay consistent every single day." },
    { icon: TrendingUp, title: "Growth", desc: "Reflect, improve and become your absolute best self." },
    { icon: Zap, title: "Impact", desc: "Small daily actions designed to create powerful transformation." },
  ];

  return (
    <section id="features" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <span className="text-[#003460] font-bold text-sm tracking-widest uppercase">The Framework</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1a1a1a]">Engineered for high performance.</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">A structured approach to ensure you don't just plan, but execute with precision and reflect with clarity.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresList.map((feature, idx) => (
            <div key={idx} className="bg-gray-50 p-8 rounded-lg border border-gray-100 hover:shadow-xl hover:border-[#003460]/20 transition-all group">
              <div className="w-14 h-14 bg-white shadow-sm rounded-md flex items-center justify-center mb-6 group-hover:bg-[#003460] group-hover:-translate-y-1 transition-all duration-300">
                <feature.icon className="w-6 h-6 text-[#1a1a1a] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-800 leading-relaxed text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}