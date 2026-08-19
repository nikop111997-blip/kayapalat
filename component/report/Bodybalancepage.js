import { Scale, Heart, Activity, Gauge, Ruler, User, Cake } from "lucide-react";

import PageContainer from "./PageContainer";

export default function BodyBalancePage({ report, answers = {} }) {
  const radarItems = report.charts?.radar || [];
  const bodyFat = report.bodyFat || {};

  const stats = [
    { icon: User, label: "Height", value: answers.height ? `${answers.height} cm` : "—" },
    { icon: Scale, label: "Weight", value: answers.weight ? `${answers.weight} kg` : "—" },
    { icon: Gauge, label: "BMI", value: `${report.bmi} (${report.bmiCategory})` },
    { icon: Ruler, label: "Waist", value: answers.waist ? `${answers.waist} cm` : "—" },
    { icon: Cake, label: "Biological Age", value: `${report.biologicalAge} yrs (vs ${answers.age ?? "—"} actual)` },
    { icon: Activity, label: "Waist-Height Ratio", value: `${report.whtr} — ${report.whtrRisk}` },
  ];

  const barColor = (score) => {
    if (score >= 70) return "bg-emerald-500";
    if (score >= 45) return "bg-amber-500";
    return "bg-red-500";
  };

  const overallOutOf10 = Math.round((report.score / 100) * 10 * 10) / 10;

  return (
    <PageContainer title="Body & Balance" subtitle="Your Current Physical Health">
      <div className="grid grid-cols-12 gap-6">
        {/* LEFT: stats + body fat donut */}
        <div className="col-span-5 space-y-5">
          <div className="rounded-md border border-gray-200 p-6">
            <h2 className="text-[13px] font-semibold uppercase tracking-[2px] text-gray-500 mb-5">
              Your Current Stats
            </h2>

            <div className="space-y-4">
              {stats.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 text-gray-500">
                      <Icon size={15} className="text-emerald-700" />
                      <span className="text-[13px]">{s.label}</span>
                    </div>
                    <span className="text-[13.5px] font-semibold text-gray-900 text-right">
                      {s.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-md border border-gray-200 p-6">
            <h2 className="text-[13px] font-semibold uppercase tracking-[2px] text-gray-500 mb-5">
              Estimated Body Fat
            </h2>

            <div className="flex items-center gap-6">
              <BodyFatDonut value={bodyFat.value} score={bodyFat.score} />

              <div>
                <p className="text-[11px] text-gray-400 font-medium">Estimated Body Fat</p>
                <h3 className="text-2xl font-semibold text-gray-900 tracking-tight">
                  {bodyFat.value != null ? `${bodyFat.value}%` : "—"}
                </h3>

                <p className="text-[11px] text-gray-400 font-medium mt-3">Category</p>
                <p className="text-[13.5px] font-semibold text-emerald-700">
                  {bodyFat.category || "Not Available"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: overall fitness score bars */}
        <div className="col-span-7">
          <div className="rounded-md border border-gray-200 p-6 h-full">
            <div className="flex items-start justify-between mb-5">
              <h2 className="text-[13px] font-semibold uppercase tracking-[2px] text-gray-500">
                Overall Fitness Score
              </h2>

              <div className="rounded-md border border-gray-200 px-4 py-2.5 text-center bg-gray-50">
                <p className="text-[10px] uppercase tracking-[1.5px] text-gray-400 font-semibold">
                  Overall Score
                </p>
                <p className="text-2xl font-semibold text-emerald-700 leading-tight">
                  {overallOutOf10}
                  <span className="text-[13px] text-gray-400 font-medium">/10</span>
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {radarItems.map((item) => (
                <div key={item.subject}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[13px] text-gray-700 font-medium">{item.subject}</span>
                    <span className="text-[12.5px] font-semibold text-gray-900">
                      {Math.round((item.score / 100) * 10 * 10) / 10}/10
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${barColor(item.score)}`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[13px] text-gray-700 font-medium flex items-center gap-1.5">
                    <Heart size={12} className="text-red-500" /> Health Risk
                  </span>
                  <span className="text-[12.5px] font-semibold text-gray-900">
                    {report.riskAssessment?.length
                      ? report.riskAssessment[0].level
                      : "Moderate"}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-amber-500"
                    style={{
                      width: `${
                        report.riskAssessment?.length
                          ? Math.round(
                              report.riskAssessment.reduce((s, r) => s + r.score, 0) /
                                report.riskAssessment.length
                            )
                          : 50
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body Shape + Analysis */}
      <div className="mt-6 rounded-md border border-gray-200 p-5 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
          <Activity size={17} className="text-violet-700" />
        </div>
        <div>
          <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-[1.5px]">
            Body Shape
          </p>
          <p className="text-[14px] font-semibold text-gray-900">{report.bodyShape}</p>
        </div>
      </div>

      <div className="mt-6 rounded-md bg-gray-900 text-white p-9">
        <h2 className="text-lg font-semibold tracking-tight">Body Analysis</h2>
        <p className="mt-4 text-[14px] leading-7 text-gray-100">{report.ai.bodyAnalysis}</p>
      </div>
    </PageContainer>
  );
}

function BodyFatDonut({ value, score }) {
  const size = 96;
  const strokeWidth = 11;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Fall back to the health-score-derived ring if a direct % isn't available
  const pct = value != null ? Math.min(value, 100) : score != null ? 100 - score : 50;
  const progress = circumference - (pct / 100) * circumference;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#F1F1F1" strokeWidth={strokeWidth} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#7C3AED"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[13px] font-semibold text-gray-900">
          {value != null ? `${value}%` : "—"}
        </span>
      </div>
    </div>
  );
}