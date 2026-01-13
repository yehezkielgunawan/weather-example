import type { FC } from "hono/jsx";
import type { DailyForecast } from "../types";
import { getWeatherIcon } from "../constants";

interface ForecastCardProps {
  forecast: DailyForecast;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

const getDayName = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return "Tomorrow";
  }

  return date.toLocaleDateString("en-US", { weekday: "long" });
};

export const ForecastCard: FC<ForecastCardProps> = ({ forecast }) => {
  const dayIcon = getWeatherIcon(forecast.Day.Icon);
  const nightIcon = getWeatherIcon(forecast.Night.Icon);
  const maxTemp = forecast.Temperature.Maximum.Value;
  const minTemp = forecast.Temperature.Minimum.Value;
  const dayName = getDayName(forecast.Date);
  const formattedDate = formatDate(forecast.Date);

  return (
    <div class="bg-white/20 backdrop-blur-sm rounded-xl p-4 md:p-6 text-white shadow-lg hover:bg-white/30 transition-all">
      <div class="text-center">
        <h3 class="text-lg font-bold">{dayName}</h3>
        <p class="text-sm text-blue-200">{formattedDate}</p>
      </div>

      <div class="flex justify-center items-center gap-2 my-4">
        <div class="text-center">
          <div class="text-4xl md:text-5xl">{dayIcon}</div>
          <p class="text-xs text-blue-200 mt-1">Day</p>
        </div>
        <div class="text-2xl text-blue-200">/</div>
        <div class="text-center">
          <div class="text-4xl md:text-5xl">{nightIcon}</div>
          <p class="text-xs text-blue-200 mt-1">Night</p>
        </div>
      </div>

      <div class="flex justify-center items-center gap-4 mb-4">
        <div class="text-center">
          <span class="text-2xl font-bold text-orange-200">
            {Math.round(maxTemp)}°
          </span>
          <p class="text-xs text-blue-200">High</p>
        </div>
        <div class="text-blue-200">/</div>
        <div class="text-center">
          <span class="text-2xl font-bold text-blue-200">
            {Math.round(minTemp)}°
          </span>
          <p class="text-xs text-blue-200">Low</p>
        </div>
      </div>

      <div class="text-center text-sm">
        <p class="text-blue-100">{forecast.Day.IconPhrase}</p>
        {forecast.Day.HasPrecipitation && (
          <p class="text-blue-200 mt-1">
            🌧️ {forecast.Day.PrecipitationType || "Precipitation"} expected
          </p>
        )}
      </div>
    </div>
  );
};
