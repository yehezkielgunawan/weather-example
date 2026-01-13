# General Rules for this Simple Weather App Project

## Setup commands
- Install deps: `pnpm install`
- Start dev server: `pnpm dev`
- Build project: `pnpm build`

## Code style
- TypeScript strict mode
- Double quotes, with semicolons
- Use functional patterns where possible
- Utilize JSX features from Hono for UI components
- For API integration, use Fetch API instead of Axios
- Use Tailwind CSS for styling
- We'll use the Weather API from AccuWeather Core Weather API: `https://developer.accuweather.com`
- Use Context7

## Project Structure
- `src/` - Main source code directory
  - `components/` - Reusable UI components
  - `services/` - API service integrations
- `constants.ts` - Application-wide constants
- `styles.css` - Global styles using Tailwind CSS
- `renderer.tsx` - Hono renderer setup
- `index.tsx` - Main entry point for the application

## Project Specifications
- By Default, display the today's weather for a predefined location (in this case: Jakarta), also show 3 days weather forecast for this predefined location.
- Allow users to search for other locations and display their weather information.
- Show essential today's weather details: temperature, humidity, wind speed, and weather conditions (e.g : sunny, rainy).
- Also provides the 3 days weather forecast for the selected location.
- Ensure responsive design for both desktop and mobile views.
