import React from 'react';
import BookingComponent from './BookingComponent';
import Link from 'next/link';
import { IndianRupee } from 'lucide-react';
import PaymentButton from './PayButton';
import PlanButton from './PlanButton';

export default function PricingPlans() {
 const plans = [
  {
    title: 'Gold',
    subtitle:"Universal Membership",
    link: "/gold-plan",
    purpose: "gold_plan",
    badge: {
      text: 'Recommended',
      type: 'primary',
    },
    idealFor: 'Build healthy habits, regain your energy, and create lasting transformation.',
    extra:' Perfect for busy professionals, homemakers, new moms, and anyone ready to take control of their health from home.',
    price: 8484,
    note:"Everything You Need To Succeed",
    ex:"(Trusted by 11,000+ members across 470+ cities.)",
    priceSuffix: '/per month',
    primaryAction: 'Join Now',
    secondaryAction: 'Apply Now',
    features: [
      '12 Live FIT Hours Every Month',
      '12 Structured Workouts You Can Do Anywhere',
      'Daily Coaching & Accountability (Mon–Sat)',
      'Personal Coach Support',
      'Weekly Reviews & Clarity Calls',
      'Access to the Kayapalat Community',
      'Nutrition Guidance & Support',
    ],
  },
  {
    title: 'Elite',
    subtitle:"Private Coaching Membership",
    link: "/elite-plan",
    purpose: "elite_plan",
    badge: {
      text: 'Limited seats only',
      type: 'secondary',
    },
    idealFor: 'Personalised guidance, and deeper accountability for faster transformation.',
    extra:"Ideal for professionals, entrepreneurs, and leaders who value privacy, personal attention, and results.",
    note:"Your Personal Transformation Team",
    price: 24024,
    priceSuffix: '/per month',
    primaryAction: 'Apply Now',
    ex:"(Trusted by 11,000+ members across 470+ cities.)",
    secondaryAction: 'Apply Now',
    features: [
      'Everything Included in GOLD',
      '1:1 Coaching Three Times Every Week',
      'Bespoke Transformation Blueprint',
      'Personalised Nutrition Support',
      'Priority Coach Access',
      'Weekly Support from Master Coach',
      'Access to Preferred Member Training',
      'Access to Body Transformation Marathon',
      'Complimentary Wellness Retreat with Eligible Commitment',
    ],
  },
  {
    title: 'Legacy',
    subtitle:"Lifestyle Membership",
    link: "/legacy-plan",
    purpose: "legacy_plan",
    badge: {
      text: 'Limited seats only',
      type: 'secondary',
    },
    idealFor: 'Make wellness a lifestyle and stay transformed for life.',
    extra: "Exclusive for committed members who want to deepen their health, fitness, and happiness journey with long-term support and special privileges.",
    note:"Designed For Lifelong Transformation",
    price: 50900,
    ex:"(Available exclusively to members who have completed 3 months with Kayapalat.)",
    priceSuffix: '/ for 6 months',
    primaryAction: 'Apply Now',
    secondaryAction: 'Apply Now',
    features: [
      'All GOLD Benefits for 6 Months',
      'Complimentary Kayapalat Wellness Retreat',
      'Family Wellness Consultation',
      'Priority Coach Access',
      'Early Access to Events, Masterclasses & Performance Clinics',
      'Advanced Fitness & Performance Guidance',
      'Legacy Member Recognition',
      'Exclusive Legacy Member Merchandise',
    ],
  },
];

  return (
    <section className="bg-[#F8F9FA] py-16 px-4 md:px-8 font-manrope">
      <div className="max-w-[1400px] mx-auto">
        
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
            // Highlighting the 2nd card based on your current code logic
            const isHighlighted = index === 1; 

            return (
              <div 
                key={index}
                className={`rounded-[24px] p-8 flex flex-col h-full transition-transform duration-300 hover:-translate-y-1
                  ${index===0 && 'bg-gradient-to-b from-[#fff7c6] to-white shadow-sm'}
                  ${
                  isHighlighted 
                    ? 'bg-gradient-to-b from-[#d4d4d4] to-white shadow-sm' 
                    : 'bg-white shadow-[0_4px_24px_rgba(0,0,0,0.03)]'
                }`}
              >
                {/* Top Pill / Badge */}
                <div className="mb-2">
                  <span 
                    className={`text-[36px] font-black tracking-wide`}
                  >
                    {plan.title}
                  </span>
                </div>
<p className={`text-[14px] font-bold leading-relaxed mb-6 ${isHighlighted ? 'text-[#000000]' : 'text-[#595757]'}`}>
                  {plan.subtitle}
                </p>
                {/* Ideal For Text */}
                <p className={`text-[16px] leading-relaxed mb-6 min-h-[40px] ${isHighlighted ? 'text-[#1b1b1b]' : 'text-[#1c1d1d]'}`}>
                  {plan.idealFor}
                </p>
<p className={`text-[16px] font-bold leading-relaxed mb-6 min-h-[90px] ${isHighlighted ? 'text-[#1b1b1b]' : 'text-[#1c1d1d]'}`}>
                  {plan.extra}
                </p>
                {/* Pricing Display */}
                <div className="mb-6 items-baseline gap-1">
                  <h3 className={`text-5xl font-bold tracking-tight flex items-center ${isHighlighted ? 'text-black' : 'text-[#111]'}`}>
                   <IndianRupee /> {plan.price}
                  </h3>
                  {plan.priceSuffix && (
                    <span className="text-[16px] font-medium text-gray-800 ml-2">
                      {plan.priceSuffix}
                    </span>
                  )}
                </div>

                {/* Divider Line */}
                <hr className={`border-t-2 mb-8 ${isHighlighted ? 'border-[#999999]/60' : 'border-[#F3F4F6]'}`} />
<p className={`text-[18px] font-bold leading-relaxed mb-6 ${isHighlighted ? 'text-[#1b1b1b]' : 'text-[#1c1d1d]'}`}>
                  {plan.note}
                </p>
                {/* Features List */}
                <ul className="flex flex-col gap-4 mb-4 flex-grow">
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
                  {/* Know More Button */}
                  <Link 
                    href={plan.link} 
                    className="w-full py-3.5 rounded-[12px] border border-gray-100 font-semibold text-[16px] text-center transition-all duration-200 bg-white text-black hover:bg-gray-50 shadow-sm"
                  >
                    Know More
                  </Link>
                  {index===0? 
<PaymentButton plan={plan.title} amount={plan.price} purpose={plan.purpose} buttonText={plan.primaryAction} variant="plans" /> :
<PlanButton planName={plan.title}/>
                  }
                 
                </div>
                <p className={`text-[12px] font-bold text-center mt-4 leading-relaxed mb-3 ${isHighlighted ? 'text-[#1b1b1b]' : 'text-[#1c1d1d]'}`}>
                  {plan.ex}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}