import {
  ArrowRight, ShieldCheck, Activity, Brain, Users,
  Check, Star, TrendingUp, Award, HeartPulse, 
  X, Crown, Clock, Flame, Sparkles, CalendarDays,
  Infinity, Target, Zap, Shield
} from 'lucide-react';
import PaymentButton from '@/component/PayButton';
import BookingComponent from '@/component/Booking2Comp';

/* Tailwind-only — no inline style props anywhere */
/* Utilizing high-end glassmorphism and cinematic scroll layouts */

export default function KayapalatPlatinumPlan() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#003460] font-sans overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative max-w-7xl mx-auto px-6 pt-24 pb-24">
        {/* Platinum/Silver decorative glows */}
        <div className="absolute top-0 left-10 w-[500px] h-[500px] bg-slate-300/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-40 right-10 w-[400px] h-[400px] bg-[#003460]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left */}
          <div>
            <Tag text="Kayapalat Platinum" />
            <h1 className="mt-6 mb-6 text-5xl lg:text-7xl font-semibold tracking-tighter leading-[1.05] text-[#003460]">
              Don't Just Transform.<br />
              <span className="relative inline-block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-slate-400 via-slate-600 to-slate-400">
                Stay Transformed.
                <span className="absolute -bottom-2 left-0 right-0 h-[4px] bg-gradient-to-r from-slate-300 to-slate-500 rounded-full" />
              </span>
            </h1>
            <p className="text-lg text-[#0d0d0d] leading-relaxed max-w-lg mb-6 font-medium">
              For members who are ready to make wellness a lifestyle—not a temporary phase. 
              The Platinum Plan is designed for individuals who have already experienced the power of the Kayapalat Method and are now committed to becoming the healthiest, fittest, and most confident version of themselves for life.
            </p>
            <p className="text-base text-[#003460] font-bold mb-10">
              This is not about losing weight. This is about becoming the kind of person who never has to start over again.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-12">
              <PaymentButton plan="Platinum" amount={300} purpose="platinum_upgrade" buttonText="Upgrade To Platinum" variant="primary" />
              <BookingComponent pricing={false} navbar={true} customText="Book A Call" />
            </div>
          </div>

          {/* Right */}
          <div className="relative group perspective-1000">
            <div className="rounded-[2.5rem] overflow-hidden relative shadow-[0_20px_50px_rgba(0,52,96,0.15)] transition-all duration-700 transform hover:rotate-y-2 hover:scale-[1.02]">
              <img
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80"
                alt="Platinum Lifestyle"
                className="w-full h-[550px] sm:h-[750px] object-cover block"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003460]/90 via-[#003460]/20 to-transparent" />
              
              {/* Skeuomorphic Glass Card */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.2)]">
                <div className="flex items-center gap-3 mb-2">
                  <Infinity className="w-6 h-6 text-slate-300" />
                  <h3 className="font-semibold text-lg text-white">Lifelong Transformation</h3>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">
                  Strengthen the habits, systems, and identity that make your results permanent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE PROBLEM: WHY PEOPLE REGAIN ── */}
      <section className="py-24 relative bg-[#003460] overflow-hidden">
        {/* Cinematic Backdrop */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80')] opacity-5 mix-blend-overlay object-cover" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Tag text="The Reality" />
              <h2 className="mt-6 mb-6 text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1] text-white">
                Why Most People <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-500">Regain Their Results</span>
              </h2>
              <p className="text-lg text-white/80 leading-relaxed mb-6">
                Losing weight is not the hardest part. Keeping it off is.
              </p>
              <p className="text-base text-white/70 leading-relaxed mb-8">
                Most people don't regain their weight because they forget what to do. They regain it because they stop doing what worked.
              </p>
              
              <div className="space-y-4 mb-8">
                {['The coaching stops.', 'The accountability disappears.', 'Old habits return.', 'Life gets busy. And gradually, the results begin to fade.'].map((text, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                    <X className="w-5 h-5 text-red-400 shrink-0" />
                    <span className="text-white/90 font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-100 to-slate-300 rounded-[2.5rem] p-10 lg:p-14 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/40 blur-2xl rounded-full" />
              <Shield className="w-12 h-12 text-[#003460] mb-6" />
              <h3 className="text-2xl font-bold text-[#003460] mb-4 leading-tight">
                Wellness Is Not A Destination.<br/>It's A Lifestyle.
              </h3>
              <p className="text-[#0d0d0d] font-medium leading-relaxed mb-6">
                At Kayapalat, we believe the goal isn't simply transformation. The goal is lifelong transformation. The Platinum Plan was created to help you stay there.
              </p>
              <p className="text-[#0d0d0d] font-medium leading-relaxed">
                You have built momentum. You have experienced results. Now it's time to strengthen the habits, systems, and identity that make those results permanent. This is where transformation becomes a way of life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE PLATINUM ADVANTAGE (FEATURES) ── */}
      <section className="bg-[#f8fafc] py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Tag text="Platinum Advantage" />
            <h2 className="mt-6 text-4xl lg:text-5xl font-semibold tracking-tight text-[#003460] max-w-2xl mx-auto">
              Everything you need to make it <span className="border-b-[4px] border-slate-400">permanent.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <CalendarDays />, title: 'Six Months Of Support', desc: 'Real transformation takes time. Provides six months of continued coaching and accountability to deepen your habits. Long enough to make it stick.' },
              { icon: <Sparkles />, title: 'Complimentary Retreat', desc: 'Step away from noise and immerse yourself in an environment dedicated to health and connection. A turning point for many members.' },
              { icon: <Clock />, title: 'Priority Coach Support', desc: 'Your journey receives priority attention. Questions are answered faster. Guidance is readily available. Support is always close by.' },
              { icon: <Users />, title: 'Family Wellness Consult', desc: 'Health is easier when the people around you support your goals. We help create an environment that supports long-term success.' },
              { icon: <Star />, title: 'Early Access & Events', desc: 'Gain priority access to exclusive workshops, events, retreats, performance clinics, and educational experiences. Keep growing.' },
              { icon: <Target />, title: 'Advanced Performance', desc: 'Whether running a marathon or achieving a personal milestone, receive personalised guidance to support your new ambitions.' },
            ].map((feature, i) => (
              <div key={i} className="group bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm hover:shadow-2xl hover:border-slate-300 transition-all duration-500">
                <div className="w-14 h-14 bg-gradient-to-br from-slate-100 to-slate-300 rounded-2xl flex items-center justify-center text-[#003460] mb-6 shadow-inner group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[#003460] mb-3">{feature.title}</h3>
                <p className="text-sm text-[#0d0d0d]/80 leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Exclusive Recognition Banner */}
          <div className="mt-8 bg-white border border-slate-200 rounded-[2rem] p-8 flex flex-col md:flex-row items-center gap-8 justify-between shadow-sm">
             <div className="flex items-center gap-6 max-w-4xl mx-auto">
                <div className="w-16 h-16 bg-[#003460] rounded-full flex items-center justify-center shrink-0 shadow-lg">
                   <Award className="w-8 h-8 text-slate-300" />
                </div>
                <div>
                   <h3 className="text-xl font-bold text-[#003460] mb-1">Exclusive Platinum Recognition</h3>
                   <p className="text-sm text-[#0d0d0d] font-medium">Your commitment deserves recognition. Receive exclusive merchandise and access to experiences designed specifically for long-term members.</p>
                </div>
             </div>
             <PaymentButton plan="Platinum" amount={300} purpose="platinum_upgrade" buttonText="Upgrade Now" variant="primary" />
          </div>
        </div>
      </section>

      {/* ── THE PLATINUM DIFFERENCE (IDENTITY SHIFT) ── */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
           <div className="bg-[#f8fafc] rounded-[3rem] p-6 lg:p-16 border border-slate-200 shadow-xl flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2">
                <Tag text="The Difference" />
                <h2 className="mt-6 mb-6 text-3xl lg:text-5xl font-semibold tracking-tight leading-[1.1] text-[#003460]">
                  Most programs focus on helping you achieve a goal.<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600">Platinum helps you become a different person.</span>
                </h2>
                <p className="text-[#0d0d0d] text-lg font-medium mb-8">This is the difference between temporary success and lasting transformation.</p>
              </div>
              
              <div className="lg:w-1/2 w-full space-y-4">
                 {[
                   'Exercises because it\'s who they are.',
                   'Eats well because it feels natural.',
                   'Prioritises health because they understand its value.',
                   'Lives with greater energy, confidence, and vitality.'
                 ].map((text, i) => (
                    <div key={i} className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                       <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
                         <Check className="w-4 h-4 text-[#003460]" />
                       </div>
                       <span className="font-semibold text-[#003460]">{text}</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* ── THE KAYAPALAT METHOD ── */}
      <section className="bg-white pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="order-2 lg:order-1 relative rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1599552683573-9dc48255fe85?auto=format&fit=crop&w=800&q=80"
                alt="Methodology"
                className="w-full h-[600px] object-cover block"
              />
              {/* Glassmorphic Method Overlay */}
              <div className="absolute inset-0 bg-[#003460]/20" />
              <div className="absolute bottom-8 left-8 right-8 bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl p-6 text-white shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
                <p className="text-lg font-semibold leading-relaxed">
                  "When these three work together, healthy habits become easier, progress becomes sustainable, and wellness becomes part of who you are."
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <Tag text="The Kayapalat Method" />
              <h2 className="mt-6 mb-6 text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.08] text-[#003460]">
                Lasting transformation requires{' '}
                <span className="border-b-[4px] border-slate-400">alignment.</span>
              </h2>
              <p className="text-[#0d0d0d] text-base leading-relaxed max-w-md mb-10 font-medium">
                Lasting transformation requires more than food and exercise. It requires alignment across all pillars of your health.
              </p>

              <div className="space-y-4">
                {[
                  { icon: <Activity className="w-6 h-6 text-[#003460]" />, title: 'Physical Wellness', desc: 'Food & Movement' },
                  { icon: <HeartPulse className="w-6 h-6 text-[#003460]" />, title: 'Physiological Wellness', desc: 'Metabolism & Hormones' },
                  { icon: <Brain className="w-6 h-6 text-[#003460]" />, title: 'Psychological Wellness', desc: 'Thoughts & Emotions' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-5 bg-[#f8fafc] border border-slate-200 rounded-2xl p-5 hover:-translate-y-1 transition-transform">
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

          </div>
        </div>
      </section>

      {/* ── WHO IT IS FOR / NOT FOR ── */}
      <section className="bg-[#f8fafc] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Who it is for */}
            <div className="bg-white border-2 border-green-100 rounded-[2rem] p-10 shadow-lg">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-[#003460]">Who The Platinum Plan Is For</h3>
              </div>
              <ul className="space-y-5">
                {[
                  'Members who have completed at least 3 months with Kayapalat',
                  'Individuals committed to making wellness a lifelong lifestyle',
                  'Members who want deeper support and long-term accountability',
                  'Individuals who want to maintain and build upon their results',
                  'People who value community, learning, and continuous growth'
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-[15px] font-medium text-[#0d0d0d]">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Who it is not for */}
            <div className="bg-white border-2 border-slate-100 rounded-[2rem] p-10 shadow-lg">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                  <X className="w-6 h-6 text-slate-400" />
                </div>
                <h3 className="text-2xl font-bold text-[#003460]">Who It Is Not For</h3>
              </div>
              <ul className="space-y-5">
                {[
                  'Individuals looking for a quick transformation',
                  'People unwilling to commit to their health',
                  'Members looking for temporary solutions',
                  'Those who see wellness as a short-term project'
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />
                    <span className="text-[15px] font-medium text-[#0d0d0d]">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ── THE RIPPLE EFFECT ── */}
      <section className="py-24 relative bg-[#003460] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1528716321680-815a8cdb8cbe?auto=format&fit=crop&w=1200&q=80')] opacity-20 mix-blend-overlay object-cover" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
           <Zap className="w-12 h-12 text-slate-300 mx-auto mb-6" />
           <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-8">
              The Ripple Effect Of Transformation
           </h2>
           <p className="text-xl text-white/90 leading-relaxed mb-8 font-medium">
              The greatest benefit of Platinum isn't what happens to you. It's what happens around you.
           </p>
           <div className="flex flex-wrap justify-center gap-4 mb-10">
              {['Your family notices.', 'Your friends notice.', 'Your colleagues notice.', 'Your energy changes.', 'Your confidence grows.', 'Your standards rise.'].map((text, i) => (
                 <span key={i} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 text-white text-sm font-semibold">
                    {text}
                 </span>
              ))}
           </div>
           <p className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400 font-bold">
              And without trying, you inspire others to elevate their own lives.<br/> That is the true power of lasting transformation.
           </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Tag text="FAQ" />
            <h2 className="mt-4 text-4xl lg:text-5xl font-bold tracking-tight text-[#003460]">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { q: 'Who is eligible for the Platinum Plan?', a: 'Available to members who have completed at least 3 months with Kayapalat and are ready to commit to long-term transformation.' },
              { q: 'Why is Platinum offered as a 6-month commitment?', a: 'Because lasting change takes time. The six-month structure allows habits, routines, and behaviours to become deeply ingrained, significantly increasing the likelihood of maintaining results long term.' },
              { q: 'Is the Wellness Retreat included?', a: 'Yes. The Platinum Plan includes a complimentary Kayapalat Wellness Retreat as part of your membership benefits. Please check current retreat schedules with your Coach.' },
              { q: 'What makes Platinum different from Elite?', a: 'Elite focuses on accelerated transformation through personalised coaching and accountability. Platinum focuses on sustaining results, deepening habits, and making wellness a permanent lifestyle.' },
              { q: 'Can I join Platinum directly?', a: 'No. Platinum is reserved for members who have already completed at least 3 months within the Kayapalat ecosystem. This ensures members have a strong foundation before progressing.' },
              { q: 'What if I have already reached my Ideal Body Weight?', a: 'That\'s often when Platinum becomes most valuable. The goal is not simply to reach a result. The goal is to maintain and build upon it for life.' },
              { q: 'Will I continue receiving coaching support?', a: 'Absolutely. Platinum Members continue to receive coaching, accountability, guidance, and community support throughout their membership.' },
              { q: 'Why do members choose Platinum?', a: 'Because they no longer want wellness to be something they start and stop. They want health, fitness, and happiness to become part of who they are.' },
            ].map((faq, i) => (
              <div key={i} className="bg-[#f8fafc] border border-slate-200 rounded-2xl p-7 hover:shadow-md transition-all">
                <h3 className="font-bold text-lg text-[#003460] mb-3 leading-snug">{faq.q}</h3>
                <p className="text-sm text-[#0d0d0d] leading-relaxed font-medium">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="bg-white py-12 pb-24">
        <div className=" px-6">
          <div className="bg-gradient-to-br from-[#002a4d] to-[#001b33] rounded-[3rem] px-8 py-10 lg:px-20 text-center relative overflow-hidden shadow-2xl">
            {/* Cinematic Glass Details */}
            <div className="absolute top-0 left-1/4 right-1/4 h-[4px] bg-gradient-to-r from-transparent via-slate-400 to-transparent" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80')] opacity-10 mix-blend-overlay object-cover" />

            <div className="relative z-10">
              <span className="bg-white/10 backdrop-blur-md text-slate-300 border border-white/20 rounded-full px-5 py-2 text-xs font-black uppercase tracking-widest inline-block mb-8 shadow-sm">
                Final Step
              </span>
              <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.1] mb-6">
                Ready To Make Wellness <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-500">A Way Of Life?</span>
              </h2>
              <p className="text-white/90 text-lg leading-relaxed max-w-4xl mx-auto mb-10 font-medium">
                You have already proven that change is possible. Now it's time to make it permanent. Join a community of individuals committed not only to achieving results, but to sustaining them for a lifetime.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <PaymentButton plan="Platinum" amount={300} purpose="platinum_upgrade" buttonText="Upgrade To Platinum" variant="primary" />
                <span className="text-white/60 font-medium italic">or</span>
                <BookingComponent pricing={false} navbar={false} customText="Book A Call" />
              </div>

              <div className="flex items-center justify-center gap-10 flex-wrap">
                {[
                  [<Infinity className="w-5 h-5 text-slate-400" />, 'Lifelong Results'],
                  [<ShieldCheck className="w-5 h-5 text-slate-400" />, 'Deep Accountability'],
                  [<Star className="w-5 h-5 text-slate-400" />, 'Exclusive Community'],
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
    <span className="bg-slate-200/50 text-[#003460] border border-slate-300 rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-widest inline-block shadow-sm">
      {text}
    </span>
  );
}