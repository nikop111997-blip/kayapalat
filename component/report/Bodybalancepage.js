'use client'
import { Scale, Heart, Activity, Gauge, Ruler, User, Cake } from "lucide-react";

import PageContainer from "./PageContainer";

export default function BodyBalancePage({ report, answers }) {
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
                    <span className="text-[11.5px] text-gray-900 text-right">
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
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-[1.5px]">
            Body Shape
          </p>
          <p className="text-[12px] font-semibold text-gray-900">{report.bodyShape}</p>

                <p className="text-[11px] text-gray-400 font-medium mt-3">Category</p>
                <p className="text-[13.5px] font-semibold text-emerald-700">
                  {bodyFat.category || "Not Available"}
                </p>
              </div>
              
            </div>
         
          </div>
          {report?.bodyAnalysis?.bodyShape && (
        <div>
          <h3 className="mb-4 text-sm font-semibold text-gray-900">
            Body Shape
          </h3>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              ["Overall", "overall"],
              ["Upper Body", "upperBody"]
            ].map(([label, key]) => {
              const value = report.bodyAnalysis.bodyShape?.[key];

              if (!value) return null;

              return (
                <div
                  key={key}
                  className="rounded-md border border-gray-200 bg-gray-50/50 p-4"
                >
                  <p className="mb-1 text-xs font-medium  tracking-wide text-gray-600 font-semibold ">
                    {label}
                  </p>

                  <p className="text-xs leading-5 text-gray-700">
                    {value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
        </div>

        {/* RIGHT: overall fitness score bars */}
        <div className="col-span-7">
          <div className="rounded-md border border-gray-200 px-4 py-2.5 text-center bg-gray-50 ">
                <p className="text-[10px] uppercase tracking-[1.5px] text-gray-400 font-semibold">
                  Overall Score
                </p>
                <p className="text-2xl font-semibold text-emerald-700 leading-tight">
                  {overallOutOf10}
                  <span className="text-[13px] text-gray-400 font-medium">/10</span>
                </p>
              </div>
          <div className="rounded-md border border-gray-200 p-6 mt-3">
            <div className="flex items-start justify-between mb-5">
              <h2 className="text-[13px] font-semibold uppercase tracking-[2px] text-gray-500">
                Overall Fitness Score
              </h2>

            
            </div>

            <div className="grid grid-cols-2 gap-3 space-y-4">
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
            
       <div className="mt-3">
  <div className="mb-3">
    <h3 className="text-sm font-semibold text-gray-900">Photos</h3>
    <p className="text-xs text-gray-500">
      Photos provided for the health assessment
    </p>
  </div>

  {answers?.photos &&
  typeof answers.photos === "object" &&
  Object.values(answers.photos).some(Boolean) ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        { key: "front", label: "Front View" },
        { key: "side", label: "Side View" },
      ].map(({ key, label }) => {
        const photo = answers.photos?.[key];

        return (
          <div
            key={key}
            className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
          >
            <div className="relative aspect-[4/6.1] bg-gray-100">
              {photo ? (
                <img
                  src={photo}
                  alt={`${label} health assessment`}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.nextElementSibling.style.display = "flex";
                  }}
                />
              ) : null}

              {/* Image fallback */}
              <div
                className={`absolute inset-0 ${
                  photo ? "hidden" : "flex"
                } items-center justify-center`}
              >
                <div className="text-center px-4">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                    <svg
                      className="h-6 w-6 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 16l5-5a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L21 14m-9-7h.01M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>

                  <p className="text-sm font-medium text-gray-600">
                    Photo unavailable
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    {label} was not provided
                  </p>
                </div>
              </div>

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-10">
                <span className="text-xs font-semibold text-white">
                  {label} - <span className="text-[8px] capitalize bg-green-800/10 rounded-sm px-4 py-0.5 border broder-green-300 text-green-50 backdrop-blur-lg">Quality - {report.bodyAnalysis.imageQuality.front.quality}</span>
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    /* Complete fallback */
    <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center">
      <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
        <svg
          className="h-7 w-7 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 16l5-5a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L21 14m-9-7h.01M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      </div>

      <p className="text-sm font-semibold text-gray-700">
        No Photos Provided
      </p>

      <p className="mt-1 text-xs text-gray-500">
        No assessment photos were uploaded.
      </p>
    </div>
  )}
</div>
        </div>
      </div>
<div className="grid grid-cols-1 gap-3 sm:grid-cols-3 mt-4">
            {[
              ["Midsection", "midsection"],
              ["Lower Body", "lowerBody"],
              ["Symmetry", "symmetry"],
            ].map(([label, key]) => {
              const value = report.bodyAnalysis.bodyShape?.[key];

              if (!value) return null;

              return (
                <div
                  key={key}
                  className="rounded-md border border-gray-200 bg-gray-50/50 p-4"
                >
                  <p className="mb-1 text-xs font-medium  tracking-wide text-gray-600 font-semibold ">
                    {label}
                  </p>

                  <p className="text-xs leading-5 text-gray-700">
                    {value}
                  </p>
                </div>
              );
            })}
          </div>
      {/* Body Shape + Analysis */}
            <div className="mt-6 rounded-md bg-gray-900 text-white px-8 py-4">
        <h2 className="text-lg font-semibold tracking-tight">Body Analysis</h2>
        <p className="mt-4 text-[12px] leading-7 text-gray-100">{report.ai.bodyAnalysis}</p>
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
          stroke="green"
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