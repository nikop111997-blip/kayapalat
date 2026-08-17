"use client";

import {
  Radar,
  RadarChart as RechartRadar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

export default function RadarChart({ report }) {
  const source = report.charts?.radar || [];

  const data = source.map((item) => ({
    subject: item.subject,
    value: item.score,
    fullMark: item.fullMark ?? 100,
  }));

  return (
    <div className="w-full h-[420px]">
      <ResponsiveContainer width="100%" height="100%">
        <RechartRadar data={data}>
          <PolarGrid stroke="#E5E5E5" />

          <PolarAngleAxis
            dataKey="subject"
            tick={{ fontSize: 12, fontWeight: 600, fill: "#6B7280" }}
          />

          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={false}
            axisLine={false}
          />

          <Radar
            name="Health"
            dataKey="value"
            stroke="#059669"
            fill="#059669"
            fillOpacity={0.18}
            strokeWidth={2}
          />
        </RechartRadar>
      </ResponsiveContainer>
    </div>
  );
}