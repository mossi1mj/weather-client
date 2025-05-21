import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { SearchBar } from "./SearchBar";
import { useLocation } from "@/app/context/LocationContext";
import { useWeather } from "@/app/hooks/useWeather";
import { getWeatherIcon } from "@/lib/utils";

const WeatherCard: React.FC = () => {

  const { city } = useLocation();
  const { weather, dailyWeather, loading } = useWeather(city?.lat ?? 0, city?.lon ?? 0);

  const forecast = dailyWeather?.time.map((_, i) => ({
    day: new Date(dailyWeather.time[i]).toLocaleDateString("en-US", {
      weekday: "short",
    }),
    min: Math.round(dailyWeather.temperature2mMin[i]),
    max: Math.round(dailyWeather.temperature2mMax[i]),
    code: dailyWeather.weatherCode[i],
  }));

  return (
    <div className="flex max-w-5xl mx-auto rounded-2xl overflow-visible shadow-lg">
      {/* Weather Side */}
      <div className="relative w-1/3 h-96 rounded-2xl overflow-hidden -mr-10 z-20">
        <Image
          // src="https://img.freepik.com/free-photo/sunset-beach-sea-wave_1150-11145.jpg"
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
              {weather &&
                weather.time.toLocaleDateString("en-US", {
                  weekday: "long",
                })}
            </p>
            <p className="text-sm">
              {weather && weather.time.toUTCString().slice(5, 16)}
            </p>
            <h4 className="text-md font-semibold">
              {city?.name || "Unknown City"}
            </h4>
            <p className="mt-2 text-xl font-bold flex items-center gap-2">
              <span>
                <Image
                  src={getWeatherIcon(
                    weather?.weatherCode ?? 0,
                    weather?.isDay ?? 1
                  )}
                  alt="sun"
                  width={200}
                  height={200}
                />
              </span>
            </p>
          </div>

          <div>
            <p className="text-5xl font-bold">
              {!loading && weather && Math.round(weather.temperature2m)}ºF
            </p>
            {/* <p className="capitalize text-sm">{currentWeather.description}</p> */}
          </div>
        </div>
      </div>

      {/* Info Side */}
      <div className="w-full md:w-2/3 ml-7 text-white flex-1 flex-col justify-between rounded-2xl">
        <div className="p-6">
          <Card className="mb-4 p-4">
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Image
                    src="/wind.svg"
                    alt="Temperature"
                    width={14}
                    height={15}
                  />
                  Humidity
                </div>
                <div className="font-semibold text-sm">
                  {weather?.relativeHumidity2m}%
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Image
                    src="/rain_drop.svg"
                    alt="Temperature"
                    width={18}
                    height={16}
                  />
                  Wind
                </div>
                <div className="font-semibold text-sm">
                  {Math.round(weather?.windSpeed10m ?? 0)} m/s
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-4 gap-2">
            {forecast?.slice(3, 7).map((day, i) => (
              <Card
                key={i}
                className="hover:scale-105 transition-transform duration-200 rounded-xl p-2"
              >
                <CardContent className="flex flex-col justify-center items-center">
                  <p className="text-sm font-medium">{day.day}</p>
                  <div className="text-3xl my-2 items-center flex flex-col">
                    <Image
                      src={getWeatherIcon(day.code ?? 0, 1)}
                      alt="sunny clouds"
                      width={40}
                      height={0}
                    />
                  </div>
                  <p className="text-sm font-bold">
                    {day.max}º | {day.min}º
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="px-6">
          <Separator className="my-4" />
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;