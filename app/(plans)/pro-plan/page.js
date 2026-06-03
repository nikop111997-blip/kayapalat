
import {
  ArrowUpRight, ArrowRight, ShieldCheck, Activity, Brain, Users,
  Check, ChevronDown, Star, PlayCircle, TrendingUp, Award, Zap,
  HeartPulse, ChevronRight, ShoppingCart
} from 'lucide-react';
import PaymentButton from '@/component/PayButton';
import FeaturesTabs from '@/component/FeturesTabs';
import BookingComponent from '@/component/Booking2Comp';

/* Tailwind-only — no inline style props anywhere */

export default function KayapalatProPlan() {
  return (
    <main className="min-h-screen bg-white text-[#003460] font-sans overflow-x-hidden">

 

      {/* ── HERO ── */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div>
            <Tag text="India's #1 Fitness Program" />
            <h1 className="mt-5 mb-5 text-5xl lg:text-6xl font-semibold tracking-tighter leading-[1.04] text-[#003460]">
              Finally Get{' '}
              <span className="relative inline-block">
                Healthy
                <span className="absolute -bottom-1 left-0 right-0 h-[5px] bg-[#ffce00] rounded-full" />
              </span>
              ,<br />Fit &amp; Confident
            </h1>
            <p className="text-base text-[#0d0d0d] leading-relaxed max-w-md mb-7 font-medium">
              Without putting your life on hold. Built for busy professionals, homemakers, and anyone tired of trying without lasting results.
            </p>

            {/* Stars */}
            <div className="flex items-center gap-3 mb-7">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#ffce00] text-[#ffce00]" />
                ))}
              </div>
              <span className="text-sm font-semibold text-[#0d0d0d]">
                <strong className="text-[#003460]">4.5</strong> · 12,000+ Positive Reviews
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-10">
              <PaymentButton plan="Pro" amount={8484} purpose="pro_plan" buttonText="Buy Now — Join the Pro Plan" variant="primary" />
              <BookingComponent pricing={false} navbar={true} />
            </div>

            {/* Mini stats */}
            <div className="flex flex-wrap gap-6">
              {[['50K+', 'Lives Transformed'], ['470+', 'Cities Reached'], ['30+', 'Yrs Experience']].map(([num, label], i) => (
                <div key={i}>
                  {i > 0 && <div className="w-px bg-[#dce8f5]" />}
                  <div>
                    <div className="text-2xl font-bold tracking-tight text-[#003460]">{num}</div>
                    <div className="text-[11px] font-semibold uppercase tracking-widest text-[#0d0d0d]">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            <div className="rounded-[2rem] overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1599552683573-9dc48255fe85?auto=format&fit=crop&w=700&q=80"
                alt="Coaching"
                className="w-full h-[400px] sm:h-[620px] object-cover block"
              />
              <div className="absolute inset-0 bg-[#003460]/10" />
              <div className="absolute bottom-5 left-0 right-0 flex justify-center">
              <PaymentButton plan="Pro" amount={8484} purpose="pro_plan" buttonText="Join the Pro Plan" variant="secondary" />
              </div>
            </div>

            {/* Floating top-left */}
            <div className="absolute top-5 left-5 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 bg-[#003460] rounded-xl flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-[#ffce00]" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#0d0d0d]">Results in</div>
                <div className="text-sm font-black text-[#003460]">Just 21 Days</div>
              </div>
            </div>

           
          </div>
        </div>
      </section>

      {/* ── METHOD ── */}
      <section className="bg-[#f4f7fb] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            <div className="relative rounded-[2rem] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=700&q=80"
                alt="Method"
                className="w-full h-[400px] sm:h-[640px] object-cover block"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003460]/80 via-transparent to-transparent" />
          
            </div>

            <div>
              <Tag text="The Kayapalat Method" />
              <h2 className="mt-4 mb-4 text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.08] text-[#003460]">
                Browse The{' '}
                <span className="border-b-[5px] border-[#ffce00]">Kayapalat Method</span>
              </h2>
              <p className="text-[#0d0d0d] text-base leading-relaxed max-w-md mb-8 font-medium">
                Lasting transformation requires more than diet and exercise. Most programs focus on one piece — we cover all three.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { icon: <Activity className="w-5 h-5 text-[#003460]" />, title: 'Physical Wellness', desc: 'Practical movement & daily habits.' },
                  { icon: <Brain className="w-5 h-5 text-[#003460]" />, title: 'Psychological', desc: 'Mindset and emotional well-being.' },
                  { icon: <HeartPulse className="w-5 h-5 text-[#003460]" />, title: 'Physiological', desc: 'Smart nutrition & recovery.' },
                  { icon: <Users className="w-5 h-5 text-[#003460]" />, title: 'Community', desc: 'Support that inspires.' },
                ].map((item, i) => (
                  <div key={i} className="bg-white border border-[#dce8f5] rounded-2xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all">
                    <div className="w-10 h-10 bg-[#ffce00]/20 rounded-xl flex items-center justify-center mb-3">
                      {item.icon}
                    </div>
                    <div className="font-bold text-sm text-[#003460] mb-1">{item.title}</div>
                    <div className="text-xs text-[#0d0d0d] leading-relaxed">{item.desc}</div>
                  </div>
                ))}
              </div>

             <PaymentButton plan="Pro" amount={8484} purpose="pro_plan" buttonText="Buy Now - Start Today" variant="primary" />
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES TABS ── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <Tag text="Pro Features" />
            <h2 className="mt-4 text-4xl lg:text-5xl font-semibold tracking-tight text-[#003460]">
              What Makes the{' '}
              <span className="border-b-[5px] border-[#ffce00]">Pro Plan</span> Stand Out?
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
             <FeaturesTabs />
             <div className="mt-10">
              <PaymentButton plan="Pro" amount={199} purpose="pro_plan" buttonText="Buy Now — Access All Features" variant="secondary" />
              </div>
            </div>
            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-4">
                <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80"
                  alt="Training" className="w-full h-56 object-cover rounded-[1.5rem] rounded-tr-lg" />
                <div className="bg-[#003460] rounded-[1.5rem] p-7 flex-1 flex flex-col justify-between min-h-[170px]">
                  <div className="w-10 h-10 bg-[#ffce00]/15 rounded-xl flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-[#ffce00]" />
                  </div>
                  <p className="font-bold text-base text-white mt-4 leading-snug">Built for real life and real schedules.</p>
                </div>
              </div>
              <div className="flex flex-col gap-4 pt-10">
                <img src="https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=600&q=80"
                  alt="Coaching" className="w-full h-72 object-cover rounded-[1.5rem] rounded-tl-lg" />
                <div className="bg-white border border-[#dce8f5] rounded-[1.5rem] p-5 text-center">
                  <div className="text-4xl font-black text-[#003460] tracking-tight leading-none">90</div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-[#0d0d0d] mt-1">Days to Transform</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COACH ── */}
      <section className="bg-[#f4f7fb] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="relative">
              <div className="rounded-[2rem] overflow-hidden">
                <img
                  src="https://framerusercontent.com/images/VaJVz7sLas8kHWe1d2ITuHvrA.png?width=429&height=607"
                  alt="Coach Ajay"
                  className="w-full h-[400px] sm:h-[820px] object-cover block -rotate-y-180"
                />
              </div>
              <div className="absolute -top-15 sm:top-5 -right-4 bg-white rounded-2xl shadow-xl p-4 min-w-[165px]">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-4 h-4 text-[#e6b800]" />
                  <span className="font-black text-sm text-[#003460]">Certified Expert</span>
                </div>
                <p className="text-xs text-[#0d0d0d] font-medium">30+ Years Transforming Lives</p>
              </div>
            </div>

            <div>
              <Tag text="About Your Coach" />
              <h2 className="mt-4 mb-5 text-4xl lg:text-5xl font-bold tracking-tight leading-[1.08] text-[#003460]">
                Discover the Mission &amp;{' '}
                <span className="border-b-[5px] border-[#ffce00] mb-5">Story Behind Your Coach</span>
              </h2>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { label: 'Company Mission', icon: <HeartPulse className="w-4 h-4 text-[#e6b800]" />, text: 'Help people achieve lifetime health through clarity, coaching & community.' },
                  { label: 'Company Vision', icon: <TrendingUp className="w-4 h-4 text-[#e6b800]" />, text: 'Transform 1 million lives with consistent coaching.' },
                ].map((item, i) => (
                  <div key={i} className="bg-white border border-[#dce8f5] rounded-2xl p-4 hover:shadow-md transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      {item.icon}
                      <span className="text-[10px] font-black text-[#003460] uppercase tracking-widest">{item.label}</span>
                    </div>
                    <p className="text-xs text-[#0d0d0d] leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>

              <p className="text-[#0d0d0d] text-base leading-relaxed mb-4 font-medium">
                Ajay Singh Sethi is India's Leading Fitness &amp; Transformation Coach. For over 30 years, he has helped people discover the beauty, strength, and unlimited potential within themselves.
              </p>
              <p className="text-[#0d0d0d] text-sm italic leading-relaxed mb-8">
                "My mission: help people achieve lifetime health, fitness, and happiness through clarity, coaching, community, and consistent action."
              </p>

              <div className="flex flex-wrap gap-3">
                <PaymentButton plan="Pro" amount={8484} purpose="pro_plan" buttonText="Join the Pro Plan" variant="secondary" />
                <BookingComponent pricing={false} navbar={true} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-[#003460] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
            <div className="lg:col-span-4">
              <span className="bg-[#ffce00]/15 text-[#ffce00] border border-[#ffce00]/35 rounded-full px-4 py-1.5 text-[11px] font-black uppercase tracking-widest inline-block mb-4">
                Our Impact
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4 leading-tight mt-2">
                Our Impact in Numbers
              </h2>
              <p className="text-white/80 text-sm leading-relaxed mb-8 font-medium">
                Not built on promises — built on proof. 50K+ members across 470+ cities.
              </p>
             <PaymentButton plan="Pro" amount={8484} purpose="pro_plan" buttonText="Join the Pro Plan" variant="secondary" />
            </div>
            <div className="lg:col-span-8 grid grid-cols-2 gap-x-12 gap-y-10">
              {[
                ['50K+', 'People Trained'],
                ['63kg+', 'Max Weight Lost'],
                ['1K+', 'Coaches Trained'],
                ['470+', 'Cities Reached'],
              ].map(([num, label]) => (
                <div key={label} className="border-t-4 border-[#ffce00] pt-5">
                  <div className="text-5xl font-bold tracking-tight text-white leading-none">{num}</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-white/50 mt-2">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ── WHO IT'S FOR ── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <Tag text="Our Audience" />
            <h2 className="mt-4 text-4xl lg:text-5xl font-bold tracking-tight text-[#003460]">
              Designed for{' '}
              <span className="border-b-[5px] border-[#ffce00]">Real People</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80', title: 'Busy Professionals', desc: 'Demanding careers, sustainable path.' },
              { img: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=600&q=80', title: 'Business Owners', desc: 'High energy, razor-sharp focus.' },
              { img: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80', title: 'Caring Homemakers', desc: 'Reclaim health and confidence.' },
            ].map((card) => (
              <div key={card.title} className="relative h-[420px] rounded-[1.75rem] overflow-hidden group">
                <img src={card.img} alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003460]/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white rounded-2xl p-5">
                    <h3 className="font-black text-base text-[#003460] mb-1">{card.title}</h3>
                    <p className="text-xs text-[#0d0d0d] font-medium mb-3">{card.desc}</p>
                    <PaymentButton plan="Pro" amount={8484} purpose="pro_plan" buttonText="Join the Pro Plan" variant="primary" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-white pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <Tag text="FAQ" />
              <h2 className="mt-4 text-4xl lg:text-5xl font-bold tracking-tight text-[#003460]">
                Frequently Asked<br />Questions
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { q: 'How much time do I need every day?', a: 'Most members spend 30–60 minutes joining live Coaching calls. It fits around your lifestyle, not against it.' },
              { q: 'How long does it take to see results?', a: 'Feel lighter in 3–5 days. Visible progress in 21 days. By day 90, a healthier, fitter, stronger version of yourself.' },
              { q: 'I am very busy. Will this work for me?', a: 'Yes. Many of our most successful members are busy professionals — designed specifically for demanding schedules.' },
            ].map((faq, i) => (
              <div key={i} className="bg-white border-2 border-[#dce8f5] rounded-2xl p-7 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-8 h-8 bg-[#ffce00] rounded-lg flex items-center justify-center mb-5 font-black text-xs text-[#003460]">
                  Q{i + 1}
                </div>
                <h3 className="font-black text-base text-[#003460] mb-3 leading-snug">"{faq.q}"</h3>
                <p className="text-sm text-[#0d0d0d] leading-relaxed font-medium">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="bg-white py-6 pb-20">
        <div className=" px-6">
          <div className="bg-[#003460] rounded-[2.5rem] px-10 py-16 lg:px-20 text-center relative overflow-hidden">
            {/* Gold top bar */}
            <div className="absolute top-0 left-1/3 right-1/3 h-1 bg-[#ffce00] rounded-b-full" />

            <span className="bg-[#ffce00]/15 text-[#ffce00] border border-[#ffce00]/35 rounded-full px-4 py-1.5 text-[11px] font-black uppercase tracking-widest inline-block mb-6">
              Final Step
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.06] mb-5">
              Start Your <br />
              <span className="text-[#ffce00]">Transformation Today</span>
            </h2>
            <p className="text-white text-base leading-relaxed max-w-xl mx-auto mb-10 font-medium">
              You don't need another diet. You need the right plan designed around you. Join 50K+ people who've already transformed.
            </p>

            <div className="flex items-center justify-center gap-4 mb-10 max-w-xl mx-auto">
              <PaymentButton plan="Pro" amount={8484} purpose="pro_plan" buttonText="Join the Pro Plan" variant="secondary" />
            
            </div>

            <div className="flex items-center justify-center gap-8 flex-wrap">
              {[
                [<Check className="w-4 h-4 text-[#ffce00]" />, '30-Day Money Back'],
                [<ShieldCheck className="w-4 h-4 text-[#ffce00]" />, 'Secure Checkout'],
                [<Star className="w-4 h-4 text-[#ffce00]" />, '4.5★ Rated'],
              ].map(([icon, text], i) => (
                <div key={icon} className="flex items-center gap-2">
                  {icon}
                  <span className="text-xs font-semibold text-white/50">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


    </main>
  );
}

/* ── Reusable sub-components ── */

function Tag({ text }) {
  return (
    <span className="bg-[#ffce00]/20 text-[#003460] border border-[#ffce00]/50 rounded-full px-4 py-1.5 text-[11px] font-black uppercase tracking-widest inline-block">
      {text}
    </span>
  );
}



