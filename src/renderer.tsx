import { jsxRenderer } from "hono/jsx-renderer";
import { Link, ViteClient } from "vite-ssr-components/hono";

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="A simple weather app powered by AccuWeather API"
        />
        <title>Weather App</title>
        <ViteClient />
        <Link href="/src/style.css" rel="stylesheet" />
      </head>
      <body class="antialiased">{children}</body>
    </html>
  );
});
