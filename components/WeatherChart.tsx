"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useLocation } from "@/app/context/LocationContext";
import { useWeather } from "@/app/hooks/useWeather";

type HourlyWeather = {
  time: Date[]; // ISO strings
  temperature2m: number[];
  apparentTemperature: number[];
  precipitationProbability: number[];
  weatherCode: number[];
};

type ForecastEntry = {
  time: Date; // ISO string
  hour: string; // e.g., "3 PM"
  temperature: number;
  precipitation: number; // chart line 2
  apparentTemperature: number;
  weatherCode: number;
};

function hourlyForecast(hourly: HourlyWeather): ForecastEntry[] {
  const now = new Date();
  const roundedNow = new Date(now);
  roundedNow.setMinutes(0, 0, 0);
  if (now.getMinutes() >= 30) {
    roundedNow.setHours(roundedNow.getHours() + 1);
  }

  const today = now.toISOString().split("T")[0];
  const endOfDay = new Date(today + "T23:59:59.999Z");

  const result: ForecastEntry[] = [];

  for (let i = 0; i < hourly.time.length; i++) {
    const entryTime = new Date(hourly.time[i]);
    const diffInMs = entryTime.getTime() - roundedNow.getTime();
    const diffInHours = Math.round(diffInMs / (1000 * 60 * 60));

    if (diffInHours >= -6 && diffInHours <= 8) {
      if (entryTime > endOfDay) {
        const isMidnight =
          entryTime.getUTCHours() === 0 && entryTime.getUTCMinutes() === 0;
        if (!isMidnight) break;
      }

      result.push({
        time: entryTime,
        hour: entryTime.toLocaleTimeString([], {
          hour: "numeric",
          hour12: true,
        }),
        temperature: Math.round(hourly.temperature2m[i]),
        precipitation: Math.round(hourly.precipitationProbability[i]),
        apparentTemperature: Math.round(hourly.apparentTemperature[i]),
        weatherCode: hourly.weatherCode[i],
      });
    }
  }

  return result;
}

const chartConfig = {
  temperature: {
    label: "temperature",
    color: "hsl(var(--chart-1))",
  },
  precipitation: {
    label: "Precipitation",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function WeatherChart() {
  const { city } = useLocation();
  const { hourlyWeather } = useWeather(city?.lat ?? 0, city?.lon ?? 0);

  const forecast = hourlyWeather ? hourlyForecast(hourlyWeather) : [];
  console.log(forecast);

  const temperatureAvg =
    forecast.reduce((acc, d) => acc + d.temperature, 0) / forecast.length || 0;
  const precipitationAvg =
    forecast.reduce((acc, d) => acc + d.precipitation, 0) / forecast.length ||
    0;

  // Adjust Y domain around averages
  const temperatureDomain = [
    Math.floor(temperatureAvg - 10),
    Math.ceil(temperatureAvg + 10),
  ];
  const precipitationDomain = [
    Math.max(0, Math.floor(precipitationAvg - 20)),
    Math.min(100, Math.ceil(precipitationAvg + 20)),
  ];

  const chartData = forecast
  return (
    <Card className="flex max-w-5xl mx-auto">
      <CardHeader>
        <CardTitle>Hourly Forecast</CardTitle>
        <CardDescription>Temperature & Precipitation</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="hour"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />

            {/* LEFT Y Axis for Temperature */}
            <YAxis
              yAxisId="left"
              domain={temperatureDomain}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />

            {/* RIGHT Y Axis for Precipitation */}
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={precipitationDomain}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />

            {/* Temperature - left Y axis */}
            <Area
              dataKey="temperature"
              yAxisId="left"
              type="natural"
              fill={chartConfig.temperature.color}
              fillOpacity={0.4}
              stroke={chartConfig.temperature.color}
            />

            {/* Precipitation - right Y axis */}
            <Area
              dataKey="precipitation"
              yAxisId="right"
              type="natural"
              fill={chartConfig.precipitation.color}
              fillOpacity={0.4}
              stroke={chartConfig.precipitation.color}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Today’s hourly forecast
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
