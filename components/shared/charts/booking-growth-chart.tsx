// @flow
import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  LabelList,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const dailyData = [
  { day: "Mon", growth: 5 },
  { day: "Tue", growth: 8 },
  { day: "Wed", growth: 10 },
  { day: "Thu", growth: 7 },
  { day: "Fri", growth: 12 },
  { day: "Sat", growth: 15 },
  { day: "Sun", growth: 9 },
];

const weeklyData = [
  { week: "Week 1", growth: 30 },
  { week: "Week 2", growth: 45 },
  { week: "Week 3", growth: 50 },
  { week: "Week 4", growth: 35 },
];

const monthlyData = [
  { month: "Jan", growth: 25 },
  { month: "Feb", growth: 30 },
  { month: "Mar", growth: 35 },
  { month: "Apr", growth: 28 },
  { month: "May", growth: 40 },
  { month: "Jun", growth: 45 },
];

const yearlyData: { month: string; growth: number }[] = []; // No data yet for yearly

const bookingChartConfig = {
  desktop: {
    label: "Week",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Growth",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;
const revenueData = [
  { name: "Mon", value: 4000, appointments: 12 },
  { name: "Tue", value: 4500, appointments: 15 },
  { name: "Wed", value: 5200, appointments: 18 },
  { name: "Thu", value: 4800, appointments: 14 },
  { name: "Fri", value: 6000, appointments: 20 },
  { name: "Sat", value: 6500, appointments: 22 },
  { name: "Sun", value: 5800, appointments: 16 },
];
const revenueChartConfig = {
  name: {
    label: "Name",
    color: "hsl(var(--chart-1))",
  },
  appointments: {
    label: "Appointments",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;
const servicePerformance = [
  { name: "Crown Braids", bookings: 45 },
  { name: "Box Braids", bookings: 38 },
  { name: "Cornrows", bookings: 32 },
  { name: "Twist Braids", bookings: 28 },
];

const serviceChartConfig = {
  name: {
    label: "Name",
    color: "hsl(var(--chart-1))",
  },
  bookings: {
    label: "Bookings",
    color: "hsl(var(--chart-2))",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

const colors = ["#4CAF50", "#2196F3", "#FFC107", "#E91E63", "#9E9E9E"];

const categoryData = [
  { name: "BRAIDING", value: 35 },
  { name: "STYLING", value: 25 },
  { name: "TREATMENT", value: 20 },
  { name: "COLORING", value: 15 },
  { name: "OTHER", value: 5 },
].map((category, index) => ({
  ...category,
  fill: colors[index % colors.length],
}));

const categoryChartConfig: Record<string, { label: string; color?: string }> = {
  users: { label: "Users" },
  ...categoryData.reduce(
    (acc, category) => {
      acc[category.name] = { label: category.name, color: category.fill };
      return acc;
    },
    {} as Record<string, { label: string; color: string }>,
  ),
};

export const CategoryPieChart = () => {
  const total = React.useMemo(() => {
    return categoryData.reduce((acc, curr) => acc + curr.value, 0);
  }, []);

  return (
    <ChartContainer className="size-full" config={categoryChartConfig}>
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent nameKey="value" />}
        />
        <Pie
          data={categoryData}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          strokeWidth={5}
        >
          <LabelList
            dataKey="name"
            className="fill-background"
            stroke="none"
            fontSize={8}
            formatter={(value: keyof typeof categoryChartConfig) =>
              categoryChartConfig[value]?.label
            }
          />
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {total.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Bookings
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
};

export const AppointmentBreakdownChart = () => {
  return (
    <div className="mt-4 h-72">
      <ChartContainer config={revenueChartConfig} className=" size-full !p-0">
        <BarChart accessibilityLayer data={revenueData} margin={{ right: 16 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            padding={{ left: 0, right: 0 }}
            dataKey="name"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          {/* <YAxis /> */}
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />{" "}
          <Bar dataKey="appointments" fill="#8884d8" radius={4}>
            <LabelList
              position="top"
              offset={12}
              className="fill-foreground"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export const MostBookedServices = () => {
  return (
    <div className="mt-4 h-72">
      <ChartContainer config={serviceChartConfig} className=" size-full !p-0">
        <BarChart
          data={servicePerformance}
          accessibilityLayer
          layout="vertical"
          margin={{ right: 16 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis
            padding={{ left: 0, right: 0 }}
            dataKey="bookings"
            type="number"
            hide
          />
          <YAxis
            dataKey="name"
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
            hide
          />{" "}
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Bar dataKey="bookings" fill="#8884d8" layout="vertical" radius={4}>
            <LabelList
              dataKey="name"
              position="insideLeft"
              offset={8}
              className="fill-[--color-label]"
              fontSize={12}
            />
            <LabelList
              dataKey="bookings"
              position="right"
              offset={8}
              className="fill-foreground"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
};

interface BookingGrowthRateChartProps {
  view: "daily" | "weekly" | "monthly" | "yearly";
}

export const BookingGrowthRateChart = ({
  view,
}: BookingGrowthRateChartProps) => {
  let data: { day?: string; week?: string; month?: string; growth: number }[] =
    [];
  if (view === "daily") data = dailyData;
  else if (view === "weekly") data = weeklyData;
  else if (view === "monthly") data = monthlyData;
  else if (view === "yearly") data = yearlyData;

  return (
    <div className="mt-4 h-80">
      {data.length > 0 ? (
        <ChartContainer config={bookingChartConfig} className=" size-full !p-0">
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              top: 20,
              left: 0,
              right: 16,
            }}
            className="w-full !p-0"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              className="w-full"
            />
            <XAxis
              dataKey={
                view === "daily" ? "day" : view === "weekly" ? "week" : "month"
              }
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
              padding={{ left: 0, right: 0 }}
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              type="monotone"
              dataKey="growth"
              stroke="#6366F1"
              strokeWidth={2}
              dot={{
                fill: "var(--color-growth)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      ) : (
        <div className="flex h-full items-center justify-center text-gray-500">
          Data not sufficient for {view} analysis
        </div>
      )}
    </div>
  );
};
