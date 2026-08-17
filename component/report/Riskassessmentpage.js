import { AlertTriangle, ShieldAlert } from "lucide-react";

import PageContainer from "./PageContainer";

const levelStyles = {
  Low: { text: "text-emerald-700", bg: "bg-emerald-50", bar: "bg-emerald-500", ring: "border-emerald-100" },
  Moderate: { text: "text-amber-700", bg: "bg-amber-50", bar: "bg-amber-500", ring: "border-amber-100" },
  High: { text: "text-red-700", bg: "bg-red-50", bar: "bg-red-500", ring: "border-red-100" },
};

export default function TakeKill({ report }) {
  const risks = report.riskAssessment || [];
  const insights = [...(report.insights || [])].sort((a, b) => a.priority - b.priority);

  return (
    <PageContainer
      title="Risk Assessment"
      subtitle="Where Attention Matters Most"
      eyebrowRight={`${risks.length} Factors Reviewed`}
    >
      {/* Risk cards */}
      <div className="grid grid-cols-2 gap-4">
        {risks.map((risk, index) => {
          const style = levelStyles[risk.level] || levelStyles.Moderate;

          return (
            <div key={index} className={`rounded-md border border-gray-200 bg-white p-6`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${style.bg} flex items-center justify-center text-lg`}>
                    {risk.icon}
                  </div>

                  <h3 className="text-[14.5px] font-semibold text-gray-900 leading-tight">
                    {risk.title}
                  </h3>
                </div>

                <span
                  className={`shrink-0 text-[10.5px] font-semibold uppercase tracking-[1px] px-2.5 py-1 rounded-md ${style.bg} ${style.text}`}
                >
                  {risk.level}
                </span>
              </div>

              <p className="text-[13px] leading-6 text-gray-600 mt-4">
                {risk.description}
              </p>

              <div className="w-full h-1.5 rounded-full bg-gray-100 mt-5">
                <div
                  className={`h-1.5 rounded-full ${style.bar}`}
                  style={{ width: `${risk.score}%` }}
                />
              </div>

              <div className="flex justify-between mt-1.5">
                <span className="text-[10.5px] text-gray-400">Risk Score</span>
                <span className="text-[10.5px] font-semibold text-gray-500">
                  {risk.score}/100
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Warnings / Insights */}
      {insights.length > 0 && (
        <div className="mt-80">
          <div className="flex items-center gap-2.5 mb-5">
            <ShieldAlert size={17} className="text-amber-600" />

            <h2 className="text-[16px] font-semibold text-gray-900 tracking-tight">
              Key Warnings To Watch
            </h2>
          </div>

          <div className="space-y-3">
            {insights.map((insight, index) => (
              <div
                key={index}
                className="rounded-md border border-amber-100 bg-amber-50/60 p-5 flex gap-4"
              >
                <AlertTriangle size={16} className="text-amber-600 mt-0.5 shrink-0" />

                <div>
                  <p className="text-[13.5px] font-semibold text-gray-900">
                    {insight.title}
                  </p>

                  <p className="text-[13px] leading-6 text-gray-600 mt-1">
                    {insight.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageContainer>
  );
}