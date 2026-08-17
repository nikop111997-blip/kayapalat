import { ArrowRight, TrendingUp, Target, Trophy } from "lucide-react";

import PageContainer from "./PageContainer";

export default function HealthPotentialPage({ report }) {
  const potential = report.healthPotential;

  return (
    <PageContainer title="Health Potential" subtitle="Your Opportunity For Improvement">
      {/* Hero */}
      <div className="grid grid-cols-3 gap-8 items-center">
        <div className="text-center">
          <p className="uppercase tracking-[3px] text-[11px] text-gray-400 font-semibold">
            Current Score
          </p>

          <h1 className="text-6xl font-semibold text-red-500 mt-4 tracking-tight">
            {potential.currentScore}
          </h1>
        </div>

        <div className="flex justify-center">
          <ArrowRight size={40} className="text-emerald-600" strokeWidth={1.75} />
        </div>

        <div className="text-center">
          <p className="uppercase tracking-[3px] text-[11px] text-gray-400 font-semibold">
            Potential Score
          </p>

          <h1 className="text-6xl font-semibold text-emerald-600 mt-4 tracking-tight">
            {potential.potentialScore}
          </h1>
        </div>
      </div>

      {/* Gain */}
      <div className="mt-14 grid grid-cols-3 gap-5">
        <Card icon={TrendingUp} title="Possible Gain" value={`+${potential.possibleGain}`} />
        <Card icon={Target} title="Estimated Time" value={potential.timeframe} />
        <Card icon={Trophy} title="Potential Level" value={potential.level} />
      </div>

      {/* Progress */}
      <div className="mt-14">
        <div className="flex justify-between mb-2.5 text-[12px] font-medium text-gray-500">
          <span>Current</span>
          <span>Potential</span>
        </div>

        <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full"
            style={{ width: `${potential.potentialScore}%` }}
          />
        </div>
      </div>

      {/* AI Story */}
      <div className="mt-14 rounded-md bg-gray-900 text-white p-9">
        <h2 className="text-lg font-semibold tracking-tight">Your Health Potential</h2>

        <p className="mt-4 text-[14.5px] leading-7 text-gray-300">
          {report.ai.healthPotentialStory}
        </p>
      </div>
    </PageContainer>
  );
}

function Card({ icon: Icon, title, value }) {
  return (
    <div className="rounded-md border border-gray-200 p-6 text-center">
      <Icon size={22} className="mx-auto text-emerald-700 mb-4" strokeWidth={1.75} />

      <p className="uppercase text-[10px] tracking-[2px] text-gray-400 font-semibold">
        {title}
      </p>

      <h2 className="text-2xl font-semibold mt-3 text-gray-900 tracking-tight">
        {value}
      </h2>
    </div>
  );
}