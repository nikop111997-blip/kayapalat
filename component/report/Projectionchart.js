"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ProjectionChart({ report }) {
  const rows = report.charts?.projection?.length
    ? report.charts.projection
    : (report.futureProjection || []).map((p) => ({
        label: `${p.years} ${p.years === 1 ? "Year" : "Years"}`,
        healthScore: p.estimatedScore,
        weight: p.estimatedWeight,
      }));

  const data = [
    { label: "Today", healthScore: report.score, weight: report.bmi ? undefined : undefined },
    ...rows,
  ];

  return (
    <div className="w-full h-[220px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
          <CartesianGrid stroke="#EFEFEF" vertical={false} />

          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: "#6B7280" }}
            axisLine={{ stroke: "#E5E7EB" }}
            tickLine={false}
          />

          <YAxis
            domain={["dataMin - 5", "dataMax + 5"]}
            tick={{ fontSize: 11, fill: "#6B7280" }}
            axisLine={false}
            tickLine={false}
            width={30}
          />

          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: "1px solid #E5E7EB",
              fontSize: 12,
            }}
          />

          <Line
            type="monotone"
            dataKey="healthScore"
            name="Health Score"
            stroke="#DC2626"
            strokeWidth={2.5}
            dot={{ r: 4, fill: "#DC2626" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}