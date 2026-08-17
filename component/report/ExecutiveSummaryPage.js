import {
  Brain,
  Activity,
  Heart,
  TrendingUp,
  Sparkles,
  ClipboardList,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

import PageContainer from "./PageContainer";
import MetricCard from "./MetricCard";
import QuoteCard from "./QuoteCard";

export default function ExecutiveSummaryPage({ report }) {
  const ai = report.ai;

  return (
    <>
      {/* =========================
          PAGE 1
      ========================== */}
      <PageContainer
        title="Executive Health Assessment"
        subtitle="Understanding Your Current Health"
      >
        {/* Top Metric Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <MetricCard
            icon={Activity}
            title="Health Score"
            value={report.score}
            subtitle={report.scoreLabel}
            color="emerald"
          />

          <MetricCard
            icon={Heart}
            title="BMI"
            value={report.bmi}
            subtitle={report.bmiCategory}
            color="red"
          />

          <MetricCard
            icon={TrendingUp}
            title="WHtR"
            value={report.whtr}
            subtitle={report.whtrRisk}
            color="orange"
          />

          <MetricCard
            icon={Sparkles}
            title="Body Fat"
            value={`${report.bodyFat.value}%`}
            subtitle="Estimated"
            color="violet"
          />
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-12 gap-7">
          {/* LEFT */}
          <div className="col-span-8 space-y-5">
            <Section
              icon={ClipboardList}
              title="Executive Summary"
              content={ai.executiveSummary}
            />

            <Section
              icon={Activity}
              title="Health Snapshot"
              content={ai.healthSnapshot}
            />
               <ScoreDrivers drivers={report.scoreDrivers} />
          </div>

          {/* RIGHT */}
          <div className="col-span-4 space-y-5">
            {/* Hidden Health Pattern */}
            <div className="rounded-md bg-emerald-50 border border-emerald-100 p-5">
              <div className="flex items-center gap-2.5 mb-3">
                <Brain className="text-emerald-700" size={17} />

                <h3 className="font-semibold text-[15px] text-gray-900">
                  Hidden Health Pattern
                </h3>
              </div>

              <p className="text-[13.5px] leading-6 text-gray-700">
                {ai.hiddenPatterns}
              </p>
            </div>

            {/* Score Drivers */}
         
          </div>
        </div>
      </PageContainer>

      {/* =========================
          PAGE 2
      ========================== */}
      <PageContainer
        title="Health Analysis"
        subtitle="Understanding What Is Driving Your Health"
      >
        <div className="grid grid-cols-12 gap-7">
          {/* LEFT COLUMN */}
          <div className="col-span-8 space-y-5">
            <Section
              icon={Heart}
              title="Body Analysis"
              content={ai.bodyAnalysis}
            />

            <Section
              icon={TrendingUp}
              title="Lifestyle Analysis"
              content={ai.lifestyleAnalysis}
            />

            <Section
              icon={Sparkles}
              title="Why You Received This Score"
              content={ai.scoreExplanation}
            />
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-span-4 space-y-5">
            <QuoteCard
              title="Coach's Observation"
              text={ai.coachSummary}
            />

            {/* Optional Score Drivers repetition removed */}
            <div className="rounded-md border border-gray-200 bg-gray-50 p-5">
              <div className="flex items-center gap-2.5 mb-3">
                <Activity
                  className="text-emerald-700"
                  size={17}
                />

                <h3 className="font-semibold text-[15px] text-gray-900">
                  Assessment Overview
                </h3>
              </div>

              <p className="text-[13px] leading-6 text-gray-600">
                Your current health assessment combines your body
                measurements, lifestyle patterns, and other available
                health indicators to identify the factors having the
                greatest influence on your overall score.
              </p>
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
}


/* =========================================
   SECTION COMPONENT
========================================= */

function Section({ icon: Icon, title, content }) {
  return (
    <div className="bg-white rounded-md border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center">
          <Icon
            size={16}
            className="text-gray-700"
          />
        </div>

        <h2 className="text-[16px] font-semibold text-gray-900 tracking-tight">
          {title}
        </h2>
      </div>

      <p className="text-[14px] leading-7 text-gray-600 whitespace-pre-line">
        {content}
      </p>
    </div>
  );
}


/* =========================================
   SCORE DRIVERS
========================================= */

function ScoreDrivers({ drivers = [] }) {
  return (
    <div className="rounded-md border border-gray-200 bg-white p-5 mt-12">
      <h3 className="font-semibold text-[15px] text-gray-900 mb-4">
        What's Driving Your Score
      </h3>

      <div className="space-y-3">
        {drivers.map((driver, index) => {
          const positive = driver.type === "positive";

          return (
            <div
              key={index}
              className="flex items-start gap-3"
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  positive
                    ? "bg-emerald-50"
                    : "bg-red-50"
                }`}
              >
                {positive ? (
                  <ArrowUpRight
                    size={13}
                    className="text-emerald-600"
                  />
                ) : (
                  <ArrowDownRight
                    size={13}
                    className="text-red-500"
                  />
                )}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-[13px] font-semibold text-gray-900">
                    {driver.factor}
                  </p>

                  <span
                    className={`text-[11px] font-semibold ${
                      positive
                        ? "text-emerald-600"
                        : "text-red-500"
                    }`}
                  >
                    {positive ? "+" : ""}
                    {driver.impact}
                  </span>
                </div>

                <p className="text-[12.5px] text-gray-500 leading-5 mt-0.5">
                  {driver.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}