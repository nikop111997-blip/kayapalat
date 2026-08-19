import { Brain, Activity, Heart, TrendingUp, Sparkles, ClipboardList, ArrowUpRight, ArrowDownRight } from "lucide-react";

import PageContainer from "./PageContainer";
import MetricCard from "./MetricCard";
import QuoteCard from "./QuoteCard";

export default function ExecutiveSummaryPage({ report }) {
  const ai = report.ai;

  return (
    <PageContainer title="Executive Health Assessment" subtitle="Understanding Your Current Health">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-4 gap-4 mb-7">
        <MetricCard icon={Activity} title="Health Score" value={report.score} subtitle={report.scoreLabel} color="emerald" />
        <MetricCard icon={Heart} title="BMI" value={report.bmi} subtitle={report.bmiCategory} color="red" />
        <MetricCard icon={TrendingUp} title="WHtR" value={report.whtr} subtitle={report.whtrRisk} color="orange" />
        <MetricCard
          icon={Sparkles}
          title="Body Fat"
          value={report.bodyFat?.value != null ? `${report.bodyFat.value}%` : "—"}
          subtitle="Estimated"
          color="violet"
        />
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* LEFT */}
        <div className="col-span-8 space-y-4">
          <Section icon={ClipboardList} title="Executive Summary" content={ai.executiveSummary} />
          <ScoreDrivers drivers={report.scoreDrivers} />
        </div>

        {/* RIGHT */}
        <div className="col-span-4 space-y-4">
          <div className="rounded-md bg-emerald-50 border border-emerald-100 p-5">
            <div className="flex items-center gap-2.5 mb-3">
              <Brain className="text-emerald-700" size={17} />
              <h3 className="font-semibold text-[15px] text-gray-900">Hidden Health Pattern</h3>
            </div>
            <p className="text-[13px] leading-6 text-gray-700">{ai.hiddenPatterns}</p>
          </div>

          
        </div>
      </div>
      
          <QuoteCard title="Coach's Observation" text={ai.coachSummary} />
    </PageContainer>
  );
}

function Section({ icon: Icon, title, content }) {
  return (
    <div className="bg-white rounded-md border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center">
          <Icon size={16} className="text-gray-700" />
        </div>
        <h2 className="text-[16px] font-semibold text-gray-900 tracking-tight">{title}</h2>
      </div>
      <p className="text-[13.5px] leading-6 text-gray-600 whitespace-pre-line">{content}</p>
    </div>
  );
}

function ScoreDrivers({ drivers = [] }) {
  return (
    <div className="rounded-md border border-gray-200 bg-white p-5">
      <h3 className="font-semibold text-[15px] text-gray-900 mb-4">What's Driving Your Score</h3>

      <div className="space-y-3">
        {drivers.map((driver, index) => {
          const positive = driver.type === "positive";
          return (
            <div key={index} className="flex items-start gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${positive ? "bg-emerald-50" : "bg-red-50"}`}>
                {positive ? <ArrowUpRight size={13} className="text-emerald-600" /> : <ArrowDownRight size={13} className="text-red-500" />}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-[13px] font-semibold text-gray-900">{driver.factor}</p>
                  <span className={`text-[11px] font-semibold ${positive ? "text-emerald-600" : "text-red-500"}`}>
                    {positive ? "+" : ""}
                    {driver.impact}
                  </span>
                </div>
                <p className="text-[12.5px] text-gray-500 leading-5 mt-0.5">{driver.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}