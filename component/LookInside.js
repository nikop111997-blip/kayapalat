
import { Clock, Target, Heart } from 'lucide-react';

export default function LookInside() {
  return (
    <section id="inside" className="py-32 bg-[#003460] text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#ff6a3d] opacity-5 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center relative z-10">
        <div>
          <span className="text-[#ffc23d] font-bold text-sm tracking-widest uppercase mb-4 block">Inside The Pages</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">Your daily blueprint for success.</h2>

          <div className="space-y-10">
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-[#ffffff] rounded-md flex items-center justify-center flex-shrink-0 border border-gray-800">
                <Clock className="w-6 h-6 text-[#003460]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Master Your Schedule</h3>
                <p className="text-gray-400">Detailed 6 AM to 9 PM time-blocking ensures you control your day. Stop reacting and start executing your master plan.</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-12 h-12 bg-[#ffffff] rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-800">
                <Target className="w-6 h-6 text-[#003460]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Top 3 Priorities</h3>
                <p className="text-gray-400">Cut through the noise. Define your top 3 non-negotiable tasks before the day starts to guarantee meaningful progress.</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-12 h-12 bg-[#ffffff] rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-800">
                <Heart className="w-6 h-6 text-[#003460]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Daily Review & Gratitude</h3>
                <p className="text-gray-400">End your day with powerful reflection. Ask 'What went well?' and 'What could I do better?' alongside practicing gratitude.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Simulated Open Journal UI */}
        <div className="relative bg-[#fafafa] rounded-lg p-2 md:p-4 shadow-2xl flex border-4 border-[#0a0a0a] transform rotate-[2deg]">
          {/* Center Spine */}
          <div className="absolute top-0 bottom-0 left-1/2 -ml-[2px] w-[4px] bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 shadow-inner z-10"></div>

          {/* Left Page */}
          <div className="flex-1 bg-white p-6 md:p-10 text-[#1a1a1a] shadow-inner rounded-l shadow-gray-200">
            <h4 className="text-xs font-bold tracking-widest text-gray-400 mb-8 uppercase">Daily Plan</h4>
            <div className="mb-8">
              <p className="text-xs font-bold mb-3">MY TOP 3 PRIORITIES</p>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex gap-3 items-end border-b border-gray-200 pb-1">
                    <span className="text-gray-400 text-sm">{i}.</span>
                    <div className="flex-1"></div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold mb-3">SCHEDULE</p>
              <div className="space-y-4">
                {['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'].map(time => (
                  <div key={time} className="flex gap-4 items-center">
                    <span className="text-gray-400 text-xs w-10">{time}</span>
                    <div className="flex-1 border-b border-gray-200 border-dotted h-4"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Page */}
          <div className="flex-1 bg-[#fcfcfc] p-6 md:p-10 text-[#1a1a1a] shadow-inner rounded-r shadow-gray-200 relative">
            <h4 className="text-xs font-bold tracking-widest text-gray-400 mb-8 uppercase text-right">Daily Review</h4>
            <div className="space-y-6 mb-10">
              <div>
                <p className="text-xs text-gray-500 mb-2">What went well today?</p>
                <div className="border-b border-gray-200 h-6"></div>
                <div className="border-b border-gray-200 h-6"></div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-2">What could I have done better?</p>
                <div className="border-b border-gray-200 h-6"></div>
                <div className="border-b border-gray-200 h-6"></div>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold mb-3">GRATITUDE</p>
              <p className="text-xs text-gray-500 italic mb-2">I am grateful for...</p>
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex gap-3 items-end border-b border-gray-200 pb-1">
                    <span className="text-gray-400 text-sm">{i}.</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute bottom-6 right-6 text-right">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">Kayapalat</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}