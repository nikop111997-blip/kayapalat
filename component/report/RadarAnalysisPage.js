import { Scale, Ruler, Activity, Moon, Brain } from "lucide-react";

import PageContainer from "./PageContainer";
import RadarChart from "./RadarChart";

const ICONS = {
  Weight: Scale,
  Waist: Ruler,
  Lifestyle: Activity,
  Sleep: Moon,
  Stress: Brain,
};

export default function RadarAnalysisPage({ report }) {
  const items = (report.charts?.radar || []).map((item) => ({
    icon: ICONS[item.subject] || Activity,
    title: item.subject,
    score: item.score,
  }));

  const barColor = (score) => {
    if (score >= 70) return "bg-emerald-500";
    if (score >= 45) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <PageContainer title="Performance Radar" subtitle="Health Balance Analysis">
      <div className="grid grid-cols-12 gap-10">
        {/* Radar */}
        <div className="col-span-7 flex justify-center items-center">
          <RadarChart report={report} />
        </div>

        {/* Scores */}
        <div className="col-span-5 space-y-3">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-md border border-gray-200 p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                    <Icon size={16} className="text-gray-700" />
                  </div>

                  <div>
                    <h3 className="text-[13.5px] font-semibold text-gray-900">
                      {item.title}
                    </h3>

                    <p className="text-[11.5px] text-gray-400">Current Score</p>
                  </div>
                </div>

                <div className="text-right w-24">
                  <h2 className="text-lg font-semibold text-gray-900">{item.score}</h2>

                  <div className="w-full h-1.5 rounded-full bg-gray-100 mt-2">
                    <div
                      className={`h-1.5 rounded-full ${barColor(item.score)}`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Insight */}
      <div className="mt-10 rounded-md bg-gray-900 p-8 text-white">
        <h2 className="text-lg font-semibold tracking-tight">Health Balance Insight</h2>

        <p className="mt-4 text-[14px] leading-7 text-gray-300">
          {report.ai.lifestyleAnalysis}
        </p>
      </div>
    </PageContainer>
  );
}