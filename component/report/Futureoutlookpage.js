import { TrendingDown, TrendingUp, ListChecks, ShieldAlert } from "lucide-react";

import PageContainer from "./PageContainer";
import ProjectionChart from "./Projectionchart";

const levelStyles = {
  Low: { text: "text-emerald-700", bg: "bg-emerald-50" },
  Moderate: { text: "text-amber-700", bg: "bg-amber-50" },
  High: { text: "text-red-700", bg: "bg-red-50" },
};

export default function FutureOutlookPage({ report, actions = [] }) {
  const ai = report.ai || {};
  const risks = report.riskAssessment || [];
  const projection = report.charts?.projection?.length ? report.charts.projection : report.futureProjection;

  return (
    <PageContainer title="Future Outlook" subtitle="Where Your Current Habits Are Heading">
      {/* If nothing changes / if improved */}
      <div className="grid grid-cols-2 gap-5">
        <div className="rounded-md bg-red-50 border border-red-100 p-7">
          <div className="flex items-center gap-2.5 mb-3">
            <TrendingDown className="text-red-600" size={16} />
            <h2 className="text-[14.5px] font-semibold text-gray-900">If Nothing Changes</h2>
          </div>
          <p className="text-[13px] leading-6 text-gray-600">{ai.futureStory?.ifNoChange}</p>
        </div>

        <div className="rounded-md bg-emerald-50 border border-emerald-100 p-7">
          <div className="flex items-center gap-2.5 mb-3">
            <TrendingUp className="text-emerald-700" size={16} />
            <h2 className="text-[14.5px] font-semibold text-gray-900">If You Take Action</h2>
          </div>
          <p className="text-[13px] leading-6 text-gray-600">{ai.futureStory?.ifImproved}</p>
        </div>
      </div>

      {/* Chart + numeric projection */}
      {projection?.length > 0 && (
        <div className="mt-6 rounded-md border border-gray-200 p-7">
          <h2 className="text-[15px] font-semibold text-gray-900 mb-1">
            Projected Score If Habits Stay The Same
          </h2>
          <p className="text-[12px] text-gray-400 mb-2">Based on your current trajectory</p>

          <ProjectionChart report={report} />

          <div className="grid gap-4 mt-4" style={{ gridTemplateColumns: `repeat(${projection.length}, minmax(0,1fr))` }}>
            {projection.map((point, i) => (
              <div key={i} className="rounded-md bg-gray-50 border border-gray-100 p-4 text-center">
                <p className="text-[10px] uppercase tracking-[2px] text-gray-400 font-semibold">
                  {point.label || `${point.years} Yrs`}
                </p>
                <h3 className="text-xl font-semibold text-gray-900 mt-2 tracking-tight">
                  {point.healthScore ?? point.estimatedScore}
                </h3>
                <p className="text-[11px] text-gray-400">Score</p>
                <p className="text-[12px] text-gray-600 mt-2 pt-2 border-t border-gray-200">
                  ~{point.weight ?? point.estimatedWeight} kg
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Risk cards */}
      {risks.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center gap-2.5 mb-4">
            <ShieldAlert size={17} className="text-amber-600" />
            <h2 className="text-[16px] font-semibold text-gray-900 tracking-tight">
              Risk Factors To Watch
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {risks.map((risk, i) => {
              const style = levelStyles[risk.level] || levelStyles.Moderate;
              return (
                <div key={i} className="rounded-md border border-gray-200 p-4 flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg ${style.bg} flex items-center justify-center text-base shrink-0`}>
                    {risk.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-[13px] font-semibold text-gray-900">{risk.title}</p>
                      <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${style.bg} ${style.text}`}>
                        {risk.level}
                      </span>
                    </div>
                    <p className="text-[12px] text-gray-500 leading-5 mt-1">{risk.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Course of Action — second half */}
      {actions.length > 0 && (
        <div className="mt-8 rounded-md border border-gray-200 p-8">
          <div className="flex items-center gap-2.5 mb-5">
            <ListChecks size={18} className="text-emerald-700" />
            <h2 className="text-[15px] font-semibold text-gray-900 tracking-tight">
              Course Of Action, Continued
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-3">
            {actions.map((item, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-4 h-4 rounded-[4px] border border-emerald-500 shrink-0 mt-0.5" />
                <p className="text-[13px] leading-6 text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageContainer>
  );
}