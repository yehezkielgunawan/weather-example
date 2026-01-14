import type { FC } from "hono/jsx";
import {
  DailyForecast,
  getWeatherIconUrl,
  getDayName,
} from "../services/accuweather";

interface ForecastCardProps {
  forecast: DailyForecast;
}

export const ForecastCard: FC<ForecastCardProps> = ({ forecast }) => {
  const iconUrl = getWeatherIconUrl(forecast.Day.Icon);
  const dayName = getDayName(forecast.Date);

  return (
    <div class="forecast-card">
      <p class="forecast-day">{dayName}</p>
      <img
        src={iconUrl}
        alt={forecast.Day.IconPhrase}
        class="forecast-icon"
      />
      <p class="forecast-condition">{forecast.Day.IconPhrase}</p>
      <div class="forecast-temps">
        <span class="temp-high">{Math.round(forecast.Temperature.Maximum.Value)}°</span>
        <span class="temp-divider">/</span>
        <span class="temp-low">{Math.round(forecast.Temperature.Minimum.Value)}°</span>
      </div>
      {forecast.Day.HasPrecipitation && (
        <p class="precipitation-info">
          🌧️ {forecast.Day.PrecipitationType}
        </p>
      )}
    </div>
  );
};

interface ForecastSectionProps {
  forecasts: DailyForecast[];
}

export const ForecastSection: FC<ForecastSectionProps> = ({ forecasts }) => {
  // Take only 3 days as per spec
  const threeDayForecast = forecasts.slice(0, 3);

  return (
    <div class="forecast-section">
      <h3 class="forecast-title">3-Day Forecast</h3>
      <div class="forecast-grid">
        {threeDayForecast.map((forecast) => (
          <ForecastCard key={forecast.Date} forecast={forecast} />
        ))}
      </div>
    </div>
  );
};
