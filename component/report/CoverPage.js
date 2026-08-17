import { MapPin, HeartPulse, Sparkles, User, Calendar } from "lucide-react";

export default function CoverPage({ report }) {
  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const scoreColor =
    report.score >= 80
      ? "text-emerald-700"
      : report.score >= 60
      ? "text-amber-600"
      : report.score >= 40
      ? "text-orange-600"
      : "text-red-600";

  return (
    <section
      className="relative rounded-[28px] p-14 md:p-16 mb-10  overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-16px_rgba(0,0,0,0.08)] border border-gray-100 font-sans"
      style={{
        background: "linear-gradient(160deg, #ECFBF8 0%, #D3F1EC 32%, #FFFFFF 72%)",
      }}
    >
      {/* large arc bleeding off the edge, echoing the badge motif */}
      <svg
        className="absolute -bottom-48 -left-48 w-[620px] h-[620px] opacity-[0.15] pointer-events-none"
        viewBox="0 0 620 620"
      >
        <circle cx="310" cy="310" r="308" fill="none" stroke="#0F766E" strokeWidth="1" />
        <circle cx="310" cy="310" r="240" fill="none" stroke="#0F766E" strokeWidth="1" />
      </svg>

      <div className="relative z-10">
        {/* Top bar */}
        <div className="flex items-start justify-between">
          <img src="https://www.kayapalat.in/_next/image?url=https%3A%2F%2Fframerusercontent.com%2Fimages%2FmsjGzrRn1eu9rQWQOuvoSNpE2yE.png%3Fscale-down-to%3D512%26width%3D644%26height%3D164&w=256&q=75" alt="" 
          className="w-40 invert-100"
          />
          {/* Rotating badge */}
          <div className="relative w-[112px] h-[112px]">
            <svg viewBox="0 0 112 112" className="w-full h-full">
              <defs>
                <path
                  id="badgeCircle"
                  d="M 56,56 m -43,0 a 43,43 0 1,1 86,0 a 43,43 0 1,1 -86,0"
                />
              </defs>

              <circle cx="56" cy="56" r="53" fill="none" stroke="#0F766E" strokeOpacity="0.35" strokeWidth="1" />
              <circle cx="56" cy="56" r="25" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1" />

              <text fontSize="7.4" fontWeight="700" letterSpacing="2.4" fill="#0F766E">
                <textPath href="#badgeCircle" startOffset="0%">
                  HEALTH REALITY REPORT &#8226; HEALTH REALITY REPORT &#8226;
                </textPath>
              </text>
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <img src="https://www.kayapalat.in/3.png"  className="w-12 invert-100"/>
            </div>
          </div>
        </div>

        {/* Eyebrow + Headline */}
        <div className="mt-4">
          <p className="uppercase tracking-[4px] text-[11px] font-semibold text-emerald-700">
            Prepared Exclusively For You
          </p>

          <h1 className="mt-4 text-gray-900 leading-[0.95]">
            <span className="block text-[40px] font-light tracking-tight">Health</span>
            <span className="block text-[48px] font-bold tracking-tight">Reality Report</span>
          </h1>

          <p className="mt-4 text-[14.5px] text-gray-500 max-w-lg leading-6">
            {report.ai.coverHeadline}
          </p>
        </div>

        {/* Big score, styled like the poster's date range */}
        <div className="mt-12 flex items-end gap-5">
          <h2 className={`text-[78px] leading-[0.85] font-semibold tracking-tight text-green-700`}>
            {report.score}
          </h2>

          <div className="pb-3">
            <p className="text-gray-900 text-[13.5px] font-semibold">{report.scoreLabel}</p>
            <p className="text-gray-700 text-[12px] mt-0.5">Out of 100</p>
          </div>
        </div>

        {/* Persona + Prepared For */}
        <div className="grid grid-cols-2 gap-5 mt-10">
          <div className="rounded-md bg-white/80 backdrop-blur-sm border border-emerald-100 p-6">
            <div className="flex items-center gap-3">
              <Sparkles className="text-emerald-700" size={17} />

              <div>
                <p className="text-[10px] uppercase tracking-[2px] text-gray-400 font-semibold">
                  Health Persona
                </p>

                <h3 className="text-[15px] font-semibold mt-0.5 text-gray-900 tracking-tight">
                  {report.healthPersona.title}
                </h3>
              </div>
            </div>

            <p className="mt-3 text-[12.5px] leading-5 text-gray-600">
              {report.healthPersona.description}
            </p>
          </div>

          <div className="rounded-md bg-white/80 backdrop-blur-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2.5 mb-3">
              <User className="text-emerald-700" size={15} />
              <span className="text-[12.5px] font-semibold text-gray-900">Prepared For</span>
            </div>

            <h3 className="text-lg font-semibold text-gray-900">User</h3>

            <div className="flex items-center gap-2 mt-4">
              <Calendar className="text-gray-400" size={14} />
              <span className="text-[12.5px] text-gray-500">{today}</span>
            </div>
          </div>
        </div>

        {/* Mini Metric Cards */}
        <div className="grid grid-cols-5 gap-3 mt-6">
          <MiniMetric title="BMI" value={report.bmi} />
          <MiniMetric title="WHtR" value={report.whtr} />
          <MiniMetric title="Body Fat" value={`${report.bodyFat.value}%`} />
          <MiniMetric title="Biological Age" value={`${report.biologicalAge} yrs`} />
          <MiniMetric title="Potential" value={`+${report.healthPotential.possibleGain}`} />
        </div>

        {/* Quote */}
        <div className="mt-6 rounded-lg bg-white border border-gray-200 p-7">
          <p className="text-[15px] font-normal leading-7 italic text-gray-700">
            "{report.ai.motivation}"
          </p>
        </div>

        {/* Location / meta line */}
        <div className="mt-6 flex items-center gap-2 text-gray-500">
          <MapPin size={14} className="text-emerald-700" />
          <span className="text-[12.5px] font-medium">
            Personalised Health Assessment &mdash; Generated {today}
          </span>
        </div>
      </div>
    </section>
  );
}

function MiniMetric({ title, value }) {
  return (
    <div className="rounded-md border border-gray-200 p-4 text-center bg-black">
      <p className="uppercase text-[9.5px] text-green-50 font-semibold">
        {title}
      </p>

      <h3 className="text-[17px] font-semibold mt-2 text-gray-50 tracking-tight">
        {value}
      </h3>
    </div>
  );
}