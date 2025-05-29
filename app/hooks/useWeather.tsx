import { useState, useEffect } from "react";
import { fetchWeatherApi } from "openmeteo";
import { params, url } from "@/lib/utils";

export interface WeatherData {
  time: Date;
  temperature2m: number;
  relativeHumidity2m: number;
  apparentTemperature: number;
  isDay: number;
  windSpeed10m: number;
  windDirection10m: number;
  precipitation: number;
  rain: number;
  showers: number;
  snowfall: number;
  weatherCode: number;
  cloudCover: number;
}

export interface DailyWeatherData {
  time: Date[];
  weatherCode: number[];
  sunrise: Date[];
  sunset: Date[];
  daylightDuration: number[];
  sunshineDuration: number[];
  temperature2mMax: number[];
  temperature2mMin: number[];
  apparentTemperatureMax: number[];
  apparentTemperatureMin: number[];
  rainSum: number[];
  showersSum: number[];
  precipitationSum: number[];
  snowfallSum: number[];
  precipitationHours: number[];
  precipitationProbabilityMax: number[];
}

export interface HourlyWeatherData {
  time: Date[];
  temperature2m: number[];
  dewPoint2m: number[];
  precipitationProbability: number[];
  apparentTemperature: number[];
  rain: number[];
  weatherCode: number[];
  surfacePressure: number[];
  visibility: number[];
  windSpeed10m: number[];
  temperature80m: number[];
  isDay: number[];
  sunshineDuration: number[];
}

export const useWeather = (lat: number, lon: number) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [hourlyWeather, setHourlyWeather] = useState<HourlyWeatherData | null>(
    null
  );
  const [dailyWeather, setDailyWeather] = useState<DailyWeatherData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      const responses = await fetchWeatherApi(url, params(lat, lon));
      const response = responses[0];
      console.log("Weather data:", response);

      const utcOffsetSeconds = response.utcOffsetSeconds();
      const current = response.current()!;
      const hourly = response.hourly()!;
      const daily = response.daily()!;

      const sunrise = daily.variables(1)!;
      const sunset = daily.variables(2)!;

      setWeather({
        time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
        temperature2m: current.variables(0)!.value(),
        relativeHumidity2m: current.variables(1)!.value(),
        apparentTemperature: current.variables(2)!.value(),
        isDay: current.variables(3)!.value(),
        windSpeed10m: current.variables(4)!.value(),
        windDirection10m: current.variables(5)!.value(),
        precipitation: current.variables(6)!.value(),
        rain: current.variables(7)!.value(),
        showers: current.variables(8)!.value(),
        snowfall: current.variables(9)!.value(),
        weatherCode: current.variables(10)!.value(),
        cloudCover: current.variables(11)!.value(),
      });

      setDailyWeather({
        time: [
          ...Array(
            (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval()
          ),
        ].map(
          (_, i) =>
            new Date(
              (Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) *
                1000
            )
        ),
        weatherCode: [...(daily.variables(0)!.valuesArray() ?? [])],
        sunrise: [...Array(sunrise.valuesInt64Length())].map(
          (_, i) =>
            new Date((Number(sunrise.valuesInt64(i)) + utcOffsetSeconds) * 1000)
        ),
        sunset: [...Array(sunset.valuesInt64Length())].map(
          (_, i) =>
            new Date((Number(sunset.valuesInt64(i)) + utcOffsetSeconds) * 1000)
        ),
        daylightDuration: [...(daily.variables(3)!.valuesArray() ?? [])],
        sunshineDuration: [...daily.variables(4)!.valuesArray() ?? []],
        temperature2mMax: [...daily.variables(5)!.valuesArray() ?? []],
        temperature2mMin: [...daily.variables(6)!.valuesArray() ?? []],
        apparentTemperatureMax: [...daily.variables(7)!.valuesArray() ?? []],
        apparentTemperatureMin: [...daily.variables(8)!.valuesArray() ?? []],
        rainSum: [...daily.variables(9)!.valuesArray() ?? []],
        showersSum: [...daily.variables(10)!.valuesArray() ?? []],
        precipitationSum: [...daily.variables(11)!.valuesArray() ?? []],
        snowfallSum: [...daily.variables(12)!.valuesArray() ?? []],
        precipitationHours: [...daily.variables(13)!.valuesArray() ?? []],
        precipitationProbabilityMax: [...daily.variables(14)!.valuesArray() ?? []],
      });


      setHourlyWeather({
        time: [
          ...Array(
            (Number(hourly.timeEnd()) - Number(hourly.time())) /
              hourly.interval()
          ),
        ].map(
          (_, i) =>
            new Date(
              (Number(hourly.time()) +
                i * hourly.interval() +
                utcOffsetSeconds) *
                1000
            )
        ),
        temperature2m: [...(hourly.variables(0)?.valuesArray() ?? [])],
        dewPoint2m: [...(hourly.variables(1)?.valuesArray() ?? [])],
        precipitationProbability: [
          ...(hourly.variables(2)?.valuesArray() ?? []),
        ],
        apparentTemperature: [...(hourly.variables(3)?.valuesArray() ?? [])],
        rain: [...(hourly.variables(4)?.valuesArray() ?? [])],
        weatherCode: [...(hourly.variables(5)?.valuesArray() ?? [])],
        surfacePressure: [...(hourly.variables(6)?.valuesArray() ?? [])],
        visibility: [...(hourly.variables(7)?.valuesArray() ?? [])],
        windSpeed10m: [...(hourly.variables(8)?.valuesArray() ?? [])],
        temperature80m: [...(hourly.variables(9)?.valuesArray() ?? [])],
        isDay: [...(hourly.variables(10)?.valuesArray() ?? [])],
        sunshineDuration: [...(hourly.variables(11)?.valuesArray() ?? [])],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(lat, lon);
  }, [lat, lon]);

  return { weather, dailyWeather, hourlyWeather, loading, error, fetchWeather };
};
