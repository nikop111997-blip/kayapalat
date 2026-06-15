
export default function IBW() {

  return (
    <section className="w-full px-4 md:px-8 py-20 font-sans bg-gray-50/50">
      <div className="max-w-[1700px] mx-auto">
        
        {/* NEW HEADER LAYOUT */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-16 mb-16">
          
          {/* Left Column: Badge & Heading */}
          <div className="flex-1 max-w-2xl">
            {/* Testimonials Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white shadow-sm border border-gray-100 mb-6">
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span className="text-sm font-semibold text-gray-800 tracking-wide">Testimonials</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-[48px] font-bold text-gray-900 tracking-tight leading-[1.1]">
              Idol Body Weight <br className="hidden md:block" /> Achiever
            </h2>
          </div>

          {/* Right Column: Paragraph & Button */}
          <div className="flex-1 max-w-xl lg:pl-8">
            <p className="text-gray-800 text-lg leading-relaxed mb-4">
              Kayapalat has helped individuals across the globe enhance their health performance and achieve their wellness goals.
            </p>
            <button className="bg-[#000000] hover:bg-[#262627] text-white font-semibold py-3.5 px-8 rounded-xl shadow-lg shadow-gray-500/30 transition-all duration-300 hover:-translate-y-1">
              Get Started Now
            </button>
          </div>
        </div>

        {/* VIDEO GRID (Uniform on Mobile, Expanding on Desktop) */}
        {/* <div className="flex flex-col md:flex-row justify-center w-full items-stretch gap-6 h-auto md:h-[600px]">
         
        </div> */}
        
      </div>
    </section>
  );
}