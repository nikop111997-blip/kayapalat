import {
  ArrowRight, ShieldCheck, Activity, Brain, Users,
  Check, Star, TrendingUp, Award, HeartPulse, 
  X, Crown, Clock, Flame, Sparkles, CalendarDays
} from 'lucide-react';
import PaymentButton from '@/component/PayButton';
import BookingComponent from '@/component/Booking2Comp';

/* Tailwind-only — no inline style props anywhere */
/* Incorporating high-end glassmorphism and cinematic spacing for the Elite tier */

export default function KayapalatElitePlan() {
  return (
    <main className="min-h-screen bg-[#fafcff] text-[#003460] font-sans overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-24">
        {/* Decorative background glows */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#ffce00]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-40 right-0 w-96 h-96 bg-[#003460]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left */}
          <div>
            <Tag text="Kayapalat Elite" />
            <h1 className="mt-6 mb-6 text-5xl lg:text-6xl font-semibold tracking-tighter leading-[1.05] text-[#003460]">
              Your Schedule Is Demanding.<br />
              <span className="relative inline-block mt-2">
                Your Transformation
                <span className="absolute -bottom-2 left-0 right-0 h-[6px] bg-[#ffce00] rounded-full" />
              </span>
              <br />Doesn't Have To Be.
            </h1>
            <p className="text-lg text-[#0d0d0d] leading-relaxed max-w-lg mb-8 font-medium">
              Private. Personalised. High-touch coaching designed for individuals who want exceptional results without sacrificing their time, privacy, or lifestyle.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-12">
              <PaymentButton plan="Elite" amount={200} purpose="elite_apply" buttonText="Apply For Elite" variant="primary" />
              <BookingComponent pricing={false} navbar={true} customText="Book A Private Consultation" />
            </div>

            {/* Elite Stats / Focus */}
            <div className="flex flex-wrap gap-8">
              {[
                ['Bespoke', 'Strategy'], 
                ['1-on-1', 'Priority Access'], 
                ['Holistic', 'Transformation']
              ].map(([num, label], i) => (
                <div key={i} className="flex flex-col">
                  {i > 0 && <div className="hidden lg:block absolute w-px h-10 bg-[#dce8f5] -ml-4 mt-1" />}
                  <div className="text-xl font-bold tracking-tight text-[#003460]">{num}</div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-[#0d0d0d]/60 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="relative group">
            <div className="rounded-[2.5rem] overflow-hidden relative shadow-[0_20px_50px_rgba(0,52,96,0.15)] transition-transform duration-700 hover:scale-[1.02]">
              <img
                src="https://images.unsplash.com/photo-1630415187965-236477b0b659"
                alt="Elite Coaching"
                className="w-full h-[500px] sm:h-[700px] object-cover block"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003460]/80 via-[#003460]/20 to-transparent" />
              
              {/* Glassmorphic overlay card */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 text-white">
                <h3 className="font-semibold text-lg mb-2">Highest Level of Coaching</h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  Lose weight, reclaim energy, and completely transform your body with personal attention available exclusively at Kayapalat.
                </p>
              </div>
            </div>

            {/* Floating top-left */}
            <div className="absolute top-8 -left-6 bg-white/90 backdrop-blur-xl border border-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-[#003460] rounded-xl flex items-center justify-center shadow-inner">
                <Crown className="w-5 h-5 text-[#ffce00]" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#0d0d0d]/60">Experience</div>
                <div className="text-sm font-black text-[#003460]">Elite Accountability</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BESPOKE TRANSFORMATION ── */}
      <section className="bg-white py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="order-2 lg:order-1 relative">
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1734980339741-6255c609961a" 
                  className="rounded-[2rem] rounded-tr-lg w-full h-64 object-cover" 
                  alt="Personalised Assessment" 
                />
                <div className="bg-[#003460] rounded-[2rem] rounded-tl-lg p-8 flex flex-col justify-center text-white">
                  <Sparkles className="w-8 h-8 text-[#ffce00] mb-4" />
                  <p className="font-medium text-lg leading-snug">No templates.<br/>No generic advice.</p>
                </div>
                <div className="bg-[#f4f7fb] rounded-[2rem] rounded-br-lg p-8 flex flex-col justify-center border border-[#dce8f5]">
                  <p className="font-bold text-[#003460] text-xl leading-tight">No one-size-fits-all solutions.</p>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1520877745935-616158eb7fcc" 
                  className="rounded-[2rem] rounded-bl-lg w-full h-64 object-cover" 
                  alt="Transformation Strategy" 
                />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <Tag text="Bespoke Transformation" />
              <h2 className="mt-6 mb-6 text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1] text-[#003460]">
                Most fitness programs start with a plan.<br />
                <span className="border-b-[5px] border-[#ffce00]">We start with you.</span>
              </h2>
              <p className="text-[#0d0d0d] text-base leading-relaxed mb-6 font-medium">
                The Elite Program begins with a comprehensive assessment of your goals, lifestyle, work schedule, challenges, preferences, health history, and aspirations. Using these insights, we create a bespoke transformation strategy tailored specifically to your needs.
              </p>
              <p className="text-[#0d0d0d] text-base leading-relaxed mb-8 font-medium">
                Every recommendation—from nutrition and movement to coaching and accountability—is personalised to fit seamlessly into your life. Rather than forcing you into a rigid system, the program evolves as you progress.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Right level of support at every stage',
                  'Evolving challenge and accountability',
                  'Strategy designed around your success'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-semibold text-[#003460]">
                    <div className="w-6 h-6 rounded-full bg-[#ffce00]/20 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-[#003460]" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ── WHY SUCCESSFUL PEOPLE STRUGGLE ── */}
      <section className="py-24 relative bg-[#003460] overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mt-6 text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-8">
              Why Even Successful People <br/><span className="text-[#ffce00]">Struggle With Their Health</span>
            </h2>
            <p className="text-lg text-white/80 leading-relaxed mb-12">
              Most of our Elite members are successful in many areas of life. They are business owners, professionals, entrepreneurs, executives, doctors, and leaders. They know how to set goals. They know how to work hard. They know how to succeed. 
              <br/><br/>
              <strong>Yet many struggle with their health.</strong>
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {[
                { title: 'Not lack of knowledge.', desc: 'You likely already know the basics of what you should be doing.' },
                { title: 'Not lack of discipline.', desc: 'You apply immense discipline to your career and responsibilities.' },
                { title: 'The real problem.', desc: 'Schedules are demanding, responsibilities are many, and most health programs simply don\'t fit into real life.' },
              ].map((item, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/15 transition-colors">
                  <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 bg-[#ffce00] text-[#003460] rounded-2xl p-8 max-w-2xl mx-auto font-semibold text-lg shadow-xl">
              The problem isn't you. The problem is that most programs expect you to fit into the system. <br/>
              <span className="font-black">At Kayapalat, the system fits into your life.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE ELITE DIFFERENCE ── */}
      <section className="bg-[#f4f7fb] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Tag text="The Elite Difference" />
            <h2 className="mt-6 text-4xl lg:text-5xl font-semibold tracking-tight text-[#003460] max-w-2xl mx-auto">
              Not simply more coaching. A completely <span className="border-b-[5px] border-[#ffce00]">different experience.</span>
            </h2>
            <p className="mt-6 text-base text-[#0d0d0d] max-w-xl mx-auto font-medium">
              An experience built around deeper support, greater accountability, personalised guidance, and faster progress.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Users />, title: 'Personalised Coaching', desc: 'Your goals, schedule, and challenges are unique. Every recommendation is tailored specifically to your situation ensuring maximum relevance.' },
              { icon: <CalendarDays />, title: '3 Sessions Every Week', desc: 'Knowing what to do is rarely the problem. Doing it consistently is. Regular sessions provide clarity exactly when you need it.' },
              { icon: <Clock />, title: 'Priority Coach Access', desc: 'Questions don\'t always arise during scheduled sessions. Receive priority access so obstacles are addressed before they derail progress.' },
              { icon: <HeartPulse />, title: 'Personalised Nutrition', desc: 'Your nutritional requirements are influenced by your daily demands. We create a strategy that is practical and sustainable.' },
              { icon: <Award />, title: 'Weekly Master Sessions', desc: 'Benefit from Ajay Sethi\'s three decades of experience. Learn not only what works, but why it works.' },
              { icon: <Flame />, title: 'Marathon Access', desc: 'Access to one of the most powerful accountability systems within Kayapalat. A structured environment for extraordinary results.' },
            ].map((feature, i) => (
              <div key={i} className="bg-white rounded-[2rem] p-8 border border-[#dce8f5] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-[#003460] rounded-2xl flex items-center justify-center text-[#ffce00] mb-6 shadow-inner">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[#003460] mb-3">{feature.title}</h3>
                <p className="text-sm text-[#0d0d0d] leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-gradient-to-br from-[#003460] to-[#001e38] rounded-[2rem] p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <Star className="w-8 h-8 text-[#ffce00] mb-4" />
                  <h3 className="text-xl font-bold mb-2">Preferred Member Training</h3>
                  <p className="text-sm text-white/80 leading-relaxed">Exclusive workshops and advanced training sessions available only to members committed to achieving their full potential.</p>
                </div>
             </div>
             <div className="bg-gradient-to-br from-[#ffce00] to-[#e6b800] rounded-[2rem] p-8 text-[#003460] relative overflow-hidden">
                <div className="relative z-10">
                  <HeartPulse className="w-8 h-8 text-[#003460] mb-4" />
                  <h3 className="text-xl font-bold mb-2">Complimentary Wellness Retreat</h3>
                  <p className="text-sm text-[#003460]/80 leading-relaxed font-medium">Included with eligible commitments. An opportunity to disconnect from distractions and immerse yourself entirely in your well-being.</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ── THE KAYAPALAT METHOD ── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Tag text="The Kayapalat Method" />
              <h2 className="mt-6 mb-6 text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.08] text-[#003460]">
                Lasting transformation requires{' '}
                <span className="border-b-[5px] border-[#ffce00]">all three.</span>
              </h2>
              <p className="text-[#0d0d0d] text-base leading-relaxed max-w-md mb-10 font-medium">
                Most programs focus on either food or exercise. Some address metabolism and hormones. Very few address thoughts and emotions. When these three work together, transformation becomes simpler, more sustainable, and far more enjoyable.
              </p>

              <div className="space-y-4">
                {[
                  { icon: <Activity className="w-6 h-6 text-[#003460]" />, title: 'Physical Wellness', desc: 'Food & Movement' },
                  { icon: <HeartPulse className="w-6 h-6 text-[#003460]" />, title: 'Physiological Wellness', desc: 'Metabolism & Hormones' },
                  { icon: <Brain className="w-6 h-6 text-[#003460]" />, title: 'Psychological Wellness', desc: 'Thoughts & Emotions' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-5 bg-[#f4f7fb] border border-[#dce8f5] rounded-2xl p-5">
                    <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-bold text-lg text-[#003460]">{item.title}</div>
                      <div className="text-sm font-medium text-[#0d0d0d] mt-1">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1599552683573-9dc48255fe85?auto=format&fit=crop&w=800&q=80"
                alt="Methodology"
                className="w-full h-[600px] object-cover block"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003460]/90 via-[#003460]/20 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10">
                <p className="text-white text-xl font-semibold leading-relaxed">
                  "This is the difference between temporary results and lasting change."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO IT IS FOR / NOT FOR ── */}
      <section className="bg-[#f4f7fb] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Who it is for */}
            <div className="bg-white border-2 border-green-100 rounded-[2rem] p-10 shadow-lg">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-[#003460]">Who The Elite Plan Is For</h3>
              </div>
              <ul className="space-y-5">
                {[
                  'Highly placed professionals',
                  'Entrepreneurs and business owners',
                  'Executives and leaders',
                  'Individuals with demanding schedules',
                  'People who value privacy and personalised support',
                  'Individuals seeking a complete makeover',
                  'Those who want faster results through deeper accountability'
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-[15px] font-medium text-[#0d0d0d]">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Who it is not for */}
            <div className="bg-white border-2 border-red-50 rounded-[2rem] p-10 shadow-lg">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                  <X className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-[#003460]">Who The Elite Plan Is Not For</h3>
              </div>
              <ul className="space-y-5">
                {[
                  'People looking for quick fixes',
                  'People searching for shortcuts',
                  'Individuals unwilling to follow guidance',
                  'Those unwilling to invest in themselves',
                  'Anyone looking for a generic health program'
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <span className="text-[15px] font-medium text-[#0d0d0d]">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="bg-white py-12 pb-24">
        <div className=" px-6">
          <div className="bg-[#003460] rounded-[3rem] px-8 py-10 lg:px-20 text-center relative overflow-hidden shadow-2xl">
            {/* Cinematic Glass Details */}
            <div className="absolute top-0 left-1/4 right-1/4 h-[4px] bg-gradient-to-r from-transparent via-[#ffce00] to-transparent" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1599552683573-9dc48255fe85?auto=format&fit=crop&w=1200&q=80')] opacity-10 mix-blend-overlay object-cover" />

            <div className="relative z-10">
              <span className="bg-white/10 backdrop-blur-md text-[#ffce00] border border-white/20 rounded-full px-5 py-2 text-xs font-black uppercase tracking-widest inline-block mb-8 shadow-sm">
                Next Steps
              </span>
              <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.1] mb-6">
                Ready For A Different {" "}
                <span className="text-[#ffce00]">Level Of Support?</span>
              </h2>
              <p className="text-white/90 text-lg leading-relaxed max-w-4xl mx-auto mb-10 font-medium">
                The Elite Plan is designed for people who are serious about creating lasting change. If you value privacy, personalised attention, and structured accountability—and you're ready to become the healthiest, fittest, most confident version of yourself—we invite you to apply.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <PaymentButton plan="Elite" purpose="elite_apply" amount={200} buttonText="Apply For Elite" variant="primary" />
                <span className="text-white/60 font-medium italic">or</span>
                <BookingComponent pricing={false} navbar={false} customText="Book A Private Consultation" />
              </div>

              <div className="flex items-center justify-center gap-10 flex-wrap">
                {[
                  [<ShieldCheck className="w-5 h-5 text-[#ffce00]" />, 'Complete Privacy'],
                  [<Crown className="w-5 h-5 text-[#ffce00]" />, 'Bespoke Strategy'],
                  [<Award className="w-5 h-5 text-[#ffce00]" />, 'Master Coach Access'],
                ].map(([icon, text], i) => (
                  <div key={i} className="flex items-center gap-2">
                    {icon}
                    <span className="text-sm font-semibold text-white/70">{text}</span>
                  </div>
                ))}
              </div>
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
    <span className="bg-[#ffce00]/20 text-[#003460] border border-[#ffce00]/40 rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-widest inline-block shadow-sm">
      {text}
    </span>
  );
}