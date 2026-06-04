import React from 'react';
import BookingComponent from './BookingComponent';
import Link from 'next/link';

export default function PricingPlans() {
  const plans = [
    {
      title: 'Pro',
      link: "/pro-plan",
      badge: {
        text: 'Recommended',
        type: 'primary',
      },
      idealFor: 'Beginners, homemakers, new moms, busy professionals, and anyone ready to take control of their health without stepping out of the home.',
      primaryAction: 'Request A Call Back',
      secondaryAction: 'Request A Call Back',
      features: [
        '12 Live FIT Hours every month',
        '12 easy-to-follow structured WODs',
        'Daily Live Coaching (Mon-Sat)',
        'Personal Coach Support',
        'Weekly Reviews & Clarity Calls',
        'Access to KP Community',
        'Nutrition Support',
      ],
    },
    {
      title: 'Elite',
      link: "/elite-plan",
      badge: {
        text: 'Limited seats only',
        type: 'secondary',
      },
      idealFor: 'Highly placed individuals with demanding schedules who want privacy, personalised coaching, and structured accountability for complete makeover.',
      primaryAction: 'Request A Call Back',
      secondaryAction: 'Request A Call Back',
      features: [
        'Everything in Pro plan',
        '1:1 Coaching (Thrice Weekly)',
        'Personalised Nutrition Kit',
        'Advance Support from Master Coach',
        'Access to Preferred Member Training',
        'Priority Support for Progress',
        'Retreat with 6-month Commitment',
      ],
    },
    {
      title: 'Platinum',
      link: "/platinum-plan",
      badge: {
        text: 'Limited seats only',
        type: 'secondary',
      },
      idealFor: 'Members committed to becoming their healthiest, fittest, most confident selves with deeper support, exclusive benefits, and lasting results.',
      primaryAction: 'Request A Call Back',
      secondaryAction: 'Request A Call Back',
      features: [
        'All Pro plan benefits for 6 months',
        'FREE Kayapalat Wellness Retreat',
        'Free Family Wellness Consultation and access to events',
        'Priority Response from your Coach',
        'Master coach support for goals',
        'Exclusive Platinum Member Merchandise',
      ],
    },
  ];

  return (
    <section className="bg-[#F8F9FA] py-16 px-4 md:px-8 font-manrope">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 tracking-tight">
            Pricing & Plans
          </h2>
          <p className="text-[#151515] text-[16px] md:text-[18px] font-medium leading-relaxed">
            Kayapalat offers flexible programs designed for your lifestyle and goals. Choose the plan that resonates with you, and we'll take care of the rest.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => {
            // Highlighting the 3rd card based on the reference image
            const isHighlighted = index === 1; 

            return (
              <div 
                key={index}
                className={`rounded-[24px] p-8 flex flex-col h-full transition-transform duration-300 hover:-translate-y-1 ${
                  isHighlighted 
                    ? 'bg-gradient-to-b from-[#f9cf01] to-white shadow-sm' 
                    : 'bg-white shadow-[0_4px_24px_rgba(0,0,0,0.03)]'
                }`}
              >
                {/* Top Pill / Badge */}
                <div className="mb-5">
                  <span 
                    className={`inline-block px-5 py-2 rounded-full text-[15px] font-semibold tracking-wide ${
                      isHighlighted 
                        ? 'bg-white text-black shadow-sm' 
                        : 'bg-[#f9cf01] text-black' // Purple pill matching the image
                    }`}
                  >
                    {plan.title}
                  </span>
                </div>

                {/* Ideal For Text */}
                <p className={`text-[18px] leading-relaxed mb-8 min-h-[90px] ${isHighlighted ? 'text-[#1b1b1b]' : 'text-[#1c1d1d]'}`}>
                  {plan.idealFor}
                </p>

                {/* Divider Line */}
                <hr className={`border-t-2 mb-8 ${isHighlighted ? 'border-[#f9cf01]/60' : 'border-[#F3F4F6]'}`} />

                {/* Features List */}
                <ul className="flex flex-col gap-4 mb-10 flex-grow">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <svg 
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isHighlighted ? 'text-black' : 'text-black'}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        strokeWidth="2.5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[15px] text-gray-800 font-medium leading-snug">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Contrasting Action Buttons */}
                <div className="flex flex-col gap-3 mt-auto">
                  {/* Primary Action Button */}
                 

                  {/* Know More Button (Navigates to details page) */}
                  <Link 
                    href={plan.link} 
                    className={`w-full py-3.5 rounded-[12px] border border-gray-100 font-semibold text-[16px] text-center transition-all duration-200 bg-white text-black hover:bg-gray-50 shadow-sm
                    }`}
                  >
                    Know More
                  </Link>
 <button 
                    className={`w-full py-3.5 rounded-[12px] font-semibold text-[16px] transition-all duration-200 flex justify-center items-center
                      bg-[#080808] text-white hover:bg-black' // Dark button for gradient card
                        
                    }`}
                  >
                    {plan.primaryAction}
                  </button>
                  {/* NOTE: You can swap the primary action button above with your BookingComponent if needed, e.g.: */}
                  {/* <BookingComponent pricing={true} /> */}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}