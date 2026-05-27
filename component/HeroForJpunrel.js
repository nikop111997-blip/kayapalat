
import { Star, ArrowRight, Shield, Award, Truck } from 'lucide-react';
import { BUNDLES } from '@/lib/data';
import KayapalatJournal from './SideWays';

export default function Hero({ openCartWithBundle }) {
  return (
    <section className="px-6 pt-32 pb-12 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center min-h-[90vh]">
      <div className="space-y-8 relative z-10">
       
        <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-[1.1]">
          Build Discipline,
          Stay Consistent,<br />
          <span className="text-[#003460] relative">
            Transform Daily.
            <svg className="absolute w-full h-3 -bottom-1 left-0 text-blue-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
            </svg>
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-800 leading-relaxed max-w-lg">
          The KP Journal is your powerful daily companion designed by wellness coach <strong>Ajay Sethi</strong> to help you plan better, focus deeper, and elevate everyday.
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
          <button
            onClick={() => openCartWithBundle(BUNDLES[0])}
            className="group bg-[#1a1a1a] hover:bg-[#003460] text-white px-8 py-2 rounded-lg font-medium text-lg flex items-center gap-2 transition-all shadow-xl hover:shadow-[#003460]/30 hover:-translate-y-1 w-full sm:w-auto justify-between"
          >
            Buy the Journal 
            <div className="bg-[#ffffff] rounded-md relative overflow-hidden flex items-center justify-center w-10 h-10">
  <ArrowRight className="w-5 h-5 text-[#1a1a1a] absolute transition-transform duration-300 ease-in-out group-hover:translate-x-[150%]" />
  
  
  <ArrowRight className="w-5 h-5 text-[#1a1a1a] absolute -translate-x-[150%] transition-transform duration-300 ease-in-out group-hover:translate-x-0" />
</div>
          </button>
          <a href="#bundles" className="text-gray-500 hover:text-[#1a1a1a] font-medium px-4 py-4 w-full sm:w-auto text-center flex items-center justify-center gap-2 transition-colors">
            View Bundles
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 items-center gap-6 pt-8 text-md font-medium text-gray-800 border-t border-gray-200">
          <span className="flex items-center gap-2">   <Star className="w-4 h-4 text-[#003460]" />10,000+ copies sold</span>
          <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-[#003460]" /> Premium Hardcover</span>
          <span className="flex items-center gap-2"><Award className="w-4 h-4 text-[#003460]" /> Real Life Results</span>
          <span className="flex items-center gap-2"><Truck className="w-4 h-4 text-[#003460]" /> Free Shipping</span>
        </div>
      </div>

      {/* Hero Visual */}
    <KayapalatJournal />
    </section>
  );
}