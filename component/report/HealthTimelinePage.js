import { Calendar, TrendingUp, TrendingDown } from "lucide-react";

import PageContainer from "./PageContainer";

export default function HealthTimelinePage({ report }) {
  return (
    <PageContainer title="Health Timeline" subtitle="Your Possible Health Journey">
      <div className="relative mt-6">
        {/* Center Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2" />

        <div className="space-y-8">
          {report.timeline.map((item, index) => (
            <div key={index} className="grid grid-cols-2 gap-10 items-center">
              {/* LEFT */}
              <div className={index % 2 === 0 ? "text-right pr-10" : "order-2 pl-10"}>
                <div className="bg-white rounded-md border border-gray-200 p-6">
                  <div className="flex items-center gap-2.5 justify-center mb-3">
                    <Calendar className="text-emerald-700" size={15} />

                    <h3 className="text-[15px] font-semibold text-gray-900">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-[13px] text-gray-500 leading-6">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div className={index % 2 === 0 ? "pl-10" : "order-1 text-right pr-10"}>
                <div className="w-3.5 h-3.5 bg-emerald-600 rounded-full mx-auto border-4 border-white shadow-[0_0_0_1px_#E5E5E5]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Projection */}
      <div className="grid grid-cols-2 gap-5 mt-24">
        <div className="rounded-md bg-red-50 border border-red-100 p-7">
          <div className="flex items-center gap-2.5 mb-3">
            <TrendingDown className="text-red-600" size={16} />

            <h2 className="text-[15px] font-semibold text-gray-900">
              If Nothing Changes
            </h2>
          </div>

          <p className="text-[13.5px] leading-6 text-gray-600">
            {report.ai.futureStory.ifNoChange}
          </p>
        </div>

        <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-7">
          <div className="flex items-center gap-2.5 mb-3">
            <TrendingUp className="text-emerald-700" size={16} />

            <h2 className="text-[15px] font-semibold text-gray-900">
              If Positive Changes Are Made
            </h2>
          </div>

          <p className="text-[13.5px] leading-6 text-gray-600">
            {report.ai.futureStory.ifImproved}
          </p>
        </div>
      </div>

      {/* Numeric Projection */}
      {report.futureProjection && (
        <div className="mt-10 rounded-md border border-gray-200 p-7">
          <h2 className="text-[15px] font-semibold text-gray-900 mb-5">
            Projected Trend If Habits Stay The Same
          </h2>

          <div className="grid grid-cols-3 gap-4">
            {report.futureProjection.map((point, index) => (
              <div key={index} className="rounded-md bg-gray-50 border border-gray-100 p-5 text-center">
                <p className="text-[10.5px] uppercase tracking-[2px] text-gray-400 font-semibold">
                  {point.years} {point.years === 1 ? "Year" : "Years"}
                </p>

                <h3 className="text-2xl font-semibold text-gray-900 mt-3 tracking-tight">
                  {point.estimatedScore}
                </h3>

                <p className="text-[11.5px] text-gray-400 mt-0.5">Projected Score</p>

                <p className="text-[13px] text-gray-600 mt-3 pt-3 border-t border-gray-200">
                  ~{point.estimatedWeight} kg
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageContainer>
  );
}