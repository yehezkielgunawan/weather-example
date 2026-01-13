import type { FC } from "hono/jsx";

interface LayoutProps {
  title: string;
  children: any;
}

export const Layout: FC<LayoutProps> = ({ title, children }) => {
  return (
    <div class="min-h-screen bg-linear-to-br from-blue-400 via-blue-500 to-purple-600">
      <div class="container mx-auto px-4 py-8">
        <header class="text-center mb-8">
          <h1 class="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            🌤️ {title}
          </h1>
          <p class="text-blue-100 mt-2">Your daily weather companion</p>
        </header>
        <main>{children}</main>
        <footer class="text-center mt-12 text-blue-100 text-sm">
          <p>Powered by AccuWeather API</p>
        </footer>
      </div>
    </div>
  );
};
