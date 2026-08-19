import { CheckCircle2, AlertTriangle, Flame, ListChecks } from "lucide-react";

import PageContainer from "./PageContainer";

export default function PriorityActionPage({ report, actions = [] }) {
  const ai = report.ai || {};
  const strengths = ai.strengths || report.strengths || [];
  const attentionAreas = ai.attentionAreas?.length ? ai.attentionAreas : report.areasForAttention;
  const priorities = report.healthPriorities || [];

  return (
    <PageContainer title="Visual Assessment" subtitle="Your Strengths & Focus Areas">
      {/* Strengths / Focus Areas */}
      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-md border border-emerald-100 bg-emerald-50 p-7">
          <div className="flex items-center gap-2.5 mb-5">
            <CheckCircle2 size={18} className="text-emerald-700" />
            <h2 className="text-[15px] font-semibold text-gray-900 tracking-tight">
              Strengths
            </h2>
          </div>

          <div className="space-y-3">
            {strengths.map((item, i) => (
              <div key={i} className="flex gap-2.5 items-start">
                <CheckCircle2 size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                <p className="text-[13px] leading-6 text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-md border border-amber-100 bg-amber-50 p-7">
          <div className="flex items-center gap-2.5 mb-5">
            <AlertTriangle size={18} className="text-amber-600" />
            <h2 className="text-[15px] font-semibold text-gray-900 tracking-tight">
              Areas To Work On
            </h2>
          </div>

          {attentionAreas?.length ? (
            <div className="space-y-3">
              {attentionAreas.map((item, i) => (
                <div key={i} className="flex gap-2.5 items-start">
                  <AlertTriangle size={13} className="text-amber-500 mt-0.5 shrink-0" />
                  <p className="text-[13px] leading-6 text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[13px] leading-6 text-gray-600">
              No major focus areas were flagged in this assessment — the priority now is
              staying consistent with the habits that are already working.
            </p>
          )}
        </div>
      </div>

      {/* Priority Plan */}
      {priorities.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center gap-2.5 mb-4">
            <Flame size={17} className="text-emerald-700" />
            <h2 className="text-[16px] font-semibold text-gray-900 tracking-tight">
              Your Priority Plan
            </h2>
          </div>

          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: `repeat(${Math.min(priorities.length, 4)}, minmax(0, 1fr))` }}
          >
            {priorities.map((p, i) => (
              <div key={i} className="rounded-md border border-gray-200 p-5">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-lg mb-4">
                  {p.icon || "🎯"}
                </div>

                <p className="text-[10px] font-semibold uppercase tracking-[1px] text-emerald-600 mb-1">
                  Priority {i + 1}
                </p>

                <h3 className="text-[13.5px] font-semibold text-gray-900 leading-tight">
                  {p.title}
                </h3>

                <p className="text-[12.5px] text-gray-500 leading-5 mt-2">{p.description}</p>

                <p className="text-[12px] font-semibold text-emerald-600 mt-3">
                  +{p.impact} pts impact
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Course of Action — first half */}
      {actions.length > 0 && (
        <div className="mt-8 rounded-md bg-gray-900 text-white p-8">
          <div className="flex items-center gap-2.5 mb-5">
            <ListChecks size={18} className="text-emerald-400" />
            <h2 className="text-[15px] font-semibold tracking-tight">
              Your Course Of Action
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-3">
            {actions.map((item, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-4 h-4 rounded-[4px] border border-emerald-400 shrink-0 mt-0.5" />
                <p className="text-[13px] leading-6 text-gray-200">{item}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageContainer>
  );
}