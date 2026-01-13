# Weather App 🌤️

A simple and beautiful weather application built with [Hono.js](https://hono.dev/) framework, featuring current weather conditions and a 3-day forecast powered by the AccuWeather API.

## Features

- 🌡️ **Current Weather** - Display today's weather for any location including temperature, humidity, wind speed, UV index, visibility, and pressure
- 📅 **3-Day Forecast** - View weather predictions for the next 3 days
- 🔍 **Location Search** - Search for any city worldwide
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🎨 **Beautiful UI** - Modern glassmorphism design with Tailwind CSS

## Tech Stack

- **Framework**: [Hono.js](https://hono.dev/) - Ultrafast web framework
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **API**: [AccuWeather API](https://developer.accuweather.com/)
- **Deployment**: Cloudflare Workers
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- AccuWeather API Key (get one at [AccuWeather Developer Portal](https://developer.accuweather.com/))

### Installation

1. Install dependencies:

```bash
pnpm install
```

2. Configure your AccuWeather API key:

   **For local development**, create a `.dev.vars` file in the root directory:

   ```
   ACCUWEATHER_API_KEY=your_api_key_here
   ```

   **For production**, set the secret using Wrangler:

   ```bash
   npx wrangler secret put ACCUWEATHER_API_KEY
   ```

3. Start the development server:

```bash
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm deploy` | Deploy to Cloudflare Workers |
| `pnpm test` | Run tests |
| `pnpm cf-typegen` | Generate Cloudflare bindings types |

## Project Structure

```
weather-example/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── CurrentWeather.tsx
│   │   ├── ErrorMessage.tsx
│   │   ├── Forecast.tsx
│   │   ├── ForecastCard.tsx
│   │   ├── Layout.tsx
│   │   ├── LocationResults.tsx
│   │   ├── SearchBar.tsx
│   │   └── index.ts
│   ├── services/           # API service integrations
│   │   └── weatherService.ts
│   ├── constants.ts        # Application constants
│   ├── index.tsx           # Main entry point
│   ├── renderer.tsx        # Hono renderer setup
│   ├── style.css           # Global styles
│   └── types.ts            # TypeScript type definitions
├── public/                 # Static assets
├── wrangler.jsonc          # Cloudflare Workers config
├── vite.config.ts          # Vite configuration
└── package.json
```

## API Routes

| Route | Description |
|-------|-------------|
| `GET /` | Home page - displays Jakarta's weather by default |
| `GET /search?q={query}` | Search for locations |
| `GET /weather/:locationKey` | Display weather for a specific location |

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ACCUWEATHER_API_KEY` | Your AccuWeather API key | Yes |

## Deployment

Deploy to Cloudflare Workers:

```bash
pnpm deploy
```

Make sure you've set your `ACCUWEATHER_API_KEY` secret before deploying:

```bash
npx wrangler secret put ACCUWEATHER_API_KEY
```

## License

MIT

## Acknowledgments

- Weather data provided by [AccuWeather](https://www.accuweather.com/)
- Built with [Hono.js](https://hono.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)