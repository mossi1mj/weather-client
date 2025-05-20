"use client";
import { useWeather } from "./hooks/useWeather";
import { useLocation } from "./context/LocationContext";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import WeatherCard from "@/components/WeatherCard";

export default function Home() {
  const { lat, lon } = useLocation();
  const { weather, hourlyWeather, dailyWeather} = useWeather(lat, lon);
  console.log("Weather data:", weather);
  console.log("Hourly weather data:", hourlyWeather);
  console.log("Daily weather data:", dailyWeather);
  const [input, setInput] = useState("");

  return (
    <main className="p-6 mx-auto space-y-6">
      
      <WeatherCard />
      <Toaster />
        

      <h1 className="text-2xl font-bold">Weather App Demo</h1>

      <Button onClick={() => toast("Weather loaded", { description: "Detroit weather data loaded" })}>
        Show Toast
      </Button>

      <Card>
        <CardContent className="p-4">
          <Label htmlFor="city">Enter City</Label>
          <Input
            id="city"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Detroit"
            className="mt-2"
          />
        </CardContent>
      </Card>

      <Tabs defaultValue="today" className="w-full">
        <TabsList>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="forecast">Forecast</TabsTrigger>
        </TabsList>
        <TabsContent value="today">☀️ Sunny, 72°F</TabsContent>
        <TabsContent value="forecast">🌧️ Rain expected later this week</TabsContent>
      </Tabs>

      <Separator />

      <Badge variant="secondary" color="primary">Wind: 12 mph</Badge>
      <Badge>Humidity: 65%</Badge>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" color="secondary">More Info</Button>
        </PopoverTrigger>
        <PopoverContent className="w-60">
          <p>UV Index is moderate. Don&apos;t forget sunscreen.</p>
        </PopoverContent>
      </Popover>

      <Dialog>
        <DialogTrigger asChild>
          <Button>View Details</Button>
        </DialogTrigger>
        <DialogTitle>Weather Details</DialogTitle>
        <DialogContent>
          <p>Extended weather details go here.</p>
        </DialogContent>
      </Dialog>
    </main>
  );
}
