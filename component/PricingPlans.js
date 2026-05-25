import React from 'react';
import BookingComponent from './BookingComponent';
import Link from 'next/link';

export default function PricingPlans() {
  const plans = [
    {
      title: 'Pro',
      badge: {
        text: 'Recommended',
        type: 'primary',
      },
      idealFor: 'Beginners, homemakers, new moms, busy professionals, and anyone ready to take control of their health without stepping out of the home.',
      primaryAction: 'Get Started',
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
      badge: {
        text: 'Limited seats only',
        type: 'secondary',
      },
      idealFor: 'Highly placed individuals with demanding schedules who want privacy, personalised coaching, and structured accountability for complete makeover.',
      primaryAction: 'Apply For Elite Plan',
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
      badge: {
        text: 'Limited seats only',
        type: 'secondary',
      },
      idealFor: 'Members committed to becoming their healthiest, fittest, most confident selves with deeper support, exclusive benefits, and lasting results.',
      primaryAction: 'Apply For Platinum Plan',
      secondaryAction: 'Request A Call Back',
      features: [
        'All Pro plan benefits for 6 months',
        'FREE Kayapalat Wellness Retreat',
        'Free Family Wellness Consultation',
        'Priority Response from your Coach',
        'Master coach support for advanced goals',
        'Family access to events and Master Classes',
        'Exclusive Platinum Member Merchandise',
      ],
    },
  ];

  return (
    <section className="bg-[#FAF9F6] py-10 px-4 md:px-8 font-manrope">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 tracking-tight">
            Pricing & Plans
          </h2>
          <p className="text-[#737373] text-[15px] md:text-[18px] font-semibold leading-relaxed">
            Kayapalat offers flexible programs designed for your lifestyle and goals. Choose the plan that resonates with you, and we'll take care of the rest.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className="bg-white border-[1.5px] border-[#FFD200] h-fit rounded-[2rem] p-8 flex flex-col hover:-translate-y-2 hover:shadow-xl transition-all duration-300 ease-out"
            >
              {/* Card Header & Badge */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-medium text-black">{plan.title}</h3>
                
                {plan.badge.type === 'primary' ? (
                  <div className="bg-[#FF5A36] text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1 uppercase tracking-wide">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                    {plan.badge.text}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#6EE7B7]"></span>
                    {plan.badge.text}
                  </div>
                )}
              </div>

              {/* Ideal For Text */}
              <p className="text-md text-[#636363] mb-8 min-h-[80px] font-semibold leading-relaxed">
                <strong className="text-[#636363] font-bold">Ideal for:</strong> {plan.idealFor}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 mb-10">
                <Link href={index==0 ? 'https://imjo.in/bRW6Fa' : '/pricing'} className="w-full text-center bg-[#FFD200] hover:bg-[#F2C94C] text-black py-3 rounded-full transition-colors duration-200">
                  {plan.primaryAction}
                </Link>
                <BookingComponent pricing={true} />
              </div>

              {/* Features List */}
              <ul className="flex flex-col gap-4 mt-auto">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <svg 
                      className="w-5 h-5 text-[#636363] flex-shrink-0 mt-0.5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      strokeWidth="2.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="text-md text-[#636363] leading-snug font-semibold">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}