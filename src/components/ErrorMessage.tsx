import type { FC } from "hono/jsx";

interface ErrorMessageProps {
  title?: string;
  message: string;
}

export const ErrorMessage: FC<ErrorMessageProps> = ({
  title = "Something went wrong",
  message,
}) => {
  return (
    <div class="max-w-md mx-auto bg-red-500/30 backdrop-blur-sm rounded-2xl p-6 text-center text-white mb-8 border-2 border-red-400/50">
      <div class="text-4xl mb-4">⚠️</div>
      <h2 class="text-xl font-bold mb-2">{title}</h2>
      <p class="text-red-100">{message}</p>
      <a
        href="/"
        class="inline-block mt-4 px-6 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all"
      >
        ← Back to Home
      </a>
    </div>
  );
};
