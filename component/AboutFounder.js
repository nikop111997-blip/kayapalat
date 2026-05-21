import Image from 'next/image';
import BookingComponent from './Booking2Comp';

export default function AboutFounder({landing=false}) {
  return (
    <section className="bg-[#F8F7F4] py-8 px-4 md:px-8 font-manrope text-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left Column - Text Content */}
        <div className="flex-1 space-y-6">
          {/* Top Pill Label */}
          <div className="inline-block px-5 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600 shadow-sm">
            About the Founder
          </div>
          
          {/* Heading */}
          <h2 className="text-4xl md:text-[48px] font-bold leading-tight tracking-[-3px]">
            Meet your <span className="text-[#FFCE00]">Wellness</span> and <br/>
            <span className="text-[#FFCE00]">Transformation</span> coach!
          </h2>
          
          {/* Body Paragraphs */}
          <div className="space-y-2 text-[15px] sm:text-[16px] font-bold text-gray-500 leading-relaxed">
            <p className='font-bold text-gray-700'>
              <strong>Ajay Sethi</strong> is a transformation specialist, wellness coach, and founder of Kayapalat Wellness, with over 30 years of experience in health, fitness, running and lifestyle coaching.
            </p>
            <p>
              An MBA from XLRI Jamshedpur and a former professional basketball player, Ajay has personally trained more than <strong className='font-bold text-gray-700'>40,000 people</strong> and mentored <strong className='font-bold text-gray-700'>1,000+ coaches</strong>, including doctors, dieticians, physiotherapists, yoga trainers, and fitness professionals.
            </p>
            <p>
              Known as India's <strong className='font-bold text-gray-700'>Fitness Lifestyle Coach</strong>, Ajay has helped clients lose up to <strong className='font-bold text-gray-700'>65+ kilos of weight</strong>, break <strong className='font-bold text-gray-700'>50K and 100K course records</strong>, and even run <strong className='font-bold text-gray-700'>200+ km in 24 hours</strong>. His students have won bodybuilding competitions and beauty pageants, proving that transformation can look different for everyone, but the foundation is always the same: sustainable results.
            </p>
            <p>
              Today, through Kayapalat, Ajay leads a thriving global community across <strong className='font-bold text-gray-700'>418 cities</strong> and <strong className='font-bold text-gray-700'>18+ countries</strong>, with members collectively losing over <strong className='font-bold text-gray-700'>65,000 kilos</strong> in just 51 months.
            </p>
            <p className="italic font-medium text-gray-700">
              An incurable optimist, Ajay believes: "If you focus on getting better at something, you actually get better." This philosophy powers the Kayapalat Method, aligning the body, mind, and emotions to create lasting change.
            </p>
          </div>

          {/* Signature Area */}
          <div className="pt-6">
            <div className="mb-2">
              <Image
                src="https://framerusercontent.com/images/mr1uWi4Fuq6yzrxrlGmsI0UVCs.png?scale-down-to=512&width=574&height=330"
                alt="Ajay's Signature"
                width={150}
                height={50}
                className="object-contain drop-shadow-md"
              />
            </div>
            <div className="font-bold text-lg">Ajay Singh Sethi</div>
            <div className="text-sm text-gray-500 font-medium">
              Wellness Coach, Exercise<br/>and Movement Specialist
            </div>
          </div>
        </div>

        {/* Right Column - Image & CSS Yellow Circle */}
        <div className="flex-1 relative w-full max-w-lg mx-auto mt-12 lg:mt-0 flex justify-center items-center h-[500px]">
          
          {/* CSS Yellow Circle Background */}
          <div className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] bg-[#F2C94C] rounded-full z-0 top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          
          {/* Transparent PNG Person Image */}
          <div className="relative z-10 w-full h-full flex justify-center items-end">
            <img 
              src="https://framerusercontent.com/images/VaJVz7sLas8kHWe1d2ITuHvrA.png?width=429&height=607" 
              alt="Ajay Singh Sethi" 
              className="object-contain max-h-[480px] drop-shadow-xl"
            />
          </div>

          {/* Floating Badge 1: Left Side */}
          {/* CHANGED: top-[65%] on mobile, sm:top-1/2 on larger screens */}
          <div className="absolute z-20 left-0 sm:-left-10 top-[65%] sm:top-1/2 -translate-y-1/2 bg-white px-5 py-2.5 rounded-full shadow-lg border border-gray-100 flex items-center text-sm font-semibold text-gray-800">
            50+ Global Clients
          </div>
          
          {/* Floating Badge 2: Right Side Bottom */}
          {/* CHANGED: bottom-6 on mobile, sm:bottom-1/4 on larger screens */}
          <div className="absolute z-20 right-0 sm:-right-6 bottom-6 sm:bottom-1/4 bg-white px-5 py-2.5 rounded-full shadow-lg border border-gray-100 flex items-center text-sm font-semibold text-gray-800">
            12 Industry Sectors
          </div>

          {/* Floating Badge 3: Right Side Top */}
          {/* CHANGED: top-[45%] on mobile, sm:top-1/3 on larger screens. Adjusted translation as well */}
          <div className="absolute z-20 right-0 sm:right-4 top-[55%] sm:top-1/3 -translate-y-5 sm:-translate-y-10 bg-white p-2 rounded-full shadow-lg border border-gray-100 flex items-center gap-3">
             {/* Tiny Avatar Placeholders */}
             <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white overflow-hidden">
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white overflow-hidden">
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" alt="avatar" />
                </div>
             </div>
             <div className="text-[11px] leading-tight font-semibold pr-3 text-gray-800">
                2.5M+ Daily<br/>
                <span className="text-gray-500 font-normal">Users impacted</span>
             </div>
          </div>

        </div>
        
      </div>
      {landing && <div className='flex justify-center items-center mt-8'>
          <BookingComponent />
          </div>}
    </section>
  );
}