import { Calendar, ArrowRight, Target, Trophy, TrendingUp } from "lucide-react";

import PageContainer from "./PageContainer";

export default function JourneyPage({ report }) {
  const potential = report.healthPotential;
  const simulator = report.simulator || [];

  return (
    <PageContainer title="Your Health Journey" subtitle="Timeline, Potential & Next Opportunities">
      {/* Compact horizontal timeline */}
      <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${report.timeline.length}, minmax(0,1fr))` }}>
        {report.timeline.map((item, i) => (
          <div key={i} className="rounded-md border border-gray-200 p-4 text-center relative">
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <Calendar className="text-emerald-700" size={13} />
              <h3 className="text-[12.5px] font-semibold text-gray-900">{item.title}</h3>
            </div>
            <p className="text-[11px] text-gray-500 leading-5">{item.description}</p>
            {i < report.timeline.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-2 -translate-y-1/2 w-2 h-px bg-gray-200" />
            )}
          </div>
        ))}
      </div>

      {/* Potential */}
      <div className="mt-10 grid grid-cols-3 gap-8 items-center">
        <div className="text-center">
          <p className="uppercase tracking-[3px] text-[10.5px] text-gray-400 font-semibold">Current Score</p>
          <h1 className="text-5xl font-semibold text-red-500 mt-3 tracking-tight">{potential.currentScore}</h1>
        </div>

        <div className="flex justify-center">
          <ArrowRight size={32} className="text-emerald-600" strokeWidth={1.75} />
        </div>

        <div className="text-center">
          <p className="uppercase tracking-[3px] text-[10.5px] text-gray-400 font-semibold">Potential Score</p>
          <h1 className="text-5xl font-semibold text-emerald-600 mt-3 tracking-tight">{potential.potentialScore}</h1>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4">
        <Card icon={TrendingUp} title="Possible Gain" value={`+${potential.possibleGain}`} />
        <Card icon={Target} title="Estimated Time" value={potential.timeframe} />
        <Card icon={Trophy} title="Potential Level" value={potential.level} />
      </div>

      {/* Simulator (only if present) */}
      {simulator.length > 0 && (
        <div className="mt-8 space-y-3">
          <h2 className="text-[15px] font-semibold text-gray-900 mb-2">Improvement Simulator</h2>
          {simulator.map((item, i) => (
            <div key={i} className="rounded-md border border-gray-200 p-5 flex items-center justify-between">
              <p className="text-[13.5px] font-medium text-gray-900">{item.improvement}</p>
              <span className="text-lg font-semibold text-emerald-600">+{item.gain}</span>
            </div>
          ))}
        </div>
      )}

      {/* AI Story */}
      <div className="mt-10 rounded-md bg-gray-900 text-white p-9">
        <h2 className="text-lg font-semibold tracking-tight">Your Health Potential</h2>
        <p className="mt-4 text-[14px] leading-7 text-gray-300">{report.ai.healthPotentialStory}</p>
      </div>
    </PageContainer>
  );
}

function Card({ icon: Icon, title, value }) {
  return (
    <div className="rounded-md border border-gray-200 p-5 text-center">
      <Icon size={20} className="mx-auto text-emerald-700 mb-3" strokeWidth={1.75} />
      <p className="uppercase text-[9.5px] tracking-[2px] text-gray-400 font-semibold">{title}</p>
      <h2 className="text-xl font-semibold mt-2 text-gray-900 tracking-tight">{value}</h2>
    </div>
  );
}