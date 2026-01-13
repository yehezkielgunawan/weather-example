import type { FC } from "hono/jsx";
import type { Location } from "../types";

interface LocationResultsProps {
  locations: Location[];
  query: string;
}

export const LocationResults: FC<LocationResultsProps> = ({
  locations,
  query,
}) => {
  if (locations.length === 0) {
    return (
      <div class="max-w-md mx-auto bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center text-white mb-8">
        <p class="text-xl mb-2">🔍 No results found</p>
        <p class="text-blue-200">
          No locations found for "{query}". Please try a different search term.
        </p>
      </div>
    );
  }

  return (
    <div class="max-w-2xl mx-auto mb-8">
      <h2 class="text-xl font-bold text-white text-center mb-4">
        Search Results for "{query}"
      </h2>
      <div class="grid gap-3">
        {locations.map((location) => (
          <a
            key={location.key}
            href={`/weather/${location.key}?name=${encodeURIComponent(location.name)}&country=${encodeURIComponent(location.country)}`}
            class="block bg-white/20 backdrop-blur-sm rounded-xl p-4 text-white hover:bg-white/30 transition-all shadow-lg"
          >
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-semibold">{location.name}</h3>
                <p class="text-sm text-blue-200">
                  {location.administrativeArea
                    ? `${location.administrativeArea}, `
                    : ""}
                  {location.country}
                </p>
              </div>
              <div class="text-2xl">📍</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
