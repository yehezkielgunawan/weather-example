import { Hono } from "hono";
import { renderer } from "./renderer";
import { DEFAULT_LOCATION } from "./constants";
import type { Location } from "./types";
import {
  Layout,
  SearchBar,
  CurrentWeather,
  Forecast,
  LocationResults,
  ErrorMessage,
} from "./components";
import {
  searchLocations,
  getWeatherData,
  getDefaultWeatherData,
} from "./services/weatherService";

type Bindings = {
  ACCUWEATHER_API_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use(renderer);

// Home page - shows default location (Jakarta) weather
app.get("/", async (c) => {
  const apiKey = c.env?.ACCUWEATHER_API_KEY || "";

  if (!apiKey) {
    return c.render(
      <Layout title="Weather App">
        <SearchBar />
        <ErrorMessage
          title="API Key Missing"
          message="Please configure your AccuWeather API key in the environment variables (ACCUWEATHER_API_KEY)."
        />
      </Layout>,
    );
  }

  try {
    const weatherData = await getDefaultWeatherData(apiKey);

    if (weatherData.error) {
      return c.render(
        <Layout title="Weather App">
          <SearchBar />
          <ErrorMessage
            title="Weather Data Error"
            message={weatherData.error}
          />
        </Layout>,
      );
    }

    return c.render(
      <Layout title="Weather App">
        <SearchBar />
        <CurrentWeather
          location={weatherData.location}
          conditions={weatherData.currentConditions}
        />
        <Forecast forecasts={weatherData.forecast} />
      </Layout>,
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return c.render(
      <Layout title="Weather App">
        <SearchBar />
        <ErrorMessage message={errorMessage} />
      </Layout>,
    );
  }
});

// Search page - shows location search results
app.get("/search", async (c) => {
  const query = c.req.query("q") || "";
  const apiKey = c.env?.ACCUWEATHER_API_KEY || "";

  if (!apiKey) {
    return c.render(
      <Layout title="Weather App">
        <SearchBar />
        <ErrorMessage
          title="API Key Missing"
          message="Please configure your AccuWeather API key in the environment variables (ACCUWEATHER_API_KEY)."
        />
      </Layout>,
    );
  }

  if (!query.trim()) {
    return c.redirect("/");
  }

  try {
    const locations = await searchLocations(query, apiKey);

    return c.render(
      <Layout title="Weather App">
        <SearchBar />
        <LocationResults locations={locations} query={query} />
      </Layout>,
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to search locations";
    return c.render(
      <Layout title="Weather App">
        <SearchBar />
        <ErrorMessage title="Search Error" message={errorMessage} />
      </Layout>,
    );
  }
});

// Weather detail page - shows weather for a specific location
app.get("/weather/:locationKey", async (c) => {
  const locationKey = c.req.param("locationKey");
  const name = c.req.query("name") || "Unknown Location";
  const country = c.req.query("country") || "Unknown";
  const apiKey = c.env?.ACCUWEATHER_API_KEY || "";

  if (!apiKey) {
    return c.render(
      <Layout title="Weather App">
        <SearchBar />
        <ErrorMessage
          title="API Key Missing"
          message="Please configure your AccuWeather API key in the environment variables (ACCUWEATHER_API_KEY)."
        />
      </Layout>,
    );
  }

  const location: Location = {
    key: locationKey,
    name: decodeURIComponent(name),
    country: decodeURIComponent(country),
  };

  try {
    const weatherData = await getWeatherData(location, apiKey);

    if (weatherData.error) {
      return c.render(
        <Layout title="Weather App">
          <SearchBar />
          <ErrorMessage
            title="Weather Data Error"
            message={weatherData.error}
          />
        </Layout>,
      );
    }

    return c.render(
      <Layout title="Weather App">
        <SearchBar />
        <CurrentWeather
          location={weatherData.location}
          conditions={weatherData.currentConditions}
        />
        <Forecast forecasts={weatherData.forecast} />
        <div class="text-center mt-6">
          <a
            href="/"
            class="inline-block px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all"
          >
            ← Back to Jakarta
          </a>
        </div>
      </Layout>,
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return c.render(
      <Layout title="Weather App">
        <SearchBar />
        <ErrorMessage message={errorMessage} />
      </Layout>,
    );
  }
});

export default app;
