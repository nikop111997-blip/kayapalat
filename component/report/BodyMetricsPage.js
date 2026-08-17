import { Scale, Heart, Activity, Gauge, TrendingUp, Sparkles } from "lucide-react";

import PageContainer from "./PageContainer";
import MetricCard from "./MetricCard";
import ScoreCircle from "./ScoreCircle";

export default function BodyMetricsPage({ report }) {
  return (
    <PageContainer title="Body Metrics" subtitle="Your Current Physical Health">
      <div className="grid grid-cols-12 gap-8">
        {/* LEFT */}
        <div className="col-span-4 flex justify-center items-start pt-4">
          <ScoreCircle score={report.score} label={report.scoreLabel} size={240} />
        </div>

        {/* RIGHT */}
        <div className="col-span-8">
          <div className="grid grid-cols-2 gap-4">
            <MetricCard icon={Scale} title="BMI" value={report.bmi} subtitle={report.bmiCategory} color="blue" />

            <MetricCard icon={Heart} title="Body Fat" value={`${report.bodyFat.score}`} subtitle="Estimated Score" color="red" />

            <MetricCard icon={Activity} title="Biological Age" value={report.biologicalAge} subtitle="Years" color="emerald" />

            <MetricCard icon={Gauge} title="Waist Height Ratio" value={report.whtr} subtitle={report.whtrRisk} color="orange" />

            <MetricCard
              icon={TrendingUp}
              title="Potential Score"
              value={report.healthPotential.potentialScore}
              subtitle={`+${report.healthPotential.possibleGain} Points Possible`}
              color="emerald"
            />

            <MetricCard icon={Sparkles} title="Body Shape" value={report.bodyShape} subtitle="Current Profile" color="violet" />
          </div>
        </div>
      </div>

      {/* Bottom Summary */}
      <div className="mt-12 rounded-md bg-gray-900 text-white p-9">
        <h2 className="text-lg font-semibold tracking-tight">Body Analysis</h2>

        <p className="mt-4 text-[14.5px] leading-7 text-gray-100">
          {report.ai.bodyAnalysis}
        </p>
      </div>
    </PageContainer>
  );
}