import { CheckCircle2, AlertTriangle, Star, Award, Lightbulb } from "lucide-react";

import PageContainer from "./PageContainer";

const priorityStyles = {
  High: { text: "text-red-700", bg: "bg-red-50" },
  Medium: { text: "text-amber-700", bg: "bg-amber-50" },
  Low: { text: "text-emerald-700", bg: "bg-emerald-50" },
};

export default function StrengthsPage({ report }) {
  const ai = report.ai;

  return (
    <PageContainer
      title="Personal Health Review"
      subtitle="Strengths & Areas For Improvement"
    >
      {/* Achievement badges */}
      {report.badges?.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-8">
          {report.badges.map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-2.5 rounded-md border border-gray-200 bg-white pl-2.5 pr-4 py-2"
            >
              <div className="w-6 h-6 rounded-full bg-amber-50 flex items-center justify-center text-[13px]">
                {badge.icon}
              </div>

              <span className="text-[12.5px] font-semibold text-gray-800">
                {badge.title}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="rounded-md border border-emerald-100 bg-emerald-50 p-8">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle2 size={20} className="text-emerald-700" />

            <h2 className="text-lg font-semibold text-gray-900 tracking-tight">
              Your Strengths
            </h2>
          </div>

          <div className="space-y-3.5">
            {ai.strengths.map((item, index) => (
              <div key={index} className="flex gap-3 items-start">
                <Star className="text-emerald-600 mt-0.5" size={14} />

                <p className="text-[13.5px] leading-6 text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Attention */}
        <div className="rounded-md border border-amber-100 bg-amber-50 p-8">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle size={20} className="text-amber-600" />

            <h2 className="text-lg font-semibold text-gray-900 tracking-tight">
              Focus Areas
            </h2>
          </div>

          <div className="space-y-3.5">
            {ai.attentionAreas.map((item, index) => (
              <div key={index} className="flex gap-3 items-start">
                <AlertTriangle className="text-amber-500 mt-0.5" size={13} />

                <p className="text-[13.5px] leading-6 text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Priority Actions */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-6 text-gray-900 tracking-tight">
          Recommended Priority Actions
        </h2>

        <div className="space-y-3">
          {(report.healthPriorities || []).map((action, index) => {
            const style = priorityStyles[action.priority] || priorityStyles.Medium;

            return (
              <div
                key={index}
                className="flex items-center gap-5 rounded-md border border-gray-200 p-6"
              >
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-lg shrink-0">
                  {action.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5">
                    <p className="text-[14px] font-semibold text-gray-900">
                      {action.title}
                    </p>

                    <span
                      className={`text-[10px] font-semibold uppercase tracking-[1px] px-2 py-0.5 rounded-full ${style.bg} ${style.text}`}
                    >
                      {action.priority}
                    </span>
                  </div>

                  <p className="text-[13px] text-gray-500 leading-6 mt-1">
                    {action.description}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-lg font-semibold text-emerald-600">
                    +{action.impact}
                  </p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-[1px]">
                    Impact
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Myths vs Facts */}
      {ai.mythsToKnow?.length > 0 && (
        <div className="mt-32">
          <div className="flex items-center gap-2.5 mb-6">
            <Lightbulb size={18} className="text-gray-700" />

            <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
              Myths Worth Knowing
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {ai.mythsToKnow.map((myth, index) => (
              <div key={index} className="rounded-md border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Award size={13} className="text-gray-400" />
                  <p className="text-[11px] uppercase tracking-[1.5px] text-gray-400 font-semibold">
                    Myth
                  </p>
                </div>

                <p className="text-[13.5px] font-semibold text-gray-900 mb-3">
                  {myth.title}
                </p>

                <p className="text-[13px] leading-6 text-gray-600">{myth.fact}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageContainer>
  );
}