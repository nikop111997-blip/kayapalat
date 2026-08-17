import { ArrowUp, TrendingUp } from "lucide-react";

import PageContainer from "./PageContainer";

export default function ImprovementSimulatorPage({ report }) {
  const simulator = report.simulator;

  return (
    <PageContainer
      title="Improvement Simulator"
      subtitle="See How Small Changes Can Improve Your Health"
    >
      {/* Current vs Potential */}
      <div className="grid grid-cols-3 gap-8 items-center mb-14">
        <div className="text-center">
          <p className="uppercase tracking-[3px] text-[11px] text-gray-400 font-semibold">
            Current
          </p>

          <h1 className="text-6xl font-semibold text-red-500 mt-3 tracking-tight">
            {report.score}
          </h1>
        </div>

        <div className="flex justify-center">
          <ArrowUp size={34} className="text-emerald-600" strokeWidth={1.75} />
        </div>

        <div className="text-center">
          <p className="uppercase tracking-[3px] text-[11px] text-gray-400 font-semibold">
            Possible
          </p>

          <h1 className="text-6xl font-semibold text-emerald-600 mt-3 tracking-tight">
            {report.healthPotential.potentialScore}
          </h1>
        </div>
      </div>

      {/* Improvement Cards */}
      <div className="space-y-4">
        {simulator.map((item, index) => (
          <div key={index} className="rounded-md border border-gray-200 p-7">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[15px] font-semibold text-gray-900">
                {item.improvement}
              </h2>

              <span className="text-xl font-semibold text-emerald-600">
                +{item.gain}
              </span>
            </div>

            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-emerald-500"
                style={{ width: `${Math.min(item.gain * 10, 100)}%` }}
              />
            </div>

            <p className="mt-4 text-[13.5px] leading-6 text-gray-500">
              Improving <strong className="text-gray-700">{item.improvement}</strong> may
              contribute positively to your overall health score over time.
            </p>
          </div>
        ))}
      </div>

      {/* AI Motivation */}
      <div className="mt-14 rounded-md bg-gray-900 text-white p-9">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp size={18} />

          <h2 className="text-lg font-semibold tracking-tight">
            Your Next Best Opportunity
          </h2>
        </div>

        <p className="text-[14.5px] leading-7 text-gray-300">
          {report.ai.motivation}
        </p>
      </div>
    </PageContainer>
  );
}