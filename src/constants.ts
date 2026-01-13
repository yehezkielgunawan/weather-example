export const ACCU_WEATHER_ENDPOINT = "http://dataservice.accuweather.com";

// Default location: Jakarta, Indonesia
export const DEFAULT_LOCATION = {
  key: "208971",
  name: "Jakarta",
  country: "Indonesia",
};

// Weather condition icons mapping
export const WEATHER_ICONS: Record<number, string> = {
  1: "☀️", // Sunny
  2: "🌤️", // Mostly Sunny
  3: "⛅", // Partly Sunny
  4: "⛅", // Intermittent Clouds
  5: "🌥️", // Hazy Sunshine
  6: "🌥️", // Mostly Cloudy
  7: "☁️", // Cloudy
  8: "☁️", // Dreary (Overcast)
  11: "🌫️", // Fog
  12: "🌧️", // Showers
  13: "🌦️", // Mostly Cloudy w/ Showers
  14: "🌦️", // Partly Sunny w/ Showers
  15: "⛈️", // T-Storms
  16: "⛈️", // Mostly Cloudy w/ T-Storms
  17: "⛈️", // Partly Sunny w/ T-Storms
  18: "🌧️", // Rain
  19: "🌨️", // Flurries
  20: "🌨️", // Mostly Cloudy w/ Flurries
  21: "🌨️", // Partly Sunny w/ Flurries
  22: "❄️", // Snow
  23: "❄️", // Mostly Cloudy w/ Snow
  24: "🧊", // Ice
  25: "🌧️", // Sleet
  26: "🌧️", // Freezing Rain
  29: "🌧️", // Rain and Snow
  30: "🌡️", // Hot
  31: "❄️", // Cold
  32: "💨", // Windy
  33: "🌙", // Clear (Night)
  34: "🌙", // Mostly Clear (Night)
  35: "☁️", // Partly Cloudy (Night)
  36: "☁️", // Intermittent Clouds (Night)
  37: "🌫️", // Hazy Moonlight (Night)
  38: "☁️", // Mostly Cloudy (Night)
  39: "🌧️", // Partly Cloudy w/ Showers (Night)
  40: "🌧️", // Mostly Cloudy w/ Showers (Night)
  41: "⛈️", // Partly Cloudy w/ T-Storms (Night)
  42: "⛈️", // Mostly Cloudy w/ T-Storms (Night)
  43: "🌨️", // Mostly Cloudy w/ Flurries (Night)
  44: "❄️", // Mostly Cloudy w/ Snow (Night)
};

export const getWeatherIcon = (iconNumber: number): string => {
  return WEATHER_ICONS[iconNumber] || "🌡️";
};
