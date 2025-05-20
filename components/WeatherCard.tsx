import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Wind, Droplet } from "lucide-react";
import Image from "next/image";

// Replace with your weather SVGs
// import CloudyIcon from '@/assets/cloudy.svg';
// import SunnyIcon from '@/assets/sunny.svg';

const WeatherCard: React.FC = () => {
  // Replace this with your Open-Meteo hook later
  const currentWeather = {
    city: "San Francisco",
    date: new Date(),
    temperature: 21,
    description: "Partly cloudy",
    humidity: 58,
    windSpeed: 3.4,
    icon: "cloudy" // placeholder key for your svg icon
  };

  const forecast = [
    { day: "Tue", min: 16, max: 24, icon: "sunny" },
    { day: "Wed", min: 18, max: 26, icon: "cloudy" },
    { day: "Thu", min: 17, max: 25, icon: "cloudy" },
    { day: "Fri", min: 19, max: 27, icon: "sunny" },
  ];

  return (
    // <div className="w-full max-w-5xl rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
    <div className="flex max-w-5xl mx-auto rounded-2xl overflow-visible shadow-lg">
      {/* Weather Side */}
      {/* <div
        className="relative w-full md:w-1/3 h-96 md:h-auto bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/sunset-beach-sea-wave_1150-11145.jpg')",
        }}
      > */}
      <div className="relative w-1/3 h-96 rounded-2xl overflow-hidden -mr-10 z-20">
        <Image
          //src="https://img.freepik.com/free-photo/sunset-beach-sea-wave_1150-11145.jpg"
        src="/dark-clouds-sunset-sky-dark-water-ocean.jpg"
          alt="Sunset Beach"
          layout="fill"
          objectFit="cover"
          priority
        />
        {/* Gradient overlay - define your gradient in globals.css */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black opacity-40 rounded-2xl"></div>

        <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
          <div>
            <p className="text-lg font-semibold">
              {currentWeather.date.toLocaleDateString("en-US", {
                weekday: "long",
              })}
            </p>
            <p className="text-sm">
              {currentWeather.date.toUTCString().slice(5, 16)}
            </p>
            <h4 className="text-md font-semibold">{currentWeather.city}</h4>
            <p className="mt-2 text-xl font-bold flex items-center gap-2">
              {/* Replace this with your SVG weather icon */}
              <span><Image src="/sunny_clouds.svg" alt="sun" width={200} height={200} /></span>
            </p>
          </div>

          <div>
            <p className="text-5xl font-bold">
              {Math.round(currentWeather.temperature)}ºC
            </p>
            <p className="capitalize text-sm">{currentWeather.description}</p>
          </div>
        </div>
      </div>

      {/* Info Side */}
      <div className="w-full md:w-2/3 ml-7 text-white flex-1 flex-col justify-between rounded-2xl">
        <div className="p-6">
          <Card className="mb-4">
  <CardContent>
    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <Droplet className="w-4 h-4" />
        Humidity
      </div>
      <div className="font-semibold">{currentWeather.humidity}%</div>
    </div>
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <Wind className="w-4 h-4" />
        Wind
      </div>
      <div className="font-semibold">{currentWeather.windSpeed} m/s</div>
    </div>
  </CardContent>
</Card>


          <ul className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {forecast.map((day, i) => (
              <li
                key={i}
                className="text-center bg-[#1c1f25] hover:scale-105 transition-transform duration-200 rounded-xl p-4"
              >
                <p className="text-sm font-medium">{day.day}</p>
                {/* Replace with your icon SVG */}
                <div className="text-3xl my-2 items-center flex flex-col"><Image src="/sunny_cloud.svg" alt="sunny clouds" width={40} height={0}/></div>
                <p className="text-sm font-bold">
                  {day.min}º / {day.max}º
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 border-t border-[#333]">
          <Input
            className="bg-gradient-to-r from-cyan-400 to-indigo-500 text-black font-bold placeholder:text-black"
            placeholder="Search city..."
            // Add onChange or onKeyDown here to trigger your weather fetch
          />
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;