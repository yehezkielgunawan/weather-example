import { ACCU_WEATHER_ENDPOINT, DEFAULT_LOCATION } from "../constants";
import type {
  LocationSearchResult,
  CurrentConditions,
  ForecastResponse,
  Location,
  WeatherData,
  DailyForecast,
} from "../types";

const createAuthHeaders = (apiKey: string): HeadersInit => ({
  Authorization: `Bearer ${apiKey}`,
  "Content-Type": "application/json",
});

export const searchLocations = async (
  query: string,
  apiKey: string,
): Promise<Location[]> => {
  if (!apiKey) {
    throw new Error("AccuWeather API key is required");
  }

  const url = `${ACCU_WEATHER_ENDPOINT}/locations/v1/cities/search?q=${encodeURIComponent(query)}`;

  const response = await fetch(url, {
    method: "GET",
    headers: createAuthHeaders(apiKey),
  });

  if (!response.ok) {
    throw new Error(`Failed to search locations: ${response.statusText}`);
  }

  const data: LocationSearchResult[] = await response.json();

  return data.map((item) => ({
    key: item.Key,
    name: item.LocalizedName,
    country: item.Country.LocalizedName,
    administrativeArea: item.AdministrativeArea.LocalizedName,
  }));
};

export const getCurrentConditions = async (
  locationKey: string,
  apiKey: string,
): Promise<CurrentConditions | null> => {
  if (!apiKey) {
    throw new Error("AccuWeather API key is required");
  }

  const url = `${ACCU_WEATHER_ENDPOINT}/currentconditions/v1/${locationKey}?details=true`;

  const response = await fetch(url, {
    method: "GET",
    headers: createAuthHeaders(apiKey),
  });

  if (!response.ok) {
    throw new Error(`Failed to get current conditions: ${response.statusText}`);
  }

  const data: CurrentConditions[] = await response.json();

  return data.length > 0 ? data[0] : null;
};

export const get3DayForecast = async (
  locationKey: string,
  apiKey: string,
): Promise<DailyForecast[]> => {
  if (!apiKey) {
    throw new Error("AccuWeather API key is required");
  }

  const url = `${ACCU_WEATHER_ENDPOINT}/forecasts/v1/daily/5day/${locationKey}?metric=true`;

  const response = await fetch(url, {
    method: "GET",
    headers: createAuthHeaders(apiKey),
  });

  if (!response.ok) {
    throw new Error(`Failed to get forecast: ${response.statusText}`);
  }

  const data: ForecastResponse = await response.json();

  // Return only 3 days
  return data.DailyForecasts.slice(0, 3);
};

export const getWeatherData = async (
  location: Location,
  apiKey: string,
): Promise<WeatherData> => {
  try {
    const [currentConditions, forecast] = await Promise.all([
      getCurrentConditions(location.key, apiKey),
      get3DayForecast(location.key, apiKey),
    ]);

    return {
      location,
      currentConditions,
      forecast,
    };
  } catch (error) {
    return {
      location,
      currentConditions: null,
      forecast: [],
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
};

export const getDefaultWeatherData = async (
  apiKey: string,
): Promise<WeatherData> => {
  return getWeatherData(DEFAULT_LOCATION, apiKey);
};
