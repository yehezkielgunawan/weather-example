import { Hono } from "hono";
import { renderer } from "./renderer";
import {
  searchLocations,
  getCurrentConditions,
  get5DayForecast,
  getLocationByKey,
  Location,
  CurrentConditions,
  ForecastResponse,
} from "./services/accuweather";
import {
  WeatherCard,
  ForecastSection,
  SearchForm,
  ErrorDisplay,
} from "./components";
import { DEFAULT_LOCATION_KEY, DEFAULT_LOCATION_NAME } from "./constants";

type Bindings = {
  ACCUWEATHER_API_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use(renderer);

// Home page - shows Jakarta weather by default
app.get("/", async (c) => {
  const apiKey = c.env.ACCUWEATHER_API_KEY;

  if (!apiKey) {
    return c.render(
      <div class="app-container">
        <header class="app-header">
          <h1 class="app-title">🌤️ Weather App</h1>
        </header>
        <main class="main-content">
          <SearchForm />
          <ErrorDisplay
            title="Configuration Error"
            message="API key is not configured. Please set ACCUWEATHER_API_KEY environment variable."
            showHomeLink={false}
          />
        </main>
      </div>
    );
  }

  try {
    const [location, conditionsData, forecastData] = await Promise.all([
      getLocationByKey(DEFAULT_LOCATION_KEY, apiKey),
      getCurrentConditions(DEFAULT_LOCATION_KEY, apiKey),
      get5DayForecast(DEFAULT_LOCATION_KEY, apiKey),
    ]);

    const conditions = conditionsData[0];

    return c.render(
      <div class="app-container">
        <header class="app-header">
          <h1 class="app-title">🌤️ Weather App</h1>
        </header>
        <main class="main-content">
          <SearchForm />
          <WeatherCard location={location} conditions={conditions} />
          <ForecastSection forecasts={forecastData.DailyForecasts} />
        </main>
        <footer class="app-footer">
          <p>Powered by AccuWeather API</p>
        </footer>
      </div>
    );
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return c.render(
      <div class="app-container">
        <header class="app-header">
          <h1 class="app-title">🌤️ Weather App</h1>
        </header>
        <main class="main-content">
          <SearchForm />
          <ErrorDisplay
            title="Error Loading Weather"
            message={`Failed to load weather data for ${DEFAULT_LOCATION_NAME}. Please try again later.`}
            showHomeLink={false}
          />
        </main>
      </div>
    );
  }
});

// Search route
app.get("/search", async (c) => {
  const query = c.req.query("q");
  const apiKey = c.env.ACCUWEATHER_API_KEY;

  if (!apiKey) {
    return c.render(
      <div class="app-container">
        <header class="app-header">
          <a href="/" class="app-title-link">
            <h1 class="app-title">🌤️ Weather App</h1>
          </a>
        </header>
        <main class="main-content">
          <SearchForm
            searchQuery={query}
            error="API key is not configured. Please set ACCUWEATHER_API_KEY environment variable."
          />
        </main>
      </div>
    );
  }

  if (!query || query.trim() === "") {
    return c.render(
      <div class="app-container">
        <header class="app-header">
          <a href="/" class="app-title-link">
            <h1 class="app-title">🌤️ Weather App</h1>
          </a>
        </header>
        <main class="main-content">
          <SearchForm error="Please enter a city name to search." />
        </main>
      </div>
    );
  }

  try {
    const locations = await searchLocations(query, apiKey);

    return c.render(
      <div class="app-container">
        <header class="app-header">
          <a href="/" class="app-title-link">
            <h1 class="app-title">🌤️ Weather App</h1>
          </a>
        </header>
        <main class="main-content">
          <SearchForm searchResults={locations} searchQuery={query} />
        </main>
      </div>
    );
  } catch (error) {
    console.error("Error searching locations:", error);
    return c.render(
      <div class="app-container">
        <header class="app-header">
          <a href="/" class="app-title-link">
            <h1 class="app-title">🌤️ Weather App</h1>
          </a>
        </header>
        <main class="main-content">
          <SearchForm
            searchQuery={query}
            error="Failed to search locations. Please try again."
          />
        </main>
      </div>
    );
  }
});

// Weather detail page for specific location
app.get("/weather/:locationKey", async (c) => {
  const locationKey = c.req.param("locationKey");
  const apiKey = c.env.ACCUWEATHER_API_KEY;

  if (!apiKey) {
    return c.render(
      <div class="app-container">
        <header class="app-header">
          <a href="/" class="app-title-link">
            <h1 class="app-title">🌤️ Weather App</h1>
          </a>
        </header>
        <main class="main-content">
          <ErrorDisplay
            title="Configuration Error"
            message="API key is not configured. Please set ACCUWEATHER_API_KEY environment variable."
          />
        </main>
      </div>
    );
  }

  try {
    const [location, conditionsData, forecastData] = await Promise.all([
      getLocationByKey(locationKey, apiKey),
      getCurrentConditions(locationKey, apiKey),
      get5DayForecast(locationKey, apiKey),
    ]);

    const conditions = conditionsData[0];

    return c.render(
      <div class="app-container">
        <header class="app-header">
          <a href="/" class="app-title-link">
            <h1 class="app-title">🌤️ Weather App</h1>
          </a>
        </header>
        <main class="main-content">
          <SearchForm />
          <WeatherCard location={location} conditions={conditions} />
          <ForecastSection forecasts={forecastData.DailyForecasts} />
        </main>
        <footer class="app-footer">
          <p>Powered by AccuWeather API</p>
        </footer>
      </div>
    );
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return c.render(
      <div class="app-container">
        <header class="app-header">
          <a href="/" class="app-title-link">
            <h1 class="app-title">🌤️ Weather App</h1>
          </a>
        </header>
        <main class="main-content">
          <ErrorDisplay
            title="Error Loading Weather"
            message="Failed to load weather data for this location. Please try again."
          />
        </main>
      </div>
    );
  }
});

export default app;
