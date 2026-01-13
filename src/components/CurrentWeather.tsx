import type { FC } from "hono/jsx";
import type { CurrentConditions, Location } from "../types";
import { getWeatherIcon } from "../constants";

interface CurrentWeatherProps {
  location: Location;
  conditions: CurrentConditions | null;
}

export const CurrentWeather: FC<CurrentWeatherProps> = ({
  location,
  conditions,
}) => {
  if (!conditions) {
    return (
      <div class="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center text-white">
        <p>Unable to load current weather data</p>
      </div>
    );
  }

  const icon = getWeatherIcon(conditions.WeatherIcon);
  const temp = conditions.Temperature.Metric.Value;
  const feelsLike = conditions.RealFeelTemperature.Metric.Value;
  const humidity = conditions.RelativeHumidity;
  const windSpeed = conditions.Wind.Speed.Metric.Value;
  const windDirection = conditions.Wind.Direction.Localized;
  const uvIndex = conditions.UVIndex;
  const uvText = conditions.UVIndexText;
  const visibility = conditions.Visibility.Metric.Value;
  const pressure = conditions.Pressure.Metric.Value;

  return (
    <div class="bg-white/20 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-white shadow-xl">
      <div class="text-center mb-6">
        <h2 class="text-2xl md:text-3xl font-bold">
          {location.name}, {location.country}
        </h2>
        <p class="text-blue-100 text-sm mt-1">Today&apos;s Weather</p>
      </div>

      <div class="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
        <div class="text-8xl md:text-9xl">{icon}</div>
        <div class="text-center md:text-left">
          <div class="text-6xl md:text-7xl font-bold">{Math.round(temp)}°C</div>
          <div class="text-xl md:text-2xl text-blue-100 mt-2">
            {conditions.WeatherText}
          </div>
          <div class="text-sm text-blue-200 mt-1">
            Feels like {Math.round(feelsLike)}°C
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-white/10 rounded-xl p-4 text-center">
          <div class="text-3xl mb-2">💧</div>
          <div class="text-sm text-blue-200">Humidity</div>
          <div class="text-xl font-semibold">{humidity}%</div>
        </div>

        <div class="bg-white/10 rounded-xl p-4 text-center">
          <div class="text-3xl mb-2">💨</div>
          <div class="text-sm text-blue-200">Wind</div>
          <div class="text-xl font-semibold">
            {windSpeed} km/h {windDirection}
          </div>
        </div>

        <div class="bg-white/10 rounded-xl p-4 text-center">
          <div class="text-3xl mb-2">☀️</div>
          <div class="text-sm text-blue-200">UV Index</div>
          <div class="text-xl font-semibold">
            {uvIndex} ({uvText})
          </div>
        </div>

        <div class="bg-white/10 rounded-xl p-4 text-center">
          <div class="text-3xl mb-2">👁️</div>
          <div class="text-sm text-blue-200">Visibility</div>
          <div class="text-xl font-semibold">{visibility} km</div>
        </div>

        <div class="bg-white/10 rounded-xl p-4 text-center col-span-2 md:col-span-4">
          <div class="text-3xl mb-2">🌡️</div>
          <div class="text-sm text-blue-200">Pressure</div>
          <div class="text-xl font-semibold">{pressure} mb</div>
        </div>
      </div>
    </div>
  );
};
