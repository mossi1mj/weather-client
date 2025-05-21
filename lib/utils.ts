import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const params = (lat: number, lon: number) => {
  return {
    latitude: lat || 42.3314,
    longitude: lon || -83.0458,
    daily: [
      "weather_code",
      "sunrise",
      "sunset",
      "daylight_duration",
      "sunshine_duration",
      "temperature_2m_max",
      "temperature_2m_min",
      "apparent_temperature_max",
      "apparent_temperature_min",
      "rain_sum",
      "showers_sum",
      "precipitation_sum",
      "snowfall_sum",
      "precipitation_hours",
      "precipitation_probability_max",
    ],
    hourly: [
      "temperature_2m",
      "dew_point_2m",
      "precipitation_probability",
      "apparent_temperature",
      "rain",
      "weather_code",
      "surface_pressure",
      "visibility",
      "wind_speed_10m",
      "temperature_80m",
      "is_day",
      "sunshine_duration",
    ],
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "is_day",
      "wind_speed_10m",
      "wind_direction_10m",
      "precipitation",
      "rain",
      "showers",
      "snowfall",
      "weather_code",
      "cloud_cover",
    ],
    timezone: "auto",
    past_days: 1,
    forecast_days: 14,
    wind_speed_unit: "mph",
    temperature_unit: "fahrenheit",
    precipitation_unit: "inch",
  };
};

export const url = "https://api.open-meteo.com/v1/forecast";

export const getWeatherIcon = (weatherCode: number, isDay : number) => {
  const night = isDay === 0;

  if ([0].includes(weatherCode)) {
    return night ? "night_cloud.svg" : "sun.svg"; // Clear
  }

  if ([1, 2].includes(weatherCode)) {
    return night ? "full_moon.svg" : "sunny_clouds.svg"; // Partly cloudy
  }

  if ([3].includes(weatherCode)) {
    return "clouds.svg"; // Overcast
  }

  if ([45, 48].includes(weatherCode)) {
    return "clouds.svg"; // Fog
  }

  if ([51, 53, 55].includes(weatherCode)) {
    return "light_rain.svg"; // Drizzle
  }

  if ([56, 57, 61, 63, 65, 80, 81, 82].includes(weatherCode)) {
    return "rain.svg"; // Rain
  }

  if ([66, 67].includes(weatherCode)) {
    return "rain.svg"; // Freezing rain
  }

  if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
    return "snow.svg"; // Snow (consider adding `snow.svg`)
  }

  if ([95].includes(weatherCode)) {
    return "thunder.svg"; // Thunderstorm
  }

  if ([96, 99].includes(weatherCode)) {
    return "thunderstorm.svg"; // Thunderstorm with hail
  }

  if (night && [0, 1, 2].includes(weatherCode)) {
    return "night_cloud.svg"; // Clear or partly cloudy night
  }

  return "clouds.svg"; // Default fallback
};
