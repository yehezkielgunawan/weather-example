import { ACCUWEATHER_ENDPOINT } from "../constants";

export interface Location {
  Key: string;
  LocalizedName: string;
  Country: {
    LocalizedName: string;
  };
  AdministrativeArea: {
    LocalizedName: string;
  };
}

export interface CurrentConditions {
  LocalObservationDateTime: string;
  WeatherText: string;
  WeatherIcon: number;
  HasPrecipitation: boolean;
  PrecipitationType: string | null;
  IsDayTime: boolean;
  Temperature: {
    Metric: {
      Value: number;
      Unit: string;
    };
    Imperial: {
      Value: number;
      Unit: string;
    };
  };
  RelativeHumidity: number;
  Wind: {
    Direction: {
      Degrees: number;
      Localized: string;
    };
    Speed: {
      Metric: {
        Value: number;
        Unit: string;
      };
      Imperial: {
        Value: number;
        Unit: string;
      };
    };
  };
  UVIndex: number;
  UVIndexText: string;
  CloudCover: number;
  RealFeelTemperature: {
    Metric: {
      Value: number;
      Unit: string;
    };
  };
}

export interface DailyForecast {
  Date: string;
  Temperature: {
    Minimum: {
      Value: number;
      Unit: string;
    };
    Maximum: {
      Value: number;
      Unit: string;
    };
  };
  Day: {
    Icon: number;
    IconPhrase: string;
    HasPrecipitation: boolean;
    PrecipitationType?: string;
    PrecipitationIntensity?: string;
  };
  Night: {
    Icon: number;
    IconPhrase: string;
    HasPrecipitation: boolean;
    PrecipitationType?: string;
    PrecipitationIntensity?: string;
  };
}

export interface ForecastResponse {
  Headline: {
    EffectiveDate: string;
    EffectiveEpochDate: number;
    Severity: number;
    Text: string;
  };
  DailyForecasts: DailyForecast[];
}

// Note: AccuWeather API requires API key as query parameter, not Authorization header
// See: https://developer.accuweather.com/accuweather-current-conditions-api/apis
const getHeaders = () => ({
  "Accept": "application/json",
});

export async function searchLocations(
  query: string,
  apiKey: string
): Promise<Location[]> {
  const url = `${ACCUWEATHER_ENDPOINT}/locations/v1/cities/search?apikey=${apiKey}&q=${encodeURIComponent(query)}`;

  const response = await fetch(url, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to search locations: ${response.statusText}`);
  }

  return response.json();
}

export async function getLocationByKey(
  locationKey: string,
  apiKey: string
): Promise<Location> {
  const url = `${ACCUWEATHER_ENDPOINT}/locations/v1/${locationKey}?apikey=${apiKey}`;

  const response = await fetch(url, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to get location: ${response.statusText}`);
  }

  return response.json();
}

export async function getCurrentConditions(
  locationKey: string,
  apiKey: string
): Promise<CurrentConditions[]> {
  const url = `${ACCUWEATHER_ENDPOINT}/currentconditions/v1/${locationKey}?apikey=${apiKey}&details=true`;

  const response = await fetch(url, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to get current conditions: ${response.statusText}`);
  }

  return response.json();
}

export async function get5DayForecast(
  locationKey: string,
  apiKey: string
): Promise<ForecastResponse> {
  const url = `${ACCUWEATHER_ENDPOINT}/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}&metric=true`;

  const response = await fetch(url, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to get forecast: ${response.statusText}`);
  }

  return response.json();
}

export function getWeatherIconUrl(iconNumber: number): string {
  const paddedIcon = iconNumber.toString().padStart(2, "0");
  // Using AccuWeather's official icon CDN
  return `https://www.accuweather.com/images/weathericons/${paddedIcon}.svg`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function getDayName(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  }
  if (date.toDateString() === tomorrow.toDateString()) {
    return "Tomorrow";
  }

  return date.toLocaleDateString("en-US", { weekday: "long" });
}
