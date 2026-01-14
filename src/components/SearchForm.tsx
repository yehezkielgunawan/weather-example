import type { FC } from "hono/jsx";
import { Location } from "../services/accuweather";

interface SearchFormProps {
  searchResults?: Location[];
  searchQuery?: string;
  error?: string;
}

export const SearchForm: FC<SearchFormProps> = ({
  searchResults,
  searchQuery,
  error,
}) => {
  return (
    <div class="search-container">
      <form action="/search" method="get" class="search-form">
        <div class="search-input-wrapper">
          <span class="search-icon">🔍</span>
          <input
            type="text"
            name="q"
            placeholder="Search for a city..."
            value={searchQuery || ""}
            class="search-input"
            autocomplete="off"
          />
        </div>
        <button type="submit" class="search-button">
          Search
        </button>
      </form>

      {error && <p class="search-error">{error}</p>}

      {searchResults && searchResults.length > 0 && (
        <div class="search-results">
          <h4 class="results-title">Select a location:</h4>
          <ul class="results-list">
            {searchResults.map((location) => (
              <li key={location.Key}>
                <a href={`/weather/${location.Key}`} class="result-item">
                  <span class="result-name">{location.LocalizedName}</span>
                  <span class="result-region">
                    {location.AdministrativeArea?.LocalizedName}, {location.Country?.LocalizedName}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {searchResults && searchResults.length === 0 && searchQuery && (
        <p class="no-results">No locations found for "{searchQuery}"</p>
      )}
    </div>
  );
};
