"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function Chart({
  sales: { salesData },
}: {
  sales: { salesData: SalesDataType[] | undefined };
}) {
  return (
    <Card>
      <CardHeader className="border-b border-dashed text-xl font-bold">
        <CardTitle>Overview</CardTitle>
        <CardDescription>Sales per month</CardDescription>
      </CardHeader>

      <CardContent className="pt-6">
        {!salesData || salesData.length === 0 ? (
          <div className="grid h-[350px] place-items-center">
            <p className="text-sm italic">There are no sales yet to display</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={salesData} margin={{ left: 10, right: 10 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                opacity={0.1}
                vertical={false}
              />

              <XAxis
                dataKey="month"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `£${value}`}
              />

              <Tooltip
                cursor={{ fill: "rgba(0,0,0,0.05)" }}
                formatter={(value) => `£${value}`}
              />

              <Bar
                dataKey="totalSales"
                name="Total Sales"
                fill="var(--distinct)"
                radius={[8, 8, 0, 0]}
                maxBarSize={64}
                activeBar={{ opacity: 0.85 }}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
