export const params = (lat: number, lon: number) => {
    return {
	"latitude": lat || 42.3314,
    "longitude": lon || -83.0458,
	"daily": ["weather_code", "sunrise", "sunset", "daylight_duration", "sunshine_duration", "temperature_2m_max", "temperature_2m_min", "apparent_temperature_max", "apparent_temperature_min", "rain_sum", "showers_sum", "precipitation_sum", "snowfall_sum", "precipitation_hours", "precipitation_probability_max"],
	"hourly": ["temperature_2m", "dew_point_2m", "precipitation_probability", "apparent_temperature", "rain", "weather_code", "surface_pressure", "visibility", "wind_speed_10m", "temperature_80m", "is_day", "sunshine_duration"],
	"current": ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "is_day", "wind_speed_10m", "wind_direction_10m", "precipitation", "rain", "showers", "snowfall", "weather_code", "cloud_cover"],
	"timezone": "auto",
	"past_days": 1,
	"forecast_days": 14,
	"wind_speed_unit": "mph",
	"temperature_unit": "fahrenheit",
	"precipitation_unit": "inch"
    }
}

export const url = "https://api.open-meteo.com/v1/forecast";