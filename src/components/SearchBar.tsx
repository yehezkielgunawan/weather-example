import type { FC } from "hono/jsx";

export const SearchBar: FC = () => {
  return (
    <div class="max-w-md mx-auto mb-8">
      <form action="/search" method="get" class="flex gap-2">
        <div class="flex-1 relative">
          <input
            type="text"
            name="q"
            placeholder="Search for a city..."
            class="w-full px-4 py-3 pl-10 rounded-xl border-2 border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:border-white/60 focus:bg-white/30 transition-all"
            required
          />
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-white/70">
            🔍
          </span>
        </div>
        <button
          type="submit"
          class="px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/30 hover:border-white/60 transition-all"
        >
          Search
        </button>
      </form>
    </div>
  );
};
