"use client";

import WeatherCard from "@/components/WeatherCard";
import { WeatherChart } from "@/components/WeatherChart";

export default function Home() {
  return (
    <main className="p-6 mx-auto space-y-6">
      <WeatherCard />
      <WeatherChart />
    </main>
  );
}
