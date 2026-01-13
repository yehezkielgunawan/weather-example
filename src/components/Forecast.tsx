import type { FC } from "hono/jsx";
import type { DailyForecast } from "../types";
import { ForecastCard } from "./ForecastCard";

interface ForecastProps {
  forecasts: DailyForecast[];
}

export const Forecast: FC<ForecastProps> = ({ forecasts }) => {
  if (!forecasts || forecasts.length === 0) {
    return (
      <div class="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center text-white mt-8">
        <p>Unable to load forecast data</p>
      </div>
    );
  }

  return (
    <div class="mt-8">
      <h2 class="text-2xl font-bold text-white text-center mb-6">
        📅 3-Day Forecast
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {forecasts.map((forecast) => (
          <ForecastCard key={forecast.EpochDate} forecast={forecast} />
        ))}
      </div>
    </div>
  );
};
