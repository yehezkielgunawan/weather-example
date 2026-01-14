import type { FC } from "hono/jsx";
import {
  CurrentConditions,
  Location,
  getWeatherIconUrl,
} from "../services/accuweather";

interface WeatherCardProps {
  location: Location;
  conditions: CurrentConditions;
}

export const WeatherCard: FC<WeatherCardProps> = ({ location, conditions }) => {
  const iconUrl = getWeatherIconUrl(conditions.WeatherIcon);

  return (
    <div class="weather-card">
      <div class="weather-card-header">
        <div class="location-info">
          <h2 class="location-name">{location.LocalizedName}</h2>
          <p class="location-country">
            {location.AdministrativeArea?.LocalizedName}, {location.Country?.LocalizedName}
          </p>
        </div>
        <div class="weather-icon-container">
          <img
            src={iconUrl}
            alt={conditions.WeatherText}
            class="weather-icon-large"
          />
        </div>
      </div>

      <div class="temperature-display">
        <span class="temperature-value">
          {Math.round(conditions.Temperature.Metric.Value)}
        </span>
        <span class="temperature-unit">°C</span>
      </div>

      <p class="weather-description">{conditions.WeatherText}</p>

      <div class="weather-details-grid">
        <div class="weather-detail">
          <div class="detail-icon">💧</div>
          <div class="detail-info">
            <span class="detail-label">Humidity</span>
            <span class="detail-value">{conditions.RelativeHumidity}%</span>
          </div>
        </div>

        <div class="weather-detail">
          <div class="detail-icon">💨</div>
          <div class="detail-info">
            <span class="detail-label">Wind</span>
            <span class="detail-value">
              {conditions.Wind.Speed.Metric.Value} {conditions.Wind.Speed.Metric.Unit}
            </span>
          </div>
        </div>

        <div class="weather-detail">
          <div class="detail-icon">🌡️</div>
          <div class="detail-info">
            <span class="detail-label">Feels Like</span>
            <span class="detail-value">
              {Math.round(conditions.RealFeelTemperature.Metric.Value)}°C
            </span>
          </div>
        </div>

        <div class="weather-detail">
          <div class="detail-icon">☀️</div>
          <div class="detail-info">
            <span class="detail-label">UV Index</span>
            <span class="detail-value">
              {conditions.UVIndex} ({conditions.UVIndexText})
            </span>
          </div>
        </div>

        <div class="weather-detail">
          <div class="detail-icon">☁️</div>
          <div class="detail-info">
            <span class="detail-label">Cloud Cover</span>
            <span class="detail-value">{conditions.CloudCover}%</span>
          </div>
        </div>

        <div class="weather-detail">
          <div class="detail-icon">🧭</div>
          <div class="detail-info">
            <span class="detail-label">Wind Direction</span>
            <span class="detail-value">{conditions.Wind.Direction.Localized}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
